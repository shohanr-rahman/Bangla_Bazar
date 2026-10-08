import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategory, getProducts } from "@/lib/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  // ভুল slug হলে 404 page দেখাবে
  if (!category || !category.slug) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-base-200 text-3xl">
          {category.icon}
        </span>
        <h1 className="text-2xl font-bold sm:text-3xl">{category.nameBn}</h1>
      </div>

      <CategoryProducts products={products} />
    </div>
  );
}