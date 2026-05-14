"use client";

import { memo, useCallback } from "react";
import { PostCard } from "@/components/blog/PostCard/PostCard";
import type { Post } from "@/types";

export type PostListProps = {
  posts: Post[];
};

export const PostList = memo(function PostList({ posts }: PostListProps) {
  const render = useCallback(
    (post: Post) => <PostCard key={post.id} post={post} />,
    [],
  );

  if (!posts.length) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
        No posts match your filters yet.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map(render)}</div>
  );
});
