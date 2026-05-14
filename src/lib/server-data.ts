import { API_BASE, FEATURED_POSTS_LIMIT } from "@/utils/constants";
import type { Post, PostsListResponse, User } from "@/types";

const defaultInit: RequestInit = {
  headers: { Accept: "application/json" },
  next: { revalidate: 120 },
};

export async function fetchPostsPage(skip: number, limit: number) {
  const url = new URL(`${API_BASE}/posts`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  const res = await fetch(url.toString(), defaultInit);
  if (!res.ok) throw new Error("Failed to load posts");
  return (await res.json()) as PostsListResponse;
}

export async function fetchFeaturedPosts() {
  return fetchPostsPage(0, FEATURED_POSTS_LIMIT);
}

export async function fetchPost(id: number) {
  const res = await fetch(`${API_BASE}/posts/${id}`, defaultInit);
  if (!res.ok) throw new Error("Failed to load post");
  return (await res.json()) as Post;
}

export async function searchPostsServer(
  query: string,
  skip = 0,
  limit = 10,
) {
  const url = new URL(`${API_BASE}/posts/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));
  const res = await fetch(url.toString(), defaultInit);
  if (!res.ok) throw new Error("Failed to search posts");
  return (await res.json()) as PostsListResponse;
}

export async function fetchPostsByUser(userId: number) {
  const res = await fetch(`${API_BASE}/posts/user/${userId}`, defaultInit);
  if (!res.ok) throw new Error("Failed to load user posts");
  return (await res.json()) as PostsListResponse;
}

export async function fetchUser(userId: number) {
  const res = await fetch(`${API_BASE}/users/${userId}`, defaultInit);
  if (!res.ok) throw new Error("Failed to load user");
  return (await res.json()) as User & { image?: string };
}
