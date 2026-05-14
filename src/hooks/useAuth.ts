"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store";
import {
  selectAuthUser,
  selectIsAuthenticated,
  selectAuthStatus,
} from "@/store/selectors/authSelectors";

export function useAuth() {
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      status,
    }),
    [isAuthenticated, status, user],
  );
}
