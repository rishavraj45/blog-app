"use client";

import { FormEvent, useState, useCallback, memo } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/common/Button/Button";
import { validateSignup } from "@/utils/validators";

export const SignupForm = memo(function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const errs = validateSignup({ username, email, password, confirm });
      setFieldErrors(errs);
      if (Object.keys(errs).length) return;
      toast.success("Demo signup only — use Log in with DummyJSON test user.", {
        duration: 5000,
      });
    },
    [confirm, email, password, username],
  );

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Username
          <input
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {fieldErrors.username ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.username}</p>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {fieldErrors.email ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
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
          />
        </label>
        {fieldErrors.password ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Confirm password
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
        {fieldErrors.confirm ? (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.confirm}</p>
        ) : null}
      </div>
      <Button type="submit" className="w-full">
        Create account (UI only)
      </Button>
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-zinc-900 underline dark:text-zinc-100">
          Log in
        </Link>
      </p>
    </form>
  );
});
