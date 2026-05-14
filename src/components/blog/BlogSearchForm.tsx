"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
  memo,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/common/Button/Button";

export const BlogSearchForm = memo(function BlogSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();
      if (trimmed) params.set("q", trimmed);
      else params.delete("q");
      params.delete("page");
      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `/blog?${qs}` : "/blog");
      });
    },
    [router, searchParams, value],
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 sm:flex-row sm:items-end"
    >
      <label className="flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Search posts
        <input
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Try “love”, “music”, or “history”"
          name="q"
        />
      </label>
      <Button type="submit" variant="secondary" isLoading={pending}>
        Search
      </Button>
    </form>
  );
});
