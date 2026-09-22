const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/api";

export async function storeRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    cache: "no-store",
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || "Unable to load store data");
  }
  return payload.data;
}

export function normalizeProduct(product) {
  const originalPrice = Number(product.price ?? 0);
  const salePriceValue = product.discountPrice ?? product.diccountprice ?? originalPrice;
  const parsedSalePrice = Number(salePriceValue);
  const salePrice = Number.isFinite(parsedSalePrice) && parsedSalePrice >= 0 ? parsedSalePrice : originalPrice;
  const price = Math.max(originalPrice, salePrice);
  const discount = price > 0 && salePrice < price ? Math.round(((price - salePrice) / price) * 100) : 0;
  const title = String(product.title || product.name || "Unnamed product").trim();
  const description = String(product.description || "Quality products from N H Shop.").trim();
  const offer = String(product.offer || product.offerText || (discount > 0 ? `${discount}% OFF` : "Special offer")).trim();
  return {
    ...product,
    id: product._id || product.id,
    name: title,
    title,
    category: product.category?.name || product.category || "General",
    categorySlug: product.category?.slug || "",
    image: product.image?.[0] || "/images/image.jpg",
    price: salePrice,
    oldPrice: price,
    discount,
    offer,
    rating: product.rating || 0,
    reviews: product.review?.length || 0,
    reviewItems: product.review || [],
    variants: product.variant || [],
    description,
    features: product.features || [],
  };
}
