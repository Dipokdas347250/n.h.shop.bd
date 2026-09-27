"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useStoreSettings } from "./StoreSettingsContext";

// Used only when no Pixel ID is saved in Dashboard -> Store settings.
const fallbackPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Pixel IDs are plain digits; anything else is a placeholder or a typo. */
const validPixelId = (value) => (/^\d{6,20}$/.test(String(value || "").trim()) ? String(value).trim() : "");

export default function MetaPixel() {
  const pathname = usePathname();
  const { settings, loading } = useStoreSettings();
  // Wait for the store settings so the fallback is never loaded by mistake.
  const pixelId = loading ? "" : validPixelId(settings.metaPixelId) || validPixelId(fallbackPixelId);

  // The first PageView is sent by the init script; this covers later navigation.
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${pixelId}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} alt="" />
      </noscript>
    </>
  );
}
