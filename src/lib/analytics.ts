import { site } from "@/content/site";

/**
 * Optional, off by default.
 *
 * No analytics provider or pixel is wired up: nothing is sent anywhere until
 * NEXT_PUBLIC_ANALYTICS_ENABLED is set and a provider is actually connected.
 * Event payloads carry only what the visitor clicked — never the text of a
 * message they wrote.
 */
export type AnalyticsEvent =
  | "project_open"
  | "demo_interaction"
  | "contact_click"
  | "brief_copy";

export function track(event: AnalyticsEvent, detail?: Record<string, string>) {
  if (!site.analyticsEnabled) return;
  if (typeof window === "undefined") return;
  // A custom event keeps the call site provider-agnostic. Attach a listener
  // once a provider is confirmed; copying a brief is NOT a submitted enquiry.
  window.dispatchEvent(new CustomEvent("most:analytics", { detail: { event, ...detail } }));
}
