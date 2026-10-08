"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password) {
      return fail("সব ঘর পূরণ করুন");
    }
    if (password.length < 6) {
      return fail("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
    }

    setLoading(true);
    const { error: authError } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (authError) {
      const exists = /exist/i.test(authError.message ?? "");
      return fail(
        exists
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে"
          : "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"
      );
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">সাইন আপ</h1>
        <p className="mt-1 text-sm opacity-70">নতুন অ্যাকাউন্ট তৈরি করুন</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="input w-full"
              autoComplete="name"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">ইমেইল</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input w-full"
              autoComplete="email"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষর"
              className="input w-full"
              autoComplete="new-password"
            />
          </label>

          {error && (
            <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "সাইন আপ"
            )}
          </button>
        </form>

        <div className="divider text-xs opacity-60">অথবা</div>
        <SocialButtons />

        <p className="mt-6 text-center text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
}