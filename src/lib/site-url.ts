/**
 * Confirmed public origin shared by metadataBase, canonical/hreflang,
 * Open Graph, structured data, sitemap and robots. Keep it independent of
 * Vercel deployment aliases and environment overrides so previews cannot
 * accidentally become the canonical site.
 */
export const siteUrl = "https://moststudioba.com";

/**
 * Production is indexed; everything else is not.
 *
 * The gate is Vercel's own `VERCEL_ENV`, not the hostname: a production
 * deployment is production even while it still lives on a `*.vercel.app`
 * address. Preview deployments can never be indexed whatever is configured,
 * so a throwaway preview URL cannot compete with the real site in search.
 *
 * `NEXT_PUBLIC_ALLOW_INDEXING=false` closes production again without a code
 * change — useful while a domain is being moved, or if the site has to come
 * out of search in a hurry.
 */
export const indexingAllowed: boolean =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false" &&
  (process.env.VERCEL_ENV ?? "production") === "production";
