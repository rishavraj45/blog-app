import { api } from "@/lib/api";
import type { Comment } from "@/types";

export async function fetchCommentsForPost(postId: number) {
  const { data } = await api.get<{ comments: Comment[] }>(
    `/posts/${postId}/comments`,
  );
  return data.comments;
}

export async function addComment(payload: {
  body: string;
  postId: number;
  userId: number;
}) {
  const { data } = await api.post<Comment>("/comments/add", payload);
  return data;
}
