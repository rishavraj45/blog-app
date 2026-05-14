import { createSelector } from "reselect";
import type { RootState } from "@/store/rootReducer";

export const selectPostsState = (state: RootState) => state.posts;

export const selectPostsItems = createSelector(
  selectPostsState,
  (posts) => posts.items,
);

export const selectPostsPagination = createSelector(
  selectPostsState,
  (posts) => {
    const pageSize = posts.limit || 1;
    const page = Math.floor(posts.skip / pageSize) + 1;
    const totalPages = Math.max(1, Math.ceil(posts.total / pageSize));
    return {
      page,
      totalPages,
      total: posts.total,
      skip: posts.skip,
      limit: posts.limit,
    };
  },
);

export const selectCurrentPost = createSelector(
  selectPostsState,
  (posts) => posts.currentPost,
);

export const selectPostsListStatus = createSelector(
  selectPostsState,
  (posts) => posts.status,
);

export const selectPostsListError = createSelector(
  selectPostsState,
  (posts) => posts.error,
);

export const selectSearchQuery = createSelector(
  selectPostsState,
  (posts) => posts.searchQuery,
);

export const selectFeaturedFromList = createSelector(selectPostsItems, (items) =>
  items.slice(0, 6),
);

export const selectCommentsForPost = (postId: number) => (state: RootState) =>
  state.comments.byPostId[postId];
