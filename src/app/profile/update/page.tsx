import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileTabs from "@/components/ProfileTabs";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { auth } from "@/lib/auth";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(
      `/signin?auth=required&next=${encodeURIComponent("/profile/update")}`
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold sm:text-3xl">আমার প্রোফাইল</h1>
      <p className="mb-6 mt-1 text-sm opacity-70">
        আপনার নাম পরিবর্তন করুন।
      </p>

      <ProfileTabs active="update" />

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
        <UpdateProfileForm initialName={session.user.name} />
      </div>
    </div>
  );
}