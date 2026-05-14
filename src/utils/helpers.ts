// here we mainly handles: caching , localStorage , JWT Token expiry , cookies
// our flow : User opens app -> Try cache first -> If cache fresh → use it -> Else fetch API -> Save new cache -> Manage login token + cookie 

import { CACHE_PREFIX, CACHE_TTL_MS, SESSION_COOKIE } from "./constants";

export type CacheEnvelope<T> = {
  savedAt: number;
  data: T;      // T means generic type : data can be of any type
};

// now we read cached data from local storage => to read we'll parse in json
export function readCache<T>(key: string): CacheEnvelope<T> | null {
  if (typeof window === "undefined") return null;    // this line prevents crash, as window.localStorage exists only in browser, not on server. but nextjs runs server-side, client-side
  try {
    const raw = window.localStorage.getItem(`${CACHE_PREFIX}${key}`);   // we get stored item from local storage like=> my-nextjs-blog:posts 
    if (!raw) return null;
    return JSON.parse(raw) as CacheEnvelope<T>;        // local storage stores strings only. JSON.parse convert string back to object. Eg=> local: "{\"savedAt\":123,\"data\":[1,2]}", JSON.parse: {savedAt: 123,data:[1,2]}
  } catch {
    return null;      // if parsing fails, return null
  }
}

// this stores data in local storage
export function writeCache<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  const envelope: CacheEnvelope<T> = { savedAt: Date.now(), data };      // created the cache object
  window.localStorage.setItem(
    `${CACHE_PREFIX}${key}`,
    JSON.stringify(envelope),
  );                   // this stores object as string
}

// now we check if cache is expired
export function isCacheFresh(savedAt: number) {
  return Date.now() - savedAt < CACHE_TTL_MS;
}


// extracts expiry time from jwt token
export function getJwtExpiryMs(token: string | null): number | null {
  if (!token) return null;   // no token, no expiry
  const parts = token.split(".");        // jwt split into 3 parts
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),      //atob() decodes base64, jwt is base64 encoded.
    ) as { exp?: number };
    if (!payload.exp) return null;
    return payload.exp * 1000;
  } catch {
    return null;
  }
}


// function to Create/remove browser cookie.
export function setSessionCookie(value: "1" | "") {
  if (typeof document === "undefined") return;     // Cookies only exist in browser
  const maxAge = value ? 60 * 60 * 24 * 7 : 0;     // 7 days
  // sets cookie , SameSite=Lax is a security feature
  document.cookie = `${SESSION_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}
