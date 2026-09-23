"use client";

import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "../../app/common/LanguageContext";

/** The three promises we make on every order, shown on the home and detail pages. */
export default function TrustBadges({ className = "" }) {
  const { t } = useLanguage();

  const badges = [
    { icon: Truck, label: t("trust.delivery") },
    { icon: ShieldCheck, label: t("trust.secure") },
    { icon: BadgeCheck, label: t("trust.cod") },
  ];

  return (
    <section className={`bg-[#EAF7EF] py-10 ${className}`}>
      <div className="container mx-auto grid gap-6 px-4 sm:grid-cols-3">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#16863D]/10 text-[#16863D]">
              <Icon size={22} />
            </span>
            <span className="text-sm font-medium text-gray-800">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
