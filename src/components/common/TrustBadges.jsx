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
    <section className={`bg-[#EAF7EF] py-5 md:py-10 ${className}`}>
      <div className="container mx-auto grid grid-cols-3 gap-2 px-4 md:gap-6">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 rounded-xl bg-white p-3 text-center shadow-sm md:flex-row md:gap-3 md:rounded-2xl md:p-5 md:text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16863D]/10 text-[#16863D] md:h-11 md:w-11">
              <Icon size={18} className="md:h-[22px] md:w-[22px]" />
            </span>
            <span className="text-[11px] font-medium leading-4 text-gray-800 md:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
