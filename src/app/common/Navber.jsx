"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useShop } from "./ShopContext";
import { useStoreAuth } from "./StoreAuthContext";

const categories = [
  "Baby Item",
  "Electronics & Gadgets",
  "Trending",
  "Kitchen Item",
  "Shaving Item",
  "Perfume",
];

const Navbar = () => {
  const router = useRouter();
  const { cartCount, wishlistCount } = useShop();
  const { user, login, logout } = useStoreAuth();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const submitSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/allproduct?query=${encodeURIComponent(value)}` : "/allproduct");
    setMobileMenu(false);
  };

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
            <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-[520px]">

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
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
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

            </form>


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
                {wishlistCount}
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
                {cartCount}
              </span>

            </Link>


            {/* ================= LOGIN ================= */}
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
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
                {user ? user.fullname : "Login/Register"}
              </span>

            </button>


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
                        href={`/allproduct?query=${encodeURIComponent(category)}`}
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
                  href={`/allproduct?query=${encodeURIComponent(category)}`}
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

            <form onSubmit={submitSearch}
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
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <button className="px-4 bg-[#062B63] text-white">
                <Search size={19} />
              </button>

            </form>

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
              href="/allproduct"
              onClick={() => setMobileMenu(false)}
              className="block px-5 py-3 border-b text-[#062B63]"
            >
              Products
            </Link>


            <Link
              href="/allproduct?sort=discount"
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


            <button
              type="button"
              onClick={() => { setLoginOpen(true); setMobileMenu(false); }}
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
            </button>

          </nav>

        </div>
      )}

      {loginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#062B63]/60 p-4" onClick={() => setLoginOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#16863D]">Welcome back</p>
                <h2 className="mt-1 text-2xl font-bold text-[#062B63]">Login or register</h2>
              </div>
              <button type="button" onClick={() => setLoginOpen(false)} aria-label="Close login dialog" className="text-gray-500 hover:text-[#062B63]"><X size={22} /></button>
            </div>
            {user ? <div className="mt-6 space-y-4"><p className="text-gray-600">Signed in as {user.email}</p><button type="button" onClick={async () => { await logout(); setLoginOpen(false); }} className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white">Logout</button></div> : <form onSubmit={async (event) => { event.preventDefault(); setAuthError(""); try { await login({ email, password }); setLoginOpen(false); } catch (error) { setAuthError(error.message); } }} className="mt-6 space-y-4">
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#16863D]" />
              <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#16863D]" />
              {authError && <p className="text-sm text-red-500">{authError}</p>}
              <button type="submit" className="w-full rounded-lg bg-[#062B63] px-4 py-3 font-semibold text-white transition hover:bg-[#041F4A]">Continue</button>
            </form>}
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;