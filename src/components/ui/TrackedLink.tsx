"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { event } from "@/lib/analytics";

type Tracked = Parameters<typeof event>;

/**
 * A `next/link` that reports one event when it is followed.
 *
 * It exists so the sections around it can stay server components: only the
 * link itself needs to run in the browser, not the card, the section or the
 * page that contains it.
 */
export function TrackedLink({
  track,
  children,
  ...props
}: ComponentProps<typeof Link> & { track: Tracked; children: ReactNode }) {
  return (
    <Link {...props} onClick={() => event(...track)}>
      {children}
    </Link>
  );
}

/** The same, for links that leave the site. */
export function TrackedAnchor({
  track,
  children,
  ...props
}: ComponentProps<"a"> & { track: Tracked; children: ReactNode }) {
  return (
    <a {...props} onClick={() => event(...track)}>
      {children}
    </a>
  );
}
