# Slike

## Porijeklo

Svih 18 slika su **generisani konceptualni vizuali**, isporučeni u paketu
„MOST Studio — komplet slika i prompt“ (verzija manifesta 1.1).

Nisu fotografije stvarnih klijenata, članova tima, ureda, izvedenih
stolarskih narudžbi ni stvarne ordinacije. Ne dokazuju vlasništvo nad
opremom, medicinske ishode ni poslovne rezultate. Zbog toga su sva tri
projekta na stranici označena kao **Demo koncept / Demokonzept**.

Uzorci materijala prikazuju vizualni smjer, a ne tehnički certificirane
završne obrade ni precizan prikaz boje.

## Kako su ugrađene

Originali su lossless WebP (ukupno 25,3 MB) i **nisu** u repozitoriju — to su
arhivski primjerci iz isporučenog paketa. U repozitorij ide samo ono što se
stvarno poslužuje:

```bash
node scripts/prepare-images.mjs <putanja-do-paketa>
```

Skripta za svaku sliku:

1. provjeri SHA-256 iz `manifest.json` (neslaganje prekida izradu),
2. smanji na najveću širinu koju raspored stvarno koristi,
3. prekodira u lossy WebP,
4. zapiše je u `public/images/<grupa>/`,
5. generiše `src/content/images.ts` s dimenzijama i BS/DE alt tekstom.

Rezultat: **25,3 MB → 1,6 MB**. Alt tekst dolazi iz manifesta, pa se ne može
razići od datoteke koju opisuje. Modul je generisan — ne uređivati ručno.

## Raspored

| Slika | Gdje se koristi |
|---|---|
| `lipa-hero` | Lipa — uvod, uz naslov i CTA |
| `lipa-recepcija` | Lipa — prvi dolazak (vertikalni kadar) |
| `lipa-tehnologija` | Lipa — pristup i tehnologija |
| `lipa-prevencija` | Lipa — prevencija |
| `hrast-kuhinja` | Hrast — hero |
| `hrast-plakar` | Hrast — konceptualni projekti, plakar |
| `hrast-sto` | Hrast — konceptualni projekti, sto (vertikalni) |
| `hrast-spoj-detalj` | Hrast — detalji izrade |
| `hrast-radionica` | Hrast — od mjere do ugradnje |
| `hrast-materijal-*` | Hrast — selektor materijala (contain, 1:1) |
| `meridijan-hero` | Meridijan — uvod |
| `meridijan-analiza` | Meridijan — pregled poslovanja |
| `meridijan-radionica` | Meridijan — organizacija i odgovornosti |
| `meridijan-plan` | Meridijan — šta ostaje nakon razgovora (vertikalni) |
| `most-proces-dizajna` | MOST — proces rada |
| `most-most-skulptura` | MOST — o studiju |

Svaka MOST slika koristi se **jednom po stranici**, ne kao ponovljena pozadina.

## Snimci demo stranica

Kartice projekata, hero i studije koncepata ne koriste ove fotografije nego
**stvarne snimke implementiranih demo stranica**:

```bash
node scripts/capture-demos.mjs
```

Skripta pokrene produkcijski build i snimi `/demo/*` rute na desktop i mobilnoj
širini u `public/images/snimci/`. Zato prikaz na kartici uvijek odgovara onome
što se otvori klikom.
