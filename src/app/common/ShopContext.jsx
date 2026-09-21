"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { storeRequest } from "../../lib/storeApi";
import { useStoreAuth } from "./StoreAuthContext";
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

export function ShopProvider({ children }) {
  const { user } = useStoreAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setWishlist(readStorage(WISHLIST_KEY, []));
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const loadServerCart = async () => {
      if (!hydrated) return;
      if (!user?._id) {
        setCart(readStorage(CART_KEY, []));
        setCartReady(true);
        return;
      }
      try {
        const serverCart = await storeRequest(`/cart/singlecart/${user._id}`);
        setCart((serverCart || []).map((item) => ({
            id: item.product?._id,
            name: item.product?.title,
            price: item.product?.price || 0,
            image: item.product?.image?.[0] || "/images/image.jpg",
            quantity: item.quntity || 1,
            variant: item.variant || null,
          })));
      } catch { setCart([]); }
      finally { setCartReady(true); }
    };
    loadServerCart();
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (!user?._id) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated, user]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = (product, variant = null) => {
    trackMetaEvent("AddToCart", { ...productEventData(product), variant_id: variant?._id, variant_size: variant?.size, variant_color: variant?.color });
    if (user?._id) {
      storeRequest("/cart/add-cart", {
        method: "POST",
        body: JSON.stringify({ product: product.id, variant: variant?._id, quntity: 1 }),
      }).catch(() => {});
    }
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id && item.variant?._id === variant?._id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.variant?._id === variant?._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...current, { ...product, variant, quantity: 1 }];
    });
  };

  const removeFromCart = (id, variant = null) => {
    setCart((current) => current.filter((item) => !(item.id === id && item.variant?._id === variant?._id)));
    if (user?._id) storeRequest("/cart/remove-cart", { method: "DELETE", body: JSON.stringify({ product: id, variant: variant?._id }) }).catch(() => {});
  };

  const updateQuantity = (id, quantity, variant = null) => {
    if (quantity < 1) {
      removeFromCart(id, variant);
      return;
    }
    setCart((current) =>
      current.map((item) => item.id === id && item.variant?._id === variant?._id ? { ...item, quantity } : item)
    );
    if (user?._id) storeRequest("/cart/update-cart", { method: "PATCH", body: JSON.stringify({ product: id, variant: variant?._id, quntity: quantity }) }).catch(() => {});
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (!exists) trackMetaEvent("AddToWishlist", productEventData(product));
      return exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];
    });
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    cartCount: cart.reduce((total, item) => total + (item.quantity || 1), 0),
    cartReady,
    wishlistCount: wishlist.length,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
}
