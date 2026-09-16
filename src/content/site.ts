import type { L } from "@/lib/i18n/localized";

/**
 * Only confirmed facts belong in this file.
 *
 * Confirmed: brand name, the Instagram profile, the services we offer and the
 * two markets we work in. Everything else (email, phone, address, legal form,
 * domain) is deliberately absent — the site must work without inventing it.
 * `MISSING_FOR_LAUNCH.md` tracks what is still needed before going public.
 */
export const site = {
  name: "MOST Studio",
  shortName: "MOST",
  instagramHandle: "@moststudioba",
  instagramUrl: "https://www.instagram.com/moststudioba/",
  markets: ["BiH", "Njemačka"],
  /**
   * The canonical URL and the indexing switch live in `@/lib/site-url`: they
   * read plain environment variables and so must stay out of client bundles.
   */
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
} as const;

export const tagline: L = {
  bs: "Web dizajn i izrada web stranica za firme u BiH i Njemačkoj.",
  de: "Webdesign und Website-Entwicklung für Unternehmen in Bosnien-Herzegowina und Deutschland.",
};
