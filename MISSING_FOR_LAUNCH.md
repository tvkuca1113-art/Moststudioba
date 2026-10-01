# Potvrđeni podaci i preostali zadaci

Ažurirano 1. 10. 2026. Stranica je objavljena. Ovaj dokument prati stvarne
poslovne podatke i nedovršene integracije.

## Potvrđeno

- Brend: **MOST Studio**.
- Glavna domena: **https://moststudioba.com**.
- Online saradnja s firmama u Bosni i Hercegovini i Njemačkoj.
- Bosanski i njemački sadržaj sa zasebnim URL-ovima.
- Instagram: https://www.instagram.com/moststudioba/ — glavni aktivni kontakt.
- Email: **moststudioba@gmail.com** — sporedna opcija, po izboru posjetioca.
- Facebook: https://www.facebook.com/share/1HoECngdYP/?mibextid=wwXIfr — tačan link koji je vlasnik dostavio. Instagram i Facebook su glavni kanali.

## Indeksiranje i domena

`src/lib/site-url.ts` sadrži potvrđenu domenu. `metadataBase`, canonical,
hreflang, Open Graph, strukturirani podaci, sitemap i robots koriste isti
izvor. Vercel preview adrese ne postaju canonical domena.

Produkcija dopušta indeksiranje, preview objave imaju `noindex`.
`NEXT_PUBLIC_ALLOW_INDEXING=false` može isključiti indeksiranje produkcije.
Google verification oznaka ostaje u početnom HTML-u početne stranice.

Sitemap sadrži 30 javnih BS/DE stranica. Demo rute i demo webshop ostaju
`noindex` i izvan sitemapa. Robots ih ne blokira, tako da crawler može
pročitati `noindex`. Prezentacije koncepata imaju vlastiti sadržaj i mogu se
indeksirati. Ne predstavljaju se kao plaćeni klijentski radovi.

## Objavljena klijentska referenca

Massage und Wellness Mirjana: stvarna njemačka poslovna stranica na
https://mirjanamassage.vercel.app/. Vlasnik je potvrdio da je uradio cjelokupan
projekt i zatražio javnu integraciju u MOST portfolio. BS/DE prezentacije
su na `/projekti/mirjana-massage` i `/de/projekte/mirjana-massage`.
Kartice i prezentacija koriste stvarne desktop, mobilne i uslužne snimke.
Detalji i porijeklo: `docs/MIRJANA-PORTFOLIO-2026-09-30.md`.

## Kontakt i mjerenje

Projektni obrazac priprema poruku za pregled i kopiranje; ne šalje je
automatski. Posjetilac kopira pripremljenu poruku, otvara Instagram ili Facebook,
pa je zalijepi i pošalje u razgovoru. Ime, firma, postojeći web, okvirni budžet i željeni termin su opcionalni. Ne tražimo email ni telefon u obrascu.
Email ostaje diskretna alternativa u podnožju. Oba društvena kanala koriste
vlasnikove linkove iz `src/content/site.ts`; Messenger adresu ne nagađamo.

Vercel Web Analytics i dozvoljeni događaji definisani su u
`src/lib/analytics.ts`. Događaji ne sadrže ime, firmu, email ni tekst upita.
Kopiranje i otvaranje kontaktnog kanala nisu primljeni upiti; `lead_submit`
je rezervisan i trenutno se ne emituje. Analitika se može isključiti sa
`NEXT_PUBLIC_ANALYTICS_ENABLED=false`.

## Šta još treba dostaviti ili uraditi

| Stavka | Sljedeći korak |
| --- | --- |
| Search Console podaci | Pratiti stranice i upite za BiH, poslati javni sitemap i provjeriti nove URL-ove. Indeksiranje nije garancija pozicije. |
| Dodatne klijentske reference | Mirjana je objavljena kao klijentski projekt uz potvrđeno autorstvo vlasnika. Nove radove dodavati s provjerljivim obimom i odobrenjem za javni prikaz. |
| Pravni podaci i obavijesti | Dostaviti stvarni naziv subjekta i ostale podatke potrebne za odgovarajuće poslovne i privatnosne obavijesti. |
| Telefon / WhatsApp | Dodati samo ako vlasnik želi taj kanal i dostavi potvrđen broj. |
| Poslovni profil na Googleu | Potvrđen je isključivo online rad; ne izmišljati ured ili poslovnicu radi Maps profila. |

Nisu izmišljeni klijenti, recenzije, nagrade, godine iskustva, članovi tima,
rezultati prodaje, cijene, poslovnice ni adrese. Generisani demo vizuali ne
dokumentuju stvarne izvedene narudžbe. Detalji SEO rada i izvori su u
`docs/SEO-GEO-2026-09-17.md`.

## Objavljena početna ponuda

Vlasnik je 1. 10. 2026. potvrdio početnu cijenu **600 KM (BAM)**.
Ponuda je ograničena na jednu stranicu, do pet sekcija, jedan jezik, gotove
materijale klijenta i jedan objedinjeni krug korekcija. Uključuje mobilni
raspored, kontakt linkove, osnovnu SEO pripremu i objavu. Domena, hosting,
licence, CMS, dodatni jezici, obrasci, webshop i održavanje dogovaraju se
posebno. Ukupan iznos i vanjski troškovi potvrđuju se pisanom ponudom.

Cijena nije univerzalna cijena poslovne stranice ili webshopa. Glavna ponuda
je u `src/content/offer.ts`; iz nje se izvode BS/DE cijene, stranice usluga,
FAQ i vodič o cijeni. Njemačka ponuda prikazuje i približan iznos u eurima
prema fiksnom kursu 1 EUR = 1,95583 KM.

Početna naglašava usluge i stvarni klijentski rad. Cjenovna ponuda je na
stranicama usluga i vodiču, uz diskretan link s početne i odgovor u FAQ-u.
Pri budućoj promjeni provjeriti sve javne BS/DE prikaze cijene i obima;
ne mijenjati nepovezane brojeve u kodu ili historijske zapise.
Detalji: `docs/PRICING-600-2026-10-01.md`.
