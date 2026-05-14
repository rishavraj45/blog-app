"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useMemo } from "react";
import { Card } from "@/components/common/Card/Card";
import type { Post } from "@/types";

export type PostCardProps = {
  post: Post;
};

export const PostCard = memo(function PostCard({ post }: PostCardProps) {
  const imageSrc = useMemo(
    () => `https://picsum.photos/seed/post-${post.id}/800/480`,
    [post.id],
  );

  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden p-0">
      <Link href={`/blog/${post.id}`} className="group flex h-full flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h2 className="text-lg font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
            {post.body}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-2 text-xs text-zinc-500 dark:text-zinc-500">
            {(post.tags ?? []).slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Card>
  );
});
