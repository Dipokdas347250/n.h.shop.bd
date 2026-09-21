"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useShop } from "../common/ShopContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useShop();
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <main className="min-h-[60vh] bg-gray-50 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-blue-600" />
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
        {cart.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <p className="text-gray-500">Your cart is empty.</p>
            <Link href="/allproduct" className="mt-4 inline-block font-semibold text-blue-600">Browse products</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={`${item.id}-${item.variant?._id || "default"}`} className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div><p className="font-semibold">{item.name}</p><p className="text-blue-600">৳{item.price.toLocaleString()}</p>{item.variant && <p className="text-xs text-gray-500">{item.variant.size} / {item.variant.color}</p>}</div>
                  <div className="flex items-center gap-2"><button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1, item.variant)} aria-label={`Decrease ${item.name} quantity`}><Minus size={16} /></button><span>{item.quantity || 1}</span><button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1, item.variant)} aria-label={`Increase ${item.name} quantity`}><Plus size={16} /></button><button onClick={() => removeFromCart(item.id, item.variant)} aria-label={`Remove ${item.name}`} className="ml-2 text-red-500"><Trash2 size={17} /></button></div>
                </div>
              ))}
            </div>
            <div className="h-fit rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-900"><div className="flex justify-between font-bold"><span>Total</span><span>৳{total.toLocaleString()}</span></div><Link href="/checkout" className="mt-5 block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white hover:bg-blue-700">Checkout</Link></div>
          </div>
        )}
      </div>
    </main>
  );
}