import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** One horizontal rhythm for the whole site. 20px gutter on phones. */
export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        width === "narrow" && "max-w-3xl",
        width === "default" && "max-w-[88rem]",
        width === "wide" && "max-w-[110rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
