export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="skeleton h-9 w-56" />
      <div className="skeleton mb-6 mt-2 h-4 w-72" />
      <div className="skeleton mb-6 h-10 w-48" />
      <div className="skeleton h-48 w-full" />
    </div>
  );
}