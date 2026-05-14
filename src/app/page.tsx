import type { Metadata } from "next";
import { fetchPostsPageServer } from "@/lib/server/posts";
import { FEATURED_POSTS_LIMIT } from "@/utils/constants";
import { HomeContent } from "@/components/home/HomeContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Home",
  description:
    "Landing page with featured DummyJSON posts, SSR, and Redux-powered client cache.",
  openGraph: {
    title: "DevBlog · Home",
    description:
      "Landing page with featured DummyJSON posts, SSR, and Redux-powered client cache.",
    url: "/",
  },
};

export default async function HomePage() {
  const initial = await fetchPostsPageServer({
    skip: 0,
    limit: FEATURED_POSTS_LIMIT,
  });

  return <HomeContent initial={initial} />;
}