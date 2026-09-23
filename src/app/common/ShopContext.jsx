"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { storeRequest } from "../../lib/storeApi";
import { useStoreAuth } from "./StoreAuthContext";
import { useHasMounted } from "./useHasMounted";
import { productEventData, trackMetaEvent } from "../../lib/metaPixel";

const CART_KEY = "nh-shop-cart";
const WISHLIST_KEY = "nh-shop-wishlist";

const ShopContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable; the cart still works for this page view.
  }
}

/** Two cart lines are the same product only when their variant matches too. */
const sameLine = (item, id, variant) =>
  item.id === id && (item.variant?._id || null) === (variant?._id || null);

/**
 * Holds the cart and wishlist.
 *
 * Guests keep their cart in localStorage. When someone signs in, that local
 * cart is pushed to the server and merged with whatever was already saved
 * there, so nothing picked out before logging in is lost.
 */
export function ShopProvider({ children }) {
  const { user, loading: authLoading } = useStoreAuth();
  const hydrated = useHasMounted();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartReady, setCartReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const mergedForUser = useRef(null);

  // localStorage only exists in the browser, so the saved cart and wishlist are
  // pulled in on the first client render rather than during the server render.
  if (hydrated && !restored) {
    setRestored(true);
    setCart(readStorage(CART_KEY, []));
    setWishlist(readStorage(WISHLIST_KEY, []));
  }

  /** Maps a server cart line into the shape the UI uses. */
  const fromServer = useCallback(
    (line) => ({
      id: line.product?._id,
      name: line.product?.title || "",
      title: line.product?.title || "",
      slug: line.product?.slug || "",
      price: Number(line.product?.discountPrice ?? line.product?.diccountprice ?? line.product?.price ?? 0),
      oldPrice: Number(line.product?.price ?? 0),
      image: line.product?.image?.[0] || "/images/image.jpg",
      quantity: line.quntity || 1,
      variant: line.variant || null,
    }),
    []
  );

  // Signed out, the local cart is the cart, so it is ready as soon as it is read.
  const signedOutCartReady = restored && !authLoading && !user?._id;
  if (signedOutCartReady && !cartReady) setCartReady(true);

  useEffect(() => {
    if (!restored || authLoading) return undefined;

    if (!user?._id) {
      // Signing out leaves the previous customer's cart behind, which matters
      // on a shared phone, so empty it rather than handing it to the next visitor.
      if (mergedForUser.current) {
        mergedForUser.current = null;
        setCart([]);
        writeStorage(CART_KEY, []);
      }
      return undefined;
    }

    // Already merged for this account in this session.
    if (mergedForUser.current === user._id) return undefined;
    mergedForUser.current = user._id;

    let active = true;
    (async () => {
      try {
        const localCart = readStorage(CART_KEY, []);
        // Push anything picked out as a guest up to the account.
        for (const item of localCart) {
          await storeRequest("/cart/add-cart", {
            method: "POST",
            body: JSON.stringify({ product: item.id, variant: item.variant?._id, quntity: item.quantity || 1 }),
          }).catch(() => {});
        }
        const serverCart = await storeRequest("/cart/my-cart");
        if (!active) return;
        setCart((serverCart || []).filter((line) => line.product).map(fromServer));
        writeStorage(CART_KEY, []);
      } catch {
        // Keep whatever is on screen rather than emptying the cart on a hiccup.
      } finally {
        if (active) setCartReady(true);
      }
    })();

    return () => {
      active = false;
    };
  }, [user, authLoading, restored, fromServer]);

  useEffect(() => {
    if (!restored || user?._id) return;
    writeStorage(CART_KEY, cart);
  }, [cart, restored, user]);

  useEffect(() => {
    if (!restored) return;
    writeStorage(WISHLIST_KEY, wishlist);
  }, [wishlist, restored]);

  const addToCart = useCallback(
    (product, variant = null, quantity = 1) => {
      const count = Math.max(Math.trunc(Number(quantity)) || 1, 1);
      trackMetaEvent("AddToCart", {
        ...productEventData(product, count),
        variant_id: variant?._id,
        variant_size: variant?.size,
        variant_color: variant?.color,
      });

      if (user?._id) {
        storeRequest("/cart/add-cart", {
          method: "POST",
          body: JSON.stringify({ product: product.id, variant: variant?._id, quntity: count }),
        }).catch(() => {});
      }

      setCart((current) => {
        const existing = current.find((item) => sameLine(item, product.id, variant));
        if (existing) {
          return current.map((item) =>
            sameLine(item, product.id, variant) ? { ...item, quantity: (item.quantity || 1) + count } : item
          );
        }
        return [...current, { ...product, variant, quantity: count }];
      });
    },
    [user]
  );

  const removeFromCart = useCallback(
    (id, variant = null) => {
      setCart((current) => current.filter((item) => !sameLine(item, id, variant)));
      if (user?._id) {
        storeRequest("/cart/remove-cart", {
          method: "DELETE",
          body: JSON.stringify({ product: id, variant: variant?._id }),
        }).catch(() => {});
      }
    },
    [user]
  );

  const updateQuantity = useCallback(
    (id, quantity, variant = null) => {
      const count = Math.trunc(Number(quantity));
      if (!Number.isFinite(count) || count < 1) {
        removeFromCart(id, variant);
        return;
      }
      setCart((current) =>
        current.map((item) => (sameLine(item, id, variant) ? { ...item, quantity: count } : item))
      );
      if (user?._id) {
        storeRequest("/cart/update-cart", {
          method: "PATCH",
          body: JSON.stringify({ product: id, variant: variant?._id, quntity: count }),
        }).catch(() => {});
      }
    },
    [user, removeFromCart]
  );

  /** Empties the cart after a successful order. */
  const clearCart = useCallback(() => {
    setCart([]);
    writeStorage(CART_KEY, []);
    if (user?._id) storeRequest("/cart/clear-cart", { method: "DELETE" }).catch(() => {});
  }, [user]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (!exists) trackMetaEvent("AddToWishlist", productEventData(product));
      return exists ? current.filter((item) => item.id !== product.id) : [...current, product];
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      isWishlisted: (id) => wishlist.some((item) => item.id === id),
      cartCount: cart.reduce((total, item) => total + (item.quantity || 1), 0),
      cartSubtotal: cart.reduce((total, item) => total + Number(item.price || 0) * (item.quantity || 1), 0),
      cartReady,
      hydrated,
      wishlistCount: wishlist.length,
    }),
    [cart, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, cartReady, hydrated]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
