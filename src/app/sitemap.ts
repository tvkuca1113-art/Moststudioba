import type { MetadataRoute } from "next";

import { demoProjects } from "@/content/projects";
import { contentPageKeys } from "@/content/service-pages";
import { allPaths, htmlLang, locales, path, type RouteRef } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo";

/**
 * Both language versions of every public page, cross-linked with hreflang.
 * The functional demo routes are deliberately absent — they are noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const refs: RouteRef[] = [
    { key: "home" },
    { key: "projects" },
    { key: "services" },
    { key: "contact" },
    ...contentPageKeys.map(key => ({ key })),
    ...demoProjects.map((project) => ({ key: "project" as const, slug: project.slug })),
  ];

  return refs.flatMap((ref) => {
    const paths = allPaths(ref);
    return locales.map((locale) => ({
      url: absoluteUrl(path(ref.key, locale, ref.slug)),
      // Do not present every build time as a content modification date.
      changeFrequency: "monthly" as const,
      priority: ref.key === "home" ? 1 : 0.7,
      alternates: {
        languages: {
          [htmlLang.bs]: absoluteUrl(paths.bs),
          [htmlLang.de]: absoluteUrl(paths.de),
        },
      },
    }));
  });
}
