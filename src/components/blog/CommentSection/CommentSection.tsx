"use client";

import { FormEvent, useEffect, useState, useCallback, memo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  addCommentRequested,
  clearAddCommentState,
  fetchCommentsRequested,
} from "@/store/slices/commentsSlice";
import { selectCommentsForPost } from "@/store/selectors/postsSelectors";
import { Button } from "@/components/common/Button/Button";
import { ErrorMessage } from "@/components/common/ErrorMessage/ErrorMessage";
import { Loader } from "@/components/common/Loader/Loader";

export type CommentSectionProps = {
  postId: number;
};

export const CommentSection = memo(function CommentSection({
  postId,
}: CommentSectionProps) {
  const dispatch = useAppDispatch();
  const bucket = useAppSelector(selectCommentsForPost(postId));
  const addStatus = useAppSelector((s) => s.comments.addStatus);
  const addError = useAppSelector((s) => s.comments.addError);
  const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(fetchCommentsRequested(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (addStatus === "success") {
      setBody("");
      const t = window.setTimeout(() => dispatch(clearAddCommentState()), 1500);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [addStatus, dispatch]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!body.trim()) return;
      dispatch(addCommentRequested({ postId, body: body.trim() }));
    },
    [body, dispatch, postId],
  );

  if (!bucket || bucket.status === "loading") {
    return <Loader label="Loading comments" />;
  }

  if (bucket.status === "error") {
    return <ErrorMessage message={bucket.error ?? "Comments unavailable"} />;
  }

  return (
    <section className="mt-12 space-y-6 border-t border-zinc-200 pt-10 dark:border-zinc-800">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Comments ({bucket.items.length})
      </h2>
      <ul className="space-y-4">
        {bucket.items.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              {c.user.username}
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {c.body}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Add a comment
          <textarea
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your thoughts…"
          />
        </label>
        {addError ? <ErrorMessage message={addError} /> : null}
        <Button type="submit" isLoading={addStatus === "loading"}>
          Post comment
        </Button>
      </form>
    </section>
  );
});
