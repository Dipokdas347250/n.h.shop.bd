"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useShop } from "../common/ShopContext";
import { useLanguage } from "../common/LanguageContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, hydrated } = useShop();
  const { t, formatPrice, formatNumber } = useLanguage();

  return (
    <div className="min-h-[60vh] bg-gray-50 py-10 text-gray-900">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-center gap-3">
          <ShoppingBag className="text-[#16863D]" />
          <h1 className="text-3xl font-bold">{t("cart.title")}</h1>
        </div>

        {!hydrated ? (
          <p className="mt-8 text-center text-gray-500">{t("common.loading")}</p>
        ) : cart.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500">{t("cart.empty")}</p>
            <Link href="/allproduct" className="mt-4 inline-block font-semibold text-[#16863D] hover:underline">
              {t("cart.browse")}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.variant?._id || "default"}`}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link href={`/allproduct/${item.slug || item.id}`} className="line-clamp-2 font-semibold hover:text-[#16863D]">
                      {item.name}
                    </Link>
                    <p className="mt-1 font-bold text-[#062B63]">{formatPrice(item.price)}</p>
                    {item.variant && (
                      <p className="text-xs text-gray-500">
                        {item.variant.size} / {item.variant.color}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1, item.variant)}
                      aria-label={t("cart.decrease")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:border-[#16863D]"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-6 text-center font-semibold">{formatNumber(item.quantity || 1)}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1, item.variant)}
                      aria-label={t("cart.increase")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 hover:border-[#16863D]"
                    >
                      <Plus size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.variant)}
                      aria-label={t("cart.remove")}
                      className="ml-1 text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{t("common.subtotal")}</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="mt-3 flex items-start gap-2 rounded-lg bg-[#EAF7EF] p-3 text-xs text-[#0f6d30]">
                <Truck size={15} className="mt-0.5 shrink-0" />
                {t("cart.deliveryNote")}
              </p>
              <Link
                href="/checkout"
                className="mt-5 block rounded-xl bg-[#16863D] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#0f6d30]"
              >
                {t("cart.checkout")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
