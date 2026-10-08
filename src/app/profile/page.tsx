import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileTabs from "@/components/ProfileTabs";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?auth=required&next=${encodeURIComponent("/profile")}`);
  }

  const user = session.user;
  const initial = (user.name || user.email || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
      <p className="mb-6 mt-1 text-sm opacity-70">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <ProfileTabs active="info" />

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-content">
                {initial}
              </span>
            )}
            <div>
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="break-all text-sm opacity-70">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-6 border-t border-base-300 pt-4">
          <Link href="/profile/update" className="btn btn-primary">
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}