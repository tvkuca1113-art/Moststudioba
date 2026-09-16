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
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Dok nije `true`, ne emituje se nijedan događaj. Nema pixela ni skripti trećih strana. |

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

Tri koncepta u `src/components/demos/`. Svaki je pisan s **container queries**,
ne media queries, pa se isti kod koristi:

- na vlastitoj ruti `/demo/[slug]` (puna širina),
- u interaktivnom prikazu na početnoj (`Računar` / `Mobitel` mijenja širinu
  kontejnera, pa se raspored stvarno mijenja),
- u prikazima na stranici projekta.

Zato prikaz i demo ne mogu razići — to je isti kod.

`/demo/*` rute su `noindex` da se demo ordinacija ne pojavi u pretrazi kao
stvarna. Njihove prezentacije na `/projekti/*` su indeksabilne.

### Grafika

Bez stock fotografija. Sve ilustracije su originalni SVG u
`src/components/demos/art.tsx`. U konfiguratoru stolarije promjena završne
obrade **ponovo iscrtava** grafiku — ne učitava se nijedna nova datoteka.

## Kontaktni tok

Nema backenda, email servisa ni tajnih ključeva. „Pripremite upit" sastavi
poruku, korisnik je uredi, kopira i sam pošalje na Instagram. Kopiranje nije
slanje i to je jasno napisano na stranici. Ako clipboard API ne uspije, nudi
se ručno označavanje teksta.

## Prije objave

Pogledaj [`MISSING_FOR_LAUNCH.md`](./MISSING_FOR_LAUNCH.md) — popis podataka
koji još nisu potvrđeni (domena, pravni podaci za njemačko tržište).
