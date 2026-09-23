"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { dictionary, LANGUAGES } from "../../i18n/dictionary";

const STORAGE_KEY = "nh-shop-language";
const DEFAULT_LANGUAGE = "bn";

/** Bangla digits, so prices and counts read naturally in Bangla. */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// The chosen language lives in localStorage and is read through an external
// store, so the server render and the first client render always agree and no
// effect is needed to catch up afterwards.
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && dictionary[saved] ? saved : DEFAULT_LANGUAGE;
  } catch {
    // Private mode or blocked storage.
    return DEFAULT_LANGUAGE;
  }
};

const getServerSnapshot = () => DEFAULT_LANGUAGE;

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep `<html lang>` in step so screen readers and fonts pick the right language.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next) => {
    if (!dictionary[next]) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice will not persist, but the page still switches below.
    }
    listeners.forEach((listener) => listener());
  }, []);

  /**
   * Looks up `key`, substituting `{placeholders}` from `values`.
   * Falls back to English and then to the key itself, so a missing translation
   * is visible rather than silently blank.
   */
  const t = useCallback(
    (key, values) => {
      const template = dictionary[language]?.[key] ?? dictionary.en[key] ?? key;
      if (!values) return template;
      return template.replace(/\{(\w+)\}/g, (match, name) =>
        values[name] === undefined ? match : String(values[name])
      );
    },
    [language]
  );

  /** Formats a number for the active language, using Bangla digits in Bangla. */
  const formatNumber = useCallback(
    (value) => {
      const text = Number(value || 0).toLocaleString("en-US");
      return language === "bn" ? text.replace(/\d/g, (digit) => BN_DIGITS[Number(digit)]) : text;
    },
    [language]
  );

  /** Formats a money amount, e.g. `৳1,250` or `৳১,২৫০`. */
  const formatPrice = useCallback((value) => `৳${formatNumber(value)}`, [formatNumber]);

  const formatDate = useCallback(
    (value) => {
      if (!value) return "";
      return new Date(value).toLocaleDateString(language === "bn" ? "bn-BD" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
    [language]
  );

  /** Picks the Bangla field when the visitor reads Bangla and one exists. */
  const pick = useCallback(
    (enValue, bnValue) => (language === "bn" && String(bnValue || "").trim() ? bnValue : enValue),
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, formatNumber, formatPrice, formatDate, pick, languages: LANGUAGES }),
    [language, setLanguage, t, formatNumber, formatPrice, formatDate, pick]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
