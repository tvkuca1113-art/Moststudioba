"use client";

import { track } from "@vercel/analytics";

import { site } from "@/content/site";

/**
 * The only events this site sends.
 *
 * Two rules the parameter types enforce rather than document:
 *
 * 1. Nothing a visitor typed ever leaves the browser. The brief builder
 *    assembles a message about someone's business; that text, and any
 *    contact detail in it, is theirs. The `copy_message` event carries the
 *    two fixed choices and a length bucket, never the message.
 * 2. `lead_submit` means a real enquiry arrived somewhere we can read it.
 *    Copying text to the clipboard is not that, and neither is opening
 *    Instagram — those are `copy_message` and `outbound_instagram`. There is
 *    no backend today, so nothing fires `lead_submit` yet; it is declared so
 *    the day one exists it is not mistakenly conflated with a copy.
 */
type Events = {
  /** A concept page was opened. */
  view_project: { project: string; locale: string };
  /** A running demo was opened, and from where. */
  open_demo: { project: string; locale: string; from: "hero" | "portfolio" | "project" | "nav" };
  /** The brief builder was started — first answer given. */
  contact_start: { locale: string };
  /** The assembled message was copied. No message text, ever. */
  copy_message: { locale: string; need: string; goal: string; length: "short" | "long" };
  /** The visitor left for the Instagram profile. */
  outbound_instagram: { locale: string; from: "header" | "contact" | "footer" | "brief" };
  /** Reserved: a real enquiry received by a backend. Never a copy. */
  lead_submit: { locale: string; channel: string };
};

/**
 * Sends one event, or does nothing at all.
 *
 * `analyticsEnabled` is the same switch that decides whether the Vercel
 * script is on the page — with it off there is no collection to add to, so
 * this stays a no-op rather than queueing anything up.
 */
export function event<K extends keyof Events>(name: K, props: Events[K]): void {
  if (!site.analyticsEnabled) return;
  track(name, props);
}
