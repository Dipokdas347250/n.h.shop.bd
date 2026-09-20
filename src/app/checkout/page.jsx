"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { useShop } from "../common/ShopContext";

const products = [
  { id: 1, name: "Premium Wireless Headphone", price: 2499, image: "/images/image.jpg" },
  { id: 2, name: "Men's Premium Casual Shirt", price: 1199, image: "/images/image.jpg" },
  { id: 3, name: "Smart Watch Series 8", price: 3299, image: "/images/image.jpg" },
  { id: 4, name: "Women's Stylish Handbag", price: 1499, image: "/images/image.jpg" },
  { id: 5, name: "Running Sports Shoes", price: 1899, image: "/images/image.jpg" },
  { id: 6, name: "Premium Skin Care Set", price: 999, image: "/images/image.jpg" },
  { id: 7, name: "Men's Premium Sneakers", price: 2299, image: "/images/image.jpg" },
  { id: 8, name: "Bluetooth Portable Speaker", price: 1599, image: "/images/image.jpg" },
  { id: 9, name: "Women's Summer Dress", price: 1399, image: "/images/image.jpg" },
  { id: 10, name: "Modern LED Table Lamp", price: 899, image: "/images/image.jpg" },
  { id: 11, name: "Smartphone Fast Charger", price: 699, image: "/images/image.jpg" },
  { id: 12, name: "Premium Men's Watch", price: 1999, image: "/images/image.jpg" },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { cart } = useShop();

  const selectedProductId = useMemo(() => {
    const value = searchParams.get("product");
    return value ? Number(value) : null;
  }, [searchParams]);

  const items = useMemo(() => {
    const selected = products.find((product) => product.id === selectedProductId);
    return selected && !cart.some((item) => item.id === selectedProductId)
      ? [{ ...selected, quantity: 1 }, ...cart]
      : cart;
  }, [cart, selectedProductId]);

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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
