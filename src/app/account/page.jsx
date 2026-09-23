"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut, PackageSearch, UserRound } from "lucide-react";
import { useStoreAuth } from "../common/StoreAuthContext";
import { useLanguage } from "../common/LanguageContext";
import AuthDialog from "../common/AuthDialog";
import OrderCard from "../../components/common/OrderCard";
import { ApiError, storeRequest } from "../../lib/storeApi";

export default function AccountPage() {
  const { t, language } = useLanguage();
  const { user, loading, updateProfile, logout } = useStoreAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  // `null` means the order history has not come back yet.
  const [orders, setOrders] = useState(null);
  const [form, setForm] = useState({ fullname: "", phone: "", address: "", password: "" });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [formUserId, setFormUserId] = useState(null);

  // Fill the form from the account the moment it is known, and again if a
  // different account signs in. Adjusting state during render like this is
  // cheaper than an effect, which would render the empty form first.
  if (user && user._id !== formUserId) {
    setFormUserId(user._id);
    setForm({ fullname: user.fullname || "", phone: user.phone || "", address: user.address || "", password: "" });
  }

  useEffect(() => {
    if (!user) return undefined;
    let active = true;

    storeRequest("/checkout/my-orders")
      .then((items) => {
        if (active) setOrders(items || []);
      })
      .catch(() => {
        if (active) setOrders([]);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const save = async (event) => {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      await updateProfile({
        fullname: form.fullname,
        phone: form.phone,
        address: form.address,
        ...(form.password ? { password: form.password } : {}),
      });
      setForm((current) => ({ ...current, password: "" }));
      setStatus({ type: "success", message: t("account.updateProfile") });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof ApiError ? error.localized(language) : error.message,
      });
    } finally {
      setBusy(false);
    }
  };

  const inputClass = "w-full rounded-lg border border-gray-200 p-3 text-gray-900 outline-none transition focus:border-[#16863D]";

  if (loading) {
    return <div className="p-16 text-center text-gray-500">{t("common.loading")}</div>;
  }

  if (!user) {
    return (
      <div className="bg-gray-50 py-14">
        <div className="mx-auto max-w-lg px-4">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF7EF] text-[#16863D]">
              <UserRound size={28} />
            </span>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">{t("account.guestTitle")}</h1>
            <p className="mt-2 text-gray-600">{t("account.guestBody")}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setLoginOpen(true)}
                className="rounded-xl bg-[#062B63] px-5 py-3 font-semibold text-white transition hover:bg-[#041F4A]"
              >
                {t("auth.login")}
              </button>
              <Link
                href="/track-order"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#16863D] px-5 py-3 font-semibold text-[#16863D] transition hover:bg-[#16863D] hover:text-white"
              >
                <PackageSearch size={18} />
                {t("order.track")}
              </Link>
            </div>
          </div>
        </div>
        <AuthDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UserRound className="text-[#16863D]" size={26} />
            <h1 className="text-3xl font-bold text-gray-900">{t("account.title")}</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={16} />
            {t("auth.logout")}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <section className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">{t("account.profile")}</h2>
            <p className="mt-1 text-sm text-gray-500">{user.email}</p>

            <form onSubmit={save} className="mt-5 space-y-3">
              <div>
                <label htmlFor="account-name" className="mb-1 block text-sm font-medium text-gray-700">
                  {t("auth.fullname")}
                </label>
                <input id="account-name" required value={form.fullname} onChange={(event) => setForm({ ...form, fullname: event.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="account-phone" className="mb-1 block text-sm font-medium text-gray-700">
                  {t("auth.phone")}
                </label>
                <input id="account-phone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="account-address" className="mb-1 block text-sm font-medium text-gray-700">
                  {t("auth.address")}
                </label>
                <textarea id="account-address" rows={2} value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="account-password" className="mb-1 block text-sm font-medium text-gray-700">
                  {t("account.newPassword")}
                </label>
                <input id="account-password" type="password" minLength={8} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className={inputClass} />
                <p className="mt-1 text-xs text-gray-500">{t("account.newPasswordHint")}</p>
              </div>

              {status && (
                <p className={`rounded-lg p-3 text-sm ${status.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                  {status.message}
                </p>
              )}

              <button disabled={busy} className="w-full rounded-xl bg-[#16863D] px-5 py-3 font-semibold text-white transition hover:bg-[#0f6d30] disabled:opacity-50">
                {busy ? t("common.loading") : t("account.updateProfile")}
              </button>
            </form>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold text-gray-900">{t("account.myOrders")}</h2>
            {orders === null ? (
              <p className="text-gray-500">{t("common.loading")}</p>
            ) : orders.length ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <p className="text-gray-500">{t("account.noOrders")}</p>
                <Link href="/allproduct" className="mt-3 inline-block font-semibold text-[#16863D] hover:underline">
                  {t("cart.browse")}
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
