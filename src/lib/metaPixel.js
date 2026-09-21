export function trackMetaEvent(eventName, parameters = {}, custom = false) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(custom ? "trackCustom" : "track", eventName, parameters);
}

export function productEventData(product, quantity = 1) {
  return {
    content_ids: [String(product.id || product._id)],
    content_name: product.name || product.title,
    content_type: "product",
    value: Number(product.price || 0) * quantity,
    currency: "BDT",
  };
}
