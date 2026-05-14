import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPostByIdServer } from "@/lib/server/posts";
import { PostDetailHeader } from "@/components/blog/PostDetail/PostDetailHeader";
import { CommentSectionDynamic } from "@/components/blog/CommentSection/CommentSectionDynamic";
import { PostCacheHydrator } from "@/components/blog/PostCacheHydrator";
import { CommentsSkeleton } from "@/components/blog/CommentsSkeleton";
import type { Post } from "@/types";

export const revalidate = 3600;

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

function buildArticleJsonLd(post: Post, canonical: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    articleBody: post.body,
    identifier: post.id,
    author: {
      "@type": "Person",
      name: `User #${post.userId}`,
    },
    datePublished: new Date().toISOString(),
    mainEntityOfPage: canonical,
    image: `https://picsum.photos/seed/post-${post.id}/1200/600`,
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const pid = Number(id);
  if (!Number.isFinite(pid)) {
    return { title: "Post not found" };
  }
  const post = await fetchPostByIdServer(pid);
  if (!post) {
    return { title: "Post not found" };
  }
  const description = post.body.slice(0, 160);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = `${site}/blog/${post.id}`;
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url,
      images: [
        {
          url: `https://picsum.photos/seed/post-${post.id}/1200/600`,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const pid = Number(id);
  if (!Number.isFinite(pid)) {
    notFound();
  }

  const post = await fetchPostByIdServer(pid);
  if (!post) {
    notFound();
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const canonical = `${site}/blog/${post.id}`;
  const jsonLd = buildArticleJsonLd(post, canonical);

  return (
    <article className="space-y-10">
      <script
        type="application/ld+json"
        // JSON-LD for rich results
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostCacheHydrator post={post} />
      <PostDetailHeader post={post} />
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentSectionDynamic postId={post.id} />
      </Suspense>
    </article>
  );
}
