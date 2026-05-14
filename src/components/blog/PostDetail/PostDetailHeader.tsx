import type { Post } from "@/types";
import Image from "next/image";

export function PostDetailHeader({ post }: { post: Post }) {
  const src = `https://picsum.photos/seed/post-${post.id}/1200/600`;
  return (
    <div className="space-y-6">
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="space-y-3">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Post #{post.id} · Author user #{post.userId}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {(post.tags ?? []).map((t) => (
            <span
              key={t}
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
      <article>
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          {post.body}
        </p>
      </article>
    </div>
  );
}
