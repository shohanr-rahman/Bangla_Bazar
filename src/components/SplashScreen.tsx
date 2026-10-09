"use client";

import { useEffect, useState } from "react";

const DURATION = 3000; // কত মিলিসেকেন্ড দেখাবে (৩০০০ = ৩ সেকেন্ড)

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const dotTimer = setInterval(() => setDots((d) => (d + 1) % 7), 350);
    const fadeTimer = setTimeout(() => setFading(true), DURATION);
    const hideTimer = setTimeout(() => setVisible(false), DURATION + 500);

    return () => {
      clearInterval(dotTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base-100 px-4 text-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-6xl">🛒</p>
      <h1 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
        বাংলা বাজার
      </h1>
            <p className="mt-3 text-base opacity-70">Made by</p>
      <p className="text-4xl font-bold sm:text-5xl">সোহান
</p>

      <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-base-300">
        <div className="splash-bar h-full rounded-full bg-primary" />
      </div>

      <p className="mt-5 font-medium">Please wait</p>
      <p className="mt-1 text-sm opacity-70">
        Loading
        <span className="inline-block w-8 text-left">{".".repeat(dots)}</span>
      </p>
    </div>
  );
}