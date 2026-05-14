import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm/SignupForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Demo signup form with client-side validation only.",
  openGraph: {
    title: "Create account · DevBlog",
    url: "/signup",
  },
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6 text-center sm:text-left">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          DummyJSON does not expose a public signup API. This form exercises
          validation UX only — use the login page with the shared test user.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
