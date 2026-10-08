import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { auth } from "@/lib/auth";
import {
  changeInfo,
  formatPrice,
  shortUnit,
  toBn,
  unitLabel,
} from "@/lib/bangla";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Protected route: login না থাকলে Sign In পাতায় পাঠাবে
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/signin?auth=required&next=${encodeURIComponent(`/product/${slug}`)}`
    );
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const rows = (product.markets ?? []).map((m) => ({
    ...m,
    avg: Math.round((m.min + m.max) / 2),
  }));

  const minPrice = rows.length
    ? Math.min(...rows.map((r) => r.min))
    : product.today;
  const maxPrice = rows.length
    ? Math.max(...rows.map((r) => r.max))
    : product.today;
  const avgPrice = rows.length
    ? Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length)
    : product.today;

  const change = changeInfo(product.change);
  const diff = product.today - product.yesterday;
  const sentence =
    diff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatPrice(diff)} টাকা`
      : diff < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatPrice(Math.abs(diff))} টাকা`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm opacity-80">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="font-semibold">{product.nameBn}</span>
      </nav>

      {/* Summary */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-5xl">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                {product.nameBn}
              </h1>
              <p className="mt-1 text-sm opacity-70">
                {unitLabel(product.unit)} · {product.categoryNameBn}
              </p>
              <p className="mt-1 text-sm opacity-80">
                {rows.length > 0
                  ? `${toBn(rows.length)}টি বাজারের তথ্য অনুযায়ী আজকের গড় দাম ${formatPrice(avgPrice)} টাকা।`
                  : "আজকের বাজারদর।"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="badge badge-primary badge-outline"
                >
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <span className="badge badge-ghost">
                  {unitLabel(product.unit)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-base-200 p-4 md:min-w-64">
            <p className="text-sm opacity-70">আজকের দাম</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-4xl font-bold">
                {formatPrice(product.today)}
              </span>
              <span className="pb-1 text-sm">
                টাকা / {shortUnit(product.unit)}
              </span>
              <span
                className={`mb-1 rounded-full px-2.5 py-1 text-sm font-semibold ${change.badgeClass}`}
              >
                {change.text}
              </span>
            </div>
            <p className="mt-2 text-sm opacity-80">{sentence}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-base-300 pt-4 text-center text-sm">
          <div>
            <p className="opacity-60">গতকাল</p>
            <p className="font-semibold">{formatPrice(product.yesterday)} টাকা</p>
          </div>
          <div>
            <p className="opacity-60">গত সপ্তাহ</p>
            <p className="font-semibold">{formatPrice(product.lastWeek)} টাকা</p>
          </div>
          <div>
            <p className="opacity-60">গত মাস</p>
            <p className="font-semibold">{formatPrice(product.lastMonth)} টাকা</p>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-base-300 p-4">
            <p className="text-sm opacity-70">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-success">
              {formatPrice(minPrice)} টাকা
            </p>
          </div>
          <div className="rounded-2xl border border-base-300 p-4">
            <p className="text-sm opacity-70">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-error">
              {formatPrice(maxPrice)} টাকা
            </p>
          </div>
          <div className="rounded-2xl border border-base-300 p-4">
            <p className="text-sm opacity-70">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold">
              {formatPrice(avgPrice)} টাকা
            </p>
          </div>
        </div>
      </section>

      {/* Market table */}
      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {rows.length === 0 ? (
          <p className="rounded-xl bg-base-200 p-6 text-center opacity-70">
            বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="table">
              <thead className="bg-base-200">
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.market}-${r.division}`}>
                    <td className="whitespace-nowrap font-medium">{r.market}</td>
                    <td className="whitespace-nowrap">{r.division}</td>
                    <td className="text-right">{formatPrice(r.min)}</td>
                    <td className="text-right">{formatPrice(r.max)}</td>
                    <td className="text-right font-semibold">
                      {formatPrice(r.avg)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}