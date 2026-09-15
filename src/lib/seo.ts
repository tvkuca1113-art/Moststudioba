import type { Metadata } from "next";

import { site } from "@/content/site";
import { allPaths, htmlLang, type Locale, type RouteRef } from "@/lib/i18n/config";

type PageMetaInput = {
  locale: Locale;
  route: RouteRef;
  title: string;
  description: string;
  /** Functional demo routes are excluded from search on purpose. */
  noindex?: boolean;
  ogImage?: string;
};

export function absoluteUrl(pathname: string): string {
  return `${site.url}${pathname === "/" ? "" : pathname}` || "/";
}

export function buildMetadata({
  locale,
  route,
  title,
  description,
  noindex = false,
  ogImage,
}: PageMetaInput): Metadata {
  const paths = allPaths(route);
  const canonical = paths[locale];
  const blocked = noindex || !site.indexingAllowed;
  const image = ogImage ?? `/og/og-${locale}.png`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        [htmlLang.bs]: paths.bs,
        [htmlLang.de]: paths.de,
        "x-default": paths.bs,
      },
    },
    robots: blocked
      ? { index: false, follow: !noindex, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "bs" ? "bs_BA" : "de_DE",
      url: absoluteUrl(canonical),
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Structured data covers only what we can actually confirm: the studio name,
 * the site it lives on and the one social profile we own. No address, no
 * opening hours, no LocalBusiness — those would be fabricated.
 */
export function organizationJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl(locale === "bs" ? "/" : "/de"),
    description,
    sameAs: [site.instagramUrl],
    knowsLanguage: ["bs", "de"],
  };
}
