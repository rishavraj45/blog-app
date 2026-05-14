import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchPostsPageServer } from "@/lib/server/posts";
import { POSTS_PAGE_SIZE } from "@/utils/constants";
import { PostList } from "@/components/blog/PostList/PostList";
import { BlogCacheHydrator } from "@/components/blog/BlogCacheHydrator";
import { BlogSearchForm } from "@/components/blog/BlogSearchForm";
import { Pagination } from "@/components/common/Pagination/Pagination";

export const revalidate = 3600;

type BlogPageProps = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q?.trim();
  const title = q ? `Blog search · “${q}”` : "Blog";
  return {
    title,
    description: q
      ? `Search results for “${q}” powered by DummyJSON.`
      : "Paginated DummyJSON posts with Redux-powered caching.",
    openGraph: {
      title: `${title} · DevBlog`,
      description: q
        ? `Search results for “${q}” powered by DummyJSON.`
        : "Paginated DummyJSON posts with Redux-powered caching.",
      url: "/blog",
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const q = sp.q?.trim() || undefined;
  const skip = (page - 1) * POSTS_PAGE_SIZE;

  const data = await fetchPostsPageServer({
    skip,
    limit: POSTS_PAGE_SIZE,
    q,
  });

  const totalPages = Math.max(1, Math.ceil(data.total / POSTS_PAGE_SIZE));

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          Blog archive
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Stories from DummyJSON
        </h1>
        <p className="max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
          Server-rendered for SEO, hydrated into Redux for instant interactions,
          and cached locally with a rolling one-hour freshness window.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="h-24 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
        }
      >
        <BlogSearchForm />
      </Suspense>

      <BlogCacheHydrator data={data} />
      <PostList posts={data.posts} />
      <Pagination
        page={page}
        totalPages={totalPages}
        basePath="/blog"
        query={{ q }}
      />
    </div>
  );
}
