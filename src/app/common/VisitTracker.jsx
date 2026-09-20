"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    let visitorKey = window.localStorage.getItem("nh-shop-visitor-key");
    if (!visitorKey) {
      visitorKey = crypto.randomUUID();
      window.localStorage.setItem("nh-shop-visitor-key", visitorKey);
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/api"}/admin/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-visitor-key": visitorKey },
      body: JSON.stringify({ visitorKey, path: window.location.pathname }),
    }).catch(() => {});
  }, []);

  return null;
}
