"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/bangla";
import type { Product } from "@/lib/types";
import NotFoundMessage from "./NotFoundMessage";
import ProductCard from "./ProductCard";

type SortKey = "default" | "asc" | "desc";

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState<SortKey>("default");

  // দাম সংখ্যা (number) হিসেবে sort হয়, বাংলা লেখা হিসেবে নয়
  const sorted = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((a, b) =>
      sort === "asc" ? a.today - b.today : b.today - a.today
    );
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <NotFoundMessage
        title="কোনো পণ্য পাওয়া যায়নি"
        message="এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।"
      />
    );
  }

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm opacity-70">
          মোট {toBn(products.length)}টি পণ্য
        </p>

        <label className="flex items-center gap-2 text-sm font-medium">
          সাজান:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="select select-sm sm:select-md"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}