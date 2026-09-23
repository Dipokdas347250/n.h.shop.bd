"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { useShop } from "../../app/common/ShopContext";
import { useLanguage } from "../../app/common/LanguageContext";

/**
 * One product tile, shared by the home page, the catalogue and category pages
 * so every listing behaves the same.
 */
export default function ProductCard({ product, compact = false }) {
  const router = useRouter();
  const { t, formatPrice, formatNumber } = useLanguage();
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const detailHref = `/allproduct/${product.slug || product.id}`;
  const saved = isWishlisted(product.id);

  const orderNow = () => {
    addToCart(product);
    router.push(`/checkout?product=${product.id}`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={detailHref} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

        {product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs">
            -{formatNumber(product.discount)}%
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={t("nav.wishlist")}
          aria-pressed={saved}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <Heart size={16} className={saved ? "fill-red-500 text-red-500" : "text-gray-700"} />
        </button>

        <Link
          href={detailHref}
          className="absolute bottom-2 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-gray-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-3 sm:px-4 sm:py-2 sm:text-sm"
        >
          <Eye size={14} />
          {t("products.quickView")}
        </Link>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-3 sm:p-5"}`}>
        {product.categorySlug ? (
          <Link href={`/featuredCategories/${product.categorySlug}`} className="mb-1.5 block text-[10px] font-semibold text-[#16863D] hover:underline sm:text-xs">
            {product.category}
          </Link>
        ) : (
          <p className="mb-1.5 text-[10px] font-semibold text-[#16863D] sm:text-xs">{product.category}</p>
        )}

        <Link href={detailHref}>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition hover:text-[#16863D] sm:text-lg">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1 sm:mt-2 sm:gap-2">
          <Star size={13} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-800 sm:text-sm">
            {product.rating > 0 ? formatNumber(product.rating) : t("common.new")}
          </span>
          <span className="text-[9px] text-gray-500 sm:text-xs">
            ({formatNumber(product.reviews)})
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-3">
          <span className="text-lg font-bold text-[#062B63] sm:text-2xl">{formatPrice(product.price)}</span>
          {product.oldPrice > product.price && (
            <span className="text-[10px] text-gray-400 line-through sm:text-sm">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {product.offer && (
          <div className="mt-1.5 flex items-center gap-1 text-[9px] font-medium text-[#16863D] sm:mt-2 sm:text-xs">
            <Zap size={12} className="fill-current" />
            {product.offer}
          </div>
        )}

        <div className="mt-auto grid grid-cols-1 gap-1.5 pt-3 sm:grid-cols-2 sm:gap-2 sm:pt-5">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-1 rounded-lg border-2 border-[#062B63] py-2 text-[10px] font-semibold text-[#062B63] transition hover:bg-[#062B63] hover:text-white sm:gap-2 sm:rounded-xl sm:py-3 sm:text-sm"
          >
            <ShoppingCart size={14} />
            {t("products.addToCart")}
          </button>
          <button
            type="button"
            onClick={orderNow}
            className="flex items-center justify-center gap-1 rounded-lg bg-[#16863D] py-2 text-[10px] font-semibold text-white transition hover:bg-[#0f6d30] sm:gap-2 sm:rounded-xl sm:py-3 sm:text-sm"
          >
            <Zap size={14} />
            {t("products.orderNow")}
          </button>
        </div>
      </div>
    </article>
  );
}
