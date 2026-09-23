"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storeRequest } from "../../lib/storeApi";

const SettingsContext = createContext(null);

/** Used until the API answers, so the checkout can render immediately. */
const FALLBACK = {
  currency: "BDT",
  freeDeliveryThreshold: 0,
  codMaxAmount: 20000,
  deliveryZones: [
    { key: "inside_dhaka", label: "Inside Dhaka city", labelBn: "ঢাকা সিটির ভেতরে", charge: 60, estimatedDays: "1-2", estimatedDaysBn: "১-২" },
    { key: "dhaka_suburb", label: "Dhaka suburb", labelBn: "ঢাকার আশপাশ", charge: 90, estimatedDays: "2-3", estimatedDaysBn: "২-৩" },
    { key: "outside_dhaka", label: "Outside Dhaka", labelBn: "ঢাকার বাইরে", charge: 130, estimatedDays: "3-5", estimatedDaysBn: "৩-৫" },
  ],
};

/** Delivery zones and charges, loaded from the dashboard's store settings. */
export function StoreSettingsProvider({ children }) {
  const [settings, setSettings] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    storeRequest("/settings/delivery")
      .then((data) => {
        if (active && data?.deliveryZones?.length) setSettings(data);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => {
    /**
     * Delivery charge for a zone at a given cart value. Orders at or above the
     * free-delivery threshold ship free.
     */
    const deliveryChargeFor = (zoneKey, subtotal) => {
      const zone = settings.deliveryZones.find((item) => item.key === zoneKey) || settings.deliveryZones[0];
      const threshold = Number(settings.freeDeliveryThreshold || 0);
      const isFree = threshold > 0 && Number(subtotal) >= threshold;
      return { zone, charge: isFree ? 0 : Number(zone?.charge || 0), isFree };
    };

    return { settings, loading, deliveryChargeFor };
  }, [settings, loading]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useStoreSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useStoreSettings must be used inside StoreSettingsProvider");
  return context;
}
