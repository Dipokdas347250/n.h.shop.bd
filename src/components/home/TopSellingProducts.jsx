"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { normalizeProduct, storeRequest } from "../../lib/storeApi";
import { useShop } from "../../app/common/ShopContext";
import { useStoreCatalog } from "../../app/common/StoreCatalogContext";
import { useLanguage } from "../../app/common/LanguageContext";
import { useHasMounted } from "../../app/common/useHasMounted";
import ProductCard from "../common/ProductCard";
import SectionHeader from "../common/SectionHeader";

import "swiper/css";
import "swiper/css/pagination";

const TopSellingProducts = () => {
  const { t, formatNumber } = useLanguage();
  const { cartCount } = useShop();
  const { products: allProducts, loading } = useStoreCatalog();
  const mounted = useHasMounted();
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
    <section className="bg-gray-50 py-16">
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
            <div className="block md:hidden">
              {mounted ? (
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={12}
                  slidesPerView={2}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  className="top-selling-swiper !pb-10"
                >
                  {displayed.map((product) => (
                    <SwiperSlide key={product.id} className="h-auto">
                      <ProductCard product={product} compact />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {displayed.slice(0, 2).map((product) => (
                    <ProductCard key={product.id} product={product} compact />
                  ))}
                </div>
              )}
            </div>

            <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3 xl:grid-cols-4">
              {displayed.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {cartCount > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full bg-[#062B63] px-6 py-3 font-semibold text-white transition hover:scale-105"
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
