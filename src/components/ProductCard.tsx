import Link from "next/link";
import { changeInfo, formatPrice, unitLabel } from "@/lib/bangla";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const change = changeInfo(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
    >
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-base-200 text-3xl">
        {product.image}
      </div>
      <h3 className="text-lg font-semibold group-hover:text-primary">
        {product.nameBn}
      </h3>
      <p className="text-sm opacity-70">{unitLabel(product.unit)}</p>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-base-300 pt-3">
        <div>
          <p className="text-xs opacity-60">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(product.today)} টাকা</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-sm font-semibold ${change.badgeClass}`}
        >
          {change.text}
        </span>
      </div>
    </Link>
  );
}