"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { normalizeProduct, storeRequest } from "../../lib/storeApi";
import { useStoreCatalog } from "../common/StoreCatalogContext";
import { useLanguage } from "../common/LanguageContext";
import ProductCard from "../../components/common/ProductCard";

/** Best sellers, falling back to the newest products on a store with no sales yet. */
export default function TrendingPage() {
  const { t } = useLanguage();
  const { products, loading: catalogLoading } = useStoreCatalog();
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    storeRequest("/mainproduct/top-selling?limit=24")
      .then((items) => {
        if (active) setTopSelling((items || []).map(normalizeProduct));
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const displayed = topSelling.length ? topSelling : products;
  const busy = loading && catalogLoading;

  return (
    <div className="min-h-[60vh] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#16863D]">
            <TrendingUp size={16} />
            {t("trending.eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">{t("trending.title")}</h1>
          <p className="mt-3 text-gray-600">{t("trending.subtitle")}</p>
        </div>

        {busy ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-96 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : displayed.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-gray-500">{t("products.none")}</p>
        )}
      </div>
    </div>
  );
}
