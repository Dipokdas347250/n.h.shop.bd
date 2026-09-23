"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2X2, Home, ShoppingCart, UserRound, Zap } from "lucide-react";
import { useShop } from "./ShopContext";
import { useLanguage } from "./LanguageContext";

const MobileBottomNav = () => {
  const pathname = usePathname();
  const { cartCount } = useShop();
  const { t, formatNumber } = useLanguage();

  const items = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/allproduct", label: t("nav.menu"), icon: Grid2X2 },
    { href: "/flash-sale", label: t("nav.flashSale"), icon: Zap },
    { href: "/account", label: t("nav.account"), icon: UserRound },
  ];

  const NavLink = ({ item }) => {
    const Icon = item.icon;
    const active = pathname === item.href;

    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`relative flex h-full w-[20%] flex-col items-center justify-center gap-1 transition-all duration-200 ${
          active ? "text-[#8BE28F]" : "text-white/70"
        }`}
      >
        <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
        <span className="max-w-full truncate px-0.5 text-[9px] font-medium">{item.label}</span>
        {active && <span className="absolute bottom-[5px] h-[3px] w-7 rounded-full bg-[#8BE28F]" />}
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 md:hidden" aria-label={t("nav.menu")}>
      <div className="relative mx-auto max-w-md">
        <div className="flex h-[64px] items-center rounded-[32px] bg-[#062B63] px-1 shadow-[0_-5px_25px_rgba(0,0,0,0.2)]">
          {items.slice(0, 2).map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <div className="w-[20%]" />
          {items.slice(2).map((item) => (
            <NavLink key={item.href} item={item} />
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
