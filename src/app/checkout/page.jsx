"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { useShop } from "../common/ShopContext";
import { storeRequest } from "../../lib/storeApi";
import { useStoreCatalog } from "../common/StoreCatalogContext";
import { useStoreAuth } from "../common/StoreAuthContext";
import { trackMetaEvent } from "../../lib/metaPixel";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const { cart, removeFromCart } = useShop();
  const { products } = useStoreCatalog();
  const { user } = useStoreAuth();
  const [form, setForm] = useState({ phone: "", address: "", city: "", district: "", postcode: "", paymentMethod: "cashOnDelivery" });
  const [status, setStatus] = useState("");

    const selectedProductId = useMemo(() => {
    const value = searchParams.get("product");
    return value || null;
  }, [searchParams]);

  const items = useMemo(() => {
    const selected = products.find((product) => product.id === selectedProductId);
    return selected && !cart.some((item) => item.id === selectedProductId)
      ? [{ ...selected, quantity: 1 }, ...cart]
      : cart;
  }, [cart, products, selectedProductId]);

  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const checkoutContentIds = useMemo(() => items.map((item) => String(item.id)), [items]);

  useEffect(() => {
    if (checkoutContentIds.length) trackMetaEvent("InitiateCheckout", { content_ids: checkoutContentIds, num_items: checkoutContentIds.length, value: total, currency: "BDT" });
  }, [checkoutContentIds, total]);

  const placeOrder = async (event) => {
    event.preventDefault();
    setStatus("Placing order...");
    try {
      const order = await storeRequest("/checkout/checkout_order", {
        method: "POST",
        body: JSON.stringify({
          user: user?._id,
          paymentMethod: form.paymentMethod,
          shipping: { phone: form.phone, address: form.address, city: form.city, district: form.district, postcode: form.postcode },
          items: items.map((item) => ({ product: item.id, variant: item.variant?._id, quantity: item.quantity || 1 })),
        }),
      });
      trackMetaEvent("Purchase", { content_ids: checkoutContentIds, num_items: checkoutContentIds.length, value: total, currency: "BDT", order_id: order?._id || order?.transaction_id });
      items.forEach((item) => removeFromCart(item.id));
      setStatus("Order placed successfully.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <main className="bg-gray-50 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-4xl px-4">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <ArrowLeft size={16} />
          Continue shopping
        </Link>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" size={28} />
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  No items in cart yet.
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-bold text-blue-600 dark:text-blue-400">
                      ৳{(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-950">
              <div className="flex items-center gap-2 text-lg font-bold">
                <ShoppingBag size={20} />
                Order Summary
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>৳0</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={placeOrder} className="mt-6 space-y-3">
                {!user && <p className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">Please login before placing an order.</p>}
                <input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone" className="w-full rounded-lg border p-3" />
                <input required value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} placeholder="Address" className="w-full rounded-lg border p-3" />
                <div className="grid grid-cols-2 gap-2"><input required value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} placeholder="City" className="w-full rounded-lg border p-3" /><input required value={form.district} onChange={(event) => setForm({ ...form, district: event.target.value })} placeholder="District" className="w-full rounded-lg border p-3" /></div>
                <input value={form.postcode} onChange={(event) => setForm({ ...form, postcode: event.target.value })} placeholder="Postcode" className="w-full rounded-lg border p-3" />
                <select value={form.paymentMethod} onChange={(event) => { const paymentMethod = event.target.value; setForm({ ...form, paymentMethod }); trackMetaEvent("AddPaymentInfo", { payment_method: paymentMethod, value: total, currency: "BDT" }); }} className="w-full rounded-lg border p-3"><option value="cashOnDelivery">Cash on delivery</option><option value="online">Online payment</option></select>
                <button disabled={!items.length || !user} className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">Place Order</button>
                {status && <p className="text-sm text-gray-600">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
