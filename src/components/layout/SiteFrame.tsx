"use client";

import { Suspense, lazy, memo } from "react";
import { Navbar } from "@/components/common/Navbar/Navbar";

const Footer = lazy(() =>
  import("@/components/common/Footer/Footer").then((m) => ({
    default: m.Footer,
  })),
);

export const SiteFrame = memo(function SiteFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {children}
      </main>
      <Suspense
        fallback={
          <div className="h-16 border-t border-zinc-200 dark:border-zinc-800" />
        }
      >
        <Footer />
      </Suspense>
    </>
  );
});
