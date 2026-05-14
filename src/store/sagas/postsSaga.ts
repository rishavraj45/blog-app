import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import toast from "react-hot-toast";
import * as postsService from "@/lib/postsService";
import {
  createPostFailed,
  createPostRequested,
  createPostSucceeded,
  deletePostFailed,
  deletePostRequested,
  deletePostSucceeded,
  fetchPostFailed,
  fetchPostRequested,
  fetchPostSucceeded,
  fetchPostsFailed,
  fetchPostsRequested,
  fetchPostsSucceeded,
  updatePostFailed,
  updatePostRequested,
  updatePostSucceeded,
} from "@/store/slices/postsSlice";
import type { Post, PostsListResponse } from "@/types";
import { isCacheFresh, readCache, writeCache } from "@/utils/helpers";
import { postsListCacheKey } from "@/utils/cacheKeys";
import type { RootState } from "@/store/rootReducer";

type ListPayload = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

function* revalidatePosts(
  action: ReturnType<typeof fetchPostsRequested>,
): SagaIterator {
  try {
    const { skip, limit, query } = action.payload;
    const data: PostsListResponse = query
      ? yield call(postsService.searchPosts, query, { skip, limit })
      : yield call(postsService.fetchPosts, { skip, limit });
    const payload: ListPayload = {
      posts: data.posts,
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
    yield put(fetchPostsSucceeded(payload));
    writeCache(postsListCacheKey(skip, limit, query), payload);
  } catch {
    /* silent background refresh */
  }
}

function* fetchPostsWorker(
  action: ReturnType<typeof fetchPostsRequested>,
): SagaIterator {
  const { skip, limit, query } = action.payload;
  const key = postsListCacheKey(skip, limit, query);
  const cached = readCache<ListPayload>(key);
  const online =
    typeof navigator === "undefined" ? true : navigator.onLine;

  if (cached) {
    const fresh = isCacheFresh(cached.savedAt);
    if (!online) {
      yield put(fetchPostsSucceeded(cached.data));
      return;
    }
    if (fresh) {
      yield put(fetchPostsSucceeded(cached.data));
      yield fork(revalidatePosts, action);
      return;
    }
  }

  try {
    const data: PostsListResponse = query
      ? yield call(postsService.searchPosts, query, { skip, limit })
      : yield call(postsService.fetchPosts, { skip, limit });
    const payload: ListPayload = {
      posts: data.posts,
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
    yield put(fetchPostsSucceeded(payload));
    writeCache(key, payload);
  } catch (error: unknown) {
    if (cached) {
      yield put(fetchPostsSucceeded(cached.data));
      toast.error("Showing cached posts while offline.");
      return;
    }
    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "Unable to load posts";
    yield put(fetchPostsFailed(message));
    toast.error(message);
  }
}

function* revalidatePost(id: number): SagaIterator {
  try {
    const post: Post = yield call(postsService.fetchPostById, id);
    yield put(fetchPostSucceeded(post));
    writeCache(`post:${id}`, post);
  } catch {
    /* ignore */
  }
}

function* fetchPostWorker(
  action: ReturnType<typeof fetchPostRequested>,
): SagaIterator {
  const id = action.payload;
  const key = `post:${id}`;
  const cached = readCache<Post>(key);
  const online =
    typeof navigator === "undefined" ? true : navigator.onLine;

  if (cached) {
    const fresh = isCacheFresh(cached.savedAt);
    if (!online) {
      yield put(fetchPostSucceeded(cached.data));
      return;
    }
    if (fresh) {
      yield put(fetchPostSucceeded(cached.data));
      yield fork(revalidatePost, id);
      return;
    }
  }

  try {
    const post: Post = yield call(postsService.fetchPostById, id);
    yield put(fetchPostSucceeded(post));
    writeCache(key, post);
  } catch (error: unknown) {
    if (cached) {
      yield put(fetchPostSucceeded(cached.data));
      toast.error("Showing cached article while offline.");
      return;
    }
    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "Unable to load post";
    yield put(fetchPostFailed(message));
    toast.error(message);
  }
}

function* createPostWorker(
  action: ReturnType<typeof createPostRequested>,
): SagaIterator {
  try {
    const userId: number | undefined = yield select(
      (state: RootState) => state.auth.user?.id,
    );
    if (!userId) {
      yield put(createPostFailed("You must be signed in to publish."));
      return;
    }
    const post: Post = yield call(postsService.createPost, {
      title: action.payload.title,
      body: action.payload.body,
      userId,
    });
    yield put(createPostSucceeded(post));
    toast.success("Post created");
  } catch (error: unknown) {
    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "Unable to create post";
    yield put(createPostFailed(message));
    toast.error(message);
  }
}

function* updatePostWorker(
  action: ReturnType<typeof updatePostRequested>,
): SagaIterator {
  try {
    const post: Post = yield call(postsService.updatePost, action.payload.id, {
      title: action.payload.title,
      body: action.payload.body,
    });
    yield put(updatePostSucceeded(post));
    writeCache(`post:${post.id}`, post);
    toast.success("Post updated");
  } catch (error: unknown) {
    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "Unable to update post";
    yield put(updatePostFailed(message));
    toast.error(message);
  }
}

function* deletePostWorker(
  action: ReturnType<typeof deletePostRequested>,
): SagaIterator {
  try {
    yield call(postsService.deletePost, action.payload);
    yield put(deletePostSucceeded(action.payload));
    toast.success("Post deleted");
  } catch (error: unknown) {
    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "Unable to delete post";
    yield put(deletePostFailed(message));
    toast.error(message);
  }
}

export default function* postsSaga(): SagaIterator {
  yield all([
    takeLatest(fetchPostsRequested.type, fetchPostsWorker),
    takeLatest(fetchPostRequested.type, fetchPostWorker),
    takeLatest(createPostRequested.type, createPostWorker),
    takeLatest(updatePostRequested.type, updatePostWorker),
    takeLatest(deletePostRequested.type, deletePostWorker),
  ]);
}
