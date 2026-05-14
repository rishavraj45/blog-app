import type { ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function Card({ children, className = "", as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={`rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70 ${className}`}
    >
      {children}
    </Tag>
  );
}
