# MOST Studio

Web stranica studija za web dizajn, izradu i redizajn web stranica.
Bosanski na osnovnim rutama, njemački pod `/de/`.

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**

---

## Pokretanje

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # build webshopa iz izvora + Next produkcijski build
npm run start        # pokreće produkcijski build
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run test:interactions # DOM regresije, bez pokrenutog servera
npm run test:seo      # provjera početnog HTML-a nakon npm run build
npm run build:webshop # ponovljiv build zasebne React aplikacije
npm run og           # regeneriše Open Graph slike u public/og/
```

Za `npm run og` potreban je font Archivo instaliran u sistemu (`~/.fonts`).
Slike su commitane, pa build nikada ne zavisi od te skripte.

## Postavke okruženja

Kopiraj `.env.example` u `.env.local`. Nema tajnih ključeva — sve je `NEXT_PUBLIC_`.

Nijedna varijabla nije obavezna. Bez ijedne, produkcija se indeksira i
analitika radi. Postoje samo da se to može isključiti bez izmjene koda.

| Varijabla | Šta radi |
| --- | --- |
| Kanonski URL (kod) | `https://moststudioba.com` u `src/lib/site-url.ts`. `NEXT_PUBLIC_SITE_URL` se ne koristi. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Produkcija se indeksira. Na `false` cijeli sajt postaje `noindex` i `robots.txt` je `Disallow: /`. Preview deployi su `noindex` uvijek, bez obzira na ovu vrijednost. |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Vercel Web Analytics je uključen (bez kolačića). Na `false` se ne učitava i nijedan događaj se ne emituje. Nema pixela ni skripti trećih strana. |

## Deployment na Vercel

Postojeći GitHub repozitorij je `tvkuca1113-art/Moststudioba`, a povezana
Vercel aplikacija `moststudioba`. Produkcija koristi https://moststudioba.com.
Objava se radi kroz postojeću granu `claude/most-studio-website-svturd` i
GitHub/Vercel integraciju. Ne kreirati novi projekat ni mijenjati domene.

Prije pusha pokrenuti lint, typecheck, build, test:interactions i test:seo.
Poslije pusha provjeriti Vercel commit status i javni sadržaj. Admin pristup
postavkama Vercela treba zasebno potvrditi: sam GitHub status nije potpun
pregled konfiguracije. Kod dodaje trajno preusmjeravanje stare Vercel adrese
i www adrese, uz očuvanje putanje i query parametara.

`VERCEL_ENV=preview` uvijek daje noindex. Bez `VERCEL_ENV` lokalni produkcijski
build koristi produkcijsku politiku za SEO testove. Preview build treba
provjeravati odvojeno. Promjena `NEXT_PUBLIC_ALLOW_INDEXING` zahtijeva novi build.

Indeksiranje i analitika ne traže nikakvu varijablu — uključeni su.

Preview deployi ostaju `noindex` bez obzira na postavke, pa privremene adrese
ne mogu završiti u pretrazi umjesto pravog sajta.

Sve rute su statički generisane, pa nema servera koji treba održavati.

## Struktura

```
src/
  app/
    (bs)/            bosanske rute: /, /projekti, /usluge, /kontakt, /demo/[slug]
    (de)/de/         njemačke rute: /de, /de/projekte, /de/leistungen, ...
    sitemap.ts       obje jezičke verzije + hreflang
    robots.ts        produkcija crawlable; preview zatvoren
  views/             stranice, dijeljene između oba jezika
  components/
    demos/           tri funkcionalna demo koncepta + SVG grafika
    home/            sekcije početne stranice
    layout/          header, footer, prebacivanje jezika
    ui/              dugmad, sekcije, reveal
  content/           projekti, usluge, proces, FAQ, sadržaj demoa
  lib/i18n/          jezici, rute, rječnici
```

### Dva root layouta

`app/(bs)/layout.tsx` i `app/(de)/layout.tsx` su dva **root** layouta — zato
svako jezičko stablo ima svoj `<html lang>` bez middleware preusmjeravanja.
Zbog toga **ne smije postojati** `app/layout.tsx`.

### Rute i jezici

Sve adrese su na jednom mjestu: `src/lib/i18n/config.ts`. Svaka stranica zna
svoj `RouteKey`, pa prebacivanje jezika vodi na **istu stranicu** u drugom
jeziku (`/projekti/lipa` → `/de/projekte/lipa`), a ne na početnu.

### Prevodi

`src/lib/i18n/bs.ts` definiše oblik rječnika; `de.ts` je tipiziran prema njemu
(`const de: Dictionary`). Ako se doda bosanski ključ bez njemačkog para,
**typecheck pada**. Njemačka verzija ne može ostati djelimično prevedena.

Duži sadržaj (projekti, usluge, proces, FAQ, demoi) živi u `src/content/` i
koristi tip `L<T>` — svaki tekst mora postojati na oba jezika.

### Demo koncepti

Tri koncepta u `src/components/demos/`, svaki na vlastitoj ruti `/demo/[slug]`
i s vlastitim vizualnim sistemom (paleta, tipografija, kompozicija i način
predstavljanja ponude). Pisani su s **container queries**, ne media queries,
pa rade i kada se prikazuju u užem okviru.

Početna **ne ugrađuje** živi demo: tri interfejsa na jednoj stranici značila su
drugi `<h1>`, mnogo JavaScripta i zarobljen skrol u malom okviru. Umjesto toga
portfolio pokazuje snimke, a demo je jedan klik dalje.

`/demo/*` rute su `noindex, follow` da se demo ordinacija ne pojavi u pretrazi
kao stvarna. Ostaju **dostupne za crawlanje** — `robots.txt` ih ne zabranjuje,
jer stranica koju crawler ne smije dohvatiti je stranica čiji `noindex` niko
ne pročita. Nisu u sitemapu. Njihove prezentacije na `/projekti/*` su
indeksabilne.

### Slike i snimci

Dvije odvojene stvari:

- **Fotografije** (`public/images/<grupa>/`) — konceptualni vizuali iz
  isporučenog paketa. Ugrađuju se skriptom koja provjeri SHA-256, smanji,
  prekodira i generiše `src/content/images.ts` s BS/DE alt tekstom:
  `node scripts/prepare-images.mjs <putanja-do-paketa>` (25,3 MB → 1,6 MB).
- **Snimci demoa** (`public/images/snimci/`) — hero, kartice projekata i
  studije koncepata koriste **stvarne snimke implementiranih demo stranica**,
  po jedan par za svaki jezik: `node scripts/capture-demos.mjs`. Zato prikaz na
  kartici uvijek odgovara onome što se otvori klikom.

Detalji i porijeklo: [`docs/SLIKE.md`](./docs/SLIKE.md).

## Kontaktni tok

Instagram je glavni potvrđeni kontakt, email sporedni. Facebook se prikazuje
tek nakon potvrde URL-a u `src/content/site.ts`. Zajednička komponenta
`SocialContact` koristi potvrđeni HTTPS profil bez pretpostavljenih deep linkova.
Korisnik otvara profil i sam bira poruku; prijava može biti potrebna.

Projektni obrazac je opcionalan. Potrebni su samo vrsta potrebe i kratak opis;
ime, firma, postojeći URL i kontakt za odgovor nisu obavezni. Tekst se pregleda,
uređuje i kopira prije ručnog slanja. Povratak bez promjene polja čuva uređenu
poruku. Clipboard greška nudi označen tekst za ručno kopiranje. Nema backenda
koji prima upit i UI ne tvrdi da je upit poslan.

## Webshop iz izvora

Izvorni projekt je sačuvan u `webshop/` s porijeklom u `webshop/README.md`.
`npm run build:webshop` generiše HTML, CSS i JS u `public/webshop-assets/`.
Ne mijenjati minificirani bundle ručno. Katalog zadržava svih 50 artikala,
postojeće slike, identifikatore i ključ korpe `most-demo-cart-v1`.
MOST Studio je obični link `/#top` u istoj kartici; informacije su zasebna akcija.

Snimci demoa imaju hash u nazivu i dimenzije u `src/content/shots.ts`.
`Shot` je serverska komponenta s responzivnom slikom; nema ResizeObservera,
početnog skaliranja ni učitavanja živih aplikacija u početnu.

## Analitika

`src/lib/analytics.ts` definiše događaje: `view_project`, `open_demo`,
`contact_start`, `copy_message`, `outbound_instagram`, `outbound_facebook`,
`outbound_email`, `lead_submit`.

Dva pravila su ugrađena u tipove, ne samo u dokumentaciju:

- **Sadržaj poruke nikada ne izlazi iz browsera.** `copy_message` šalje samo
  fiksne oznake vrste toka i grubu dužinu teksta; ne šalje unesene vrijednosti.
- **`lead_submit` znači stvarno pristigao upit.** Kopiranje u clipboard i
  odlazak na Instagram nisu to — oni su `copy_message` i `outbound_instagram`.
  Dok nema backenda, `lead_submit` se ne emituje nigdje.

Analitika je uključena. `NEXT_PUBLIC_ANALYTICS_ENABLED=false` je isključuje bez
izmjene koda; u `next dev` Vercel skripta sama prepozna razvoj i ne šalje ništa.

## Tipografija i kontrast

Tipografske skale i boje definisane su u `src/app/globals.css`. Tekst sadržaja,
navigacije i pomoćne oznake imaju različite veličine. Automatske provjere
ne zamjenjuju ručnu provjeru kontrasta, povećanja teksta i tastature.

Akcentna lime boja ima kontrast **1,09:1** na svijetloj podlozi — nevidljiva
kao tekst. Zato se koristi isključivo na tamnoj podlozi (9,7:1 na forest,
13,9:1 na ink). Iz istog razloga fokusni prsten na svijetloj podlozi nije lime
nego forest (10,7:1); lime ostaje samo unutar `.on-dark`.

## Prije objave

Pogledaj [`MISSING_FOR_LAUNCH.md`](./MISSING_FOR_LAUNCH.md) — popis podataka
koji još nisu potvrđeni (Facebook, stvarne reference, Search Console i poslovni podaci).

Browser regresije su u `qa/regression/critical-paths.spec.ts`. Za njih treba
pokrenut produkcijski server i instalirani Playwright browseri:

```bash
npx playwright install chromium webkit
npm run build && npm run start
# u drugom terminalu:
BASE_URL=http://127.0.0.1:3000 npx playwright test
```

Ove dodatne browser skripte nisu zamjena za DOM testove ili ručnu provjeru.
Detalji provedene provjere i ograničenja: `docs/UX-SEO-2026-09-18.md`.
