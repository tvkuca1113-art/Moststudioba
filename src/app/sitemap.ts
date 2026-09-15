import type { MetadataRoute } from "next";

import { demoProjects } from "@/content/projects";
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
    ...demoProjects.map((project) => ({ key: "project" as const, slug: project.slug })),
  ];

  const lastModified = new Date();

  return refs.flatMap((ref) => {
    const paths = allPaths(ref);
    return locales.map((locale) => ({
      url: absoluteUrl(path(ref.key, locale, ref.slug)),
      lastModified,
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
