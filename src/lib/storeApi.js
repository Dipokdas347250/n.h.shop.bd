const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/api";

/**
 * Error carrying both language variants of the server's message, so the caller
 * can show whichever the visitor is reading.
 */
export class ApiError extends Error {
  constructor(payload, status) {
    super(payload?.message || "Unable to reach the store");
    this.name = "ApiError";
    this.status = status;
    this.messageEn = payload?.message || "Unable to reach the store";
    this.messageBn = payload?.messageBn || this.messageEn;
    this.data = payload?.data;
  }

  /** The message in the requested language. */
  localized(language) {
    return language === "bn" ? this.messageBn : this.messageEn;
  }
}

export async function storeRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      { message: "Unable to reach the store. Check your connection.", messageBn: "দোকানের সাথে সংযোগ করা যাচ্ছে না। ইন্টারনেট সংযোগ দেখুন।" },
      0
    );
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) throw new ApiError(payload, response.status);
  return payload.data;
}

/**
 * Flattens a product from the API into the shape the UI renders, filling in
 * sale price, discount percentage and a usable image.
 */
export function normalizeProduct(product) {
  const originalPrice = Number(product.price ?? 0);
  const rawSalePrice = product.discountPrice ?? product.diccountprice ?? originalPrice;
  const parsedSalePrice = Number(rawSalePrice);
  const salePrice = Number.isFinite(parsedSalePrice) && parsedSalePrice >= 0 ? parsedSalePrice : originalPrice;
  const price = Math.max(originalPrice, salePrice);
  const discount = price > 0 && salePrice < price ? Math.round(((price - salePrice) / price) * 100) : 0;

  const title = String(product.title || product.name || "").trim();
  const description = String(product.description || "").trim();

  return {
    ...product,
    id: product._id || product.id,
    name: title,
    title,
    slug: product.slug || "",
    category: product.category?.name || (typeof product.category === "string" ? product.category : ""),
    categorySlug: product.category?.slug || "",
    image: product.image?.[0] || "/images/image.jpg",
    images: Array.isArray(product.image) && product.image.length ? product.image : ["/images/image.jpg"],
    price: salePrice,
    oldPrice: price,
    discount,
    offer: String(product.offer || "").trim(),
    rating: Number(product.rating || 0),
    reviews: product.review?.length || 0,
    reviewItems: product.review || [],
    variants: product.variant || [],
    sold: Number(product.sold || 0),
    description,
  };
}
