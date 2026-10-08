import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bangla";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold text-primary">🛒 বাজার দর</h1>
      <p className="mt-4">
        {toBn(products.length)}টি পণ্য, {toBn(categories.length)}টি ক্যাটাগরি
      </p>
    </div>
  );
}