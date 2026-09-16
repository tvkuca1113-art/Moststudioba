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
npm run build        # produkcijski build
npm run start        # pokreće produkcijski build
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run og           # regeneriše Open Graph slike u public/og/
```

Za `npm run og` potreban je font Archivo instaliran u sistemu (`~/.fonts`).
Slike su commitane, pa build nikada ne zavisi od te skripte.

## Postavke okruženja

Kopiraj `.env.example` u `.env.local`. Nema tajnih ključeva — sve je `NEXT_PUBLIC_`.

| Varijabla | Šta radi |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Kanonski URL. Na Vercelu nije obavezan — bez njega se koristi produkcijski hostname projekta. Postavi ga kada dobiješ vlastitu domenu. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Dok nije `true`, cijeli sajt je `noindex` i `robots.txt` je `Disallow: /`. Preview deployi ostaju `noindex` i kada jeste `true`. |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Dok nije `true`, ne učitava se Vercel Web Analytics i ne emituje se nijedan događaj. Nema pixela ni skripti trećih strana. |

> **Analitika je trenutno isključena na produkciji.** Vercel Web Analytics je
> ugrađen i spreman, ali dok `NEXT_PUBLIC_ANALYTICS_ENABLED` nije `true` u
> Vercel postavkama, ne prikuplja se ništa.

## Deployment na Vercel

1. Poveži repozitorij na [vercel.com/new](https://vercel.com/new). Vercel sam
   prepoznaje Next.js — build komanda i output se ne mijenjaju. Bez ijedne
   postavke sajt radi odmah i ostaje izvan pretrage.
2. Kada dobiješ domenu: **Settings → Domains** → dodaj je i sačekaj DNS.
3. **Settings → Environment Variables**, samo za `Production`:
   - `NEXT_PUBLIC_SITE_URL` = `https://tvoja-domena.ba`
   - `NEXT_PUBLIC_ALLOW_INDEXING` = `true`
4. Redeploy, pa provjeri `/robots.txt` (treba `Allow: /`) i `/sitemap.xml`.

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
    robots.ts        indeksiranje je opt-in
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

Nema backenda, email servisa ni tajnih ključeva. Instagram je jedini potvrđen
kanal, pa je tok napisan kao tri vidljiva koraka — **Pripremite → Kopirajte →
Otvorite Instagram**. Poruku sastavlja stranica, korisnik je uredi, kopira i
sam pošalje. Kopiranje nije slanje i to piše i u koracima i ispod dugmadi;
nigdje se ne pojavljuje „upit je poslan". Ako clipboard API ne uspije, nudi se
ručno označavanje teksta.

## Analitika

`src/lib/analytics.ts` definiše šest događaja: `view_project`, `open_demo`,
`contact_start`, `copy_message`, `outbound_instagram`, `lead_submit`.

Dva pravila su ugrađena u tipove, ne samo u dokumentaciju:

- **Sadržaj poruke nikada ne izlazi iz browsera.** `copy_message` šalje samo
  dva odabrana odgovora i grubu dužinu teksta.
- **`lead_submit` znači stvarno pristigao upit.** Kopiranje u clipboard i
  odlazak na Instagram nisu to — oni su `copy_message` i `outbound_instagram`.
  Dok nema backenda, `lead_submit` se ne emituje nigdje.

Sve zajedno je isključeno dok `NEXT_PUBLIC_ANALYTICS_ENABLED` nije `true`.

## Tipografija i kontrast

Sve vrijednosti u `src/app/globals.css` su izmjerene, ne procijenjene. Naslov
H1 ide od 44 px na telefonu do 92 px na 1440 px, tekst za čitanje nikada nije
ispod 17 px, a mjere reda su u rasponu 55–70 znakova.

Akcentna lime boja ima kontrast **1,09:1** na svijetloj podlozi — nevidljiva
kao tekst. Zato se koristi isključivo na tamnoj podlozi (9,7:1 na forest,
13,9:1 na ink). Iz istog razloga fokusni prsten na svijetloj podlozi nije lime
nego forest (10,7:1); lime ostaje samo unutar `.on-dark`.

## Prije objave

Pogledaj [`MISSING_FOR_LAUNCH.md`](./MISSING_FOR_LAUNCH.md) — popis podataka
koji još nisu potvrđeni (domena, pravni podaci za njemačko tržište).
