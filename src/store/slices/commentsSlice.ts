import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "@/types";

export type CommentsBucket = {
  items: Comment[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

export type CommentsState = {
  byPostId: Record<number, CommentsBucket>;
  addStatus: "idle" | "loading" | "success" | "error";
  addError: string | null;
};

const emptyBucket = (): CommentsBucket => ({
  items: [],
  status: "idle",
  error: null,
});

const initialState: CommentsState = {
  byPostId: {},
  addStatus: "idle",
  addError: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsRequested(state, action: PayloadAction<number>) {
      const postId = action.payload;
      if (!state.byPostId[postId]) {
        state.byPostId[postId] = emptyBucket();
      }
      state.byPostId[postId].status = "loading";
      state.byPostId[postId].error = null;
    },
    fetchCommentsSucceeded(
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>,
    ) {
      const { postId, comments } = action.payload;
      state.byPostId[postId] = {
        items: comments,
        status: "success",
        error: null,
      };
    },
    fetchCommentsFailed(
      state,
      action: PayloadAction<{ postId: number; message: string }>,
    ) {
      const { postId, message } = action.payload;
      if (!state.byPostId[postId]) {
        state.byPostId[postId] = emptyBucket();
      }
      state.byPostId[postId].status = "error";
      state.byPostId[postId].error = message;
    },
    hydrateCommentsFromCache(
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>,
    ) {
      const { postId, comments } = action.payload;
      state.byPostId[postId] = {
        items: comments,
        status: "success",
        error: null,
      };
    },
    addCommentRequested(
      state,
      _action: PayloadAction<{ postId: number; body: string }>,
    ) {
      state.addStatus = "loading";
      state.addError = null;
    },
    addCommentSucceeded(
      state,
      action: PayloadAction<{ postId: number; comment: Comment }>,
    ) {
      state.addStatus = "success";
      const { postId, comment } = action.payload;
      if (!state.byPostId[postId]) {
        state.byPostId[postId] = emptyBucket();
      }
      const bucket = state.byPostId[postId];
      bucket.items = [...bucket.items, comment];
      bucket.status = "success";
      bucket.error = null;
    },
    addCommentFailed(state, action: PayloadAction<string>) {
      state.addStatus = "error";
      state.addError = action.payload;
    },
    clearAddCommentState(state) {
      state.addStatus = "idle";
      state.addError = null;
    },
  },
});

export const {
  fetchCommentsRequested,
  fetchCommentsSucceeded,
  fetchCommentsFailed,
  hydrateCommentsFromCache,
  addCommentRequested,
  addCommentSucceeded,
  addCommentFailed,
  clearAddCommentState,
} = commentsSlice.actions;

export default commentsSlice.reducer;
