"use client";

import { FormEvent, useCallback, useState, memo } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/common/Button/Button";
import { validateContact } from "@/utils/validators";

export const ContactForm = memo(function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const next = validateContact({ name, email, message });
      setErrors(next);
      if (Object.keys(next).length) return;
      setSent(true);
      toast.success("Thanks! This demo form does not send data anywhere.");
    },
    [email, message, name],
  );

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
          <input
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
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
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Message
          <textarea
            rows={5}
            className="mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        {errors.message ? (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        ) : null}
      </div>
      {sent ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100">
          Message captured locally for this UI-only demo.
        </p>
      ) : null}
      <Button type="submit" className="w-full">
        Send message
      </Button>
    </form>
  );
});
