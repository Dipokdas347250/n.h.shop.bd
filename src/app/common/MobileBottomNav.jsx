"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Grid2X2, Home, Search, ShoppingCart, UserRound } from "lucide-react";
import { useShop } from "./ShopContext";
import { useLanguage } from "./LanguageContext";

const MobileBottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useShop();
  const { t, formatNumber } = useLanguage();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/allproduct?query=${encodeURIComponent(value)}` : "/allproduct");
    setSearchOpen(false);
  };

  const items = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/allproduct", label: t("nav.menu"), icon: Grid2X2 },
    { label: t("common.search"), icon: Search, onClick: () => setSearchOpen((open) => !open), active: searchOpen },
    { href: "/account", label: t("nav.account"), icon: UserRound },
  ];

  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const active = item.href ? pathname === item.href : item.active;
    const className = `relative flex h-full w-[20%] flex-col items-center justify-center gap-1 transition-all duration-200 ${
      active ? "text-[#8BE28F]" : "text-white/70"
    }`;
    const content = (
      <>
        <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
        <span className="max-w-full truncate px-0.5 text-[9px] font-medium">{item.label}</span>
        {active && <span className="absolute bottom-[5px] h-[3px] w-7 rounded-full bg-[#8BE28F]" />}
      </>
    );

    if (!item.href) {
      return (
        <button type="button" onClick={item.onClick} aria-expanded={active} className={className}>
          {content}
        </button>
      );
    }

    return (
      <Link href={item.href} aria-current={active ? "page" : undefined} onClick={() => setSearchOpen(false)} className={className}>
        {content}
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 md:hidden" aria-label={t("nav.menu")}>
      <div className="relative mx-auto max-w-md">
        {searchOpen && (
          <form
            onSubmit={submitSearch}
            role="search"
            className="absolute bottom-[calc(100%+40px)] left-0 right-0 flex h-[48px] overflow-hidden rounded-full border-2 border-[#16863D] bg-white shadow-[0_5px_25px_rgba(0,0,0,0.2)]"
          >
            <input
              ref={inputRef}
              type="search"
              placeholder={t("nav.searchPlaceholder")}
              aria-label={t("common.search")}
              className="min-w-0 flex-1 px-4 text-sm text-gray-900 outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" className="bg-[#16863D] px-5 text-white" aria-label={t("common.search")}>
              <Search size={19} />
            </button>
          </form>
        )}

        <div className="flex h-[64px] items-center rounded-[32px] bg-[#062B63] px-1 shadow-[0_-5px_25px_rgba(0,0,0,0.2)]">
          {items.slice(0, 2).map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          <div className="w-[20%]" />
          {items.slice(2).map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </div>

        <Link
          href="/cart"
          aria-label={t("nav.cart")}
          className={`absolute left-1/2 top-[-28px] flex h-[58px] w-[58px] -translate-x-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            pathname === "/cart" ? "scale-110 bg-[#0f6d30]" : "bg-[#16863D]"
          }`}
        >
          <ShoppingCart size={23} color="white" strokeWidth={2} />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#062B63] px-1 text-[10px] font-bold text-white">
              {formatNumber(cartCount)}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
