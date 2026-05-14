// we stored global constant values in one place

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com";  // if .env is not there,then also app runs locally, but the data comes from DummyJSON.

//TTL = Time To Live => Cache validity duration.
export const CACHE_TTL_MS = 60 * 60 * 1000;     // => 1 hour(into ms)

export const POSTS_PAGE_SIZE = 10;       // 10 posts per page in blogs

export const CACHE_PREFIX = "my-nextjs-blog:";      // starting text added before cache/localStorage

export const AUTH_STORAGE_KEY = `${CACHE_PREFIX}auth`;

export const SESSION_COOKIE = "blog_session";

export const FEATURED_POSTS_LIMIT = 6;     // home page posts limit
