# Šta još nedostaje za javnu objavu

Stranica je funkcionalna i može se objaviti ovakva kakva jeste — kontaktni tok
radi preko potvrđenog Instagram profila. Ispod je popis podataka koje treba
potvrditi prije nego što se uključi indeksiranje.

## Potvrđeno i već u projektu

- Naziv brenda: **MOST Studio**
- Instagram: **@moststudioba** → https://www.instagram.com/moststudioba/
- Usluge: web dizajn, izrada web stranica, redizajn
- Tržišta: Bosna i Hercegovina, Njemačka
- Jezici: bosanski (osnovne rute), njemački (`/de/`)

## Nedostaje — blokira indeksiranje

| Podatak | Gdje se koristi | Šta uraditi |
| --- | --- | --- |
| **Domena** | canonical, hreflang, sitemap, Open Graph | Postaviti `NEXT_PUBLIC_SITE_URL`. Domena `moststudio.ba` sa referentne slike **nije potvrđena** i nigdje se ne pojavljuje u kodu. |
| **Dozvola za indeksiranje** | `robots.txt`, `robots` meta | Postaviti `NEXT_PUBLIC_ALLOW_INDEXING=true` samo na produkciji. Dok je isključeno, cijeli sajt je `noindex` i `Disallow: /`. |

## Nedostaje — ne blokira objavu

| Podatak | Zašto bi koristio | Trenutno stanje |
| --- | --- | --- |
| **Email adresa** | Drugi kanal za upite | Nije dodan nijedan lažni email. Kontakt ide isključivo preko Instagrama. |
| **Telefon / WhatsApp** | Brži kontakt | Nema dugmadi za nepostojeće kanale. |
| **Pravni podaci** (naziv firme, ID, adresa) | Impressum / obavezna stranica za njemačko tržište | **Važno:** za nastup u Njemačkoj obično je potreban Impressum. Treba ga dodati prije oglašavanja prema njemačkom tržištu. |
| **Logo** | Zamijenio bi tipografski wordmark | U projektu nema originalnog loga, pa je napravljen tipografski `Wordmark` (`src/components/ui/Wordmark.tsx`). |
| **Fotografije** | Demo koncepti | Nijedna stock fotografija nije dostupna iz ovog okruženja, pa su vizuali nacrtani kao originalni SVG (`src/components/demos/art.tsx`). Rade odlično i lagani su, ali kod stvarnih klijentskih projekata idu prave fotografije. |
| **Analitika** | Mjerenje | Isključena. Nema pixela ni skripti trećih strana. Uključuje se tek kada se potvrdi provajder i potrebne postavke (pristanak korisnika). |

## Šta namjerno nije napisano

Nisu izmišljeni: klijenti, recenzije, nagrade, godine iskustva, veličina tima,
brojevi (povećanje prodaje ili upita), cijene, rokovi, adrese ni poslovnice.
Prikazani projekti su **demo koncepti** i tako su označeni na svakom mjestu.
