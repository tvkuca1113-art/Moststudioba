import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/**
 * The studio's signature mark: the geometry of the arch sculpture on the
 * studio page — two piers, a span, a straight deck between them — reduced to
 * three lines.
 *
 * `draw` animates the span once on entry; with reduced motion it is simply
 * already drawn. It carries no information, so it is always hidden from
 * assistive technology.
 */
export function ArchMark({
  className,
  strokeWidth = 3,
  draw = false,
}: {
  className?: string;
  strokeWidth?: number;
  draw?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("overflow-visible", draw && "arch-draw", className)}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    >
      {/* the span */}
      <path d="M20 40C20 9 100 9 100 40" style={{ "--len": 136, "--delay": "120ms" } as Vars} />
      {/* the deck */}
      <line x1="22" y1="33.5" x2="98" y2="33.5" style={{ "--len": 76, "--delay": "620ms" } as Vars} />
      {/* the two piers */}
      <line x1="20" y1="40" x2="20" y2="46" style={{ "--len": 6, "--delay": "0ms" } as Vars} />
      <line x1="100" y1="40" x2="100" y2="46" style={{ "--len": 6, "--delay": "0ms" } as Vars} />
    </svg>
  );
}
