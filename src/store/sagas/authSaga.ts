import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import toast from "react-hot-toast";
import * as authService from "@/lib/authService";
import {
  fetchMeFailed,
  fetchMeRequested,
  fetchMeSucceeded,
  hydrateAuth,
  loginFailed,
  loginRequested,
  loginSucceeded,
  logout,
} from "@/store/slices/authSlice";
import type { LoginResponse, User } from "@/types";
import { AUTH_STORAGE_KEY } from "@/utils/constants";
import {
  getJwtExpiryMs,
  readCache,
  setSessionCookie,
  writeCache,
} from "@/utils/helpers";
import { appStarted } from "@/store/actions";
import type { RootState } from "@/store/rootReducer";

function mapLoginToUser(data: LoginResponse): User {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    image: data.image,
  };
}

function persistAuthSession(
  user: User,
  token: string,
  refreshToken: string,
) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("accessToken", token);
  window.localStorage.setItem("refreshToken", refreshToken);
  writeCache("auth", { user, token });
}

function clearAuthSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

function* watchTokenExpiry(token: string): SagaIterator {
  const expiresAt = getJwtExpiryMs(token);
  if (!expiresAt) return;
  const waitMs = expiresAt - Date.now() - 2_000;
  if (waitMs <= 0) {
    yield put(logout());
    return;
  }
  yield delay(Math.min(waitMs, 2147483647));
  yield put(logout());
  toast("Session expired. Please sign in again.", { icon: "⏱️" });
}

function* loginWorker(
  action: ReturnType<typeof loginRequested>,
): SagaIterator {
  try {
    const { username, password } = action.payload;
    const data: LoginResponse = yield call(
      authService.loginRequest,
      username,
      password,
    );
    const user = mapLoginToUser(data);
    yield put(loginSucceeded({ user, token: data.accessToken }));
    yield call(
      persistAuthSession,
      user,
      data.accessToken,
      data.refreshToken,
    );
    yield call(setSessionCookie, "1");
    yield fork(watchTokenExpiry, data.accessToken);
    toast.success(`Welcome back, ${user.firstName}!`);
  } catch (error: unknown) {
    const message =
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object" &&
      "data" in error.response &&
      error.response.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data
        ? String((error.response.data as { message?: string }).message)
        : "Unable to sign in";
    yield put(loginFailed(message));
    toast.error(message);
  }
}

function* fetchMeWorker(): SagaIterator {
  try {
    const token: string | null = yield select(
      (state: RootState) => state.auth.token,
    );
    if (!token) return;
    const user: User = yield call(authService.fetchCurrentUser);
    yield put(fetchMeSucceeded(user));
    writeCache("auth", { user, token });
  } catch {
    yield put(fetchMeFailed("Session invalid"));
    yield put(logout());
  }
}

function* logoutWorker(): SagaIterator {
  yield call(clearAuthSession);
  yield call(setSessionCookie, "");
}

function* bootstrapAuth(): SagaIterator {
  const cached = readCache<{ user: User; token: string }>("auth");
  if (!cached?.data?.token) return;
  yield put(
    hydrateAuth({ user: cached.data.user, token: cached.data.token }),
  );
  if (typeof window !== "undefined") {
    window.localStorage.setItem("accessToken", cached.data.token);
  }
  yield call(setSessionCookie, "1");
  if (typeof navigator !== "undefined" && navigator.onLine) {
    yield put(fetchMeRequested());
  }
}

export default function* authSaga(): SagaIterator {
  yield all([
    takeLatest(loginRequested.type, loginWorker),
    takeEvery(logout.type, logoutWorker),
    takeLatest(fetchMeRequested.type, fetchMeWorker),
    takeLatest(appStarted.type, bootstrapAuth),
  ]);
}
