import CategoryResolver from "./CategoryResolver";
import CategoryView from "./CategoryView";
import { getCategory } from "../../../lib/serverApi";

/** One category and its products, rendered on the server where possible. */
export async function generateMetadata({ params }) {
  const data = await getCategory((await params).id);
  if (!data) return { title: "N H Shop" };

  return {
    title: `${data.category.name} | N H Shop`,
    description: `Shop ${data.category.name} at N H Shop.`,
  };
}

export default async function FeaturedCategoryPage({ params }) {
  const data = await getCategory((await params).id);
  if (!data) return <CategoryResolver />;
  return <CategoryView category={data.category} products={data.products} />;
}
