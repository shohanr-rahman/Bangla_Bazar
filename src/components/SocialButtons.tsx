"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({
  callbackURL = "/",
}: {
  callbackURL?: string;
}) {
  async function handle(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL,
    });
    if (error) toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => handle("google")}
        className="btn btn-outline w-full"
      >
        Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => handle("github")}
        className="btn btn-outline w-full"
      >
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}