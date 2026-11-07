/**
 * Central language + route map.
 *
 * Bosnian lives on the bare routes, German under /de/, and the English
 * outreach portfolio under /en/. Equivalent pages retain their context;
 * untranslated page types link to the relevant English landing section.
 */
export const locales = ["bs", "de", "en"] as const;
/** Existing fully translated page trees. English has its own scoped portfolio. */
export const contentLocales = ["bs", "de"] as const;

export type Locale = (typeof contentLocales)[number];
export type SiteLocale = (typeof locales)[number];

export const defaultLocale: Locale = "bs";

export const localeLabel: Record<SiteLocale, string> = {
  bs: "BS",
  de: "DE",
  en: "EN",
};

export const localeName: Record<SiteLocale, string> = {
  bs: "Bosanski",
  de: "Deutsch",
  en: "English",
};

/** HTML language and hreflang codes for the public page trees. */
export const htmlLang: Record<SiteLocale, string> = {
  bs: "bs",
  de: "de",
  en: "en",
};

export type RouteKey =
  | "home"
  | "projects"
  | "project"
  | "services"
  | "website"
  | "webshop"
  | "redesign"
  | "coverage"
  | "pricing"
  | "googleVisibility"
  | "socialWebsite"
  | "contact"
  | "demo";

type RouteDefinition = {
  /** `:slug` marks the single dynamic segment a route may carry. */
  [L in Locale]: string;
};

const routeMap: Record<RouteKey, RouteDefinition> = {
  home: { bs: "/", de: "/de" },
  projects: { bs: "/projekti", de: "/de/projekte" },
  project: { bs: "/projekti/:slug", de: "/de/projekte/:slug" },
  services: { bs: "/usluge", de: "/de/leistungen" },
  website: { bs: "/usluge/izrada-web-stranica", de: "/de/leistungen/website-erstellung" },
  webshop: { bs: "/usluge/izrada-web-shopa", de: "/de/leistungen/onlineshop" },
  redesign: { bs: "/usluge/redizajn-web-stranica", de: "/de/leistungen/website-relaunch" },
  coverage: { bs: "/izrada-web-stranica-bih", de: "/de/webdesign-bosnien-herzegowina" },
  pricing: { bs: "/vodic/cijena-web-stranice", de: "/de/ratgeber/website-kosten" },
  googleVisibility: { bs: "/vodic/web-stranica-nije-na-googleu", de: "/de/ratgeber/website-nicht-bei-google" },
  socialWebsite: { bs: "/vodic/web-stranica-ili-instagram", de: "/de/ratgeber/website-oder-instagram" },
  contact: { bs: "/kontakt", de: "/de/kontakt" },
  demo: { bs: "/demo/:slug", de: "/de/demo/:slug" },
};

export type RouteRef = {
  key: RouteKey;
  slug?: string;
};

/** Resolve a route key (+ optional slug) to a concrete path in one language. */
export function path(key: RouteKey, locale: SiteLocale, slug?: string): string {
  if (locale === "en") return englishNavigationPath({ key, slug });
  const template = routeMap[key][locale];
  if (!template.includes(":slug")) return template;
  if (!slug) {
    throw new Error(`Route "${key}" requires a slug.`);
  }
  return template.replace(":slug", slug);
}

/** The same page, in the other language. */
export function alternatePath(ref: RouteRef, locale: Locale): string {
  return path(ref.key, locale, ref.slug);
}

/** All language variants of one page — used for hreflang + the switcher. */
export function allPaths(ref: RouteRef): Record<Locale, string> & { en?: string } {
  return {
    bs: path(ref.key, "bs", ref.slug),
    de: path(ref.key, "de", ref.slug),
    ...(englishEquivalent(ref) ? { en: englishEquivalent(ref) } : {}),
  };
}

/** Only actual translated equivalents belong in hreflang; never invent URLs. */
export function englishEquivalent(ref: RouteRef): string | undefined {
  if (ref.key === "home") return "/en";
  if (ref.key === "project" && ref.slug && englishProjectSlugs.includes(ref.slug)) {
    return `/en/projects/${ref.slug}`;
  }
}

export const englishProjectSlugs: readonly string[] = [
  "mirjana-massage", "stolarija-hrast", "ordinacija-lipa", "meridijan-savjetovanje",
];

/** Navigation may lead to an English section when a full translation is absent. */
export function englishNavigationPath(ref: RouteRef): string {
  const equivalent = englishEquivalent(ref);
  if (equivalent) return equivalent;
  if (ref.key === "contact") return "/en#contact";
  if (ref.key === "projects" || ref.key === "demo") return "/en#work";
  if (ref.key === "pricing") return "/en#pricing";
  return "/en#services";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "bs" ? "de" : "bs";
}
