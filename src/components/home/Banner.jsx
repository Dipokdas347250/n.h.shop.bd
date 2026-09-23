"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import fallbackImage from "../../../public/images/image.jpg";
import { storeRequest } from "../../lib/storeApi";
import { useLanguage } from "../../app/common/LanguageContext";
import { useHasMounted } from "../../app/common/useHasMounted";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

/** Shown until the dashboard's own banners load, and if none exist. */
const defaultSlides = [
  {
    id: "default-1",
    image: fallbackImage,
    title: "Your choice, our promise",
    titleBn: "আপনার পছন্দ, আমাদের অঙ্গীকার",
    subtitle: "Genuine products, best prices",
    subtitleBn: "ভালো পণ্য • সেরা দাম",
    description: "We deliver original, quality products to your door anywhere in Bangladesh.",
    descriptionBn: "সারা বাংলাদেশে অরিজিনাল ও মানসম্মত পণ্য পৌঁছে দিচ্ছি আপনার ঘরে।",
    buttonLabel: "Shop now",
    buttonLabelBn: "এখনই শপ করুন",
    url: "/allproduct",
  },
  {
    id: "default-2",
    image: fallbackImage,
    title: "Fast delivery nationwide",
    titleBn: "সারা দেশে দ্রুত ডেলিভারি",
    subtitle: "Simple order, simple payment",
    subtitleBn: "সহজ অর্ডার, সহজ পেমেন্ট",
    description: "Your order arrives safely and quickly, with cash on delivery available everywhere.",
    descriptionBn: "আপনার অর্ডার পৌঁছে যাবে নিরাপদে ও দ্রুত, সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা।",
    buttonLabel: "Start shopping",
    buttonLabelBn: "শপিং শুরু করুন",
    url: "/allproduct",
  },
];

/** One slide's visual, reused by the Swiper and the pre-hydration fallback. */
function BannerSlide({ slide, priority = false }) {
  const { pick, t } = useLanguage();
  const title = pick(slide.title, slide.titleBn) || t("app.name");
  const subtitle = pick(slide.subtitle, slide.subtitleBn);
  const description = pick(slide.description, slide.descriptionBn) || t("app.tagline");
  const buttonLabel = pick(slide.buttonLabel, slide.buttonLabelBn) || t("home.shopNow");

  return (
    <div className="relative h-[300px] w-full sm:h-[380px] md:h-[480px] lg:h-[560px]">
      <Image src={slide.image} alt={title} fill priority={priority} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#062B63]/90 via-[#062B63]/45 to-transparent" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-[600px] text-white">
          {subtitle && <p className="mb-3 text-xs font-bold tracking-[2px] text-[#8BE28F] sm:text-sm md:mb-5 md:text-base">{subtitle}</p>}
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-3 max-w-[530px] text-sm leading-6 text-white/90 sm:text-base md:mt-5 md:text-lg md:leading-8">{description}</p>
          <Link
            href={slide.url || "/allproduct"}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#16863D] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#0f6d30] sm:px-7 sm:text-base md:mt-7"
          >
            {buttonLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
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
          subtitle: banner.subtitle,
          subtitleBn: banner.subtitleBn,
          description: banner.description,
          descriptionBn: banner.descriptionBn,
          buttonLabel: banner.buttonLabel,
          buttonLabelBn: banner.buttonLabelBn,
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
