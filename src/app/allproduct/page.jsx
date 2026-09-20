import { Suspense } from "react";
import AllProducts from "@/components/home/AllProducts";

export default async function AllProductsPage({ searchParams }) {
  const params = await searchParams;
  const initialSearch = typeof params?.query === "string" ? params.query : "";

  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading products...</div>}>
      <AllProducts initialSearch={initialSearch} />
    </Suspense>
  );
}