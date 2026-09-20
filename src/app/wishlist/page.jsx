"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useShop } from "../common/ShopContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  return (
    <main className="min-h-[60vh] bg-gray-50 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4"><div className="flex items-center gap-3"><Heart className="text-red-500" /><h1 className="text-3xl font-bold">Wishlist</h1></div>
        {wishlist.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900"><p className="text-gray-500">No saved products yet.</p><Link href="/allproduct" className="mt-4 inline-block font-semibold text-blue-600">Explore products</Link></div> : <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{wishlist.map((item) => <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><p className="font-semibold">{item.name}</p><p className="mt-2 text-xl font-bold text-blue-600">৳{item.price.toLocaleString()}</p><div className="mt-4 flex gap-2"><button onClick={() => addToCart(item)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"><ShoppingCart size={15} /> Add to cart</button><button onClick={() => toggleWishlist(item)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-red-500">Remove</button></div></div>)}</div>}
      </div>
    </main>
  );
}