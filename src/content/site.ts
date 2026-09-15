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
   * Set NEXT_PUBLIC_SITE_URL once the domain is confirmed. Until then the
   * canonical/OG absolute URLs fall back to a placeholder that is never
   * indexed, because indexing stays off unless NEXT_PUBLIC_ALLOW_INDEXING=true.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000",
  indexingAllowed: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
} as const;

export const tagline: L = {
  bs: "Web dizajn i izrada web stranica za firme u BiH i Njemačkoj.",
  de: "Webdesign und Website-Entwicklung für Unternehmen in Bosnien-Herzegowina und Deutschland.",
};
