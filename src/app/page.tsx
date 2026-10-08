import { getCategories, getProducts } from "@/lib/api";
import { banglaToday, toBn } from "@/lib/bangla";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-bold text-primary">🛒 বাজার দর</h1>
      <p className="text-sm opacity-70">{banglaToday()}</p>
      <p className="mt-4">
        {toBn(products.length)}টি পণ্য, {toBn(categories.length)}টি ক্যাটাগরি
      </p>
    </main>
  );
}