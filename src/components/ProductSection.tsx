import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function ProductSection({
  title,
  subtitle,
  products,
  id,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-32 px-4 py-8">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
      </div>

      {products.length === 0 ? (
        <p className="rounded-xl bg-base-200 p-6 text-center opacity-70">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}