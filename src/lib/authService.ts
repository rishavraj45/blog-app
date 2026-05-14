import { api } from "@/lib/api";
import type { LoginResponse, User } from "@/types";

export async function loginRequest(username: string, password: string) {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    username,
    password,
    expiresInMins: 30,
  });
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await api.get<User>("/auth/me");
  return data;
}
