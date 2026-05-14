import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Authenticate against DummyJSON to unlock the dashboard.",
  openGraph: {
    title: "Sign in · BlogApp",
    url: "/login",
  },
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 text-center sm:text-left">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Sign in
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          DummyJSON issues short-lived JWTs. Tokens persist to localStorage and
          sync into axios automatically.
        </p>
        <p className="mt-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/70 p-3 text-xs text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
          <span className="font-semibold">Demo credentials:</span> emilys /
          emilyspass
        </p>
      </div>
      <Suspense
        fallback={<p className="text-sm text-zinc-500">Preparing form…</p>}
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
