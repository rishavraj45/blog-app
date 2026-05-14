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
import * as commentsService from "@/lib/commentsService";
import {
  addCommentFailed,
  addCommentRequested,
  addCommentSucceeded,
  fetchCommentsFailed,
  fetchCommentsRequested,
  fetchCommentsSucceeded,
  hydrateCommentsFromCache,
} from "@/store/slices/commentsSlice";
import type { Comment } from "@/types";
import { isCacheFresh, readCache, writeCache } from "@/utils/helpers";
import type { RootState } from "@/store/rootReducer";

function cacheKey(postId: number) {
  return `comments:${postId}`;
}

function* revalidateComments(postId: number): SagaIterator {
  try {
    const comments: Comment[] = yield call(
      commentsService.fetchCommentsForPost,
      postId,
    );
    yield put(fetchCommentsSucceeded({ postId, comments }));
    writeCache(cacheKey(postId), comments);
  } catch {
    /* ignore */
  }
}

function* fetchCommentsWorker(
  action: ReturnType<typeof fetchCommentsRequested>,
): SagaIterator {
  const postId = action.payload;
  const key = cacheKey(postId);
  const cached = readCache<Comment[]>(key);
  const online = typeof navigator === "undefined" ? true : navigator.onLine;

  if (cached) {
    const fresh = isCacheFresh(cached.savedAt);
    if (!online) {
      yield put(
        hydrateCommentsFromCache({ postId, comments: cached.data }),
      );
      return;
    }
    if (fresh) {
      yield put(
        hydrateCommentsFromCache({ postId, comments: cached.data }),
      );
      yield fork(revalidateComments, postId);
      return;
    }
  }

  try {
    const comments: Comment[] = yield call(
      commentsService.fetchCommentsForPost,
      postId,
    );
    yield put(fetchCommentsSucceeded({ postId, comments }));
    writeCache(key, comments);
  } catch (error: unknown) {
    if (cached) {
      yield put(
        hydrateCommentsFromCache({ postId, comments: cached.data }),
      );
      toast.error("Showing cached comments while offline.");
      return;
    }
    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "Unable to load comments";
    yield put(fetchCommentsFailed({ postId, message }));
    toast.error(message);
  }
}

function* addCommentWorker(
  action: ReturnType<typeof addCommentRequested> & {
    payload: { postId: number; body: string };
  },
): SagaIterator {
  try {
    const userId: number | undefined = yield select(
      (state: RootState) => state.auth.user?.id,
    );
    if (!userId) {
      yield put(addCommentFailed("Sign in to leave a comment."));
      return;
    }
    const comment: Comment = yield call(commentsService.addComment, {
      body: action.payload.body,
      postId: action.payload.postId,
      userId,
    });
    yield put(
      addCommentSucceeded({ postId: action.payload.postId, comment }),
    );
    const items: Comment[] = yield select(
      (state: RootState) =>
        state.comments.byPostId[action.payload.postId]?.items ?? [],
    );
    writeCache(cacheKey(action.payload.postId), items);
    toast.success("Comment added");
  } catch (error: unknown) {
    const message =
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "Unable to add comment";
    yield put(addCommentFailed(message));
    toast.error(message);
  }
}

export default function* commentsSaga(): SagaIterator {
  yield all([
    takeLatest(fetchCommentsRequested.type, fetchCommentsWorker),
    takeLatest(addCommentRequested.type, addCommentWorker),
  ]);
}
