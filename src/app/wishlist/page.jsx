"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useShop } from "../common/ShopContext";
import { useLanguage } from "../common/LanguageContext";
import ProductCard from "../../components/common/ProductCard";

export default function WishlistPage() {
  const { wishlist, hydrated } = useShop();
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] bg-gray-50 py-10 text-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500" />
          <h1 className="text-3xl font-bold">{t("wishlist.title")}</h1>
        </div>

        {!hydrated ? (
          <p className="mt-8 text-center text-gray-500">{t("common.loading")}</p>
        ) : wishlist.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <p className="text-gray-500">{t("wishlist.empty")}</p>
            <Link href="/allproduct" className="mt-4 inline-block font-semibold text-[#16863D] hover:underline">
              {t("wishlist.explore")}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
