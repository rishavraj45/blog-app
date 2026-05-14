import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Protected admin surface for authenticated editors.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 dark:border-emerald-900/50 dark:bg-emerald-950/30">
      <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">
        Hello admin
      </h1>
      <p className="text-sm text-emerald-900/80 dark:text-emerald-100/80">
        You have passed middleware-protected routing.
      </p>
    </div>
  );
}
