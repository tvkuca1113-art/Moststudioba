/**
 * Central language + route map.
 *
 * Bosnian lives on the bare routes, German under /de/. Every page knows its
 * own `RouteKey`, so the language switcher can always resolve the matching
 * page in the other language instead of dumping the visitor on the homepage.
 */
export const locales = ["bs", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bs";

export const localeLabel: Record<Locale, string> = {
  bs: "BS",
  de: "DE",
};

export const localeName: Record<Locale, string> = {
  bs: "Bosanski",
  de: "Deutsch",
};

/** `lang`/`hreflang` values. Bosnian is `bs`, German is `de`. */
export const htmlLang: Record<Locale, string> = {
  bs: "bs",
  de: "de",
};

export type RouteKey =
  | "home"
  | "projects"
  | "project"
  | "services"
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
  contact: { bs: "/kontakt", de: "/de/kontakt" },
  demo: { bs: "/demo/:slug", de: "/de/demo/:slug" },
};

export type RouteRef = {
  key: RouteKey;
  slug?: string;
};

/** Resolve a route key (+ optional slug) to a concrete path in one language. */
export function path(key: RouteKey, locale: Locale, slug?: string): string {
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
export function allPaths(ref: RouteRef): Record<Locale, string> {
  return {
    bs: path(ref.key, "bs", ref.slug),
    de: path(ref.key, "de", ref.slug),
  };
}

export function otherLocale(locale: Locale): Locale {
  return locale === "bs" ? "de" : "bs";
}
