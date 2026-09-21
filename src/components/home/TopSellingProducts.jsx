"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import image from "../../../public/images/image.jpg";

import {
  ShoppingCart,
  Heart,
  Star,
  Zap,
  Eye,
} from "lucide-react";
import { useShop } from "../../app/common/ShopContext";
import { normalizeProduct, storeRequest } from "../../lib/storeApi";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphone",
    category: "Electronics",
    image: image,
    price: 2499,
    oldPrice: 3499,
    discount: 29,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Men's Premium Casual Shirt",
    category: "Men's Fashion",
    image: image,
    price: 1199,
    oldPrice: 1699,
    discount: 29,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 3,
    name: "Smart Watch Series 8",
    category: "Electronics",
    image: image,
    price: 3299,
    oldPrice: 4499,
    discount: 27,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 4,
    name: "Women's Stylish Handbag",
    category: "Women's Fashion",
    image: image,
    price: 1499,
    oldPrice: 2199,
    discount: 32,
    rating: 4.6,
    reviews: 76,
  },
  {
    id: 5,
    name: "Running Sports Shoes",
    category: "Shoes",
    image: image,
    price: 1899,
    oldPrice: 2699,
    discount: 30,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 6,
    name: "Premium Skin Care Set",
    category: "Beauty",
    image: image,
    price: 999,
    oldPrice: 1499,
    discount: 33,
    rating: 4.7,
    reviews: 98,
  },
];

const TopSellingProducts = () => {
  const router = useRouter();
  const { addToCart, wishlist, toggleWishlist, cartCount } = useShop();
  const [mounted, setMounted] = useState(false);
  const [topProducts, setTopProducts] = useState([]);
  const displayedProducts = topProducts.length ? topProducts : products;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    storeRequest("/mainproduct/top-selling")
      .then((items) => setTopProducts((items || []).map(normalizeProduct)))
      .catch(() => setTopProducts([]));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Add To Cart
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Buy Now
  const handleBuyNow = (product) => {
    addToCart(product);
    router.push(`/checkout?product=${product.id}`);
  };

  // Wishlist
  // Product Card
  const ProductCard = ({ product }) => {
    return (
      <div className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Discount */}
          <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs">
            -{product.discount}%
          </div>

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 dark:bg-gray-900 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
          >
            <Heart
              size={16}
              className={
                wishlist.some((item) => item.id === product.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700 dark:text-white"
              }
            />
          </button>

          {/* Quick View */}
          <Link
            href={`/topproduct/${product.id}`}
            className="absolute bottom-2 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-gray-900 dark:text-white sm:bottom-3 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
          >
            <Eye size={14} />
            Quick View
          </Link>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-5">

          {/* Category */}
          <p className="mb-1.5 text-[10px] font-medium text-blue-600 dark:text-blue-400 sm:mb-2 sm:text-xs">
            {product.category}
          </p>

          {/* Product Name */}
          <Link href={`/topproduct/${product.id}`}>
            <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400 sm:text-lg">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="mt-1.5 flex items-center gap-1 sm:mt-2 sm:gap-2">
            <div className="flex items-center gap-1">
              <Star
                size={13}
                className="fill-yellow-400 text-yellow-400 sm:h-[15px] sm:w-[15px]"
              />

              <span className="text-xs font-medium text-gray-800 dark:text-gray-200 sm:text-sm">
                {product.rating}
              </span>
            </div>

            <span className="text-[9px] text-gray-500 sm:text-xs">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-3">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 sm:text-2xl">
              ৳{product.price.toLocaleString()}
            </span>

            <span className="text-[10px] text-gray-400 line-through sm:text-sm">
              ৳{product.oldPrice.toLocaleString()}
            </span>
          </div>

          {/* Offer */}
          <div className="mt-1.5 flex items-center gap-1 text-[9px] font-medium text-green-600 dark:text-green-400 sm:mt-2 sm:text-xs">
            <Zap size={12} className="fill-current sm:h-[14px] sm:w-[14px]" />
            Limited Time Offer
          </div>

          {/* Buttons */}
          <div className="mt-3 grid grid-cols-1 gap-1.5 sm:mt-5 sm:grid-cols-2 sm:gap-2">

            {/* Add Cart */}
            <button
              onClick={() => handleAddToCart(product)}
              className="flex items-center justify-center gap-1 rounded-lg border-2 border-blue-600 py-2 text-[10px] font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 sm:gap-2 sm:rounded-xl sm:py-3 sm:text-sm"
            >
              <ShoppingCart size={14} className="sm:h-[17px] sm:w-[17px]" />
              Add Cart
            </button>

            {/* Buy Now */}
            <button
              onClick={() => handleBuyNow(product)}
              className="flex items-center justify-center gap-1 rounded-lg bg-blue-600 py-2 text-[10px] font-semibold text-white transition hover:bg-blue-700 sm:gap-2 sm:rounded-xl sm:py-3 sm:text-sm"
            >
              <Zap size={14} className="sm:h-[17px] sm:w-[17px]" />
              Order Now
            </button>

          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gray-50 py-16 transition-colors duration-300 dark:bg-gray-950">

      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Best Products
            </p>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Top Selling Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            View All Products →
          </Link>

        </div>

        {/* ============================= */}
        {/* MOBILE SWIPER */}
        {/* ============================= */}

        <div className="block md:hidden">

          {mounted ? <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={12}
            slidesPerView={2}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={false}
            className="top-selling-swiper !pb-10"
          >

            {displayedProducts.map((product) => (
              <SwiperSlide key={product.id} className="h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}

          </Swiper> : <div className="grid grid-cols-2 gap-3">{products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}</div>}

        </div>

        {/* ============================= */}
        {/* DESKTOP GRID */}
        {/* ============================= */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        {/* Cart Count */}
        {cartCount > 0 && (
          <div className="mt-8 text-center">

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 font-semibold text-white transition hover:scale-105 dark:bg-white dark:text-gray-900"
            >
              <ShoppingCart size={18} />

              View Cart ({cartCount})
            </Link>

          </div>
        )}

      </div>
    </section>
  );
};

export default TopSellingProducts;