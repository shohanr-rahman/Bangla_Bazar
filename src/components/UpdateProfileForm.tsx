"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      const msg = "নাম লিখুন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error: updateError } = await authClient.updateUser({
      name: name.trim(),
    });
    setLoading(false);

    if (updateError) {
      const msg = "তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {error && (
        <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary w-full">
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          "তথ্য আপডেট করুন"
        )}
      </button>
    </form>
  );
}