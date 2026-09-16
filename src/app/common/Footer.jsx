
"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp,
  CreditCard,
  Smartphone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white text-gray-700 dark:bg-gray-950 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
      {/* Newsletter Section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Subscribe to Our Newsletter
              </h2>

              <p className="mt-2 text-sm text-blue-100 sm:text-base">
                Get the latest products, offers and exclusive deals.
              </p>
            </div>

            <div className="w-full max-w-md">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex overflow-hidden rounded-xl bg-white p-1 shadow-lg"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Send size={17} />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white"
            >
            

              <span>
                N H <span className="text-blue-600">Shop</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-600 dark:text-gray-400">
              Your trusted online shopping destination. Discover quality
              products, amazing offers and a smooth shopping experience.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-blue-600 hover:text-white dark:bg-gray-900 dark:text-gray-300"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-pink-600 hover:text-white dark:bg-gray-900 dark:text-gray-300"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-sky-500 hover:text-white dark:bg-gray-900 dark:text-gray-300"
              >
                <FaTwitter size={16} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-red-600 hover:text-white dark:bg-gray-900 dark:text-gray-300"
              >
                <FaYoutube size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/shop"
                  className="transition hover:text-blue-600"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-blue-600"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-blue-600"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-blue-600"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Customer Service
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/my-account"
                  className="transition hover:text-blue-600"
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/orders"
                  className="transition hover:text-blue-600"
                >
                  Track Order
                </Link>
              </li>

              <li>
                <Link
                  href="/wishlist"
                  className="transition hover:text-blue-600"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping"
                  className="transition hover:text-blue-600"
                >
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link
                  href="/returns"
                  className="transition hover:text-blue-600"
                >
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Contact Us
            </h3>

            <div className="mt-5 space-y-5">
              {/* Address */}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Address
                  </p>

                  <p className="mt-1 text-sm leading-6">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Phone
                  </p>

                  <a
                    href="tel:+8801700000000"
                    className="mt-1 block text-sm transition hover:text-blue-600"
                  >
                    +880 1700-000000
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    Email
                  </p>

                  <a
                    href="mailto:support@dipokshop.com"
                    className="mt-1 block break-all text-sm transition hover:text-blue-600"
                  >
                    support@dipokshop.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

       

      
      </div>

     
    </footer>
  );
};

export default Footer;
