import Link from "next/link";

const btn =
  "inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800";

export type PaginationProps = {
  page: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string | undefined>;
};

function buildHref(
  page: number,
  basePath: string,
  query?: PaginationProps["query"],
) {
  const params = new URLSearchParams();
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({ page, totalPages, basePath, query }: PaginationProps) {
  if (totalPages <= 1) return null;
  const prev = Math.max(1, page - 1);
  const next = Math.min(totalPages, page + 1);

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800"
      aria-label="Pagination"
    >
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {page} of {totalPages}
      </div>
      <div className="flex gap-2">
        <Link
          href={buildHref(prev, basePath, query)}
          className={btn}
          aria-disabled={page <= 1}
          tabIndex={page <= 1 ? -1 : undefined}
          prefetch={false}
        >
          Previous
        </Link>
        <Link
          href={buildHref(next, basePath, query)}
          className={btn}
          aria-disabled={page >= totalPages}
          tabIndex={page >= totalPages ? -1 : undefined}
          prefetch={false}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
