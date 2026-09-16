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
 * Indexing is opt-in, and preview deployments can never opt in — otherwise a
 * throwaway preview URL competes with the real site in search results.
 */
export const indexingAllowed: boolean =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  (process.env.VERCEL_ENV ?? "production") === "production";
