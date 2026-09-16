/**
 * Where the site lives, and whether crawlers may index it.
 *
 * Server-only: these read plain (non-`NEXT_PUBLIC_`) environment variables, so
 * they must never be imported from a Client Component. Only metadata, robots,
 * the sitemap and the root layouts need them.
 */

/**
 * Resolution order:
 *  1. `NEXT_PUBLIC_SITE_URL` — the real domain, once it is confirmed.
 *  2. The Vercel project's stable production hostname.
 *  3. The per-deployment hostname (preview builds).
 *  4. Local development.
 *
 * Steps 2 and 3 mean canonical, hreflang and Open Graph URLs are correct on
 * Vercel out of the box, without configuring anything by hand.
 */
export const siteUrl: string = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/\/$/, "")}`;

  const deployment = process.env.VERCEL_URL?.trim();
  if (deployment) return `https://${deployment.replace(/\/$/, "")}`;

  return "http://localhost:3000";
})();

/**
 * Indexing is opt-in.
 *
 * The gate is Vercel's own `VERCEL_ENV`, not the hostname: a production
 * deployment is production even while it still lives on a `*.vercel.app`
 * address. Preview deployments can never opt in, so a throwaway preview URL
 * cannot compete with the real site in search.
 *
 * So a live production deployment stays `noindex` until
 * NEXT_PUBLIC_ALLOW_INDEXING is set to "true" in the project's Production
 * environment. That is the whole reason the current site reports
 * `noindex, follow, nocache` — nothing else is blocking it.
 */
export const indexingAllowed: boolean =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  (process.env.VERCEL_ENV ?? "production") === "production";
