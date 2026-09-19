import type { L } from "@/lib/i18n/localized";

/**
 * Only confirmed facts belong in this file.
 *
 * Confirmed: brand, Instagram, Facebook, Gmail inbox, online delivery and the two markets.
 * No public office, telephone, legal form or client results have been supplied.
 * `MISSING_FOR_LAUNCH.md` tracks what is still needed before going public.
 */
export const site = {
  name: "MOST Studio",
  shortName: "MOST",
  email: "moststudioba@gmail.com",
  instagramHandle: "@moststudioba",
  instagramUrl: "https://www.instagram.com/moststudioba/",
  // Exact Facebook destination supplied by the owner. No guessed Messenger handle.
  facebookUrl: "https://www.facebook.com/share/1HoECngdYP/?mibextid=wwXIfr",
  markets: ["BiH", "Njemačka"],
  /**
   * The canonical URL and the indexing switch live in `@/lib/site-url`: they
   * read plain environment variables and so must stay out of client bundles.
   */

  /**
   * Vercel Web Analytics is on. It is cookieless and stores no personal data,
   * and what the site sends it is listed in `@/lib/analytics` — named events,
   * none of which carry anything a visitor typed.
   *
   * `NEXT_PUBLIC_ANALYTICS_ENABLED=false` turns collection off again without a
   * code change. In `next dev` the Vercel script detects development itself
   * and logs instead of sending, so local work never reaches the dashboard.
   */
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false",
} as const;

export const tagline: L = {
  bs: "Web dizajn i izrada web stranica za firme u BiH i Njemačkoj.",
  de: "Webdesign und Website-Entwicklung für Unternehmen in Bosnien-Herzegowina und Deutschland.",
};
