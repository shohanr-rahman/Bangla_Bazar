"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  function closeMenu() {
    (document.activeElement as HTMLElement | null)?.blur();
  }

  async function handleSignOut() {
    closeMenu();
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return <div className="skeleton h-9 w-36 sm:h-12" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="btn btn-outline btn-primary btn-sm sm:btn-md"
        >
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;
  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-circle btn-primary btn-sm text-base sm:btn-md"
        aria-label="প্রোফাইল মেনু"
      >
        {initial}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-2 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <li className="pointer-events-none px-3 py-2">
          <span className="block font-semibold">{user.name}</span>
          <span className="block break-all text-xs opacity-60">{user.email}</span>
        </li>
        <li>
          <Link href="/profile" onClick={closeMenu}>
            প্রোফাইল
          </Link>
        </li>
        <li>
          <button type="button" onClick={handleSignOut}>
            সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}