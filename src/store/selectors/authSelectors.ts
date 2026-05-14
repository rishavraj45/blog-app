import { createSelector } from "reselect";
import type { RootState } from "@/store/rootReducer";

export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuthState,
  (auth) => auth.user,
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (auth) => auth.token,
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (auth) => Boolean(auth.token && auth.user),
);

export const selectAuthStatus = createSelector(
  selectAuthState,
  (auth) => auth.status,
);

export const selectAuthError = createSelector(
  selectAuthState,
  (auth) => auth.error,
);
