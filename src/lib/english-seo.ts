import type { Metadata } from "next";
import { site } from "@/content/site";
import { usStarterOffer } from "@/content/offer";
import { allPaths, type RouteRef } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo";
import { indexingAllowed, siteUrl } from "@/lib/site-url";

export const englishTitle = `Web Design & Website Redesign from ${usStarterOffer.price} | MOST Studio`;
export const englishDescription = `Custom web design, website redesign and development for small businesses. Explore real client work and independent concepts. Projects start at ${usStarterOffer.price} USD.`;

export function englishMetadata(route: RouteRef, title: string, description: string): Metadata {
  const paths = allPaths(route);
  if (!paths.en) throw new Error("English metadata requires a published English equivalent.");
  return {
    title, description,
    alternates: { canonical: paths.en, languages: { bs: paths.bs, de: paths.de, en: paths.en, "x-default": paths.bs } },
    robots: indexingAllowed ? { index: true, follow: true } : { index: false, follow: true, nocache: true },
    openGraph: {
      type: "website", siteName: site.name, locale: "en_US", url: absoluteUrl(paths.en), title, description,
      images: [{ url: "/og/og-en.png", width: 1200, height: 630, alt: "MOST Studio — web design, redesign and development" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og/og-en.png"] },
  };
}

export function englishJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": `${siteUrl}/#organization`, name: site.name,
        url: siteUrl, logo: absoluteUrl("/icon.svg"), email: site.email,
        description: "An independent web design and development studio working remotely with small businesses.",
        sameAs: [site.instagramUrl, site.facebookUrl], knowsLanguage: ["bs", "de", "en"],
        contactPoint: { "@type": "ContactPoint", url: absoluteUrl("/en#contact"), contactType: "project inquiries", email: site.email, availableLanguage: ["en", "bs", "de"] },
      },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: site.name, inLanguage: ["bs", "de", "en"], publisher: { "@id": `${siteUrl}/#organization` } },
      {
        "@type": "WebPage", "@id": `${absoluteUrl("/en")}#webpage`, url: absoluteUrl("/en"), name: englishTitle,
        description: englishDescription, inLanguage: "en", isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service", "@id": `${absoluteUrl("/en")}#service`, name: "Web design, website redesign and development",
        provider: { "@id": `${siteUrl}/#organization` }, serviceType: "Website design and development",
        areaServed: { "@type": "Country", name: "United States" },
        description: `A starter one-page website from ${usStarterOffer.price} USD. Up to five sections, one language, supplied content and one revision round. Domain, hosting and additional features are quoted separately.`,
        availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/en#contact") },
      },
    ],
  };
}
