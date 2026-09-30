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

  // Category images are 4:3 banners with their own artwork and text, so the
  // tile keeps that shape and puts the name underneath rather than over it.
  const Tile = ({ tile }) => (
    <Link href={tile.href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-lg">
        <Image
          src={tile.image}
          alt={tile.name}
          fill
          sizes="(max-width: 639px) 42vw, (max-width: 767px) 30vw, (max-width: 1023px) 25vw, (max-width: 1279px) 20vw, 15vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 flex items-start justify-between gap-1 px-0.5">
        <div className="min-w-0">
          <h3 className="line-clamp-1 text-xs font-semibold text-gray-900 transition group-hover:text-[#16863D] md:text-sm">{tile.name}</h3>
          <p className="text-[11px] text-gray-500 md:text-xs">{t("home.itemsCount", { count: formatNumber(tile.count) })}</p>
        </div>
        <ArrowRight size={14} className="mt-0.5 hidden shrink-0 text-[#16863D] opacity-0 transition group-hover:opacity-100 md:block" />
      </div>
    </Link>
  );

  return (
    <section className="bg-white py-6 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow={t("home.featuredEyebrow")}
          title={t("home.featuredTitle")}
          actionLabel={t("common.viewAll")}
          actionHref="/allproduct"
        />

        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="aspect-[4/3] animate-pulse rounded-xl bg-gray-100" />
            ))}
          </div>
        ) : (
          <div className="relative md:px-5">
            {mounted ? (
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={12}
                slidesPerView={2.4}
                rewind
                speed={700}
                autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                navigation={{ prevEl: ".category-prev", nextEl: ".category-next" }}
                pagination={{ el: ".category-pagination", clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 3.4, spaceBetween: 14 },
                  768: { slidesPerView: 4, spaceBetween: 16 },
                  1024: { slidesPerView: 5, spaceBetween: 16 },
                  1280: { slidesPerView: 7, spaceBetween: 18 },
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                {tiles.slice(0, 7).map((tile) => (
                  <Tile key={tile.id} tile={tile} />
                ))}
              </div>
            )}

            <button
              type="button"
              className="category-prev absolute -left-2 top-[38%] z-20 hidden h-9 w-9 -translate-y-1/2 md:flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg transition-all duration-300 hover:border-[#16863D] hover:bg-[#16863D] hover:text-white"
              aria-label="Previous categories"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="category-next absolute -right-2 top-[38%] z-20 hidden h-9 w-9 -translate-y-1/2 md:flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg transition-all duration-300 hover:border-[#16863D] hover:bg-[#16863D] hover:text-white"
              aria-label="Next categories"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        <div className="category-pagination mt-3 flex justify-center md:mt-6" />
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
