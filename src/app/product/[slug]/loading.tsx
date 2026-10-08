export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton mb-5 h-5 w-64" />
      <div className="skeleton h-48 w-full" />
      <div className="skeleton mb-4 mt-8 h-7 w-48" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-24 w-full" />
      </div>
      <div className="skeleton mt-8 h-72 w-full" />
    </div>
  );
}