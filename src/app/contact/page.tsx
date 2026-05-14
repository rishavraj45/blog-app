import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out through the demo contact form.",
  openGraph: {
    title: "Contact DevBlog",
    description: "Reach out through the demo contact form.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          Contact
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Let us collaborate
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          This form is intentionally UI-only — no network requests are made when
          you submit.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
