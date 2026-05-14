import { Card } from "@/components/common/Card/Card";

export function CommentsSkeleton() {
  return (
    <Card className="mt-10 animate-pulse space-y-4 p-6">
      <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="h-3 w-[92%] rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="h-24 w-full rounded-xl bg-zinc-50 dark:bg-zinc-900/60" />
    </Card>
  );
}
