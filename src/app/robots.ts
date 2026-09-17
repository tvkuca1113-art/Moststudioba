import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { indexingAllowed, siteUrl } from "@/lib/site-url";

/**
 * Production is crawlable unless NEXT_PUBLIC_ALLOW_INDEXING=false.
 * Preview deployments stay closed to crawlers.
 *
 * Once it is open, everything is crawlable — including `/demo/`. Those pages
 * carry `noindex, follow` in their own metadata, which is what keeps them out
 * of results. Disallowing them here would be the wrong tool and would work
 * against itself: a page a crawler is forbidden to fetch is a page whose
 * `noindex` is never read, and it can still end up listed from inbound links.
 * They are left crawlable so the instruction is actually seen, and so the
 * links from a demo back to the concept pages are followed. They stay out of
 * the sitemap, which only ever lists what we do want indexed.
 */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
