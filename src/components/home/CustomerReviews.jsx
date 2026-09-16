"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Verified Customer",
    image: "/images/reviews/customer-1.jpg",
    rating: 5,
    review:
      "Amazing shopping experience! The product quality was excellent and delivery was very fast. I will definitely shop again.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Verified Customer",
    image: "/images/reviews/customer-2.jpg",
    rating: 5,
    review:
      "I absolutely loved the product. The quality was even better than I expected. Customer support was also very helpful.",
  },
  {
    id: 3,
    name: "Sakib Hasan",
    role: "Verified Customer",
    image: "/images/reviews/customer-3.jpg",
    rating: 4,
    review:
      "Very good service and genuine products. The packaging was perfect and the delivery arrived on time.",
  },
  {
    id: 4,
    name: "Mim Akter",
    role: "Verified Customer",
    image: "/images/reviews/customer-4.jpg",
    rating: 5,
    review:
      "The website is easy to use and ordering was super simple. I am really happy with my purchase.",
  },
  {
    id: 5,
    name: "Tanvir Hossain",
    role: "Verified Customer",
    image: "/images/reviews/customer-5.jpg",
    rating: 5,
    review:
      "Excellent product and excellent service. The price was also reasonable compared to other stores.",
  },
  {
    id: 6,
    name: "Purnima Rani",
    role: "Verified Customer",
    image: "/images/reviews/customer-6.jpg",
    rating: 5,
    review:
      "Beautiful products, quick delivery and great customer service. Highly recommended!",
  },
];

const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const totalSlides = reviews.length;

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Customer Feedback
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Reviews From Our Customers
          </h2>

          <p className="max-w-2xl mx-auto mt-3 text-gray-600 dark:text-gray-400">
            See what our happy customers say about their shopping experience.
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-5xl mx-auto">
          {/* Review Card */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {reviews.map((item) => (
                <div key={item.id} className="min-w-full px-2 md:px-10">
                  <div className="relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-7 md:p-10">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-7 md:right-10">
                      <Quote
                        size={55}
                        className="text-blue-100 dark:text-blue-950"
                      />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={19}
                          className={
                            index < item.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 dark:text-gray-700"
                          }
                        />
                      ))}
                    </div>

                    {/* Review */}
                    <p className="relative z-10 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-8 max-w-3xl">
                      “{item.review}”
                    </p>

                    {/* Customer */}
                    <div className="flex items-center gap-4 mt-8">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous review"
            className="absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
          >
            <ChevronLeft size={21} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next review"
            className="absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
          >
            <ChevronRight size={21} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to review ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-blue-600"
                  : "w-2.5 bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
