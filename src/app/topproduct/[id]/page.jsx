"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { useShop } from "../../common/ShopContext";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphone",
    category: "Electronics",
    price: 2499,
    oldPrice: 3499,
    discount: 29,
    rating: 4.8,
    reviews: 124,
    description:
      "Experience immersive sound with deep bass, crystal-clear vocals, and all-day comfort in a sleek wireless design.",
    features: [
      "40-hour battery life",
      "Noise reduction technology",
      "Fast USB-C charging",
      "Built-in microphone",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 2,
    name: "Men's Premium Casual Shirt",
    category: "Men's Fashion",
    price: 1199,
    oldPrice: 1699,
    discount: 29,
    rating: 4.7,
    reviews: 89,
    description:
      "A tailored everyday essential designed for relaxed comfort, premium fabric feel, and sharp styling.",
    features: [
      "Premium cotton blend",
      "Smart casual fit",
      "Wrinkle resistant",
      "Breathable fabric",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 3,
    name: "Smart Watch Series 8",
    category: "Electronics",
    price: 3299,
    oldPrice: 4499,
    discount: 27,
    rating: 4.9,
    reviews: 210,
    description:
      "Track health, workouts, notifications, and everyday activity with a premium smartwatch built for active lifestyles.",
    features: [
      "Heart-rate tracking",
      "GPS and water resistance",
      "7-day battery",
      "Bluetooth calling",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 4,
    name: "Women's Stylish Handbag",
    category: "Women's Fashion",
    price: 1499,
    oldPrice: 2199,
    discount: 32,
    rating: 4.6,
    reviews: 76,
    description:
      "A sleek statement accessory blending fashion and practicality for work, travel, and everyday use.",
    features: [
      "Premium faux leather",
      "Spacious interior",
      "Adjustable strap",
      "Compact elegance",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 5,
    name: "Running Sports Shoes",
    category: "Shoes",
    price: 1899,
    oldPrice: 2699,
    discount: 30,
    rating: 4.8,
    reviews: 156,
    description:
      "Lightweight cushioning and secure grip keep you comfortable through every run and daily stride.",
    features: [
      "Shock-absorbing sole",
      "Breathable upper",
      "Non-slip grip",
      "Everyday comfort",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 6,
    name: "Premium Skin Care Set",
    category: "Beauty",
    price: 999,
    oldPrice: 1499,
    discount: 33,
    rating: 4.7,
    reviews: 98,
    description:
      "A curated skin care routine designed to nourish, hydrate, and support a healthy glowing complexion.",
    features: [
      "Hydrating cleanser",
      "Vitamin-rich serum",
      "Gentle moisturiser",
      "Suitable for daily use",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 7,
    name: "Men's Premium Sneakers",
    category: "Shoes",
    price: 2299,
    oldPrice: 3199,
    discount: 28,
    rating: 4.8,
    reviews: 145,
    description:
      "Modern comfort and durable performance for casual wear, errands, and everyday walking.",
    features: [
      "Cushioned sole",
      "Breathable texture",
      "Street-ready style",
      "Long-lasting support",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 8,
    name: "Bluetooth Portable Speaker",
    category: "Electronics",
    price: 1599,
    oldPrice: 2299,
    discount: 30,
    rating: 4.6,
    reviews: 87,
    description:
      "Portable power and rich sound make this speaker perfect for home, travel, and outdoor moments.",
    features: [
      "Deep bass output",
      "Bluetooth 5.3",
      "IPX5 splash resistance",
      "12-hour playtime",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 9,
    name: "Women's Summer Dress",
    category: "Women's Fashion",
    price: 1399,
    oldPrice: 1999,
    discount: 30,
    rating: 4.7,
    reviews: 112,
    description:
      "A breathable and elegant dress designed to keep you comfortable while looking effortlessly polished.",
    features: [
      "Lightweight fabric",
      "Comfortable fit",
      "Elegant finish",
      "Easy to style",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 10,
    name: "Modern LED Table Lamp",
    category: "Home & Living",
    price: 899,
    oldPrice: 1299,
    discount: 31,
    rating: 4.5,
    reviews: 64,
    description:
      "A modern lighting solution that adds warmth and sophistication to any study, bedroom, or desk setup.",
    features: [
      "Soft dimmable light",
      "Minimalist design",
      "Energy efficient",
      "Easy to maintain",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 11,
    name: "Smartphone Fast Charger",
    category: "Electronics",
    price: 699,
    oldPrice: 999,
    discount: 30,
    rating: 4.6,
    reviews: 132,
    description:
      "Charge faster with safe power delivery and reliable performance for your everyday devices.",
    features: [
      "Fast charging",
      "Universal compatibility",
      "Overheat protection",
      "Compact form",
    ],
    image: "/images/image.jpg",
  },
  {
    id: 12,
    name: "Premium Men's Watch",
    category: "Accessories",
    price: 1999,
    oldPrice: 2899,
    discount: 31,
    rating: 4.8,
    reviews: 91,
    description:
      "A premium timepiece that balances classic appeal with modern performance and everyday reliability.",
    features: [
      "Water resistance",
      "Stainless steel finish",
      "Date display",
      "Luxury style",
    ],
    image: "/images/image.jpg",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart: addProduct } = useShop();
  const id = params?.id;
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  const addToCart = () => {
    addProduct(product);
    router.push("/cart");
  };

  const buyNow = () => {
    addProduct(product);
    router.push(`/checkout?product=${product.id}`);
  };

  return (
    <main className="bg-gray-50 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2 md:p-8">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-yellow-500 dark:bg-yellow-900/30">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                ৳{product.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ৳{product.oldPrice.toLocaleString()}
              </span>
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                -{product.discount}%
              </span>
            </div>

            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={addToCart} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button onClick={buyNow} className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700">
                Order Now
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <Heart size={18} />
                Wishlist
              </button>
            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center gap-3">
                <Truck className="text-green-600" size={20} />
                <span className="text-sm text-gray-700 dark:text-gray-200">Free delivery across Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" size={20} />
                <span className="text-sm text-gray-700 dark:text-gray-200">Secure checkout and guaranteed quality</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
          <h2 className="text-2xl font-bold">Product Highlights</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
