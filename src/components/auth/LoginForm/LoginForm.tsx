"use client";

import { FormEvent, useState, useCallback, memo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginRequested } from "@/store/slices/authSlice";
import { selectAuthError, selectAuthStatus, selectIsAuthenticated } from "@/store/selectors/authSelectors";
import { Button } from "@/components/common/Button/Button";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { validateLogin } from "@/utils/validators";

export const LoginForm = memo(function LoginForm() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthed = useAppSelector(selectIsAuthenticated);
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthed) return;
    const target = searchParams.get("from") || "/dashboard";
    router.replace(target);
  }, [isAuthed, router, searchParams]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const errs = validateLogin({ username, password });
      setFieldErrors(errs);
      if (Object.keys(errs).length) return;
      dispatch(loginRequested({ username, password }));
    },
    [dispatch, password, username],
  );

  if (isAuthed) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Redirecting…</p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Username
          <input
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </label>
        {fieldErrors.username ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.username}</p>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {fieldErrors.password ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
        ) : null}
      </div>
      {error ? <ErrorMessage message={error} /> : null}
      <Button type="submit" className="w-full" isLoading={status === "loading"}>
        Sign in
      </Button>
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        No account?{" "}
        <Link href="/signup" className="font-medium text-zinc-900 underline dark:text-zinc-100">
          Create one (demo)
        </Link>
      </p>
    </form>
  );
});
