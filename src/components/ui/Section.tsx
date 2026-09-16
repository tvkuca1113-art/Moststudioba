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
 * Section rhythm is deliberately uneven — alternating tones and three padding
 * scales keep the page from reading as a stack of identical blocks.
 *
 * The default was py-36 at desktop: 288px of air per section, and with seven
 * sections that was over 2,000px of the page spent on nothing. It is tighter
 * now, and the sections that carry less get `tight`.
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
        size === "tight" && "py-10 sm:py-11 lg:py-12",
        size === "default" && "py-12 sm:py-14 lg:py-18",
        size === "loose" && "py-20 sm:py-24 lg:py-28",
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
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
      )}
    >
      <div className={cn("flex flex-col gap-3", action && "lg:max-w-3xl")}>
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
              "max-w-[64ch] text-lead leading-[1.5]",
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
