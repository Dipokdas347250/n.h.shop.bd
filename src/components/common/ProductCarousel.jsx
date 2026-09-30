"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useHasMounted } from "../../app/common/useHasMounted";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/pagination";

/**
 * Two products at a time that slide right to left on their own and can be
 * swiped. Used for the home page product rows on phones.
 */
export default function ProductCarousel({ products }) {
  const mounted = useHasMounted();

  // The carousel measures the page, so the server renders the first two as a grid.
  if (!mounted) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {products.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    );
  }

  // Looping keeps the row moving leftwards forever; it needs a few more slides
  // than are on screen, so a short list rewinds to the start instead.
  const loop = products.length >= 4;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={12}
      slidesPerView={2}
      loop={loop}
      rewind={!loop}
      speed={600}
      autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      pagination={{ clickable: true, dynamicBullets: true }}
      className="product-carousel !pb-7"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id} className="!h-auto">
          <ProductCard product={product} compact />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
