// creates a unique cache key for storing different post lists.
export function postsListCacheKey(skip: number, limit: number, query?: string) {
  return `posts:list:${skip}:${limit}:q:${query ?? ""}`;
}
