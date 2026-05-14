import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

export type AuthStatus = "idle" | "loading" | "authenticated" | "error";

export type AuthState = {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequested(
      state,
      _action: PayloadAction<{ username: string; password: string }>,
    ) {
      state.status = "loading";
      state.error = null;
    },
    loginSucceeded(
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "authenticated";
      state.error = null;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.status = "error";
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    hydrateAuth(
      state,
      action: PayloadAction<{ user: User | null; token: string | null }>,
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = action.payload.token ? "authenticated" : "idle";
    },
    fetchMeRequested(state) {
      state.error = null;
    },
    fetchMeSucceeded(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    fetchMeFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const {
  loginRequested,
  loginSucceeded,
  loginFailed,
  logout,
  hydrateAuth,
  fetchMeRequested,
  fetchMeSucceeded,
  fetchMeFailed,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
