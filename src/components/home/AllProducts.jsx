"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { useShop } from "../../app/common/ShopContext";
import { useStoreCatalog } from "../../app/common/StoreCatalogContext";
import { useLanguage } from "../../app/common/LanguageContext";
import ProductCard from "../common/ProductCard";

const ALL = "__all__";

const AllProducts = ({ initialSearch = "" }) => {
  const { t, formatNumber } = useLanguage();
  const { products, categories, loading } = useStoreCatalog();
  const { cartCount } = useShop();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(ALL);
  const [sort, setSort] = useState("default");
  const [lastInitialSearch, setLastInitialSearch] = useState(initialSearch);

  // A fresh `?query=` from the navbar replaces whatever is in the box.
  if (initialSearch !== lastInitialSearch) {
    setLastInitialSearch(initialSearch);
    setSearch(initialSearch);
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      const matchesCategory = category === ALL || product.categorySlug === category;
      return matchesSearch && matchesCategory;
    });

    // Sort a copy so the catalogue in context is never reordered in place.
    const sorted = [...result];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "discount") sorted.sort((a, b) => b.discount - a.discount);
    return sorted;
  }, [products, search, category, sort]);

  const categoryOptions = [{ slug: ALL, name: t("products.all") }, ...categories.map((item) => ({ slug: item.slug, name: item.name }))];

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#16863D]">{t("products.eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-5xl">{t("products.title")}</h1>
          <p className="mt-3 text-gray-600">{t("products.subtitle")}</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder={t("products.searchPlaceholder")}
              aria-label={t("common.search")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-900 outline-none focus:ring-2 focus:ring-[#16863D]"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label={t("products.sortBy")}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-5 text-gray-900 outline-none lg:w-56"
            >
              <option value="default">{t("products.sortBy")}</option>
              <option value="low">{t("products.sortLowHigh")}</option>
              <option value="high">{t("products.sortHighLow")}</option>
              <option value="rating">{t("products.sortRating")}</option>
              <option value="discount">{t("products.sortDiscount")}</option>
            </select>
          </div>
        </div>

        <div className="scrollbar-hide mb-8 flex gap-3 overflow-x-auto pb-4">
          {categoryOptions.map((option) => (
            <button
              key={option.slug}
              type="button"
              onClick={() => setCategory(option.slug)}
              aria-pressed={category === option.slug}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === option.slug
                  ? "bg-[#062B63] text-white"
                  : "border border-gray-200 bg-white text-gray-700 hover:border-[#16863D]"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">{t("products.showing", { count: formatNumber(filtered.length) })}</p>
          {cartCount > 0 && (
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-lg bg-[#16863D] px-4 py-2 font-semibold text-white transition hover:bg-[#0f6d30]"
            >
              <ShoppingCart size={17} />
              {t("nav.cart")} ({formatNumber(cartCount)})
            </Link>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-96 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-4 text-5xl" aria-hidden="true">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-900">{t("products.none")}</h2>
            <p className="mt-2 text-gray-500">{t("products.noneHint")}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
