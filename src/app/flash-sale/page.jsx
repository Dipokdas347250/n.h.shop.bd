"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Zap } from "lucide-react";
import { useStoreCatalog } from "../common/StoreCatalogContext";
import { useLanguage } from "../common/LanguageContext";
import ProductCard from "../../components/common/ProductCard";

/** Everything currently discounted, biggest saving first. */
export default function FlashSalePage() {
  const { t } = useLanguage();
  const { products, loading } = useStoreCatalog();

  const discounted = useMemo(
    () => products.filter((product) => product.discount > 0).sort((a, b) => b.discount - a.discount),
    [products]
  );

  return (
    <div className="min-h-[60vh] bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#16863D]">
            <Zap size={16} className="fill-current" />
            {t("flash.eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">{t("flash.title")}</h1>
          <p className="mt-3 text-gray-600">{t("flash.subtitle")}</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-96 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : discounted.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {discounted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500">{t("flash.empty")}</p>
            <Link href="/allproduct" className="mt-3 inline-block font-semibold text-[#16863D] hover:underline">
              {t("cart.browse")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
