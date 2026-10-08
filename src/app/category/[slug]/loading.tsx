export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="skeleton h-14 w-14" />
        <div className="skeleton h-8 w-40" />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <div className="skeleton h-5 w-28" />
        <div className="skeleton h-10 w-48" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-2xl border border-base-300 p-4"
          >
            <div className="skeleton h-14 w-14" />
            <div className="skeleton h-5 w-2/3" />
            <div className="skeleton h-4 w-1/3" />
            <div className="skeleton h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}