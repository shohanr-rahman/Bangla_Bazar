import Link from "next/link";

export default function NotFoundMessage({
  title = "পাতাটি পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <p className="text-7xl font-bold text-primary">৪০৪</p>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-2 opacity-70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}