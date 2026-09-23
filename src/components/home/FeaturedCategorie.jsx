"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import fallbackImage from "../../../public/images/image.jpg";
import { useStoreCatalog } from "../../app/common/StoreCatalogContext";
import { useLanguage } from "../../app/common/LanguageContext";
import { useHasMounted } from "../../app/common/useHasMounted";
import SectionHeader from "../common/SectionHeader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedCategories = () => {
  const { t, formatNumber } = useLanguage();
  const { categories, products, loading } = useStoreCatalog();
  const mounted = useHasMounted();

  // Count real products per category rather than showing a placeholder number.
  const tiles = categories.map((category) => ({
    id: category._id,
    name: category.name,
    href: `/featuredCategories/${category.slug}`,
    image: category.image || fallbackImage,
    count: products.filter((product) => product.categorySlug === category.slug).length,
  }));

  if (!loading && !tiles.length) return null;

  const Tile = ({ tile }) => (
    <Link href={tile.href} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
        <Image
          src={tile.image}
          alt={tile.name}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 16.66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3 className="text-sm font-bold text-white md:text-lg">{tile.name}</h3>
          <p className="mt-1 text-xs text-white/75 md:text-sm">{t("home.itemsCount", { count: formatNumber(tile.count) })}</p>
        </div>
        <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowRight size={17} className="text-gray-900" />
        </div>
      </div>
    </Link>
  );

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t("home.featuredEyebrow")}
          title={t("home.featuredTitle")}
          actionLabel={t("common.viewAll")}
          actionHref="/allproduct"
        />

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-square animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : (
          <div className="relative px-2 md:px-5">
            {mounted ? (
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={2}
                rewind
                speed={700}
                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                navigation={{ prevEl: ".category-prev", nextEl: ".category-next" }}
                pagination={{ el: ".category-pagination", clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 20 },
                  1280: { slidesPerView: 6, spaceBetween: 24 },
                }}
                className="featured-category-swiper"
              >
                {tiles.map((tile) => (
                  <SwiperSlide key={tile.id}>
                    <Tile tile={tile} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {tiles.slice(0, 6).map((tile) => (
                  <Tile key={tile.id} tile={tile} />
                ))}
              </div>
            )}

            <button
              type="button"
              className="category-prev absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg transition-all duration-300 hover:border-[#16863D] hover:bg-[#16863D] hover:text-white md:-left-2 md:h-11 md:w-11"
              aria-label="Previous categories"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="category-next absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg transition-all duration-300 hover:border-[#16863D] hover:bg-[#16863D] hover:text-white md:-right-2 md:h-11 md:w-11"
              aria-label="Next categories"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        <div className="category-pagination mt-8 flex justify-center" />
      </div>

      <style jsx global>{`
        .category-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          opacity: 1;
          margin: 0 4px;
          transition: all 0.3s ease;
        }
        .category-pagination .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          background: #16863d;
        }
        .featured-category-swiper {
          padding: 4px 2px 8px;
        }
        .featured-category-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCategories;
