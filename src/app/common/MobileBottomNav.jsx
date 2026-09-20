"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Grid2X2,
  ShoppingCart,
  Search,
  UserRound,
} from "lucide-react";
import { useShop } from "./ShopContext";

const MobileBottomNav = () => {
  const pathname = usePathname();
  const { cartCount } = useShop();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Menu",
      href: "/allproduct",
      icon: Grid2X2,
    },
    {
      name: "Search",
      href: "/allproduct",
      icon: Search,
    },
    {
      name: "Account",
      href: "/account",
      icon: UserRound,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 md:hidden">
      <div className="relative mx-auto max-w-md">

        {/* Navbar */}
        <div className="flex h-[64px] items-center rounded-[32px] bg-[#20242d] px-1 shadow-[0_-5px_25px_rgba(0,0,0,0.2)]">

          {/* Home + Menu */}
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex h-full w-[20%] flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  active ? "text-[#6747F5]" : "text-white/70"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.4 : 1.8}
                />

                <span className="text-[9px] font-medium uppercase">
                  {item.name}
                </span>

                {/* Active Indicator */}
                {active && (
                  <span className="absolute bottom-[5px] h-[3px] w-7 rounded-full bg-[#6747F5]" />
                )}
              </Link>
            );
          })}

          {/* Cart Space */}
          <div className="w-[20%]" />

          {/* Search + Account */}
          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex h-full w-[20%] flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  active ? "text-[#6747F5]" : "text-white/70"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.4 : 1.8}
                />

                <span className="text-[9px] font-medium uppercase">
                  {item.name}
                </span>

                {/* Active Indicator */}
                {active && (
                  <span className="absolute bottom-[5px] h-[3px] w-7 rounded-full bg-[#6747F5]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Floating Cart */}
        <Link
          href="/cart"
          className={`absolute left-1/2 top-[-28px] flex h-[58px] w-[58px] -translate-x-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
            pathname === "/cart"
              ? "bg-[#7c5cff] scale-110"
              : "bg-[#6747F5]"
          }`}
        >
          <ShoppingCart
            size={23}
            color="white"
            strokeWidth={2}
          />

          {/* Cart Count */}
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#20242d] px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>

          {/* Cart Active Ring */}
          {pathname === "/cart" && (
            <span className="absolute -bottom-1 h-[3px] w-7 rounded-full bg-white" />
          )}
        </Link>

      </div>
    </nav>
  );
};

export default MobileBottomNav;