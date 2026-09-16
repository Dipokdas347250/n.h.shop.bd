
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import image from "../../../public/images/image.jpg"
import {
  ShoppingCart,
  Heart,
  Star,
  Zap,
  Search,
  SlidersHorizontal,
} from "lucide-react";

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
    image:image,
    price: 999,
    oldPrice: 1499,
    discount: 33,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 7,
    name: "Men's Premium Sneakers",
    category: "Shoes",
    image:image,
    price: 2299,
    oldPrice: 3199,
    discount: 28,
    rating: 4.8,
    reviews: 145,
  },
  {
    id: 8,
    name: "Bluetooth Portable Speaker",
    category: "Electronics",
    image: image,
    price: 1599,
    oldPrice: 2299,
    discount: 30,
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 9,
    name: "Women's Summer Dress",
    category: "Women's Fashion",
    image: image,
    price: 1399,
    oldPrice: 1999,
    discount: 30,
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 10,
    name: "Modern LED Table Lamp",
    category: "Home & Living",
    image: image,
    price: 899,
    oldPrice: 1299,
    discount: 31,
    rating: 4.5,
    reviews: 64,
  },
  {
    id: 11,
    name: "Smartphone Fast Charger",
    category: "Electronics",
    image: image,
    price: 699,
    oldPrice: 999,
    discount: 30,
    rating: 4.6,
    reviews: 132,
  },
  {
    id: 12,
    name: "Premium Men's Watch",
    category: "Accessories",
    image: image,
    price: 1999,
    oldPrice: 2899,
    discount: 31,
    rating: 4.8,
    reviews: 91,
  },
];

const categories = [
  "All",
  "Electronics",
  "Men's Fashion",
  "Women's Fashion",
  "Shoes",
  "Beauty",
  "Home & Living",
  "Accessories",
];

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || product.category === category;

      return matchSearch && matchCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "discount") {
      result.sort((a, b) => b.discount - a.discount);
    }

    return result;
  }, [search, category, sort]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const buyNow = (product) => {
    setCart((prev) => [...prev, product]);

    window.location.href = `/checkout?product=${product.id}`;
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 transition-colors">

      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-widest font-semibold text-blue-600 dark:text-blue-400">
            Shop Everything
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2">
            All Products
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Explore our complete collection of premium products.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none w-full lg:w-56 pl-11 pr-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none"
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                category === item
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-blue-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          {cart.length > 0 && (
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <ShoppingCart size={17} />
              Cart ({cart.length})
            </Link>
          )}
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredProducts.map((product) => (
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
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    -{product.discount}%
                  </span>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white dark:bg-gray-900 rounded-full shadow-md flex items-center justify-center hover:scale-110 transition"
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
                </div>

                {/* Details */}
                <div className="p-5">

                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {product.category}
                  </p>

                  <Link href={`/product/${product.id}`}>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 transition">
                      {product.name}
                    </h2>
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
                      ({product.reviews})
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
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-semibold mt-2">
                    <Zap size={14} className="fill-current" />
                    Limited Time Offer
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-5">

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:bg-blue-600 hover:text-white transition"
                    >
                      <ShoppingCart size={17} />
                      Add Cart
                    </button>

                    <button
                      onClick={() => buyNow(product)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                    >
                      <Zap size={17} />
                      Buy Now
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Product */
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🛍️</div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search or category.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default AllProducts;
