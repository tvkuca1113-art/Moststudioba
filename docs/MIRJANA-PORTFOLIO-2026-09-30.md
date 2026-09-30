# Mirjana: klijentski projekt u MOST portfoliju

Datum integracije: 30. 9. 2026.

## Potvrđeni obim i izvor

Vlasnik MOST Studija je potvrdio „Ja sam sve uradio” za projekt
https://mirjanamassage.vercel.app/ i izričito zatražio njegovu pripremu,
integraciju u portfolio, vizuelnu provjeru i objavu na GitHubu.
Prezentacija navodi sadržaj, dizajn i izradu. Nisu dodane tvrdnje o naplati,
izjave klijenta, medicinski ishodi niti poslovni KPI.

Stvarna njemačka stranica predstavlja Massage und Wellness Mirjana u
Münchenu, tretmane s trajanjem i cijenama, lično predstavljanje i kontakt
preko WhatsAppa ili telefona. Upit za termin vodi u lični dogovor i potvrdu;
ne opisujemo ga kao automatsku rezervaciju.

## Istraživanje i odluke

Pročitani javni izvori:

- [Nielsen Norman Group: UX Design Portfolios](https://www.nngroup.com/articles/ux-design-portfolios/) — pregledan zadatak, doprinos autora, proces i relevantni snimci.
- [Nielsen Norman Group: Trustworthy Design](https://www.nngroup.com/articles/trustworthy-design/) — dosljedan izgled i precizne informacije kao elementi povjerenja.
- [Instrument: Google Design](https://www.instrument.com/work/google-design) — narativ uz konkretne primjere rada.
- [Instrument: Pinterest Business](https://www.instrument.com/work/pinterest-business) — povezivanje publike, strukture i izvedenog rješenja.
- [Tubik: Wellness Website Design](https://tubikstudio.com/blog/website-design-wellness-tool/) — mirna paleta, čitljivost i jasan kontakt u wellness prezentaciji.

MOST zadržava vlastitu forest/paper paletu i tipografiju. Stvarna referenca
dolazi prije jasno označenih demo koncepata. Kartica vodi prvo na
prezentaciju projekta, zatim na vanjsku stranicu. Nema preklopljenih maketa
uređaja koje sakrivaju sadržaj. Prezentacija povezuje zadatak, obim i tri
odluke: pregled tretmana/cijena, lično predstavljanje i upit za termin.
Mobilni prikaz koristi zaseban stvarni snimak.

## Snimci i porijeklo

Izvorni capture run:
https://github.com/tvkuca1113-art/Moststudioba/actions/runs/36783717567

Artefakt:
https://github.com/tvkuca1113-art/Moststudioba/actions/runs/36783717567/artifacts/11128931078

Skripta `scripts/capture-client-reference.mjs` koristila je Chromium,
stvarne javne stranice i njihove slike, završeno učitavanje fontova i
smanjeno kretanje. Nisu slani obrasci ni kontaktne poruke.
Desktop, mobile i sekcija `#massagen` imaju ukupno 95.972 bajta WebP.
Putanje s hashom i dimenzije su u `src/content/client-shots.ts`;
vremena, viewporti i SHA-256 u
`docs/evidence/mirjana-capture-manifest.json`.

Sva tri izvorna snimka su otvorena i vizuelno pregledana prije integracije:
fotografija, logo, hero, cijene i mobilni kontakt prikazani su bez vidljivog
odsijecanja. Prezentacija na oba jezika jasno navodi da su snimci njemačkog
originala.

## Implementacija i provjera

Klijentski podaci su odvojeni od `demoProjects`, pa projekt ne dobija demo
rutu, demo oznaku ili `open_demo` događaj. BS/DE prezentacije su
`/projekti/mirjana-massage` i `/de/projekte/mirjana-massage`. Imaju
lokalizovane naslove/opise, canonical i recipročne hreflang veze. Obje su u
sitemapu, koji sada sadrži 30 URL-ova; funkcionalni demoi ostaju noindex.

CI obuhvata lint, produkcijski build, tipove, postojeće interakcijske
regresije, početni HTML/SEO te Chromium provjere početne, portfolija i
klijentske prezentacije na širinama 320, 390, 768 i 1440 px.
Stvarni završni MOST snimci spremaju se u artefakt `client-portfolio`
za vizuelni pregled prije spajanja i automatske Vercel objave.

Verifikovane WebP datoteke isporučuju se direktno kroz Next Image
\`unoptimized\`, uz rezervisane dimenzije i responzivni CSS. Time se izbjegava
ponovna serverska obrada već kompresovanih snimaka. Dva detaljna snimka na
prezentaciji učitavaju se odmah; kartica na početnoj zadržava lazy loading.
CI izričito provjerava dekodirane piksele svake slike.
