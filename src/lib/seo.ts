import type { Metadata } from "next";

import { site } from "@/content/site";
import { contentPages, pageLabels, type ContentPageKey } from "@/content/service-pages";
import { indexingAllowed, siteUrl } from "@/lib/site-url";
import { allPaths, htmlLang, path, type Locale, type RouteRef } from "@/lib/i18n/config";

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
  return `${siteUrl}${pathname === "/" ? "" : pathname}` || "/";
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
  const blocked = noindex || !indexingAllowed;
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
    // "noindex, follow" rather than nofollow: the page stays out of results
    // while crawlers can still reach the MOST pages it links to.
    robots: blocked ? { index: false, follow: true, nocache: true } : { index: true, follow: true },
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

/** Stable identity for an online studio. No office, ratings or invented proof. */
export function organizationJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: site.name,
        url: siteUrl,
        email: site.email,
        description,
        sameAs: [site.instagramUrl, ...(site.facebookUrl ? [site.facebookUrl] : [])],
        knowsLanguage: ["bs", "de"],
        areaServed: [{ "@type": "Country", name: "Bosnia and Herzegovina" }, { "@type": "Country", name: "Germany" }],
        contactPoint: { "@type": "ContactPoint", url: absoluteUrl(path("contact", locale)), email: site.email, contactType: "customer service", availableLanguage: ["bs", "de"] },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        inLanguage: ["bs", "de"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path("home", locale))}#webpage`,
        url: absoluteUrl(path("home", locale)),
        name: site.name,
        description,
        inLanguage: htmlLang[locale],
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export function contentPageJsonLd(key: ContentPageKey, locale: Locale) {
  const page = contentPages[locale][key];
  const url = absoluteUrl(path(key, locale));
  const isService = key === "website" || key === "webshop" || key === "redesign";
  const crumbs = [
    { name: locale === "bs" ? "Početna" : "Startseite", item: absoluteUrl(path("home", locale)) },
    ...(isService ? [{ name: locale === "bs" ? "Usluge" : "Leistungen", item: absoluteUrl(path("services", locale)) }] : []),
    { name: pageLabels[locale][key], item: url },
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title,
        description: page.description, inLanguage: htmlLang[locale],
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(isService ? { mainEntity: { "@id": `${url}#service` } } : {}),
      },
      {
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, ...crumb })),
      },
      ...(isService ? [{
        "@type": "Service", "@id": `${url}#service`, url,
        name: pageLabels[locale][key], serviceType: pageLabels[locale][key],
        description: page.lead, provider: { "@id": `${siteUrl}/#organization`, "@type": "Organization", name: site.name, url: siteUrl, email: site.email },
        areaServed: [{ "@type": "Country", name: "Bosnia and Herzegovina" }, { "@type": "Country", name: "Germany" }],
        availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl(path("contact", locale)) },
      }] : []),
    ],
  };
}
