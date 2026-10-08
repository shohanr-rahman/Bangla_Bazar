import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-base-200">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div className="text-center md:text-left">
          <p className="mb-2 text-sm font-semibold text-primary">
            🛒 বাজার দর · প্রতিদিনের আপডেট
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 opacity-80">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6">
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center">
          <Image
            src="/hero-basket.png"
            alt="ফলের ঝুড়ি"
            width={315}
            height={263}
            priority
            className="h-auto w-64 sm:w-80 md:w-full md:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
}