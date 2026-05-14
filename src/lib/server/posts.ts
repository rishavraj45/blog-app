import { API_BASE } from "@/utils/constants";
import type { Post, PostsListResponse } from "@/types";

const REVALIDATE_SECONDS = 3600;

export async function fetchPostsPageServer(params: {
  skip: number;
  limit: number;
  q?: string;
}): Promise<PostsListResponse> {
  const { skip, limit, q } = params;
  const url = q
    ? `${API_BASE}/posts/search?q=${encodeURIComponent(q)}&skip=${skip}&limit=${limit}`
    : `${API_BASE}/posts?skip=${skip}&limit=${limit}`;
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) {
    throw new Error("Unable to load posts");
  }
  return res.json() as Promise<PostsListResponse>;
}

export async function fetchPostByIdServer(id: number): Promise<Post | null> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return res.json() as Promise<Post>;
}

export async function fetchPostsByUserServer(
  userId: number,
): Promise<PostsListResponse> {
  const res = await fetch(`${API_BASE}/posts/user/${userId}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error("Unable to load user posts");
  }
  return res.json() as Promise<PostsListResponse>;
}
