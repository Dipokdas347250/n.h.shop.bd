"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PackageSearch } from "lucide-react";
import { useLanguage } from "../common/LanguageContext";
import { ApiError, storeRequest } from "../../lib/storeApi";
import OrderCard from "../../components/common/OrderCard";

function TrackOrderContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  // Arriving straight from the order-success page pre-fills the order number.
  const [form, setForm] = useState({ orderNumber: searchParams.get("order") || "", phone: "" });
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setOrder(null);
    try {
      const result = await storeRequest(
        `/checkout/track?orderNumber=${encodeURIComponent(form.orderNumber.trim())}&phone=${encodeURIComponent(form.phone.trim())}`
      );
      setOrder(result);
    } catch (caught) {
      setError(caught instanceof ApiError && caught.status !== 404 ? caught.localized(language) : t("order.notFound"));
    } finally {
      setBusy(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-200 p-3 text-gray-900 outline-none transition focus:border-[#16863D]";

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-3">
            <PackageSearch className="text-[#16863D]" size={26} />
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{t("order.trackTitle")}</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">{t("order.trackSubtitle")}</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="track-order-number" className="mb-1 block text-sm font-medium text-gray-700">
                {t("order.number")}
              </label>
              <input
                id="track-order-number"
                required
                value={form.orderNumber}
                onChange={(event) => setForm({ ...form, orderNumber: event.target.value.toUpperCase() })}
                placeholder="NH-260923-1234"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="track-phone" className="mb-1 block text-sm font-medium text-gray-700">
                {t("checkout.phone")}
              </label>
              <input
                id="track-phone"
                required
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                placeholder="01XXXXXXXXX"
                className={inputClass}
              />
            </div>
            <button
              disabled={busy}
              className="w-full rounded-xl bg-[#062B63] px-5 py-3 font-semibold text-white transition hover:bg-[#041F4A] disabled:opacity-50"
            >
              {busy ? t("common.loading") : t("order.track")}
            </button>
          </form>

          {error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        </div>

        {order && (
          <div className="mt-6">
            <OrderCard order={order} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
