"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
// lucide-react v1 dropped brand marks, so the social icons come from react-icons.
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import logo from "../../../public/images/logo.png";
import { useLanguage } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const HOTLINE = "+880 9617-100900";
const EMAIL = "support@nhshop.com.bd";

const SOCIALS = [
  { href: "https://facebook.com", icon: FaFacebookF, label: "Facebook" },
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://youtube.com", icon: FaYoutube, label: "YouTube" },
];

const Footer = () => {
  const { t, formatNumber } = useLanguage();

  const quickLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/allproduct", label: t("nav.allProducts") },
    { href: "/trending", label: t("nav.trending") },
    { href: "/flash-sale", label: t("nav.flashSale") },
    { href: "/wishlist", label: t("nav.wishlist") },
  ];

  const helpLinks = [
    { href: "/track-order", label: t("nav.trackOrder") },
    { href: "/account", label: t("nav.account") },
    { href: "/cart", label: t("nav.cart") },
  ];

  return (
    <footer className="bg-[#062B63] text-white">
      <div className="mx-auto max-w-[1500px] px-4 py-12 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image src={logo} alt={t("app.name")} className="w-[70px] brightness-0 invert" />
            <h2 className="mt-4 text-lg font-bold">{t("footer.about")}</h2>
            <p className="mt-2 text-sm leading-6 text-white/75">{t("footer.aboutBody")}</p>
            <LanguageSwitcher className="mt-5 w-fit !border-white/20 !bg-white/10" />
          </div>

          <nav aria-label={t("footer.quickLinks")}>
            <h2 className="text-lg font-bold">{t("footer.quickLinks")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-[#8BE28F]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.help")}>
            <h2 className="text-lg font-bold">{t("footer.help")}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-[#8BE28F]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg font-bold">{t("footer.contact")}</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#8BE28F]" />
                <div>
                  <p className="text-white/60">{t("footer.hotline")}</p>
                  <a href={`tel:${HOTLINE.replace(/\s/g, "")}`} className="font-semibold text-white transition hover:text-[#8BE28F]">
                    {HOTLINE}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#8BE28F]" />
                <a href={`mailto:${EMAIL}`} className="transition hover:text-[#8BE28F]">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#8BE28F]" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#16863D]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1500px] px-4 py-5 text-center text-xs text-white/60 lg:px-6">
          © {formatNumber(new Date().getFullYear())} {t("app.name")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
