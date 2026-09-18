# Potvrđeni podaci i preostali zadaci

Ažurirano 18. 9. 2026. Stranica je objavljena. Ovaj dokument prati stvarne
poslovne podatke i nedovršene integracije.

## Potvrđeno

- Brend: **MOST Studio**.
- Glavna domena: **https://moststudioba.com**.
- Online saradnja s firmama u Bosni i Hercegovini i Njemačkoj.
- Bosanski i njemački sadržaj sa zasebnim URL-ovima.
- Instagram: https://www.instagram.com/moststudioba/ — glavni aktivni kontakt.
- Email: **moststudioba@gmail.com** — sporedna opcija, po izboru posjetioca.
- Željeni glavni kanali su Instagram i Facebook. Facebook link se prikazuje
  tek kada vlasnik dostavi tačan URL svoje stranice.

## Indeksiranje i domena

`src/lib/site-url.ts` sadrži potvrđenu domenu. `metadataBase`, canonical,
hreflang, Open Graph, strukturirani podaci, sitemap i robots koriste isti
izvor. Vercel preview adrese ne postaju canonical domena.

Produkcija dopušta indeksiranje, preview objave imaju `noindex`.
`NEXT_PUBLIC_ALLOW_INDEXING=false` može isključiti indeksiranje produkcije.
Google verification oznaka ostaje u početnom HTML-u početne stranice.

Sitemap sadrži 24 javne BS/DE stranice. Demo rute i demo webshop ostaju
`noindex` i izvan sitemapa. Robots ih ne blokira, tako da crawler može
pročitati `noindex`. Prezentacije koncepata imaju vlastiti sadržaj i mogu se
indeksirati. Ne predstavljaju se kao plaćeni klijentski radovi.

## Kontakt i mjerenje

Projektni obrazac priprema poruku za pregled i kopiranje; ne šalje je
automatski. Posjetilac otvara Instagram i sam šalje poruku. Email alternativa
otvara njegovu aplikaciju sa pripremljenim tekstom. Facebook će koristiti
potvrđeni URL iz `src/content/site.ts` kada bude dostavljen.

Vercel Web Analytics i dozvoljeni događaji definisani su u
`src/lib/analytics.ts`. Događaji ne sadrže ime, firmu, email ni tekst upita.
Kopiranje i otvaranje kontaktnog kanala nisu primljeni upiti; `lead_submit`
je rezervisan i trenutno se ne emituje. Analitika se može isključiti sa
`NEXT_PUBLIC_ANALYTICS_ENABLED=false`.

## Šta još treba dostaviti ili uraditi

| Stavka | Sljedeći korak |
| --- | --- |
| Tačan Facebook URL | Vlasnik šalje link svoje stranice; upisati `site.facebookUrl`, provjeriti odredište i objaviti. |
| Search Console podaci | Pratiti stranice i upite za BiH, poslati javni sitemap i provjeriti nove URL-ove. Indeksiranje nije garancija pozicije. |
| Stvarni klijentski radovi | Uz dozvolu klijenta objaviti problem, izvedeno rješenje i dokumentovane rezultate. |
| Pravni podaci i obavijesti | Dostaviti stvarni naziv subjekta i ostale podatke potrebne za odgovarajuće poslovne i privatnosne obavijesti. |
| Telefon / WhatsApp | Dodati samo ako vlasnik želi taj kanal i dostavi potvrđen broj. |
| Poslovni profil na Googleu | Potvrđen je isključivo online rad; ne izmišljati ured ili poslovnicu radi Maps profila. |

Nisu izmišljeni klijenti, recenzije, nagrade, godine iskustva, članovi tima,
rezultati prodaje, cijene, poslovnice ni adrese. Generisani demo vizuali ne
dokumentuju stvarne izvedene narudžbe. Detalji SEO rada i izvori su u
`docs/SEO-GEO-2026-09-17.md`.
