import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "paper" | "paperDim" | "forest" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  paperDim: "bg-paper-dim text-ink",
  forest: "bg-forest text-paper on-dark",
  ink: "bg-ink text-paper on-dark",
};

/**
 * Section rhythm is deliberately uneven — alternating tones and two padding
 * scales keep the page from reading as a stack of identical blocks.
 */
export function Section({
  id,
  tone = "paper",
  size = "default",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  size?: "default" | "tight" | "loose";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        toneClass[tone],
        size === "tight" && "py-14 sm:py-18 lg:py-24",
        size === "default" && "py-20 sm:py-28 lg:py-36",
        size === "loose" && "py-24 sm:py-36 lg:py-48",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  tone = "light",
  align = "start",
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
      )}
    >
      <div className={cn("flex flex-col gap-4", action && "lg:max-w-3xl")}>
        {eyebrow && (
          <p
            className={cn(
              "text-[0.8125rem] font-semibold tracking-[0.22em] uppercase sm:text-sm",
              tone === "light" ? "text-slate" : "text-mist",
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-display leading-[0.95]">
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "max-w-2xl text-lead leading-relaxed",
              tone === "light" ? "text-slate" : "text-mist",
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
