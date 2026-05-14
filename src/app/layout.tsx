import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { SiteFrame } from "@/components/layout/SiteFrame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DevBlog · Next.js + Redux Saga",
    template: "%s · DevBlog",
  },
  description:
    "A full-featured blog demo with DummyJSON, Redux Toolkit, Redux-Saga, Tailwind CSS, and offline-friendly caching.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DevBlog",
    url: siteUrl,
    title: "DevBlog",
    description:
      "Modern React patterns with SSR, ISR-style revalidation, and resilient client state.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBlog",
    description:
      "Modern React patterns with SSR, ISR-style revalidation, and resilient client state.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-black antialiased`}
      >
        <Providers>
          <SiteFrame>{children}</SiteFrame>
        </Providers>
      </body>
    </html>
  );
}
