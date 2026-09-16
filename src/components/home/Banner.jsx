"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import image from "../../../public/images/image.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    image: image,
    title: "আপনার পছন্দ, আমাদের অঙ্গীকার",
    subtitle: "ভালো পণ্য • সেরা দাম",
    description:
      "সারা বাংলাদেশে অরিজিনাল ও মানসম্মত পণ্য পৌঁছে দিচ্ছি আপনার ঘরে।",
    button: "এখনই শপ করুন",
    link: "/products",
  },

  {
    id: 2,
    image: image,
    title: "সেরা পণ্য, সেরা দামে",
    subtitle: "QUALITY PRODUCTS",
    description:
      "আপনার প্রয়োজনীয় পণ্যগুলো এখন সহজেই অর্ডার করুন আমাদের অনলাইন শপ থেকে।",
    button: "পণ্য দেখুন",
    link: "/products",
  },

  {
    id: 3,
    image: image,
    title: "Flash Sale",
    subtitle: "বিশেষ অফার চলছে",
    description:
      "নির্বাচিত পণ্যে থাকছে আকর্ষণীয় ডিসকাউন্ট। অফার শেষ হওয়ার আগেই অর্ডার করুন।",
    button: "অফার দেখুন",
    link: "/flash-sale",
  },

  {
    id: 4,
    image: image,
    title: "Trending Products",
    subtitle: "সবচেয়ে জনপ্রিয় পণ্য",
    description:
      "বর্তমান সময়ের জনপ্রিয় ও প্রয়োজনীয় পণ্যগুলো এক জায়গায় খুঁজে নিন।",
    button: "ট্রেন্ডিং দেখুন",
    link: "/trending",
  },

  {
    id: 5,
    image: image,
    title: "দ্রুত ডেলিভারি",
    subtitle: "সারা বাংলাদেশে",
    description:
      "আপনার অর্ডার পৌঁছে যাবে নিরাপদে ও দ্রুত। সহজ অর্ডার, সহজ পেমেন্ট।",
    button: "শপিং শুরু করুন",
    link: "/products",
  },
];

const Banner = () => {
  return (
    <section className="w-full bg-white">
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          loop={true}
          speed={900}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".banner-prev",
            nextEl: ".banner-next",
          }}
          className="nh-banner"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-[300px] sm:h-[380px] md:h-[480px] lg:h-[560px]">
                {/* ================= IMAGE ================= */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* ================= OVERLAY ================= */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-[#062B63]/90
                    via-[#062B63]/45
                    to-transparent
                  "
                />

                {/* ================= CONTENT ================= */}
                <div
                  className="
                    relative
                    z-10
                    h-full
                    max-w-[1500px]
                    mx-auto
                    px-5
                    sm:px-8
                    md:px-12
                    lg:px-16
                    flex
                    items-center
                  "
                >
                  <div className="max-w-[600px] text-white">
                    {/* Subtitle */}
                    <p
                      className="
                        text-[#8BE28F]
                        text-xs
                        sm:text-sm
                        md:text-base
                        font-bold
                        tracking-[2px]
                        mb-3
                        md:mb-5
                      "
                    >
                      {slide.subtitle}
                    </p>

                    {/* Title */}
                    <h1
                      className="
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl
                        font-extrabold
                        leading-tight
                      "
                    >
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p
                      className="
                        mt-3
                        md:mt-5
                        text-sm
                        sm:text-base
                        md:text-lg
                        text-white/90
                        leading-6
                        md:leading-8
                        max-w-[530px]
                      "
                    >
                      {slide.description}
                    </p>

                    {/* Button */}
                    <Link
                      href={slide.link}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        mt-5
                        md:mt-7
                        px-5
                        sm:px-7
                        py-3
                        bg-[#16863D]
                        hover:bg-[#0f6d30]
                        text-white
                        rounded-md
                        font-semibold
                        text-sm
                        sm:text-base
                        shadow-lg
                        transition-all
                        duration-300
                        hover:-translate-y-1
                      "
                    >
                      {slide.button}

                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ================= PREVIOUS ================= */}
        <button
          className="
            banner-prev
            absolute
            left-3
            md:left-5
            lg:left-8
            top-1/2
            -translate-y-1/2
            z-20
            w-9
            h-9
            md:w-12
            md:h-12
            rounded-full
            bg-white/80
            hover:bg-[#16863D]
            hover:text-white
            text-[#062B63]
            flex
            items-center
            justify-center
            shadow-lg
            transition-all
            duration-300
          "
        >
          <ChevronLeft size={22} />
        </button>

        {/* ================= NEXT ================= */}
        <button
          className="
            banner-next
            absolute
            right-3
            md:right-5
            lg:right-8
            top-1/2
            -translate-y-1/2
            z-20
            w-9
            h-9
            md:w-12
            md:h-12
            rounded-full
            bg-white/80
            hover:bg-[#16863D]
            hover:text-white
            text-[#062B63]
            flex
            items-center
            justify-center
            shadow-lg
            transition-all
            duration-300
          "
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ================= SWIPER STYLE ================= */}
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
