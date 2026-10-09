import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import SplashScreen from "@/components/SplashScreen";
import ToasterProvider from "@/components/ToasterProvider";
import "./globals.css";

// build-এর সময় API লাগবে না, প্রতিবার visitor আসার সময় পাতা বানাবে
export const dynamic = "force-dynamic";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাংলা বাজার",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="bazardor"
      data-scroll-behavior="smooth"
      className={hind.variable}
    >
      <body className="flex min-h-screen flex-col bg-base-100 text-base-content antialiased">
        <SplashScreen />
        <Navbar />
        <PriceTicker />
        <div className="flex-1">{children}</div>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}