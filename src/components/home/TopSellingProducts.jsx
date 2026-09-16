"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import image from "../../../public/images/image.jpg";
import { ShoppingCart, Heart, Star, Zap, Eye } from "lucide-react";

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
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Add To Cart
  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);

    alert(`${product.name} added to cart!`);
  };

  // Buy Now
  const handleBuyNow = (product) => {
    setCart((prev) => [...prev, product]);

    window.location.href = `/checkout?product=${product.id}`;
  };

  // Wishlist
  const handleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              Best Products
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Top Selling Products
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Discover our most popular products at the best prices.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            View All Products →
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Discount */}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{product.discount}%
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => handleWishlist(product.id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center hover:scale-110 transition"
                >
                  <Heart
                    size={19}
                    className={
                      wishlist.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700 dark:text-white"
                    }
                  />
                </button>

                {/* Quick View */}
                <Link
                  href={`/product/${product.id}`}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  <Eye size={16} />
                  Quick View
                </Link>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Category */}
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {product.category}
                </p>

                {/* Product Name */}
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-xs text-gray-500">
                    ({product.reviews} Reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ৳{product.price.toLocaleString()}
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    ৳{product.oldPrice.toLocaleString()}
                  </span>
                </div>

                {/* Offer */}
                <div className="flex items-center gap-1 mt-2 text-green-600 dark:text-green-400 text-xs font-medium">
                  <Zap size={14} className="fill-current" />
                  Limited Time Offer
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  {/* Add Cart */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 py-3 text-sm font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition"
                  >
                    <ShoppingCart size={17} />
                    Add Cart
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-3 text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    <Zap size={17} />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Count */}
        {cart.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              <ShoppingCart size={18} />
              View Cart ({cart.length})
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopSellingProducts;
