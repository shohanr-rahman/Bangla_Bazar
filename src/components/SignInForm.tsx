"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";

// শুধু নিজের site-এর ভেতরের path গ্রহণ করে
function safeNext(value: string | null) {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.get("auth") === "required") {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "auth-required" });
    }
  }, [params]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error: authError } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (authError) {
      const msg = "ইমেইল বা পাসওয়ার্ড ভুল";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(next);
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-sm opacity-70">
          আপনার অ্যাকাউন্টে প্রবেশ করুন
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              placeholder="আপনার পাসওয়ার্ড"
              className="input w-full"
              autoComplete="current-password"
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
              "সাইন ইন"
            )}
          </button>
        </form>

        <div className="divider text-xs opacity-60">অথবা</div>
        <SocialButtons callbackURL={next} />

        <p className="mt-6 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
}