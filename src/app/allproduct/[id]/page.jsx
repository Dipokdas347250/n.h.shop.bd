"use client";

import { notFound, useParams } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { useStoreCatalog } from "../../common/StoreCatalogContext";

export default function AllProductDetailPage() {
  const params = useParams();
  const { products, loading } = useStoreCatalog();
  const product = products.find((item) => item.id === params?.id);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading product...</div>;
  if (!product) return notFound();
  return <ProductDetailClient product={product} />;
}
