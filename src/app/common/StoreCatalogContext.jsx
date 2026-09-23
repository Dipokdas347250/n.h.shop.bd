"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { normalizeProduct, storeRequest } from "../../lib/storeApi";

const CatalogContext = createContext(null);

/** Loads the product catalogue and category list once for the whole site. */
export function StoreCatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      storeRequest("/mainproduct/all-product"),
      storeRequest("/products/allCategory"),
    ]).then(([productResult, categoryResult]) => {
      if (!active) return;
      if (productResult.status === "fulfilled") {
        setProducts((productResult.value || []).map(normalizeProduct));
      } else {
        setError(productResult.reason);
      }
      if (categoryResult.status === "fulfilled") setCategories(categoryResult.value || []);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => {
    /** Finds a product by database id or by slug, so both URL styles work. */
    const findProduct = (identifier) =>
      products.find((product) => product.id === identifier || product.slug === identifier) || null;

    return { products, categories, loading, error, findProduct };
  }, [products, categories, loading, error]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useStoreCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useStoreCatalog must be used inside StoreCatalogProvider");
  return context;
}
