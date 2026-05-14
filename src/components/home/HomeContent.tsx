"use client";

import Link from "next/link";
import type { PostsListResponse } from "@/types";
import { PostList } from "@/components/blog/PostList/PostList";
import { BlogCacheHydrator } from "@/components/blog/BlogCacheHydrator";

const primaryLink =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900";

const secondaryLink =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800";

export function HomeContent({ initial }: { initial: PostsListResponse }) {
  return (
    <>
      <BlogCacheHydrator data={initial} />
      <section className="space-y-6 text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          Next.js + Redux Toolkit + Saga
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Ideas, shipped with modern React patterns.
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          This demo combines streaming-friendly App Router pages, SSR data
          fetches with ISR-style revalidation, client-side Redux state, saga
          orchestration, and offline-first localStorage caching with a one-hour
          TTL.
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
          <Link href="/blog" className={primaryLink}>
            Browse posts
          </Link>
          <Link href="/login" className={secondaryLink}>
            Sign in
          </Link>
        </div>
      </section>
      <section className="mt-14 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Featured posts
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Fresh picks from DummyJSON, hydrated into Redux for instant
              revisits.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-300"
          >
            View full archive
          </Link>
        </div>
        <PostList posts={initial.posts} />
      </section>
    </>
  );
}
