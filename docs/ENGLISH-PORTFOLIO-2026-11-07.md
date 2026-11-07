# English portfolio for US outreach

## Scope

Added `/en` to the existing Next.js project, with English presentations at
`/en/projects/mirjana-massage`, `/en/projects/stolarija-hrast`,
`/en/projects/ordinacija-lipa` and `/en/projects/meridijan-savjetovanje`.
Existing BS/DE URLs, content and pricing remain intact. Language navigation
links to actual equivalents, or a relevant English landing section when a
full translation is not available. Hreflang only advertises real equivalent
pages. `Locale` remains the strict BS/DE content type; `SiteLocale` includes
English, without introducing silent untranslated fallbacks to the old views.

## Work and provenance

- Massage und Wellness Mirjana remains the confirmed client project from
  `src/content/client-projects.ts`, using the existing verified desktop/mobile
  captures. No performance results, US clients or testimonials were added.
- Hrast, Lipa and Meridijan remain independent demo concepts for invented
  businesses. Their presentations are in English. The working demos remain
  in Bosnian and the links explicitly say so. No bookings/orders are created.
- The owner requested DAL Workshop and InnoSa Clean **as examples** on
  7 November 2026. They are separately labeled “Website example”, with direct
  links to the live sites. No paid-client status or commercial results are
  inferred.
- DAL capture: `https://dalworkshop.com/`, 7 November 2026. Live home H1:
  “Stol po mjeri za vaš prostor.” The English description mentions the
  product configurator visible in the live navigation. The source site itself
  distinguishes original workshop photos from illustrative interior imagery.
- InnoSa capture: `https://innosaclean.de/`, 7 November 2026. Live home H1:
  “Moin, Hamburg. Wir machen’s sauber.” Optional statistics declined before
  capture. Description is limited to visible service pages and inquiry flow.
- Website example screenshots were captured through the browser at the actual
  sites, resized to 1200 × 824 and saved as WebP. They illustrate the website
  designs, not evidence of physical cleaning jobs or furniture installations.

## Offer

Owner requested a starting price of **$400 USD** for the English page.
`usStarterOffer` in `src/content/offer.ts` records the scoped one-page offer:
up to five sections, one language, supplied content and one consolidated
revision round. External costs and additional work are separately quoted.
The existing 600 KM BS/DE starter offer is unchanged.

## Contact

The short brief prepares an editable message locally. Visitors copy it and
open the confirmed Instagram profile, or open an encoded email draft to the
confirmed studio inbox. Nothing is sent automatically. Clipboard failure
focuses the selectable message. Analytics never receive the brief or any
business details. No lead-received event is emitted.

## SEO

English canonical URL, en_US Open Graph metadata, a dedicated English social
image, reciprocal bs/de/en/x-default alternates on equivalent pages, and
five English sitemap entries. Preview builds inherit the existing noindex
policy. The US is a service audience, not a fabricated office address.

## Release

Changes belong on a feature branch and review PR. Do not merge or switch the
production domain until the owner approves the reviewed result.

## Verification completed

- `npm run build`: passed; all five English routes statically generated.
- `npm run test:seo`: passed for 35 public HTML pages, including reciprocal
  language alternates, canonical URLs, Open Graph, single H1, local image
  assets, crawlable links and the existing noindex demo boundary.
- `npm run test:interactions`: passed, including all existing BS/DE inquiry,
  demo and shop checks, plus the new English message review/edit, email
  encoding, clipboard success/failure and explicit unsent state.
- Browser: desktop at 1363 CSS px and responsive layouts at 454 and 340 CSS
  px, using browser zoom. This is a responsive viewport check, not physical
  phone testing. Home, case-page layout, mobile menu, Escape, inquiry review,
  live example links and EN → DE → EN case navigation were inspected.
- Actual website-example screenshots and final desktop review captures are
  committed in `docs/evidence/english/` and `public/images/projects/examples/`.
- The production domain has not been modified. Remote preview and review PR
  remain pending branch-upload authorization.
