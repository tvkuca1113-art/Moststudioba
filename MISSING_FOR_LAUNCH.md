# Šta još nedostaje za javnu objavu

Stranica je funkcionalna, indeksiranje i analitika su uključeni, a kontaktni
tok radi preko potvrđenog Instagram profila. Ispod je popis podataka koji još
nisu potvrđeni.

## Potvrđeno i već u projektu

- Naziv brenda: **MOST Studio**
- Instagram: **@moststudioba** → https://www.instagram.com/moststudioba/
- Usluge: web dizajn, izrada web stranica, redizajn
- Tržišta: Bosna i Hercegovina, Njemačka
- Jezici: bosanski (osnovne rute), njemački (`/de/`)

## Indeksiranje — uključeno

Ne traži nijednu Vercel varijablu. Produkcijski deploy se indeksira; preview
deployi ostaju `noindex` uvijek, pa privremene adrese ne mogu završiti u
pretrazi umjesto pravog sajta. `NEXT_PUBLIC_ALLOW_INDEXING=false` povlači sajt
iz pretrage ako ikad zatreba.

Sajt se trenutno indeksira na adresi **`moststudioba.vercel.app`**, jer je to
jedina potvrđena adresa. Kada dođe vlastita domena, treba uraditi dvije stvari,
tim redom, da se ne izgubi ono što je Google već indeksirao:

1. Vercel → Settings → Domains → dodati domenu i sačekati DNS.
2. Environment Variables (**samo `Production`**) → `NEXT_PUBLIC_SITE_URL` =
   `https://nova-domena.ba`, pa redeploy. Vercel sam preusmjerava staru
   `*.vercel.app` adresu na novu primarnu domenu, a canonical od tog trenutka
   pokazuje na pravu domenu.

Domena `moststudio.ba` sa referentne slike i dalje **nije potvrđena** i nigdje
se ne pojavljuje u kodu.

## Analitika — uključena

Vercel Web Analytics radi na produkciji, bez kolačića i bez skripti trećih
strana. Šalje se šest događaja iz `src/lib/analytics.ts`: `view_project`,
`open_demo`, `contact_start`, `copy_message`, `outbound_instagram` i
`lead_submit`.

Dva pravila su ugrađena u tipove: sadržaj poruke koju posjetilac napiše nikada
ne napušta browser, a kopiranje poruke se bilježi kao `copy_message` — nikada
kao `lead_submit`. Dok nema backenda, `lead_submit` se ne emituje nigdje.

`NEXT_PUBLIC_ANALYTICS_ENABLED=false` isključuje prikupljanje.

### Demo rute ostaju izvan pretrage

Demo rute (`/demo/*`, `/de/demo/*`) su `noindex, follow` —
izmišljena ordinacija ili stolarija ne smije se pojaviti u pretrazi kao stvarna
firma. Ostaju dostupne za crawlanje i nisu u sitemapu; `robots.txt` ih više ne
zabranjuje, jer zabrana dohvata znači da `noindex` nikad ne bude pročitan.
Prezentacije koncepata (`/projekti/*`) imaju vlastiti sadržaj i indeksiraju se.

## Nedostaje — ne blokira objavu

| Podatak | Zašto bi koristio | Trenutno stanje |
| --- | --- | --- |
| **Email adresa** | Drugi kanal za upite | Nije dodan nijedan lažni email. Kontakt ide isključivo preko Instagrama. |
| **Telefon / WhatsApp** | Brži kontakt | Nema dugmadi za nepostojeće kanale. |
| **Pravni podaci** (naziv firme, ID, adresa) | Impressum / obavezna stranica za njemačko tržište | **Važno:** za nastup u Njemačkoj obično je potreban Impressum. Treba ga dodati prije oglašavanja prema njemačkom tržištu. |
| **Logo** | Zamijenio bi tipografski wordmark | U projektu nema originalnog loga, pa je napravljen tipografski `Wordmark` (`src/components/ui/Wordmark.tsx`). |
| **Fotografije** | Demo koncepti | **Riješeno.** Isporučen je paket od 18 konceptualnih vizuala; ugrađeni su prema `RASPORED-SLIKA.md`. Vidi `docs/SLIKE.md`. To su generisani konceptualni vizuali, ne fotografije stvarnih ordinacija, radionica ni klijenata — zato svaki projekat nosi oznaku „Demo koncept". |
| **Impressum i politika privatnosti** | Obavezna stranica za njemačko tržište | **Nije napisana.** Vercel Web Analytics je bez kolačića, pa ne traži banner za pristanak, ali za nastup prema njemačkom tržištu i dalje treba Impressum i kratka napomena o privatnosti. Za to su potrebni pravni podaci iz reda iznad. |

## Šta namjerno nije napisano

Nisu izmišljeni: klijenti, recenzije, nagrade, godine iskustva, veličina tima,
brojevi (povećanje prodaje ili upita), cijene, rokovi, adrese ni poslovnice.
Prikazani projekti su **demo koncepti** i tako su označeni na svakom mjestu.

Slike ne dokumentuju stvarne prostore, opremu, izvedene narudžbe, medicinske
ishode ni poslovne rezultate. Uzorci materijala pokazuju vizualni smjer, a ne
certificirane završne obrade ni tačan prikaz boje.
