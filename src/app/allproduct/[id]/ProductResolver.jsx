"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetailClient from "./ProductDetailClient";
import { useStoreCatalog } from "../../common/StoreCatalogContext";
import { useLanguage } from "../../common/LanguageContext";
import { normalizeProduct, storeRequest } from "../../../lib/storeApi";

/**
 * Client-side fallback for when the server could not reach the API.
 *
 * Resolves the product out of the catalogue already in memory, or fetches it
 * directly. The URL segment may be either a slug or a database id.
 */
export default function ProductResolver() {
  const params = useParams();
  const identifier = params?.id;
  const { t } = useLanguage();
  const { findProduct, loading } = useStoreCatalog();
  const [fetched, setFetched] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fromCatalog = identifier ? findProduct(identifier) : null;
  const product = fromCatalog || fetched;

  useEffect(() => {
    if (!identifier || fromCatalog || loading) return;
    let active = true;

    // Try the slug route first, then the id route.
    storeRequest(`/mainproduct/single-product/${identifier}`)
      .catch(() => storeRequest(`/mainproduct/product/${identifier}`))
      .then((data) => {
        if (active) setFetched(normalizeProduct(data));
      })
      .catch(() => {
        if (active) setNotFound(true);
      });

    return () => {
      active = false;
    };
  }, [identifier, fromCatalog, loading]);

  if (product) return <ProductDetailClient product={product} />;

  if (notFound) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-lg text-gray-600">{t("products.notFound")}</p>
        <Link href="/allproduct" className="mt-4 inline-block font-semibold text-[#16863D] hover:underline">
          {t("products.backToAll")}
        </Link>
      </div>
    );
  }

  return <div className="p-16 text-center text-gray-500">{t("common.loading")}</div>;
}
