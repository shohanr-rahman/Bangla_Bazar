import type { Category, Product } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// প্রথম URL কাজ না করলে দ্বিতীয়টা চেষ্টা করবে। 404 হলে null ফেরত দেবে।
async function request<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { cache: "no-store" });
      if (res.status === 404) return null;
      if (res.ok) return (await res.json()) as T;
    } catch {
      // পরের URL-এ চেষ্টা করবে
    }
  }
  throw new Error("API এখন পাওয়া যাচ্ছে না");
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return (await request<Product[]>(`/products${query}`)) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const list = await request<Product[]>(
    `/products?slug=${encodeURIComponent(slug)}`
  );
  const found = list?.[0];
  if (!found) return null;
  // list-এ markets না থাকলে single endpoint থেকে পুরো data আনবে
  if (!found.markets) {
    return (await request<Product>(`/products/${found.id}`)) ?? found;
  }
  return found;
}

export async function getCategories(): Promise<Category[]> {
  return (await request<Category[]>("/categories")) ?? [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  return request<Category>(`/categories/${encodeURIComponent(slug)}`);
}