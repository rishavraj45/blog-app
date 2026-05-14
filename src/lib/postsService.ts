import { api } from "@/lib/api";
import type { Post, PostsListResponse } from "@/types";

export async function fetchPosts(params: { limit: number; skip: number }) {
  const { data } = await api.get<PostsListResponse>("/posts", { params });
  return data;
}

export async function searchPosts(
  query: string,
  params?: { skip?: number; limit?: number },
) {
  const { data } = await api.get<PostsListResponse>("/posts/search", {
    params: { q: query, skip: params?.skip, limit: params?.limit },
  });
  return data;
}

export async function fetchPostById(id: number) {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
}

export async function fetchPostsByUser(userId: number) {
  const { data } = await api.get<PostsListResponse>(`/posts/user/${userId}`);
  return data;
}

export async function createPost(payload: {
  title: string;
  body: string;
  userId: number;
}) {
  const { data } = await api.post<Post>("/posts/add", payload);
  return data;
}

export async function updatePost(
  id: number,
  payload: Partial<Pick<Post, "title" | "body">>,
) {
  const { data } = await api.put<Post>(`/posts/${id}`, payload);
  return data;
}

export async function deletePost(id: number) {
  const { data } = await api.delete<{ isDeleted: boolean; id: number }>(
    `/posts/${id}`,
  );
  return data;
}
