import type { L } from "@/lib/i18n/localized";

export type ProcessStep = {
  number: string;
  /** Two words for the homepage: Razgovor → Smjer → Dizajn i izrada → … */
  label: L;
  title: L;
  body: L;
  youGive: L<string[]>;
  youGet: L<string[]>;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    label: { bs: "Razgovor", de: "Gespräch" },
    title: { bs: "Razumijemo vaš posao", de: "Wir verstehen Ihr Geschäft" },
    body: {
      bs: "Razgovor o uslugama, publici, postojećoj stranici i cilju projekta. Zanima nas šta prodajete, kome i šta posjetilac treba uraditi.",
      de: "Ein Gespräch über Leistungen, Zielgruppe, bestehende Website und Projektziel. Uns interessiert, was Sie anbieten, wem und was Besucher tun sollen.",
    },
    youGive: {
      bs: [
        "Kratak opis onoga čime se bavite.",
        "Link na postojeću stranicu, ako je imate.",
        "Primjere stranica koje vam se sviđaju ili ne sviđaju.",
      ],
      de: [
        "Eine kurze Beschreibung Ihrer Tätigkeit.",
        "Den Link zur bestehenden Website, falls vorhanden.",
        "Beispiele von Websites, die Ihnen gefallen oder nicht gefallen.",
      ],
    },
    youGet: {
      bs: [
        "Sažetak onoga što smo razumjeli.",
        "Prijedlog koje stranice su vam potrebne.",
      ],
      de: [
        "Eine Zusammenfassung dessen, was wir verstanden haben.",
        "Einen Vorschlag, welche Seiten Sie brauchen.",
      ],
    },
  },
  {
    number: "02",
    label: { bs: "Smjer", de: "Richtung" },
    title: { bs: "Dogovaramo smjer", de: "Wir legen die Richtung fest" },
    body: {
      bs: "Struktura sadržaja, dizajnerski smjer i dogovoreni obim. Ovdje se dogovaramo šta ulazi u projekat, a šta ostaje za kasnije.",
      de: "Inhaltsstruktur, gestalterische Richtung und abgestimmter Umfang. Hier legen wir fest, was Teil des Projekts ist und was später kommt.",
    },
    youGive: {
      bs: [
        "Potvrdu strukture stranica.",
        "Tekstove i fotografije koje već imate.",
        "Logo i boje, ako postoje.",
      ],
      de: [
        "Die Bestätigung der Seitenstruktur.",
        "Vorhandene Texte und Fotos.",
        "Logo und Farben, falls vorhanden.",
      ],
    },
    youGet: {
      bs: [
        "Popis stranica i sekcija.",
        "Dizajnerski smjer na primjeru jedne stranice.",
        "Jasno napisan obim projekta.",
      ],
      de: [
        "Eine Liste der Seiten und Abschnitte.",
        "Die gestalterische Richtung am Beispiel einer Seite.",
        "Einen klar formulierten Projektumfang.",
      ],
    },
  },
  {
    number: "03",
    label: { bs: "Dizajn i izrada", de: "Design und Umsetzung" },
    title: { bs: "Dizajniramo i izrađujemo", de: "Wir gestalten und entwickeln" },
    body: {
      bs: "Razvoj stranice uz pregled i povratne informacije. Radimo u vidljivim koracima, tako da ne čekate do kraja da vidite rezultat.",
      de: "Entwicklung der Website mit Zwischenständen und Rückmeldungen. Wir arbeiten in sichtbaren Schritten, damit Sie nicht bis zum Schluss auf das Ergebnis warten.",
    },
    youGive: {
      bs: [
        "Povratne informacije na prikazane dijelove.",
        "Preostali sadržaj, ako nešto još nedostaje.",
      ],
      de: [
        "Rückmeldungen zu den gezeigten Teilen.",
        "Die restlichen Inhalte, falls noch etwas fehlt.",
      ],
    },
    youGet: {
      bs: [
        "Dizajn stranica na pregled.",
        "Link na verziju koju možete otvoriti i isprobati.",
      ],
      de: [
        "Die Seitenentwürfe zur Ansicht.",
        "Einen Link zu einer Version, die Sie öffnen und ausprobieren können.",
      ],
    },
  },
  {
    number: "04",
    label: { bs: "Provjera i objava", de: "Prüfung und Start" },
    title: {
      bs: "Provjeravamo i pripremamo objavu",
      de: "Wir prüfen und bereiten die Veröffentlichung vor",
    },
    body: {
      bs: "Mobilni prikaz, funkcije, sadržaj i tehničke provjere. Prolazimo kroz stranicu ekran po ekran prije nego što ide u javnost.",
      de: "Mobile Ansicht, Funktionen, Inhalte und technische Prüfungen. Wir gehen die Website Bildschirm für Bildschirm durch, bevor sie online geht.",
    },
    youGive: {
      bs: [
        "Posljednju provjeru tekstova i podataka.",
        "Pristup domeni i hostingu, ako ih već imate.",
      ],
      de: [
        "Eine letzte Prüfung von Texten und Angaben.",
        "Zugang zu Domain und Hosting, falls bereits vorhanden.",
      ],
    },
    youGet: {
      bs: [
        "Popis provjerenih stavki.",
        "Objavljenu stranicu i kratke upute za osnovne izmjene.",
      ],
      de: [
        "Eine Liste der geprüften Punkte.",
        "Die veröffentlichte Website und eine kurze Anleitung für einfache Änderungen.",
      ],
    },
  },
];
