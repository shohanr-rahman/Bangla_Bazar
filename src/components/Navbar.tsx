import Link from "next/link";
import { getCategories } from "@/lib/api";
import { banglaToday } from "@/lib/bangla";
import type { Category } from "@/lib/types";
import AuthButtons from "./AuthButtons";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {
    // API না পেলে শুধু link গুলো খালি থাকবে
  }

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-2 py-3">
          <Link href="/" className="min-w-0 leading-tight">
            <span className="block whitespace-nowrap text-xl font-bold text-primary sm:text-2xl">
              🛒 বাজার দর
            </span>
            <span className="block truncate text-xs opacity-70 sm:text-sm">
              {banglaToday()}
            </span>
          </Link>
          <div className="shrink-0">
            <AuthButtons />
          </div>
        </div>
        <NavLinks categories={categories} />
      </div>
    </header>
  );
}