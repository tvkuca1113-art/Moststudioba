import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={cn(
        "font-sans text-[0.8125rem] font-semibold tracking-[0.22em] uppercase sm:text-sm",
        tone === "light" ? "text-slate" : "text-mist",
        className,
      )}
    >
      {children}
    </p>
  );
}
