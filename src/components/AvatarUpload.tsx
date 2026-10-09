"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const MAX_INPUT_MB = 5;
const SIZE = 256;

// ছবি মাঝখান থেকে বর্গাকারে কেটে ২৫৬×২৫৬-এ ছোট করে
function resizeToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("image"));
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const sx = (img.width - side) / 2;
        const sy = (img.height - side) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas"));
        ctx.drawImage(img, sx, sy, side, side, 0, 0, SIZE, SIZE);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function AvatarUpload({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(image ?? null);
  const [loading, setLoading] = useState(false);

  const initial = (name || "?").trim().charAt(0).toUpperCase();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("শুধু ছবির file দিন (JPG, PNG ইত্যাদি)");
      return;
    }
    if (file.size > MAX_INPUT_MB * 1024 * 1024) {
      toast.error(`ছবি ${MAX_INPUT_MB} MB-এর বেশি হতে পারবে না`);
      return;
    }

    setLoading(true);
    try {
      const dataUrl = await resizeToDataUrl(file);
      const { error } = await authClient.updateUser({ image: dataUrl });
      if (error) {
        toast.error("ছবি আপলোড করা যায়নি, আবার চেষ্টা করুন");
        return;
      }
      setPreview(dataUrl);
      toast.success("প্রোফাইল ছবি আপডেট হয়েছে");
      router.refresh();
    } catch {
      toast.error("ছবিটি পড়া যায়নি, অন্য ছবি দিয়ে চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt={name}
            referrerPolicy="no-referrer"
            className="h-24 w-24 rounded-full border border-base-300 object-cover"
          />
        ) : (
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-content">
            {initial}
          </span>
        )}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-base-100/70">
            <span className="loading loading-spinner loading-md" />
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="btn btn-outline btn-primary btn-sm"
      >
        📷 {preview ? "ছবি পরিবর্তন করুন" : "ছবি আপলোড করুন"}
      </button>
    </div>
  );
}