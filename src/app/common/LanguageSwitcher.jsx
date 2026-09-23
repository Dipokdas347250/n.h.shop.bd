"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageContext";

/**
 * Two-way language toggle. `compact` drops the globe icon for tight rows such
 * as the mobile menu.
 */
export default function LanguageSwitcher({ compact = false, className = "" }) {
  const { language, setLanguage, languages, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className={`flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 ${className}`}
    >
      {!compact && <Languages size={15} className="ml-1.5 text-[#062B63]" aria-hidden="true" />}
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          aria-pressed={language === item.code}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            language === item.code ? "bg-[#062B63] text-white" : "text-[#062B63] hover:bg-gray-100"
          }`}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
}
