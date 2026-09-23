"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, ShoppingBag, Truck, UserRound } from "lucide-react";
import { useShop } from "../common/ShopContext";
import { useStoreCatalog } from "../common/StoreCatalogContext";
import { useStoreAuth } from "../common/StoreAuthContext";
import { useStoreSettings } from "../common/StoreSettingsContext";
import { useLanguage } from "../common/LanguageContext";
import AuthDialog from "../common/AuthDialog";
import { ApiError, storeRequest } from "../../lib/storeApi";
import { trackMetaEvent } from "../../lib/metaPixel";

/** Bangladeshi mobile numbers, with or without the +88 country code. */
const BD_PHONE = /^(?:\+?88)?01[3-9]\d{8}$/;

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language, formatPrice, pick } = useLanguage();
  const { cart, clearCart } = useShop();
  const { findProduct } = useStoreCatalog();
  const { user, loading: authLoading } = useStoreAuth();
  const { settings, deliveryChargeFor } = useStoreSettings();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    postcode: "",
    note: "",
    deliveryZone: settings.deliveryZones[0]?.key || "inside_dhaka",
    paymentMethod: "cashOnDelivery",
  });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Prefill from the account as soon as it is known, without overwriting
  // anything already typed. Guests fill the form in themselves.
  const [prefilledFor, setPrefilledFor] = useState(null);
  if (user && user._id !== prefilledFor) {
    setPrefilledFor(user._id);
    setForm((current) => ({
      ...current,
      name: current.name || user.fullname || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || "",
      address: current.address || user.address || "",
    }));
  }

  // The zones load after the first render, so keep the selection valid.
  const zoneExists = settings.deliveryZones.some((zone) => zone.key === form.deliveryZone);
  if (!zoneExists && settings.deliveryZones.length) {
    setForm((current) => ({ ...current, deliveryZone: settings.deliveryZones[0].key }));
  }

  // Returning from a failed or cancelled online payment.
  const paymentOutcome = searchParams.get("payment");
  const [shownOutcome, setShownOutcome] = useState(null);
  if (paymentOutcome && paymentOutcome !== shownOutcome) {
    setShownOutcome(paymentOutcome);
    if (paymentOutcome === "failed") setStatus({ type: "error", message: t("checkout.paymentFailed") });
    if (paymentOutcome === "cancelled") setStatus({ type: "error", message: t("checkout.paymentCancelled") });
  }

  // "Order now" links pass a product id; show it alongside whatever is in the cart.
  const items = useMemo(() => {
    const directId = searchParams.get("product");
    if (!directId || cart.some((item) => item.id === directId)) return cart;
    const product = findProduct(directId);
    return product ? [{ ...product, quantity: 1 }, ...cart] : cart;
  }, [cart, findProduct, searchParams]);

  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * (item.quantity || 1), 0);
  const { zone, charge: deliveryCharge, isFree } = deliveryChargeFor(form.deliveryZone, subtotal);
  const total = subtotal + deliveryCharge;

  const contentIds = useMemo(() => items.map((item) => String(item.id)), [items]);

  useEffect(() => {
    if (contentIds.length) {
      trackMetaEvent("InitiateCheckout", {
        content_ids: contentIds,
        num_items: contentIds.length,
        value: total,
        currency: "BDT",
      });
    }
  }, [contentIds, total]);

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!BD_PHONE.test(form.phone.replace(/[\s-]/g, ""))) {
      setStatus({ type: "error", message: t("checkout.invalidPhone") });
      return;
    }

    setBusy(true);
    setStatus({ type: "info", message: t("checkout.placing") });

    try {
      const order = await storeRequest("/checkout/checkout_order", {
        method: "POST",
        body: JSON.stringify({
          paymentMethod: form.paymentMethod,
          deliveryZone: form.deliveryZone,
          shipping: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            address: form.address,
            city: form.city,
            district: form.district,
            postcode: form.postcode,
            note: form.note,
          },
          items: items.map((item) => ({
            product: item.id,
            variant: item.variant?._id,
            quantity: item.quantity || 1,
          })),
        }),
      });

      trackMetaEvent("Purchase", {
        content_ids: contentIds,
        num_items: contentIds.length,
        value: order?.totalprice ?? total,
        currency: "BDT",
        order_id: order?.orderNumber,
      });

      clearCart();

      // Online payments continue on the gateway's hosted page.
      if (order?.gatewayUrl) {
        setStatus({ type: "info", message: t("checkout.redirecting") });
        window.location.href = order.gatewayUrl;
        return;
      }

      router.push(`/order-success?order=${encodeURIComponent(order.orderNumber)}&review=${order.fraudStatus === "review" ? "1" : "0"}`);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof ApiError ? error.localized(language) : error.message,
      });
      setBusy(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-200 p-3 text-gray-900 outline-none transition focus:border-[#16863D]";

  return (
    <div className="bg-gray-50 py-10 text-gray-900">
      <div className="mx-auto max-w-5xl px-4">
        <Link href="/allproduct" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#16863D] hover:underline">
          <ArrowLeft size={16} />
          {t("checkout.continueShopping")}
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-[#16863D]" size={28} />
            <h1 className="text-3xl font-bold">{t("checkout.title")}</h1>
          </div>

          {!authLoading && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#EAF7EF] p-4 text-sm text-[#0f6d30]">
              <span className="flex items-center gap-2">
                <UserRound size={16} />
                {user ? t("checkout.loggedInAs", { name: user.fullname }) : t("checkout.guestBanner")}
              </span>
              {!user && (
                <button type="button" onClick={() => setLoginOpen(true)} className="font-semibold underline">
                  {t("auth.login")}
                </button>
              )}
            </div>
          )}

          {items.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
              <p>{t("checkout.emptyItems")}</p>
              <Link href="/allproduct" className="mt-4 inline-block font-semibold text-[#16863D] hover:underline">
                {t("cart.browse")}
              </Link>
            </div>
          ) : (
            <form onSubmit={placeOrder} className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <section className="space-y-4">
                <h2 className="text-lg font-bold">{t("checkout.deliveryDetails")}</h2>

                <div>
                  <label htmlFor="checkout-name" className="mb-1 block text-sm font-medium text-gray-700">
                    {t("checkout.name")}
                  </label>
                  <input id="checkout-name" required name="name" value={form.name} onChange={change} className={inputClass} />
                </div>

                <div>
                  <label htmlFor="checkout-phone" className="mb-1 block text-sm font-medium text-gray-700">
                    {t("checkout.phone")}
                  </label>
                  <input
                    id="checkout-phone"
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={change}
                    className={inputClass}
                  />
                  <p className="mt-1 text-xs text-gray-500">{t("checkout.phoneHint")}</p>
                </div>

                <div>
                  <label htmlFor="checkout-email" className="mb-1 block text-sm font-medium text-gray-700">
                    {t("checkout.email")} <span className="text-gray-400">({t("common.optional")})</span>
                  </label>
                  <input id="checkout-email" name="email" type="email" value={form.email} onChange={change} className={inputClass} />
                </div>

                <div>
                  <label htmlFor="checkout-address" className="mb-1 block text-sm font-medium text-gray-700">
                    {t("checkout.address")}
                  </label>
                  <textarea id="checkout-address" required name="address" rows={2} value={form.address} onChange={change} className={inputClass} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="checkout-city" className="mb-1 block text-sm font-medium text-gray-700">
                      {t("checkout.city")}
                    </label>
                    <input id="checkout-city" required name="city" value={form.city} onChange={change} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="checkout-district" className="mb-1 block text-sm font-medium text-gray-700">
                      {t("checkout.district")}
                    </label>
                    <input id="checkout-district" required name="district" value={form.district} onChange={change} className={inputClass} />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="checkout-postcode" className="mb-1 block text-sm font-medium text-gray-700">
                      {t("checkout.postcode")} <span className="text-gray-400">({t("common.optional")})</span>
                    </label>
                    <input id="checkout-postcode" name="postcode" value={form.postcode} onChange={change} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="checkout-note" className="mb-1 block text-sm font-medium text-gray-700">
                      {t("checkout.note")} <span className="text-gray-400">({t("common.optional")})</span>
                    </label>
                    <input id="checkout-note" name="note" value={form.note} onChange={change} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-zone" className="mb-1 block text-sm font-medium text-gray-700">
                    {t("checkout.deliveryArea")}
                  </label>
                  <select id="checkout-zone" name="deliveryZone" value={form.deliveryZone} onChange={change} className={inputClass}>
                    {settings.deliveryZones.map((option) => (
                      <option key={option.key} value={option.key}>
                        {pick(option.label, option.labelBn)} — {formatPrice(option.charge)}
                      </option>
                    ))}
                  </select>
                  {zone && (
                    <p className="mt-1 text-xs text-gray-500">
                      {t("checkout.estimated", { days: pick(zone.estimatedDays, zone.estimatedDaysBn) })}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="checkout-payment" className="mb-1 block text-sm font-medium text-gray-700">
                    {t("checkout.paymentMethod")}
                  </label>
                  <select
                    id="checkout-payment"
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={(event) => {
                      change(event);
                      trackMetaEvent("AddPaymentInfo", { payment_method: event.target.value, value: total, currency: "BDT" });
                    }}
                    className={inputClass}
                  >
                    <option value="cashOnDelivery">{t("checkout.cod")}</option>
                    <option value="online">{t("checkout.online")}</option>
                  </select>
                </div>
              </section>

              <section className="h-fit rounded-2xl bg-gray-50 p-5">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <ShoppingBag size={20} />
                  {t("checkout.orderSummary")}
                </h2>

                <ul className="mt-5 space-y-3">
                  {items.map((item, index) => (
                    <li key={`${item.id}-${item.variant?._id || index}`} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {t("common.qty")}: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-[#062B63]">
                        {formatPrice(Number(item.price || 0) * (item.quantity || 1))}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>{t("common.subtotal")}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5">
                      <Truck size={14} />
                      {t("checkout.deliveryCharge")}
                    </span>
                    <span className={isFree ? "font-semibold text-[#16863D]" : ""}>
                      {isFree ? t("common.free") : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  {settings.freeDeliveryThreshold > 0 && !isFree && (
                    <p className="rounded-lg bg-[#EAF7EF] p-2 text-xs text-[#0f6d30]">
                      {t("checkout.freeDeliveryHint", { amount: formatPrice(settings.freeDeliveryThreshold) })}
                    </p>
                  )}
                  <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
                    <span>{t("common.total")}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {status && (
                  <p
                    className={`mt-4 rounded-lg p-3 text-sm ${
                      status.type === "error" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy || !items.length}
                  className="mt-5 w-full rounded-xl bg-[#16863D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#0f6d30] disabled:opacity-50"
                >
                  {busy ? t("checkout.placing") : t("checkout.placeOrder")}
                </button>

                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                  <ShieldCheck size={14} />
                  {t("trust.secure")}
                </p>
              </section>
            </form>
          )}
        </div>
      </div>

      <AuthDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
