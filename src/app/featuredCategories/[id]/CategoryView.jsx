"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../../common/LanguageContext";
import ProductCard from "../../../components/common/ProductCard";
import TrustBadges from "../../../components/common/TrustBadges";

/** Renders one category and its products. Shared by the server page and the fallback. */
export default function CategoryView({ category, products, loading = false }) {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 py-10 text-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#16863D] hover:underline">
          <ArrowLeft size={16} />
          {t("common.backHome")}
        </Link>

        <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16863D]">{t("category.eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-gray-600">{t("category.description", { name: category.name })}</p>
        </div>

        {loading && !products.length ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-96 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : products.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
            {t("category.empty")}
          </div>
        )}
      </div>

      <TrustBadges className="mt-10" />
    </div>
  );
}
