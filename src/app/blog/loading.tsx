import { PostGridSkeleton } from "@/components/blog/PostGridSkeleton";

export default function BlogLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 max-w-md animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 sm:w-2/3" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>
      <PostGridSkeleton />
    </div>
  );
}
