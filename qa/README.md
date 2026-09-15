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
```

`qa.mjs` piše screenshotove u `qa/shots` (ili u `SHOT_DIR`).
`CHROMIUM_PATH` postavi samo ako Playwright ne nalazi svoj browser.
