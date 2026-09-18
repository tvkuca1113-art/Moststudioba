# MOST Studio — SEO follow-up, 18 September 2026

## What the evidence establishes

The supplied Search Console screenshot shows zero impressions/clicks and a single date, 16 September 2026, despite a three-month filter. It does not establish three months of missing visibility. An earlier screenshot confirms the homepage was indexed; it does not confirm all service URLs or ranking for unbranded searches.

Before changes, public HTTP checks found indexable homepage/service content, correct custom-domain canonical, verification in initial head, crawlable robots and a 24-URL sitemap. No general indexing block was established. We did not access the owner's authenticated Search Console, Google-selected canonicals, manual actions or per-URL indexing reports.

## Research and access limits

The requested public Instagram profile `https://www.instagram.com/edward.builds/` required login. The secure sign-in action was rejected by automatic approval review because the public-profile request did not authorize private-account access. No videos were viewed. None of the changes below is attributed to Edward's unseen videos. To complete that part, obtain the public video files/transcripts or separately authorized access; do not bypass the restriction.

Primary sources used:

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): descriptive content and realistic evaluation time.
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): standard SEO requirements also apply to AI search appearances; no special AI markup/file is required.
- [Crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): real links with useful context.
- [Helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): original, useful material and clear authorship.
- [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies): avoid repetitive city doorway pages and content generated only to manipulate rankings.
- [URL Inspection](https://support.google.com/webmasters/answer/9012289?hl=en), [Page indexing](https://support.google.com/webmasters/answer/7440203?hl=en), [Performance](https://support.google.com/webmasters/answer/7576553?hl=en) and [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl): distinguish publication, indexability, indexing and impressions.

A public competitor homepage, e-inzenjering.com, was examined for presentation of service/geographic intent and evidence of work. Its self-published experience/project counts were not independently verified and were not copied.

## Changes

- Explicit service and geographic headings for web development, ecommerce, redesign, BiH coverage and price planning; homepage branding remains intact.
- Contextual links between services, planning and guides, beyond a sitemap/footer alone.
- Two original buyer guides, each fully translated into German: Google visibility troubleshooting and website versus Instagram planning. Includes decision tables, real demo tasks, FAQs and clear author/publication date. Google troubleshooting cites primary sources.
- Scope comparison table on the price guide, without an invented fixed quote.
- Server-rendered accessible tables, source links and bylines. Guide Article markup matches visible content, date and citations. Organization logo references the existing public icon.
- Four new language URLs added automatically to sitemap, reciprocal hreflang and route-aware language switching. Total: 28 indexable URLs.
- Preserved domain, Google verification token, existing visual system, Instagram-first contact and intentionally noindex demos. No invented offices, client results or Facebook URL.

## Validation before publication

Production build, lint, TypeScript, existing DOM interaction/shop tests and initial-HTML SEO tests pass. SEO checks cover 28 pages, unique titles/descriptions, one H1, self-canonical, OG, reciprocal BS/DE/x-default, verification, schema, crawlable discovery and demo exclusions. New checks require guide Article metadata to match visible text, sources and dates; table semantics and same-page anchor targets are checked.

Cloud-browser access to the local server was blocked by the browser client, so the public deployment must receive a visual smoke test after release. This is not a website bot block and does not establish a production defect. These tests do not establish physical Safari compatibility, Google indexing/rankings, field Core Web Vitals or revenue effects.

Reproducible release checks:

```sh
npm ci
npm run build
npm run lint
npm run typecheck
npm run test:interactions
npm run test:seo
python scripts/qa-public.py after qa/evidence/seo-2026-09-19
```

The public checker compares live sitemap URLs/titles with the tested build, verifies initial-head ownership token, canonical/hreflang, guide Article presence, demo exclusions, and permanent redirect path/query preservation. Deployment uses the existing production Git branch `claude/most-studio-website-svturd` and Vercel integration.

## Owner actions that code cannot replace

1. In Search Console's `moststudioba.com` property, confirm `/sitemap.xml` is submitted successfully. Inspect homepage, website service, webshop service and BiH coverage individually. Capture indexing reason, last crawl and Google-selected canonical; request indexing after substantive changes, not every day.
2. Send the Pages/indexing report and performance export without passwords. Keep country/query/page filters visible. Record a baseline by page and branded versus nonbranded queries. Weekly review is useful for discovery; compare sufficiently populated 28-day periods rather than treating one day as proof.
3. Supply the confirmed Facebook page URL. Add the website link to the actual Instagram and Facebook profiles. Publishing social posts/messages remains the owner's action unless explicitly delegated.
4. Publish real completed work with permission: starting problem, delivered change, evidence and measured outcomes when available. Request honest references; never fabricate them or exchange links solely to manipulate rankings.
5. For an online-only studio, do not invent a physical office or create a city-page matrix. Add distinct local case studies only when real work provides useful local information.
6. After more data arrives, choose follow-up changes from actual search queries, indexed pages and qualified inquiries. There is no guarantee of a specific position or monthly revenue from this release.
