export default function BlogPostLoading() {
  return (
    <div className="space-y-8">
      <div className="aspect-[21/9] w-full animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
      <div className="space-y-3">
        <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-full max-w-2xl animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full max-w-3xl animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="h-4 w-full max-w-3xl animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      </div>
    </div>
  );
}
