import { getProducts } from "@/lib/api";
import { changeInfo, formatPrice, shortUnit } from "@/lib/bangla";
import type { Product } from "@/lib/types";

export default async function PriceTicker() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    // API না পেলে ticker দেখাবে না
  }
  if (products.length === 0) return null;

  // দুইবার বসানো হয়েছে যাতে scroll কখনো থামে না (infinite)
  const items = [...products, ...products];

  return (
    <div
      className="marquee overflow-hidden border-b border-base-300 bg-base-200 py-2 text-sm"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="marquee-track">
        {items.map((p, i) => {
          const change = changeInfo(p.change);
          return (
            <span
              key={`${p.id}-${i}`}
              className="mx-5 inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span>
                {formatPrice(p.today)} টাকা/{shortUnit(p.unit)}
              </span>
              <span className={`font-semibold ${change.className}`}>
                {change.text}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}