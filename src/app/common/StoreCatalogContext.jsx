"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { normalizeProduct, storeRequest } from "../../lib/storeApi";

const CatalogContext = createContext(null);

export function StoreCatalogProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storeRequest("/mainproduct/all-product")
      .then((items) => setProducts((items || []).map(normalizeProduct)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return <CatalogContext.Provider value={{ products, loading }}>{children}</CatalogContext.Provider>;
}

export function useStoreCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useStoreCatalog must be used inside StoreCatalogProvider");
  return context;
}
