"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("nh-shop-cart") || "[]");
    setItems(saved);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <main className="bg-gray-50 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-4xl px-4">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <ArrowLeft size={16} />
          Continue shopping
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" size={28} />
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  No items in cart yet.
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      ৳{(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-950">
              <div className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag size={20} />
                Order Summary
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳0</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              <button className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
