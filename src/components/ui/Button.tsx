import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./icons";

type Variant = "primary" | "secondary" | "quiet";
type Tone = "light" | "dark";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.9375rem] font-semibold transition-colors duration-200 sm:text-base";

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-forest text-paper hover:bg-ink",
    secondary: "border border-forest/30 text-forest hover:border-forest hover:bg-forest hover:text-paper",
    quiet: "text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest",
  },
  dark: {
    primary: "bg-lime text-ink hover:bg-paper",
    secondary: "border border-mist/40 text-paper hover:border-lime hover:text-lime",
    quiet: "text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime",
  },
};

/** The button look, for the rare call site that needs its own element. */
export function buttonClass(variant: Variant = "primary", tone: Tone = "light", className?: string) {
  return cn(base, styles[tone][variant], className);
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  withArrow?: boolean;
  className?: string;
};

export function ButtonLink({
  children,
  variant = "primary",
  tone = "light",
  withArrow = true,
  className,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, styles[tone][variant], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </Link>
  );
}

export function ButtonAnchor({
  children,
  variant = "primary",
  tone = "light",
  withArrow = true,
  className,
  ...rest
}: CommonProps & ComponentProps<"a">) {
  return (
    <a className={cn(base, styles[tone][variant], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </a>
  );
}

export function Button({
  children,
  variant = "primary",
  tone = "light",
  withArrow = false,
  className,
  type = "button",
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button type={type} className={cn(base, styles[tone][variant], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

function Arrow() {
  return (
    <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:transform-none" />
  );
}
