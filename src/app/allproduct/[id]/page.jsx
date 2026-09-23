import ProductDetailClient from "./ProductDetailClient";
import ProductResolver from "./ProductResolver";
import { getProduct } from "../../../lib/serverApi";

/**
 * Product detail. The product is fetched on the server so the page arrives
 * with its content already in the HTML; if the API cannot be reached during
 * the render, the client-side resolver takes over.
 */
export async function generateMetadata({ params }) {
  const product = await getProduct((await params).id);
  if (!product) return { title: "N H Shop" };

  return {
    title: `${product.title} | N H Shop`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct((await params).id);
  if (!product) return <ProductResolver />;
  return <ProductDetailClient product={product} />;
}
