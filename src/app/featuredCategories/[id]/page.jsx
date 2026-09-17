"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart, Heart, Star, ShieldCheck, Truck } from "lucide-react";

const categories = [
  { id: "mens-fashion", name: "Men's Fashion", description: "Premium casual essentials and sharp everyday fits.", items: [
      { id: 2, name: "Men's Premium Casual Shirt", category: "Men's Fashion", price: 1199, oldPrice: 1699, discount: 29, rating: 4.7, reviews: 89, image: "/images/image.jpg" },
      { id: 7, name: "Men's Premium Sneakers", category: "Men's Fashion", price: 2299, oldPrice: 3199, discount: 28, rating: 4.8, reviews: 145, image: "/images/image.jpg" },
    ] },
  { id: "womens-fashion", name: "Women's Fashion", description: "Elegant outfits and accessories for everyday confidence.", items: [
      { id: 4, name: "Women's Stylish Handbag", category: "Women's Fashion", price: 1499, oldPrice: 2199, discount: 32, rating: 4.6, reviews: 76, image: "/images/image.jpg" },
      { id: 9, name: "Women's Summer Dress", category: "Women's Fashion", price: 1399, oldPrice: 1999, discount: 30, rating: 4.7, reviews: 112, image: "/images/image.jpg" },
    ] },
  { id: "electronics", name: "Electronics", description: "Smart tools and devices built for convenience and speed.", items: [
      { id: 1, name: "Premium Wireless Headphone", category: "Electronics", price: 2499, oldPrice: 3499, discount: 29, rating: 4.8, reviews: 124, image: "/images/image.jpg" },
      { id: 3, name: "Smart Watch Series 8", category: "Electronics", price: 3299, oldPrice: 4499, discount: 27, rating: 4.9, reviews: 210, image: "/images/image.jpg" },
      { id: 8, name: "Bluetooth Portable Speaker", category: "Electronics", price: 1599, oldPrice: 2299, discount: 30, rating: 4.6, reviews: 87, image: "/images/image.jpg" },
      { id: 11, name: "Smartphone Fast Charger", category: "Electronics", price: 699, oldPrice: 999, discount: 30, rating: 4.6, reviews: 132, image: "/images/image.jpg" },
    ] },
  { id: "shoes", name: "Shoes", description: "Comfort, traction, and everyday performance in one step.", items: [
      { id: 5, name: "Running Sports Shoes", category: "Shoes", price: 1899, oldPrice: 2699, discount: 30, rating: 4.8, reviews: 156, image: "/images/image.jpg" },
      { id: 7, name: "Men's Premium Sneakers", category: "Shoes", price: 2299, oldPrice: 3199, discount: 28, rating: 4.8, reviews: 145, image: "/images/image.jpg" },
    ] },
  { id: "beauty", name: "Beauty", description: "Self-care essentials made for glow, freshness, and ease.", items: [
      { id: 6, name: "Premium Skin Care Set", category: "Beauty", price: 999, oldPrice: 1499, discount: 33, rating: 4.7, reviews: 98, image: "/images/image.jpg" },
    ] },
  { id: "home-living", name: "Home & Living", description: "Home upgrades that balance function and style.", items: [
      { id: 10, name: "Modern LED Table Lamp", category: "Home & Living", price: 899, oldPrice: 1299, discount: 31, rating: 4.5, reviews: 64, image: "/images/image.jpg" },
    ] },
  { id: "accessories", name: "Accessories", description: "Finishing touches and practical add-ons for daily life.", items: [
      { id: 12, name: "Premium Men's Watch", category: "Accessories", price: 1999, oldPrice: 2899, discount: 31, rating: 4.8, reviews: 91, image: "/images/image.jpg" },
    ] },
];

export default function FeaturedCategoryPage() {
  const params = useParams();
  const id = params?.id;
  const category = categories.find((item) => item.id === id);

  if (!category) notFound();

  const addToCart = (product) => {
    const cartKey = "nh-shop-cart";
    const stored = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const updated = [...stored, { ...product, quantity: 1 }];
    localStorage.setItem(cartKey, JSON.stringify(updated));
    window.location.href = "/cart";
  };

  const buyNow = (product) => {
    const cartKey = "nh-shop-cart";
    const stored = JSON.parse(localStorage.getItem(cartKey) || "[]");
    const updated = [...stored, { ...product, quantity: 1 }];
    localStorage.setItem(cartKey, JSON.stringify(updated));
    window.location.href = `/checkout?product=${product.id}`;
  };

  return (
    <main className="bg-gray-50 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-4">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Featured Category</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">{category.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {category.items.map((product) => (
            <div key={product.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">-{product.discount}%</span>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">{product.category}</p>
                <Link href={`/allproduct/${product.id}`} className="mt-2 block text-lg font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                  {product.name}
                </Link>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={15} className="fill-current" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">৳{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 line-through">৳{product.oldPrice.toLocaleString()}</span>
                </div>

                <div className="mt-5 flex gap-2">
                  <button onClick={() => addToCart(product)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button onClick={() => buyNow(product)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
                    Order Now
                  </button>
                  <button className="flex items-center justify-center rounded-xl border border-gray-300 bg-white p-3 text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                    <Heart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
          <div className="flex items-center gap-3">
            <Truck className="text-green-600" size={20} />
            <span className="text-sm text-gray-700 dark:text-gray-200">Fast and reliable shipping for every order</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <ShieldCheck className="text-green-600" size={20} />
            <span className="text-sm text-gray-700 dark:text-gray-200">Secure checkout with quality guarantee</span>
          </div>
        </div>
      </div>
    </main>
  );
}
