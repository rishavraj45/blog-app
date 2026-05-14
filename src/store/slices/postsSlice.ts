import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "@/types";

export type PostsLoadStatus = "idle" | "loading" | "success" | "error";

export type PostsState = {
  items: Post[];
  total: number;
  skip: number;
  limit: number;
  status: PostsLoadStatus;
  error: string | null;
  searchQuery: string;
  currentPost: Post | null;
  currentPostStatus: PostsLoadStatus;
  currentPostError: string | null;
  mutationStatus: PostsLoadStatus;
  mutationError: string | null;
};

const initialState: PostsState = {
  items: [],
  total: 0,
  skip: 0,
  limit: 10,
  status: "idle",
  error: null,
  searchQuery: "",
  currentPost: null,
  currentPostStatus: "idle",
  currentPostError: null,
  mutationStatus: "idle",
  mutationError: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsRequested(
      state,
      action: PayloadAction<{ skip: number; limit: number; query?: string }>,
    ) {
      state.status = "loading";
      state.error = null;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
      if (typeof action.payload.query === "string") {
        state.searchQuery = action.payload.query;
      }
    },
    fetchPostsSucceeded(
      state,
      action: PayloadAction<{
        posts: Post[];
        total: number;
        skip: number;
        limit: number;
      }>,
    ) {
      state.items = action.payload.posts;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
      state.status = "success";
    },
    fetchPostsFailed(state, action: PayloadAction<string>) {
      state.status = "error";
      state.error = action.payload;
    },
    hydratePostsFromServer(
      state,
      action: PayloadAction<{
        posts: Post[];
        total: number;
        skip: number;
        limit: number;
      }>,
    ) {
      state.items = action.payload.posts;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
      state.status = "success";
    },
    fetchPostRequested(state, _action: PayloadAction<number>) {
      state.currentPostStatus = "loading";
      state.currentPostError = null;
    },
    fetchPostSucceeded(state, action: PayloadAction<Post>) {
      state.currentPost = action.payload;
      state.currentPostStatus = "success";
    },
    fetchPostFailed(state, action: PayloadAction<string>) {
      state.currentPostStatus = "error";
      state.currentPostError = action.payload;
    },
    hydratePostFromServer(state, action: PayloadAction<Post>) {
      state.currentPost = action.payload;
      state.currentPostStatus = "success";
      state.currentPostError = null;
    },
    createPostRequested(
      state,
      _action: PayloadAction<{ title: string; body: string }>,
    ) {
      state.mutationStatus = "loading";
      state.mutationError = null;
    },
    createPostSucceeded(state, action: PayloadAction<Post>) {
      state.mutationStatus = "success";
      state.items = [action.payload, ...state.items];
    },
    createPostFailed(state, action: PayloadAction<string>) {
      state.mutationStatus = "error";
      state.mutationError = action.payload;
    },
    updatePostRequested(
      state,
      _action: PayloadAction<{ id: number; title?: string; body?: string }>,
    ) {
      state.mutationStatus = "loading";
      state.mutationError = null;
    },
    updatePostSucceeded(state, action: PayloadAction<Post>) {
      state.mutationStatus = "success";
      state.items = state.items.map((p) =>
        p.id === action.payload.id ? action.payload : p,
      );
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
    },
    updatePostFailed(state, action: PayloadAction<string>) {
      state.mutationStatus = "error";
      state.mutationError = action.payload;
    },
    deletePostRequested(state, _action: PayloadAction<number>) {
      state.mutationStatus = "loading";
      state.mutationError = null;
    },
    deletePostSucceeded(state, action: PayloadAction<number>) {
      state.mutationStatus = "success";
      state.items = state.items.filter((p) => p.id !== action.payload);
      state.total = Math.max(0, state.total - 1);
      if (state.currentPost?.id === action.payload) {
        state.currentPost = null;
      }
    },
    deletePostFailed(state, action: PayloadAction<string>) {
      state.mutationStatus = "error";
      state.mutationError = action.payload;
    },
    clearMutationFeedback(state) {
      state.mutationStatus = "idle";
      state.mutationError = null;
    },
  },
});

export const {
  fetchPostsRequested,
  fetchPostsSucceeded,
  fetchPostsFailed,
  hydratePostsFromServer,
  fetchPostRequested,
  fetchPostSucceeded,
  fetchPostFailed,
  hydratePostFromServer,
  createPostRequested,
  createPostSucceeded,
  createPostFailed,
  updatePostRequested,
  updatePostSucceeded,
  updatePostFailed,
  deletePostRequested,
  deletePostSucceeded,
  deletePostFailed,
  clearMutationFeedback,
} = postsSlice.actions;

export default postsSlice.reducer;
