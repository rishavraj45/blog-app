import type { Metadata } from "next";
import { Card } from "@/components/common/Card/Card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how this DevBlog demo is architected.",
  openGraph: {
    title: "About DevBlog",
    description: "Learn how this DevBlog demo is architected.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          About this project
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Built to showcase modern React craftsmanship
        </h1>
        <p className="max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
          DevBlog stitches together the App Router, server-rendered data from
          DummyJSON, incremental revalidation windows, and a Redux Toolkit +
          Saga layer for predictable side effects. Client navigation layers on
          localStorage caching so previously visited content stays usable when
          the network drops.
        </p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            What you will find
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>JWT auth backed by DummyJSON with axios interceptors</li>
            <li>Redux slices for auth, posts, comments, and UI chrome</li>
            <li>Sagas using takeLatest, call, put, select, and fork</li>
            <li>Middleware-protected admin dashboard route</li>
            <li>next/image, next/font, metadata, and skeleton states</li>
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Tech stack
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Next.js 16, React 19, Tailwind CSS v4, Redux Toolkit, Redux-Saga,
            Reselect, react-hot-toast, next-themes, and axios — all wired for
            traceability in Redux DevTools.
          </p>
        </Card>
      </div>
    </div>
  );
}
