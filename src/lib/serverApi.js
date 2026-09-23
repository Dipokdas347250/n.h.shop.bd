import { normalizeProduct } from "./storeApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/api";

/**
 * Server-side read of a public endpoint.
 *
 * Returns `null` instead of throwing: if the API is slow or down we still want
 * to send the page, and the client component re-fetches once it hydrates.
 */
async function fetchPublic(path) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      // Product and category pages change when the dashboard changes them, so
      // keep the window short rather than caching indefinitely.
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload?.success === false ? null : payload?.data ?? null;
  } catch {
    return null;
  }
}

/** One product, looked up by slug first and then by database id. */
export async function getProduct(identifier) {
  const data =
    (await fetchPublic(`/mainproduct/single-product/${encodeURIComponent(identifier)}`)) ??
    (await fetchPublic(`/mainproduct/product/${encodeURIComponent(identifier)}`));
  return data ? normalizeProduct(data) : null;
}

/** A category and everything in it, looked up by slug. */
export async function getCategory(slug) {
  const data = await fetchPublic(`/mainproduct/category/${encodeURIComponent(slug)}`);
  if (!data?.category) return null;
  return { category: data.category, products: (data.products || []).map(normalizeProduct) };
}
