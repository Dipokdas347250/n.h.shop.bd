"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "../../common/LanguageContext";
import { useStoreCatalog } from "../../common/StoreCatalogContext";
import { normalizeProduct, storeRequest } from "../../../lib/storeApi";
import CategoryView from "./CategoryView";

/**
 * Client-side fallback for when the server could not reach the API.
 * Resolves the category from the catalogue in memory, or fetches it directly.
 */
export default function CategoryResolver() {
  const params = useParams();
  const slug = params?.id;
  const { t } = useLanguage();
  const { products, categories, loading } = useStoreCatalog();
  const [fetched, setFetched] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const localCategory = categories.find((item) => item.slug === slug);

  useEffect(() => {
    if (!slug || localCategory) return undefined;
    let active = true;

    storeRequest(`/mainproduct/category/${slug}`)
      .then((data) => {
        if (active) setFetched({ category: data.category, products: (data.products || []).map(normalizeProduct) });
      })
      .catch(() => {
        if (active) setNotFound(true);
      });

    return () => {
      active = false;
    };
  }, [slug, localCategory]);

  if (notFound) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-lg text-gray-600">{t("products.none")}</p>
        <Link href="/allproduct" className="mt-4 inline-block font-semibold text-[#16863D] hover:underline">
          {t("products.backToAll")}
        </Link>
      </div>
    );
  }

  const category = localCategory || fetched?.category;
  if (!category) return <div className="p-16 text-center text-gray-500">{t("common.loading")}</div>;

  const items = localCategory ? products.filter((product) => product.categorySlug === slug) : fetched?.products || [];
  return <CategoryView category={category} products={items} loading={loading} />;
}
