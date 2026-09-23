import { Suspense } from "react";
import AllProducts from "@/components/home/AllProducts";

export const metadata = {
  title: "All products | সব পণ্য — N H Shop",
};

export default async function AllProductsPage({ searchParams }) {
  const params = await searchParams;
  const initialSearch = typeof params?.query === "string" ? params.query : "";

  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
      <AllProducts initialSearch={initialSearch} />
    </Suspense>
  );
}
