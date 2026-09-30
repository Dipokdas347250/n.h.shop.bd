"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { normalizeProduct, storeRequest } from "../../lib/storeApi";
import { useShop } from "../../app/common/ShopContext";
import { useStoreCatalog } from "../../app/common/StoreCatalogContext";
import { useLanguage } from "../../app/common/LanguageContext";
import ProductCard from "../common/ProductCard";
import ProductCarousel from "../common/ProductCarousel";
import SectionHeader from "../common/SectionHeader";

const TopSellingProducts = () => {
  const { t, formatNumber } = useLanguage();
  const { cartCount } = useShop();
  const { products: allProducts, loading } = useStoreCatalog();
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    let active = true;

    storeRequest("/mainproduct/top-selling")
      .then((items) => {
        if (active) setTopProducts((items || []).map(normalizeProduct));
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  // Before anything has sold, fall back to the newest products so the section
  // is never empty on a fresh store.
  const displayed = topProducts.length ? topProducts : allProducts.slice(0, 8);
  if (!loading && !displayed.length) return null;

  return (
    <section className="bg-gray-50 py-6 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t("home.topSellingEyebrow")}
          title={t("home.topSellingTitle")}
          actionLabel={t("common.viewAll")}
          actionHref="/allproduct"
        />

        {loading && !displayed.length ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : (
          <>
            <div className="md:hidden">
              <ProductCarousel products={displayed} />
            </div>

            <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3 xl:grid-cols-4">
              {displayed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {cartCount > 0 && (
          <div className="mt-3 text-center md:mt-8">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full bg-[#062B63] px-5 py-2.5 text-sm font-semibold text-white md:px-6 md:py-3 md:text-base transition hover:scale-105"
            >
              <ShoppingCart size={18} />
              {t("nav.cart")} ({formatNumber(cartCount)})
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopSellingProducts;
