import { Card } from "@/components/common/Card/Card";

export function PostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="animate-pulse space-y-4 p-0">
          <div className="aspect-[16/9] w-full rounded-t-2xl bg-zinc-100 dark:bg-zinc-900" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-[75%] rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
            <div className="h-3 w-5/6 rounded bg-zinc-100 dark:bg-zinc-900" />
          </div>
        </Card>
      ))}
    </div>
  );
}
