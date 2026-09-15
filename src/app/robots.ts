import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Indexing is opt-in. Previews and any environment without
 * NEXT_PUBLIC_ALLOW_INDEXING=true stay closed to crawlers, and the functional
 * demo routes stay closed everywhere.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexingAllowed) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/demo/", "/de/demo/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
