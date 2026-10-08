import Link from "next/link";

export default function ProfileTabs({ active }: { active: "info" | "update" }) {
  return (
    <div role="tablist" className="tabs tabs-border mb-6">
      <Link
        role="tab"
        href="/profile"
        className={`tab ${active === "info" ? "tab-active font-semibold" : ""}`}
      >
        তথ্য
      </Link>
      <Link
        role="tab"
        href="/profile/update"
        className={`tab ${active === "update" ? "tab-active font-semibold" : ""}`}
      >
        আপডেট
      </Link>
    </div>
  );
}