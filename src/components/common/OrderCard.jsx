"use client";

import Image from "next/image";
import { useLanguage } from "../../app/common/LanguageContext";

const STATUS_STYLE = {
  pending: "bg-amber-100 text-amber-800",
  confirm: "bg-blue-100 text-blue-800",
  deliverd: "bg-green-100 text-green-800",
  cenceled: "bg-red-100 text-red-800",
};

/** Turns `confirm` into the translation key `order.statusConfirm`. */
const statusKey = (status) => `order.status${String(status || "pending").charAt(0).toUpperCase()}${String(status || "pending").slice(1)}`;

/** One order, as shown on the tracking page and in the account order history. */
export default function OrderCard({ order }) {
  const { t, formatPrice, formatNumber, formatDate, pick } = useLanguage();

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">{t("order.number")}</p>
          <p className="text-lg font-bold text-[#062B63]">{order.orderNumber}</p>
          <p className="mt-1 text-xs text-gray-500">
            {t("order.placedOn")}: {formatDate(order.createdAt)}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[order.deliveryStatus] || STATUS_STYLE.pending}`}>
          {t(statusKey(order.deliveryStatus))}
        </span>
      </div>

      <ul className="mt-4 space-y-3 border-t border-gray-100 pt-4">
        {(order.items || []).map((item, index) => (
          <li key={`${item.product || index}`} className="flex items-center gap-3">
            {item.image && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <Image src={item.image} alt={item.title || ""} fill sizes="48px" className="object-cover" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">
                {t("common.qty")}: {formatNumber(item.quntity || 1)} × {formatPrice(item.unitprice)}
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-[#062B63]">{formatPrice(item.totalprice)}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>{t("common.subtotal")}</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>
            {t("checkout.deliveryCharge")}
            {order.deliveryZoneLabel && (
              <span className="ml-1 text-xs text-gray-400">({pick(order.deliveryZoneLabel, order.deliveryZoneLabelBn)})</span>
            )}
          </span>
          <span>{order.deliveryCharge ? formatPrice(order.deliveryCharge) : t("common.free")}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900">
          <span>{t("common.total")}</span>
          <span>{formatPrice(order.totalprice)}</span>
        </div>
        <div className="flex justify-between pt-1 text-xs">
          <span>{t("order.payment")}</span>
          <span>
            {order.paymentMethod === "online" ? t("checkout.online") : t("checkout.cod")} ·{" "}
            {t(`order.${order.paymentStatus || "unpaid"}`)}
          </span>
        </div>
      </div>

      {order.customer && (
        <p className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">{t("order.deliveryTo")}:</span> {order.customer.name},{" "}
          {order.customer.address}, {[order.customer.city, order.customer.district, order.customer.postcode].filter(Boolean).join(", ")} ·{" "}
          {order.customer.phone}
        </p>
      )}
    </article>
  );
}
