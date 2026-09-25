"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import fallbackImage from "../../../public/images/image.jpg";
import { storeRequest } from "../../lib/storeApi";
import { useLanguage } from "../../app/common/LanguageContext";
import { useHasMounted } from "../../app/common/useHasMounted";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

/** Shown until the dashboard's own banners load, and if none exist. */
const defaultSlides = [{ id: "default-1", image: fallbackImage, url: "/allproduct" }];

/**
 * One slide's visual, reused by the Swiper and the pre-hydration fallback.
 * Image only, at a fixed 1920×720 (8:3) frame so every device shows the same
 * picture scaled, rather than a different crop per screen size.
 */
function BannerSlide({ slide, priority = false }) {
  const { pick, t } = useLanguage();
  const alt = pick(slide.title, slide.titleBn) || t("app.name");

  return (
    <Link href={slide.url || "/allproduct"} className="relative block aspect-[8/3] w-full">
      <Image src={slide.image} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
    </Link>
  );
}

const Banner = () => {
  const { t } = useLanguage();
  const [slides, setSlides] = useState(defaultSlides);
  const mounted = useHasMounted();

  useEffect(() => {
    let active = true;

    storeRequest("/banner/all-banner")
      .then((banners) => {
        if (!active || !banners?.length) return;
        setSlides(banners.map((banner) => ({
          id: banner._id,
          image: banner.image,
          title: banner.title,
          titleBn: banner.titleBn,
          url: banner.url || "/allproduct",
        })));
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="w-full bg-white" aria-label={t("app.name")}>
      <div className="relative w-full overflow-hidden">
        {mounted ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={slides.length > 1}
            speed={900}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            navigation={{ prevEl: ".banner-prev", nextEl: ".banner-next" }}
            className="nh-banner"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <BannerSlide slide={slide} priority={index === 0} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <BannerSlide slide={slides[0]} priority />
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              className="banner-prev absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#062B63] shadow-lg transition-all duration-300 hover:bg-[#16863D] hover:text-white md:left-5 md:h-12 md:w-12 lg:left-8"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="banner-next absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#062B63] shadow-lg transition-all duration-300 hover:bg-[#16863D] hover:text-white md:right-5 md:h-12 md:w-12 lg:right-8"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <style jsx global>{`
        .nh-banner .swiper-pagination {
          bottom: 18px !important;
        }
        .nh-banner .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          opacity: 0.6;
          background: #ffffff;
          transition: all 0.3s ease;
        }
        .nh-banner .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 10px;
          opacity: 1;
          background: #16863d;
        }
        @media (max-width: 640px) {
          .nh-banner .swiper-pagination {
            bottom: 10px !important;
          }
          .nh-banner .swiper-pagination-bullet {
            width: 7px;
            height: 7px;
          }
          .nh-banner .swiper-pagination-bullet-active {
            width: 22px;
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;
