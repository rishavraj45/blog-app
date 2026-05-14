"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/common/Card/Card";

const CommentSection = dynamic(
  () =>
    import("@/components/blog/CommentSection/CommentSection").then((m) => ({
      default: m.CommentSection,
    })),
  {
    loading: () => (
      <Card className="mt-10 animate-pulse space-y-3 p-6">
        <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-3 w-5/6 rounded bg-zinc-100 dark:bg-zinc-900" />
      </Card>
    ),
    ssr: false,
  },
);

export function CommentSectionDynamic({ postId }: { postId: number }) {
  return <CommentSection postId={postId} />;
}
