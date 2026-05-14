"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback } from "react";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { selectAuthUser, selectIsAuthenticated } from "@/store/selectors/authSelectors";
import { setThemePreference } from "@/store/slices/uiSlice";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function ThemeToggleInner() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();

  const cycle = useCallback(() => {
    const order = ["system", "light", "dark"] as const;
    const idx = order.indexOf((theme as (typeof order)[number]) ?? "system");
    const next = order[(idx + 1) % order.length];
    setTheme(next);
    dispatch(setThemePreference(next));
  }, [dispatch, setTheme, theme]);

  return (
    <button
      type="button"
      onClick={cycle}
      className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
      aria-label="Toggle color theme"
    >
      Theme: {theme ?? "system"}
    </button>
  );
}

export const Navbar = memo(function Navbar() {
  const pathname = usePathname();
  const user = useAppSelector(selectAuthUser);
  const isAuthed = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          BlogApp
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === l.href
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={user ? `/profile/${user.id}` : "/login"}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Profile
          </Link>
        </nav>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ThemeToggleInner />
          {isAuthed ? (
            <>
              <span className="hidden text-sm text-zinc-600 sm:inline dark:text-zinc-400">
                {user?.firstName} {user?.lastName}
              </span>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Dashboard
              </Link>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                onClick={() => dispatch(logout())}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
});
