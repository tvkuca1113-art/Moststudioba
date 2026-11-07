import type { MetadataRoute } from "next";

import { clientProjects } from "@/content/client-projects";
import { demoProjects } from "@/content/projects";
import { contentPageKeys } from "@/content/service-pages";
import { allPaths, contentLocales, path, type RouteRef } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo";

/**
 * All available language versions of public pages, cross-linked with hreflang.
 * The functional demo routes are deliberately absent — they are noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const refs: RouteRef[] = [
    { key: "home" },
    { key: "projects" },
    { key: "services" },
    { key: "contact" },
    ...contentPageKeys.map(key => ({ key })),
    ...[...clientProjects, ...demoProjects].map((project) => ({ key: "project" as const, slug: project.slug })),
  ];

  return refs.flatMap((ref) => {
    const paths = allPaths(ref);
    const available = [...contentLocales.map(locale => path(ref.key, locale, ref.slug)), ...(paths.en ? [paths.en] : [])];
    return available.map((pathname) => ({
      url: absoluteUrl(pathname),
      // Do not present every build time as a content modification date.
      changeFrequency: "monthly" as const,
      priority: ref.key === "home" ? 1 : 0.7,
      alternates: {
        languages: {
          bs: absoluteUrl(paths.bs),
          de: absoluteUrl(paths.de),
          ...(paths.en ? { en: absoluteUrl(paths.en) } : {}),
          "x-default": absoluteUrl(paths.bs),
        },
      },
    }));
  });
}
