# Provjere

Skripte koje su korištene za provjeru stranice u pravom browseru. Pokreni
produkcijski build, pa skripte protiv njega:

```bash
npm run build && npm run start          # npr. na portu 3000
BASE_URL=http://127.0.0.1:3000 node qa/qa.mjs         # sve rute, 1440 i 390 px
BASE_URL=... FULL=1 node qa/qa.mjs                    # + 360 i 768 px
BASE_URL=... node qa/interact.mjs                     # prikaz mogućnosti, upit, tastatura, reduced motion
BASE_URL=... node qa/edge.mjs                         # clipboard fallback, mobilni meni, dodirne mete, vitals
BASE_URL=... node qa/clickable.mjs                    # kontrole u demoima, duple id vrijednosti
BASE_URL=... node qa/lang.mjs                         # nema neprevedenog teksta ni u jednom stablu
BASE_URL=... node qa/audit.mjs                        # 360/390/430/768/1024/1440, oba jezika
BASE_URL=... OUT=/putanja node qa/snapshot.mjs        # snimci svih ruta + mjerenja u measurements.json
```

`audit.mjs` je provjera iz zadnjeg redizajna i pokriva, na svakoj od šest
širina i u oba jezika: horizontalni prelom, tačno jedan `<h1>`, ime za svaku
kontrolu, ugniježđene linkove, dodirne mete od 44 px, veličinu teksta, mobilni
meni (`aria-expanded`, Escape, povratak fokusa), prebacivanje jezika koje
zadržava stranicu, galeriju u herou (tastatura, stabilna visina, bez
autoplaya) i zum na 200 %.

Jedina stavka koju namjerno ne prolazi: tekst u demo stranicama je 16 px, jer
demoi imaju vlastitu tipografsku skalu. Pravilo od 17–19 px vrijedi za MOST
stranicu.

`qa.mjs` piše screenshotove u `qa/shots` (ili u `SHOT_DIR`).
`CHROMIUM_PATH` postavi samo ako Playwright ne nalazi svoj browser.
