"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  Menu,
  X,
  ChevronDown,
  Zap,
} from "lucide-react";
import logo from "../../../public/images/logo.png";

const categories = [
  "Baby Item",
  "Electronics & Gadgets",
  "Trending",
  "Kitchen Item",
  "Shaving Item",
  "Perfume",
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">

      {/* =================================================
          TOP NAVBAR
      ================================================= */}
      <div className="h-[78px] border-b border-gray-100">
        <div className="max-w-[1500px] h-full mx-auto px-4 lg:px-6">

          <div className="h-full flex items-center justify-between gap-5">

            {/* ================= LOGO ================= */}
            <Link href="/" className="shrink-0">

              {/* If you have logo */}
              <Image
                src={logo}
                alt="N.H.Shop BD"
               
                className="w-[50px] md:w-[60px] lg:w-[70px]"
              />

            </Link>


            {/* ================= SEARCH ================= */}
            <div className="hidden md:flex flex-1 max-w-[520px]">

              <div className="w-full h-[45px] flex items-center border-2 border-[#16863D] rounded-md overflow-hidden">

                <input
                  type="text"
                  placeholder="Search in N.H.Shop..."
                  className="
                    flex-1
                    h-full
                    px-4
                    text-sm
                    text-gray-700
                    outline-none
                  "
                />

                <button
                  className="
                    h-full
                    px-6
                    bg-[#062B63]
                    text-white
                    flex
                    items-center
                    gap-2
                    hover:bg-[#041F4A]
                    transition
                  "
                >
                  <Search size={18} />

                  <span className="hidden lg:block">
                    Search
                  </span>
                </button>

              </div>

            </div>


            {/* ================= ORDER ================= */}
            <div className="hidden xl:block leading-tight">

              <p className="text-[#16863D] text-sm">
                Order inquiry
              </p>

              <p className="text-[#062B63] text-[18px] font-bold">
                +880 9617-100900
              </p>

            </div>


            {/* ================= WISHLIST ================= */}
            <Link
              href="/wishlist"
              className="hidden sm:block relative text-[#062B63] hover:text-[#16863D] transition"
            >

              <Heart size={24} />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  w-[18px]
                  h-[18px]
                  rounded-full
                  bg-[#16863D]
                  text-white
                  text-[10px]
                  flex
                  items-center
                  justify-center
                "
              >
                0
              </span>

            </Link>


            {/* ================= CART ================= */}
            <Link
              href="/cart"
              className="relative text-[#062B63] hover:text-[#16863D] transition"
            >

              <ShoppingCart size={25} />

              <span
                className="
                  absolute
                  -top-2
                  -right-2
                  w-[18px]
                  h-[18px]
                  rounded-full
                  bg-[#16863D]
                  text-white
                  text-[10px]
                  flex
                  items-center
                  justify-center
                "
              >
                0
              </span>

            </Link>


            {/* ================= LOGIN ================= */}
            <Link
              href="/login"
              className="
                hidden sm:flex
                h-[40px]
                px-5
                rounded-full
                bg-[#062B63]
                hover:bg-[#041F4A]
                text-white
                items-center
                gap-2
                text-sm
                shadow-md
                transition
              "
            >

              <UserRound size={17} />

              <span>
                Login/Register
              </span>

            </Link>


            {/* ================= MOBILE MENU ================= */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden text-[#062B63]"
            >
              {mobileMenu ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>

          </div>
        </div>
      </div>


      {/* =================================================
          CATEGORY NAVBAR
      ================================================= */}
      <div className="hidden md:block bg-[#062B63]">

        <div className="max-w-[1500px] mx-auto px-4 lg:px-6">

          <div className="h-[47px] flex items-center justify-between">

            {/* Categories */}
            <nav className="flex items-center gap-6 lg:gap-9">

              <Link
                href="/"
                className="
                  text-white
                  text-sm
                  font-medium
                  hover:text-[#8BE28F]
                  transition
                "
              >
                Home
              </Link>


              {/* Category */}
              <div className="relative">

                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="
                    flex
                    items-center
                    gap-1
                    text-white
                    text-sm
                    font-medium
                    hover:text-[#8BE28F]
                    transition
                  "
                >

                  Categories

                  <ChevronDown
                    size={16}
                    className={`transition ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />

                </button>


                {/* Dropdown */}
                {categoryOpen && (
                  <div
                    className="
                      absolute
                      top-[40px]
                      left-0
                      w-[230px]
                      bg-white
                      rounded-md
                      shadow-xl
                      border
                      border-gray-100
                      overflow-hidden
                      z-50
                    "
                  >

                    {categories.map((category) => (
                      <Link
                        key={category}
                        href="#"
                        className="
                          block
                          px-5
                          py-3
                          text-sm
                          text-gray-700
                          hover:bg-[#EAF7EF]
                          hover:text-[#16863D]
                          transition
                        "
                      >
                        {category}
                      </Link>
                    ))}

                  </div>
                )}

              </div>


              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category}
                  href="#"
                  className="
                    hidden lg:block
                    text-white
                    text-sm
                    font-medium
                    whitespace-nowrap
                    hover:text-[#8BE28F]
                    transition
                  "
                >
                  {category}
                </Link>
              ))}

            </nav>


            {/* Flash Sale */}
            <Link
              href="/flash-sale"
              className="
                h-[35px]
                px-4
                border
                border-white
                rounded-md
                flex
                items-center
                gap-2
                text-white
                text-sm
                font-semibold
                hover:bg-white
                hover:text-[#062B63]
                transition
              "
            >

              <Zap size={17} />

              FLASH SALE

            </Link>

          </div>
        </div>
      </div>


      {/* =================================================
          MOBILE MENU
      ================================================= */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-lg">

          {/* Mobile Search */}
          <div className="p-4">

            <div
              className="
                h-[45px]
                flex
                border-2
                border-[#16863D]
                rounded-md
                overflow-hidden
              "
            >

              <input
                type="text"
                placeholder="Search in N.H.Shop..."
                className="
                  flex-1
                  min-w-0
                  px-3
                  text-sm
                  outline-none
                "
              />

              <button className="px-4 bg-[#062B63] text-white">
                <Search size={19} />
              </button>

            </div>

          </div>


          {/* Mobile Links */}
          <nav className="border-t">

            <Link
              href="/"
              onClick={() => setMobileMenu(false)}
              className="
                block
                px-5
                py-3
                border-b
                text-[#062B63]
                font-medium
              "
            >
              Home
            </Link>


            {/* Mobile Categories */}
            <div className="border-b">

              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="
                  w-full
                  px-5
                  py-3
                  flex
                  justify-between
                  items-center
                  text-[#062B63]
                  font-medium
                "
              >

                Categories

                <ChevronDown
                  size={18}
                  className={`transition ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />

              </button>


              {categoryOpen && (
                <div className="bg-[#EAF7EF]">

                  {categories.map((category) => (
                    <Link
                      key={category}
                      href="#"
                      onClick={() => setMobileMenu(false)}
                      className="
                        block
                        px-9
                        py-3
                        border-t
                        text-sm
                        text-[#062B63]
                        hover:text-[#16863D]
                      "
                    >
                      {category}
                    </Link>
                  ))}

                </div>
              )}

            </div>


            <Link
              href="/products"
              onClick={() => setMobileMenu(false)}
              className="block px-5 py-3 border-b text-[#062B63]"
            >
              Products
            </Link>


            <Link
              href="/trending"
              onClick={() => setMobileMenu(false)}
              className="block px-5 py-3 border-b text-[#062B63]"
            >
              Trending
            </Link>


            <Link
              href="/flash-sale"
              onClick={() => setMobileMenu(false)}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                border-b
                text-[#16863D]
                font-semibold
              "
            >
              <Zap size={18} />
              Flash Sale
            </Link>


            <Link
              href="/wishlist"
              onClick={() => setMobileMenu(false)}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                border-b
                text-[#062B63]
              "
            >
              <Heart size={19} />
              Wishlist
            </Link>


            <Link
              href="/account"
              onClick={() => setMobileMenu(false)}
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                border-b
                text-[#062B63]
              "
            >
              <UserRound size={19} />
              My Account
            </Link>


            <Link
              href="/login"
              onClick={() => setMobileMenu(false)}
              className="
                block
                mx-5
                my-4
                py-3
                text-center
                bg-[#16863D]
                hover:bg-[#0f6d30]
                text-white
                rounded-full
                font-medium
                transition
              "
            >
              Login / Register
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
};

export default Navbar;