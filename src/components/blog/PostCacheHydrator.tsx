"use client";

import { useLayoutEffect } from "react";
import { useAppDispatch } from "@/store";
import { hydratePostFromServer } from "@/store/slices/postsSlice";
import type { Post } from "@/types";

export function PostCacheHydrator({ post }: { post: Post }) {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(hydratePostFromServer(post));
  }, [dispatch, post]);
  return null;
}
