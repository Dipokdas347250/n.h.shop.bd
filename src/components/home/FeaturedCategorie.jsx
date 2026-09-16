
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import image from "../../../public/images/image.jpg"

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    items: "120+ Products",
    image: image,
    link: "/category/mens-fashion",
  },
  {
    id: 2,
    name: "Women's Fashion",
    items: "180+ Products",
    image: image,
    link: "/category/womens-fashion",
  },
  {
    id: 3,
    name: "Electronics",
    items: "95+ Products",
     image: image,
    link: "/category/electronics",
  },
  {
    id: 4,
    name: "Shoes",
    items: "75+ Products",
     image: image,
    link: "/category/shoes",
  },
  {
    id: 5,
    name: "Beauty",
    items: "90+ Products",
     image: image,
    link: "/category/beauty",
  },
  {
    id: 6,
    name: "Home & Living",
    items: "110+ Products",
     image: image,
    link: "/category/home-living",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              Explore Our Store
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Featured Categories
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl">
              Discover our most popular categories and find everything you need
              in one place.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            View All
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              href={category.link}
              key={category.id}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 aspect-square">

                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-base md:text-lg">
                    {category.name}
                  </h3>

                  <p className="text-white/75 text-xs md:text-sm mt-1">
                    {category.items}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-black/80 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight
                    size={17}
                    className="text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;

