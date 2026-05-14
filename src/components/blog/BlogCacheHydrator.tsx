"use client";

import { useLayoutEffect } from "react";
import { useAppDispatch } from "@/store";
import { hydratePostsFromServer } from "@/store/slices/postsSlice";
import type { PostsListResponse } from "@/types";

export function BlogCacheHydrator({ data }: { data: PostsListResponse }) {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(
      hydratePostsFromServer({
        posts: data.posts,
        total: data.total,
        skip: data.skip,
        limit: data.limit,
      }),
    );
  }, [data, dispatch]);
  return null;
}
