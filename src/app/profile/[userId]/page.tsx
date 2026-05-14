import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPostsByUserServer } from "@/lib/server/posts";
import { PostList } from "@/components/blog/PostList/PostList";
import { BlogCacheHydrator } from "@/components/blog/BlogCacheHydrator";

export const revalidate = 3600;

type ProfilePageProps = {
  params: Promise<{ userId: string }>;
};

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { userId } = await params;
  return {
    title: `Author #${userId}`,
    description: `Posts published by DummyJSON user ${userId}.`,
    openGraph: {
      title: `Author #${userId}`,
      url: `/profile/${userId}`,
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  const id = Number(userId);
  if (!Number.isFinite(id)) {
    notFound();
  }

  const data = await fetchPostsByUserServer(id);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
          Author spotlight
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Posts by user #{id}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {data.total} posts returned from{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-900">
            /posts/user/{id}
          </code>
          .
        </p>
      </header>
      <BlogCacheHydrator data={data} />
      <PostList posts={data.posts} />
    </div>
  );
}
