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
  const price = Number(product.price || 0);
  const salePrice = Number(product.diccountprice || product.discountPrice || price);
  const discount = price && salePrice < price ? Math.round(((price - salePrice) / price) * 100) : 0;
  return {
    ...product,
    id: product._id,
    name: product.title,
    category: product.category?.name || product.category || "General",
    categorySlug: product.category?.slug || "",
    image: product.image?.[0] || "/images/image.jpg",
    price: salePrice,
    oldPrice: price,
    discount,
    rating: product.rating || 0,
    reviews: product.review?.length || 0,
    reviewItems: product.review || [],
    variants: product.variant || [],
    description: product.description || "Quality products from N H Shop.",
    features: product.features || [],
  };
}
