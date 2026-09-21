"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import image from "../../../public/images/image.jpg";
import { storeRequest } from "../../lib/storeApi";

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    slug: "mens-fashion",
    items: "120+ Products",
    image: image,
    link: "/featuredCategories/mens-fashion",
  },
  {
    id: 2,
    name: "Women's Fashion",
    slug: "womens-fashion",
    items: "180+ Products",
    image: image,
    link: "/featuredCategories/womens-fashion",
  },
  {
    id: 3,
    name: "Electronics",
    slug: "electronics",
    items: "95+ Products",
    image: image,
    link: "/featuredCategories/electronics",
  },
  {
    id: 4,
    name: "Shoes",
    slug: "shoes",
    items: "75+ Products",
    image: image,
    link: "/featuredCategories/shoes",
  },
  {
    id: 5,
    name: "Beauty",
    slug: "beauty",
    items: "90+ Products",
    image: image,
    link: "/featuredCategories/beauty",
  },
  {
    id: 6,
    name: "Home & Living",
    slug: "home-living",
    items: "110+ Products",
    image: image,
    link: "/featuredCategories/home-living",
  },
  {
    id: 7,
    name: "Accessories",
    slug: "accessories",
    items: "60+ Products",
    image: image,
    link: "/featuredCategories/accessories",
  },
];

const FeaturedCategories = () => {
  const [liveCategories, setLiveCategories] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    storeRequest("/products/allCategory")
      .then((items) => {
        if (items?.length) {
          setLiveCategories(items.map((item) => ({
            id: item._id,
            name: item.name,
            slug: item.slug,
            items: `${item.subcategories?.length || 0} Products`,
            image: item.image || image,
            link: `/featuredCategories/${item.slug}`,
          })));
        }
      })
      .catch(() => {});
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const displayedCategories = liveCategories || categories;

  return (
    <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              Explore Our Store
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Categories
            </h2>

           
          </div>

          <Link
            href="/allproduct"
            className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Slider */}
        <div className="relative px-2 md:px-5">
          {mounted ? <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={2}
            slidesPerGroup={1}
            rewind={true}
            speed={700}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".category-prev",
              nextEl: ".category-next",
            }}
            pagination={{
              el: ".category-pagination",
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 24,
              },
            }}
            className="featured-category-swiper"
          >
            {displayedCategories.map((category) => (
              <SwiperSlide key={category.id}>
                <Link
                  href={category.link}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 aspect-square shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 16.66vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <h3 className="text-white font-bold text-sm md:text-lg">
                        {category.name}
                      </h3>

                      <p className="text-white/75 text-xs md:text-sm mt-1">
                        {category.items}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight
                        size={17}
                        className="text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper> : <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{displayedCategories.slice(0, 4).map((category) => <Link key={category.id} href={category.link} className="group block"><div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900"><Image src={category.image} alt={category.name} fill sizes="25vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" /><div className="absolute bottom-0 p-3"><h3 className="text-sm font-bold text-white">{category.name}</h3><p className="mt-1 text-xs text-white/75">{category.items}</p></div></div></Link>)}</div>}

          {/* Previous */}
          <button
            type="button"
            className="category-prev absolute left-0 md:-left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
            aria-label="Previous categories"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next */}
          <button
            type="button"
            className="category-next absolute right-0 md:-right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
            aria-label="Next categories"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination */}
        <div className="category-pagination flex justify-center mt-8" />
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
          background: #2563eb;
        }

        .featured-category-swiper {
          padding: 4px 2px 8px;
        }

        .featured-category-swiper .swiper-slide {
          height: auto;
        }

        @media (max-width: 639px) {
          .category-prev,
          .category-next {
            width: 36px;
            height: 36px;
          }

          .category-prev {
            left: -4px;
          }

          .category-next {
            right: -4px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedCategories;