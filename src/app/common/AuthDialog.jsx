"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useStoreAuth } from "./StoreAuthContext";
import { ApiError } from "../../lib/storeApi";

const EMPTY_FORM = { fullname: "", email: "", phone: "", address: "", password: "", confirmPassword: "" };

/**
 * Login, registration and email verification in one dialog.
 *
 * Signing in is optional throughout the store, so the dialog says so plainly
 * rather than blocking anyone who just wants to order as a guest.
 */
export default function AuthDialog({ open, onClose }) {
  const { t, language } = useLanguage();
  const { user, login, register, verifyOtp, resendOtp, logout } = useStoreAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(EMPTY_FORM);
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  // Each time the dialog opens it starts fresh, so a half-filled registration
  // from last time is never waiting there.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setMode("login");
      setForm(EMPTY_FORM);
      setOtp("");
      setStatus(null);
      setResendIn(0);
    }
  }

  useEffect(() => {
    if (!resendIn) return undefined;
    const timer = setInterval(() => setResendIn((value) => Math.max(value - 1, 0)), 1000);
    return () => clearInterval(timer);
  }, [resendIn]);

  useEffect(() => {
    if (!open) return undefined;
    const onEscape = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  if (!open) return null;

  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const fail = (error) =>
    setStatus({
      type: "error",
      message: error instanceof ApiError ? error.localized(language) : error.message,
    });

  const submitLogin = async (event) => {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      await login({ email: form.email, password: form.password });
      onClose();
    } catch (error) {
      fail(error);
    } finally {
      setBusy(false);
    }
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setStatus({ type: "error", message: t("auth.passwordsDoNotMatch") });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      await register({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      });
      setMode("verify");
      setResendIn(60);
      setStatus({ type: "success", message: t("auth.registeredNowVerify") });
    } catch (error) {
      fail(error);
    } finally {
      setBusy(false);
    }
  };

  const submitVerify = async (event) => {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      await verifyOtp({ email: form.email, otp });
      await login({ email: form.email, password: form.password });
      onClose();
    } catch (error) {
      fail(error);
    } finally {
      setBusy(false);
    }
  };

  const requestNewCode = async () => {
    if (resendIn) return;
    setBusy(true);
    try {
      await resendOtp(form.email);
      setResendIn(60);
      setStatus({ type: "success", message: t("auth.registeredNowVerify") });
    } catch (error) {
      fail(error);
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-[#16863D]";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#062B63]/60 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("auth.loginTitle")}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#16863D]">{t("auth.welcomeBack")}</p>
            <h2 className="mt-1 text-2xl font-bold text-[#062B63]">
              {mode === "verify" ? t("auth.verifyTitle") : t("auth.loginTitle")}
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label={t("common.close")} className="text-gray-500 hover:text-[#062B63]">
            <X size={22} />
          </button>
        </div>

        {status && (
          <p className={`mt-4 rounded-lg p-3 text-sm ${status.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
            {status.message}
          </p>
        )}

        {user ? (
          <div className="mt-6 space-y-4">
            <p className="text-gray-600">
              {t("auth.signedInAs")} <span className="font-semibold text-[#062B63]">{user.email}</span>
            </p>
            <button
              type="button"
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              {t("auth.logout")}
            </button>
          </div>
        ) : mode === "verify" ? (
          <form onSubmit={submitVerify} className="mt-6 space-y-4">
            <p className="text-sm text-gray-600">{t("auth.verifySubtitle")}</p>
            <input
              required
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 8).toUpperCase())}
              placeholder={t("auth.otp")}
              aria-label={t("auth.otp")}
              className={`${inputClass} text-center text-2xl tracking-[0.4em]`}
            />
            <button disabled={busy} className="w-full rounded-lg bg-[#062B63] px-4 py-3 font-semibold text-white disabled:opacity-50">
              {busy ? t("common.loading") : t("auth.verify")}
            </button>
            <button
              type="button"
              disabled={busy || resendIn > 0}
              onClick={requestNewCode}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#062B63] disabled:opacity-50"
            >
              {resendIn ? t("auth.resendIn", { seconds: resendIn }) : t("auth.resend")}
            </button>
          </form>
        ) : mode === "register" ? (
          <form onSubmit={submitRegister} className="mt-6 space-y-3">
            <input required name="fullname" value={form.fullname} onChange={change} placeholder={t("auth.fullname")} aria-label={t("auth.fullname")} className={inputClass} />
            <input required type="email" name="email" value={form.email} onChange={change} placeholder={t("auth.email")} aria-label={t("auth.email")} className={inputClass} />
            <input name="phone" value={form.phone} onChange={change} placeholder={t("auth.phone")} aria-label={t("auth.phone")} className={inputClass} />
            <input name="address" value={form.address} onChange={change} placeholder={t("auth.address")} aria-label={t("auth.address")} className={inputClass} />
            <input required type="password" name="password" minLength={8} value={form.password} onChange={change} placeholder={t("auth.password")} aria-label={t("auth.password")} className={inputClass} />
            <input required type="password" name="confirmPassword" minLength={8} value={form.confirmPassword} onChange={change} placeholder={t("auth.confirmPassword")} aria-label={t("auth.confirmPassword")} className={inputClass} />
            <button disabled={busy} className="w-full rounded-lg bg-[#16863D] px-4 py-3 font-semibold text-white disabled:opacity-50">
              {busy ? t("common.loading") : t("auth.register")}
            </button>
            <p className="text-center text-sm text-gray-500">
              {t("auth.haveAccount")}{" "}
              <button type="button" onClick={() => { setMode("login"); setStatus(null); }} className="font-semibold text-[#16863D] hover:underline">
                {t("auth.switchToLogin")}
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={submitLogin} className="mt-6 space-y-4">
            <input required type="email" name="email" value={form.email} onChange={change} placeholder={t("auth.email")} aria-label={t("auth.email")} className={inputClass} />
            <input required type="password" name="password" value={form.password} onChange={change} placeholder={t("auth.password")} aria-label={t("auth.password")} className={inputClass} />
            <button disabled={busy} className="w-full rounded-lg bg-[#062B63] px-4 py-3 font-semibold text-white disabled:opacity-50">
              {busy ? t("common.loading") : t("auth.login")}
            </button>
            <p className="text-center text-sm text-gray-500">
              {t("auth.noAccount")}{" "}
              <button type="button" onClick={() => { setMode("register"); setStatus(null); }} className="font-semibold text-[#16863D] hover:underline">
                {t("auth.switchToRegister")}
              </button>
            </p>
            <p className="rounded-lg bg-[#EAF7EF] p-3 text-center text-xs text-[#0f6d30]">{t("auth.guestNote")}</p>
          </form>
        )}
      </div>
    </div>
  );
}
