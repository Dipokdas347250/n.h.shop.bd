"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, BadgeCheck } from "lucide-react";
import { storeRequest } from "../../lib/storeApi";
import { useLanguage } from "../../app/common/LanguageContext";
import SectionHeader from "../common/SectionHeader";

const CustomerReviews = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    storeRequest("/review/all")
      .then((items) => {
        if (!active) return;
        setReviews((items || [])
          .filter((item) => item.comment?.trim())
          .map((item) => ({
            id: item._id,
            name: item.user?.fullname || t("home.verifiedCustomer"),
            product: item.product?.title || "",
            image: item.user?.photo || "/images/image.jpg",
            rating: Number(item.rating || 5),
            comment: item.comment,
            verified: Boolean(item.verifiedPurchase),
          })));
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [t]);

  const total = reviews.length;

  const next = useCallback(() => setCurrent((value) => (total ? (value + 1) % total : 0)), [total]);
  const previous = useCallback(() => setCurrent((value) => (total ? (value === 0 ? total - 1 : value - 1) : 0)), [total]);

  useEffect(() => {
    if (total < 2) return undefined;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [total, next]);

  // With no real reviews yet, showing invented ones would be misleading.
  if (loading || !total) return null;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          centered
          eyebrow={t("home.reviewsEyebrow")}
          title={t("home.reviewsTitle")}
          subtitle={t("home.reviewsSubtitle")}
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
              {reviews.map((item) => (
                <div key={item.id} className="min-w-full px-2 md:px-10">
                  <div className="relative rounded-3xl border border-gray-200 bg-gray-50 p-7 md:p-10">
                    <Quote size={55} className="absolute right-7 top-6 text-blue-100 md:right-10" aria-hidden="true" />

                    <div className="mb-6 flex gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={19}
                          className={index < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>

                    <p className="relative z-10 max-w-3xl text-base leading-8 text-gray-700 md:text-lg">“{item.comment}”</p>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#16863D]">
                        <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="flex items-center gap-1.5 font-bold text-gray-900">
                          {item.name}
                          {item.verified && <BadgeCheck size={16} className="text-[#16863D]" aria-label={t("reviews.verifiedPurchase")} />}
                        </h3>
                        <p className="text-sm text-gray-500">{item.product || t("home.verifiedCustomer")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={previous}
                aria-label="Previous review"
                className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg transition hover:border-[#16863D] hover:bg-[#16863D] hover:text-white md:-left-5"
              >
                <ChevronLeft size={21} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-lg transition hover:border-[#16863D] hover:bg-[#16863D] hover:text-white md:-right-5"
              >
                <ChevronRight size={21} />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {reviews.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to review ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${current === index ? "w-8 bg-[#16863D]" : "w-2.5 bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
