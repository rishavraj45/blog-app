"use client";

import Link from "next/link";
import { memo } from "react";

export const Footer = memo(function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50/80 py-10 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} BlogApp · Powered by DummyJSON.</p>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-100" href="/blog">
            Archive
          </Link>
          <Link className="hover:text-zinc-900 dark:hover:text-zinc-100" href="/contact">
            Contact
          </Link>
          <a
            className="hover:text-zinc-900 dark:hover:text-zinc-100"
            href="https://dummyjson.com/docs"
            target="_blank"
            rel="noreferrer"
          >
            API docs
          </a>
        </div>
      </div>
    </footer>
  );
});
