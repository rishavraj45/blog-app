"use client";

import { useEffect } from "react";
import { Button } from "@/components/common/Button/Button";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
      <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
        Unable to load this article.
      </h2>
      <p className="text-sm text-red-800/90 dark:text-red-200/90">
        {error.message || "Please try again shortly."}
      </p>
      <Button type="button" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
