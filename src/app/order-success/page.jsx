"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, Info, PackageSearch } from "lucide-react";
import { useLanguage } from "../common/LanguageContext";

function OrderSuccessContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "";
  const underReview = searchParams.get("review") === "1";

  return (
    <div className="bg-gray-50 py-14">
      <div className="mx-auto max-w-2xl px-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF7EF] text-[#16863D]">
            <CheckCircle2 size={34} />
          </span>

          <h1 className="mt-5 text-2xl font-bold text-gray-900 md:text-3xl">{t("order.successTitle")}</h1>
          <p className="mt-3 text-gray-600">{t("order.successBody")}</p>

          {orderNumber && (
            <div className="mt-6 rounded-2xl bg-gray-50 p-5">
              <p className="text-xs uppercase tracking-wider text-gray-500">{t("order.number")}</p>
              <p className="mt-1 text-2xl font-extrabold tracking-wide text-[#062B63]">{orderNumber}</p>
              <p className="mt-2 text-xs text-gray-500">{t("order.saveNumber")}</p>
            </div>
          )}

          {underReview && (
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-left text-sm text-amber-800">
              <Info size={16} className="mt-0.5 shrink-0" />
              {t("order.underReview")}
            </p>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={orderNumber ? `/track-order?order=${encodeURIComponent(orderNumber)}` : "/track-order"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#062B63] px-5 py-3 font-semibold text-white transition hover:bg-[#041F4A]"
            >
              <PackageSearch size={18} />
              {t("order.track")}
            </Link>
            <Link
              href="/allproduct"
              className="inline-flex items-center justify-center rounded-xl border-2 border-[#16863D] px-5 py-3 font-semibold text-[#16863D] transition hover:bg-[#16863D] hover:text-white"
            >
              {t("checkout.continueShopping")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
