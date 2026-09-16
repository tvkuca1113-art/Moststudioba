import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { indexingAllowed, siteUrl } from "@/lib/site-url";

/**
 * Indexing is opt-in. Previews and any environment without
 * NEXT_PUBLIC_ALLOW_INDEXING=true stay closed to crawlers, and the functional
 * demo routes stay closed everywhere.
 */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/demo/", "/de/demo/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
