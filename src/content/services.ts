import type { L } from "@/lib/i18n/localized";

export type Service = {
  id: "design" | "build" | "redesign";
  number: string;
  title: L;
  summary: L;
  includes: L<string[]>;
  /** Three words for the homepage row. `includes` is the full scope. */
  highlights: L<string[]>;
  outcome: L;
};

export const services: Service[] = [
  {
    id: "design",
    number: "01",
    title: { bs: "Web dizajn", de: "Webdesign" },
    summary: {
      bs: "Odlučujemo šta stoji na stranici, kojim redoslijedom i kako izgleda — prije nego što se napiše ijedna linija koda.",
      de: "Wir legen fest, was auf der Website steht, in welcher Reihenfolge und wie es aussieht — bevor die erste Zeile Code geschrieben wird.",
    },
    includes: {
      bs: [
        "Struktura sadržaja: koje stranice postoje i šta je na svakoj od njih.",
        "Korisničko iskustvo: put od prvog ekrana do koraka koji želite da posjetilac uradi.",
        "Vizuelni identitet stranice: tipografija, boje, fotografije i razmaci koji odgovaraju vašem poslu.",
        "Raspored za računar i mobitel, ne samo jedna verzija koja se smanjuje.",
        "Priprema dizajna za izradu: stanja dugmadi, prazna stanja, dužine tekstova i ponašanje na različitim širinama.",
      ],
      de: [
        "Inhaltsstruktur: welche Seiten es gibt und was auf jeder davon steht.",
        "Nutzerführung: der Weg vom ersten Bildschirm bis zu der Handlung, die Besucher ausführen sollen.",
        "Visuelle Gestaltung der Seite: Typografie, Farben, Bilder und Abstände, die zu Ihrem Geschäft passen.",
        "Layout für Computer und Mobilgerät — nicht eine Version, die nur verkleinert wird.",
        "Übergabefertiges Design: Button-Zustände, leere Zustände, Textlängen und Verhalten bei verschiedenen Breiten.",
      ],
    },
    highlights: {
      bs: ["Struktura sadržaja", "Korisničko iskustvo", "Vizuelni identitet"],
      de: ["Inhaltsstruktur", "Nutzerführung", "Visuelle Gestaltung"],
    },
    outcome: {
      bs: "Dizajn koji možete pregledati i razumjeti prije izrade, i na osnovu kojeg znate kako će stranica izgledati i raditi.",
      de: "Ein Design, das Sie vor der Umsetzung ansehen und verstehen können und an dem Sie sehen, wie die Website aussehen und funktionieren wird.",
    },
  },
  {
    id: "build",
    number: "02",
    title: { bs: "Izrada web stranica", de: "Website-Entwicklung" },
    summary: {
      bs: "Dizajn pretvaramo u stranicu koja stvarno radi — brzo, na svim ekranima i bez prepreka za posjetioca.",
      de: "Wir setzen das Design in eine Website um, die wirklich funktioniert — schnell, auf allen Bildschirmen und ohne Hürden für Besucher.",
    },
    includes: {
      bs: [
        "Pretvaranje dizajna u funkcionalnu stranicu, dio po dio.",
        "Responsive izvedba: isti sadržaj se drugačije raspoređuje na mobitelu, tabletu i računaru.",
        "Brzina: optimizovane slike, fontovi i količina koda koji se učitava.",
        "Pristupačnost: čitljiv kontrast, navigacija tastaturom i dovoljno velike dodirne površine.",
        "Kontaktne funkcije prema dogovoru — od jednostavnog linka do obrasca, ovisno o tome šta vam stvarno treba.",
        "Tehničke SEO osnove: naslovi, opisi, struktura, sitemap i pravila za pretraživače.",
        "Testiranje na stvarnim širinama ekrana i priprema za objavu.",
      ],
      de: [
        "Umsetzung des Designs in eine funktionierende Website, Abschnitt für Abschnitt.",
        "Responsive Umsetzung: derselbe Inhalt ordnet sich auf Handy, Tablet und Computer anders an.",
        "Tempo: optimierte Bilder, Schriften und eine begrenzte Menge an geladenem Code.",
        "Barrierefreiheit: lesbarer Kontrast, Bedienung per Tastatur und ausreichend große Touch-Flächen.",
        "Kontaktfunktionen nach Absprache — vom einfachen Link bis zum Formular, je nachdem, was Sie wirklich brauchen.",
        "Technische SEO-Grundlagen: Titel, Beschreibungen, Struktur, Sitemap und Regeln für Suchmaschinen.",
        "Tests auf realen Bildschirmbreiten und Vorbereitung der Veröffentlichung.",
      ],
    },
    highlights: {
      bs: ["Izvedba dio po dio", "Responsive izvedba", "Brzina učitavanja"],
      de: ["Umsetzung in Etappen", "Responsive Umsetzung", "Kurze Ladezeit"],
    },
    outcome: {
      bs: "Objavljena stranica koja se brzo učitava, ispravno izgleda na mobitelu i vodi posjetioca do kontakta.",
      de: "Eine veröffentlichte Website, die schnell lädt, auf dem Handy korrekt aussieht und Besucher zum Kontakt führt.",
    },
  },
  {
    id: "redesign",
    number: "03",
    title: { bs: "Redizajn", de: "Relaunch" },
    summary: {
      bs: "Imate stranicu koja više ne odgovara vašem poslu. Zadržavamo ono što funkcioniše i mijenjamo ono što smeta.",
      de: "Sie haben eine Website, die nicht mehr zu Ihrem Geschäft passt. Wir behalten, was funktioniert, und ändern, was stört.",
    },
    includes: {
      bs: [
        "Pregled postojećeg sadržaja i strukture: šta ostaje, šta se spaja, šta se briše.",
        "Poboljšanje preglednosti: jasniji naslovi, kraći tekstovi i vidljiv sljedeći korak.",
        "Obnova vizuelnog izgleda uz zadržavanje onoga po čemu vas ljudi prepoznaju.",
        "Unapređenje mobilnog iskustva, koje je kod starijih stranica najčešće najslabija tačka.",
        "Plan očuvanja važnih URL-ova pri migraciji, da postojeći linkovi i pozicije ne propadnu.",
      ],
      de: [
        "Bestandsaufnahme von Inhalt und Struktur: was bleibt, was zusammengeführt und was gestrichen wird.",
        "Bessere Übersicht: klarere Überschriften, kürzere Texte und ein sichtbarer nächster Schritt.",
        "Auffrischung der Gestaltung, ohne das aufzugeben, woran man Sie wiedererkennt.",
        "Verbesserung der mobilen Ansicht — bei älteren Seiten meist die schwächste Stelle.",
        "Plan zum Erhalt wichtiger URLs bei der Migration, damit bestehende Links und Platzierungen nicht verloren gehen.",
      ],
    },
    highlights: {
      bs: ["Pregled postojećeg", "Bolja preglednost", "Obnovljen izgled"],
      de: ["Bestandsaufnahme", "Bessere Übersicht", "Neue Gestaltung"],
    },
    outcome: {
      bs: "Stranica koja izgleda kao vaš posao danas, bez gubitka sadržaja i linkova koje ste gradili godinama.",
      de: "Eine Website, die zu Ihrem heutigen Geschäft passt — ohne Verlust von Inhalten und Links, die über Jahre entstanden sind.",
    },
  },
];
