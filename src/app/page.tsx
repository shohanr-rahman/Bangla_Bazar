import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bangla";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up" && p.change.pct !== 0)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down" && p.change.pct !== 0)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <>
      <Hero />
      <ProductSection title="আজ দাম বেড়েছে ▲" products={risers} />
      <ProductSection title="আজ দাম কমেছে ▼" products={fallers} />
      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
}