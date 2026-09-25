"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, UserRound, Menu, X, ChevronDown, Zap, PackageSearch } from "lucide-react";
import logo from "../../../public/images/logo.png";
import { useShop } from "./ShopContext";
import { useStoreAuth } from "./StoreAuthContext";
import { useStoreCatalog } from "./StoreCatalogContext";
import { useLanguage } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthDialog from "./AuthDialog";

const HOTLINE = "+880196794373";

/** Small counter bubble on the wishlist and cart icons. */
const CountBadge = ({ count, format }) => (
  <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#16863D] px-1 text-[10px] text-white">
    {format(count)}
  </span>
);

const Navbar = () => {
  const router = useRouter();
  const { t, formatNumber } = useLanguage();
  const { cartCount, wishlistCount } = useShop();
  const { user } = useStoreAuth();
  const { categories } = useStoreCatalog();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) setCategoryOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/allproduct?query=${encodeURIComponent(value)}` : "/allproduct");
    setMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="border-b border-gray-100">
        <div className="mx-auto h-[78px] max-w-[1500px] px-4 lg:px-6">
          <div className="flex h-full items-center justify-between gap-4">
            <Link href="/" className="shrink-0 flex items-center gap-2" aria-label={t("app.name")}>
              <Image src={logo} alt={t("app.name")} className="w-[50px] md:w-[60px] lg:w-[70px]" priority />
              <h2 className="lg:text-[30px] text-xl font-bold"><span className="text-gray-800">NH</span> <span className="text-[#16863D]">Shop</span> <span className="text-red-500">BD</span></h2>
            </Link>

            <form onSubmit={submitSearch} className="hidden max-w-[520px] flex-1 md:flex">
              <div className="flex h-[45px] w-full items-center overflow-hidden rounded-md border-2 border-[#16863D]">
                <input
                  type="search"
                  placeholder={t("nav.searchPlaceholder")}
                  aria-label={t("common.search")}
                  className="h-full min-w-0 flex-1 px-4 text-sm text-gray-700 outline-none"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit" className="flex h-full items-center gap-2 bg-[#062B63] px-6 text-white transition hover:bg-[#041F4A]">
                  <Search size={18} />
                  <span className="hidden lg:block">{t("common.search")}</span>
                </button>
              </div>
            </form>

            <div className="hidden leading-tight xl:block">
              <p className="text-sm text-[#16863D]">{t("nav.orderInquiry")}</p>
              <a href={`tel:${HOTLINE.replace(/\s/g, "")}`} className="text-[18px] font-bold text-[#062B63]">
                {HOTLINE}
              </a>
            </div>

            <LanguageSwitcher className="hidden shrink-0 lg:flex" />

            <Link href="/wishlist" className="relative  text-[#062B63] transition hover:text-[#16863D] " aria-label={t("nav.wishlist")}>
              <Heart size={24} />
              <CountBadge count={wishlistCount} format={formatNumber} />
            </Link>

            <Link href="/cart" className="relative text-[#062B63] transition hover:text-[#16863D]" aria-label={t("nav.cart")}>
              <ShoppingCart size={25} />
              <CountBadge count={cartCount} format={formatNumber} />
            </Link>

            <button
              type="button"
              onClick={() => (user ? router.push("/account") : setLoginOpen(true))}
              className="hidden h-[40px] items-center gap-2 rounded-full bg-[#062B63] px-5 text-sm text-white shadow-md transition hover:bg-[#041F4A] sm:flex"
            >
              <UserRound size={17} />
              <span className="max-w-[140px] truncate">{user ? user.fullname : t("nav.login")}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenu((open) => !open)}
              className="text-[#062B63] md:hidden"
              aria-label={t("nav.menu")}
              aria-expanded={mobileMenu}
            >
              {mobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="hidden bg-[#062B63] md:block">
        <div className="mx-auto max-w-[1500px] px-4 lg:px-6">
          <div className="flex h-[47px] items-center justify-between">
            <nav className="flex items-center gap-6 lg:gap-9">
              <Link href="/" className="text-sm font-medium text-white transition hover:text-[#8BE28F]">
                {t("nav.home")}
              </Link>

              <div className="relative" ref={categoryRef}>
                <button
                  type="button"
                  onClick={() => setCategoryOpen((open) => !open)}
                  aria-expanded={categoryOpen}
                  className="flex items-center gap-1 text-sm font-medium text-white transition hover:text-[#8BE28F]"
                >
                  {t("nav.categories")}
                  <ChevronDown size={16} className={categoryOpen ? "rotate-180 transition" : "transition"} />
                </button>

                {categoryOpen && (
                  <div className="absolute left-0 top-[40px] z-50 max-h-[70vh] w-[230px] overflow-y-auto rounded-md border border-gray-100 bg-white shadow-xl">
                    {categories.length ? (
                      categories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/featuredCategories/${category.slug}`}
                          onClick={() => setCategoryOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-700 transition hover:bg-[#EAF7EF] hover:text-[#16863D]"
                        >
                          {category.name}
                        </Link>
                      ))
                    ) : (
                      <p className="px-5 py-3 text-sm text-gray-500">{t("common.loading")}</p>
                    )}
                  </div>
                )}
              </div>

              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category._id}
                  href={`/featuredCategories/${category.slug}`}
                  className="hidden whitespace-nowrap text-sm font-medium text-white transition hover:text-[#8BE28F] lg:block"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/track-order"
                className="flex h-[35px] items-center gap-2 rounded-md px-3 text-sm font-medium text-white transition hover:text-[#8BE28F]"
              >
                <PackageSearch size={17} />
                {t("nav.trackOrder")}
              </Link>
              <Link
                href="/flash-sale"
                className="flex h-[35px] items-center gap-2 rounded-md border border-white px-4 text-sm font-semibold text-white transition hover:bg-white hover:text-[#062B63]"
              >
                <Zap size={17} />
                {t("nav.flashSale")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="border-t bg-white shadow-lg md:hidden">
          <div className="flex items-center justify-between gap-3 p-4">
            <form onSubmit={submitSearch} className="flex h-[45px] flex-1 overflow-hidden rounded-md border-2 border-[#16863D]">
              <input
                type="search"
                placeholder={t("nav.searchPlaceholder")}
                aria-label={t("common.search")}
                className="min-w-0 flex-1 px-3 text-sm outline-none"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="submit" className="bg-[#062B63] px-4 text-white" aria-label={t("common.search")}>
                <Search size={19} />
              </button>
            </form>
            <LanguageSwitcher compact />
          </div>

          <nav className="border-t">
            {[
              { href: "/", label: t("nav.home") },
              { href: "/allproduct", label: t("nav.allProducts") },
              { href: "/trending", label: t("nav.trending") },
              { href: "/flash-sale", label: t("nav.flashSale") },
              { href: "/wishlist", label: t("nav.wishlist") },
              { href: "/track-order", label: t("nav.trackOrder") },
              { href: "/account", label: t("nav.account") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="block border-b px-5 py-3 font-medium text-[#062B63]"
              >
                {item.label}
              </Link>
            ))}

            <div className="border-b">
              <button
                type="button"
                onClick={() => setCategoryOpen((open) => !open)}
                aria-expanded={categoryOpen}
                className="flex w-full items-center justify-between px-5 py-3 font-medium text-[#062B63]"
              >
                {t("nav.categories")}
                <ChevronDown size={18} className={categoryOpen ? "rotate-180 transition" : "transition"} />
              </button>
              {categoryOpen && (
                <div className="bg-[#EAF7EF]">
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/featuredCategories/${category.slug}`}
                      onClick={() => setMobileMenu(false)}
                      className="block border-t px-9 py-3 text-sm text-[#062B63] hover:text-[#16863D]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenu(false);
                if (user) router.push("/account");
                else setLoginOpen(true);
              }}
              className="mx-5 my-4 block w-[calc(100%-2.5rem)] rounded-full bg-[#16863D] py-3 text-center font-medium text-white transition hover:bg-[#0f6d30]"
            >
              {user ? user.fullname : t("nav.login")}
            </button>
          </nav>
        </div>
      )}

      <AuthDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
};

export default Navbar;
