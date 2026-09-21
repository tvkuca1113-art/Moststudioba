import type { Locale } from "@/lib/i18n/config";

export const demoCapabilities = {
  "stolarija-hrast": {
    anchor: "hrast-materijali",
    bs: { name: "Hrast", action: "Sastavite namještaj", title: "Od zamisli do jasnog zahtjeva.", body: "Promijenite materijal i dimenzije, uporedite dvije varijante i ponesite odabir na prvi razgovor.", steps: ["Odaberite prostor", "Uporedite varijante", "Preuzmite sažetak"] },
    de: { name: "Hrast", action: "Möbel konfigurieren", title: "Von der Idee zur klaren Anfrage.", body: "Material und Maße wählen, zwei Varianten vergleichen und Ihre Auswahl ins erste Gespräch mitnehmen.", steps: ["Raum auswählen", "Varianten vergleichen", "Übersicht mitnehmen"] },
  },
  "ordinacija-lipa": {
    anchor: "lipa-kontakt",
    bs: { name: "Lipa", action: "Isprobajte zakazivanje", title: "Tri koraka do probnog termina.", body: "Odaberite uslugu, provjerite pokazne termine i pregledajte potvrdu koju možete izmijeniti ili preuzeti.", steps: ["Odaberite uslugu", "Pronađite termin", "Pregledajte potvrdu"] },
    de: { name: "Lipa", action: "Terminablauf testen", title: "In drei Schritten zum Demo-Termin.", body: "Leistung und Beispieltermin wählen. Anschließend die Bestätigung ansehen, ändern oder herunterladen.", steps: ["Leistung auswählen", "Termin finden", "Bestätigung ansehen"] },
  },
  "meridijan-savjetovanje": {
    anchor: "meridijan-orijentacija",
    bs: { name: "Meridijan", action: "Napravite plan saradnje", title: "Iz odgovora nastaje sljedeći korak.", body: "Odgovorite na tri pitanja i dobijte polazni plan. Promijenite trajanje da vidite kako se raspoređuju faze rada.", steps: ["Opišite situaciju", "Odredite prioritet", "Rasporedite korake"] },
    de: { name: "Meridijan", action: "Zusammenarbeit planen", title: "Aus Antworten werden nächste Schritte.", body: "Drei Fragen ergeben einen Gesprächsplan. Ändern Sie die Dauer und sehen Sie, wie sich die Arbeitsphasen verteilen.", steps: ["Situation beschreiben", "Priorität bestimmen", "Schritte planen"] },
  },
} as const;
export type DemoSlug = keyof typeof demoCapabilities;
export function demoCapability(slug: string, locale: Locale) {
  const entry = demoCapabilities[slug as DemoSlug];
  return entry ? { ...entry[locale], anchor: entry.anchor } : null;
}
