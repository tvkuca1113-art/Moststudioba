import type { ImageKey } from "@/content/images";
import type { L } from "@/lib/i18n/localized";

export type WoodFinish = "oak" | "walnut" | "white";

export const tradesContent = {
  brand: "Stolarija Hrast",
  nav: {
    work: { bs: "Projekti", de: "Projekte" } as L,
    materials: { bs: "Materijali", de: "Materialien" } as L,
    detail: {
    eyebrow: { bs: "DETALJI IZRADE", de: "DETAILS DER AUSFÜHRUNG" } as L,
    title: { bs: "Spoj se vidi izbliza.", de: "Die Verbindung sieht man aus der Nähe." } as L,
    body: {
      bs: "Uglove radimo spojem koji drži bez vidljivog okova. Zato ladica ostaje u liniji i nakon nekoliko godina korištenja.",
      de: "Die Ecken fertigen wir mit einer Verbindung, die ohne sichtbare Beschläge hält. Deshalb bleibt die Schublade auch nach Jahren in der Flucht.",
    } as L,
  },

  measuring: { bs: "Mjerenje", de: "Aufmaß" } as L,
    cta: { bs: "Dogovorite mjerenje", de: "Aufmaß vereinbaren" } as L,
  },

  hero: {
    eyebrow: { bs: "STOLARIJA I MONTAŽA PO MJERI", de: "TISCHLEREI UND MONTAGE NACH MASS" } as L,
    titleLines: {
      bs: ["Namještaj koji", "pripada vašem", "prostoru."],
      de: ["Möbel, die in", "Ihren Raum", "gehören."],
    } as L<string[]>,
    lead: {
      bs: "Radimo od mjerenja do montaže. Izlazimo na teren, snimimo prostor i dajemo ponudu s tačnim dimenzijama i odabranom obradom.",
      de: "Wir arbeiten vom Aufmaß bis zur Montage. Wir kommen vor Ort, nehmen den Raum auf und erstellen ein Angebot mit exakten Maßen und der gewählten Oberfläche.",
    } as L,
    cta: { bs: "Dogovorite mjerenje", de: "Aufmaß vereinbaren" } as L,
    secondary: { bs: "Pogledajte materijale", de: "Materialien ansehen" } as L,
    conceptLabel: { bs: "Koncept 01", de: "Konzept 01" } as L,
  },

  /** Concept work, clearly labelled as such — not delivered commissions. */
  projects: {
    eyebrow: { bs: "KONCEPTUALNI PROJEKTI", de: "KONZEPTPROJEKTE" } as L,
    title: { bs: "Tri komada, tri zadatka.", de: "Drei Stücke, drei Aufgaben." } as L,
    lead: {
      bs: "Osmišljeni primjeri kojima pokazujemo kako pristupamo prostoru. Nisu izvedene narudžbe.",
      de: "Entworfene Beispiele, die zeigen, wie wir an einen Raum herangehen. Es sind keine ausgeführten Aufträge.",
    } as L,
    includesLabel: { bs: "Šta ulazi u posao", de: "Was zum Auftrag gehört" } as L,
    items: [
      {
        id: "kitchen",
        image: "hrast-kuhinja" as ImageKey,
        name: { bs: "Kuhinja u nizu", de: "Küchenzeile" } as L,
        kind: { bs: "Orah, mat lak · 4,2 m", de: "Nuss, matt lackiert · 4,2 m" } as L,
        body: {
          bs: "Donji i gornji elementi s visokim ormarom. Dimenzije se prilagođavaju postojećim instalacijama, a ne obrnuto.",
          de: "Unter- und Oberschränke mit Hochschrank. Die Maße richten sich nach den vorhandenen Anschlüssen, nicht umgekehrt.",
        } as L,
        includes: {
          bs: ["Mjerenje prostora i provjera instalacija", "Korpusi, fronte i radna ploča", "Okov s mekim zatvaranjem", "Montaža i spajanje"],
          de: ["Aufmaß und Prüfung der Anschlüsse", "Korpusse, Fronten und Arbeitsplatte", "Beschläge mit Dämpfung", "Montage und Anschluss"],
        } as L<string[]>,
      },
      {
        id: "wardrobe",
        image: "hrast-plakar" as ImageKey,
        name: { bs: "Ugradni plakar", de: "Einbauschrank" } as L,
        kind: { bs: "Hrast, uljeni · od poda do plafona", de: "Eiche, geölt · vom Boden bis zur Decke" } as L,
        body: {
          bs: "Niša se rijetko mjeri pod pravim uglom. Korpus se pravi prema stvarnim odstupanjima zidova, pa nema maski i zazora.",
          de: "Eine Nische ist selten rechtwinklig. Der Korpus entsteht nach den tatsächlichen Wandabweichungen — ohne Blenden und Fugen.",
        } as L,
        includes: {
          bs: ["Mjerenje niše i odstupanja zidova", "Korpus i vrata po mjeri", "Unutrašnja podjela prema dogovoru", "Montaža i regulacija vrata"],
          de: ["Aufmaß der Nische und der Wandabweichungen", "Korpus und Türen nach Maß", "Innenaufteilung nach Absprache", "Montage und Justierung der Türen"],
        } as L<string[]>,
      },
      {
        id: "table",
        image: "hrast-sto" as ImageKey,
        name: { bs: "Trpezarijski sto", de: "Esstisch" } as L,
        kind: { bs: "Orah, masiv · 220 × 95 cm", de: "Massives Walnussholz · 220 × 95 cm" } as L,
        body: {
          bs: "Komad koji se radi prema prostoru u koji ulazi: širina prolaza, visina stolica i broj mjesta određuju dimenziju, ne katalog.",
          de: "Ein Stück, das zum Raum passt: Durchgangsbreite, Stuhlhöhe und Anzahl der Plätze bestimmen das Maß — nicht der Katalog.",
        } as L,
        includes: {
          bs: ["Dogovor o dimenzijama i namjeni", "Odabir masiva i završne obrade", "Izrada i brušenje u radionici", "Dostava i postavljanje"],
          de: ["Abstimmung von Maß und Verwendung", "Auswahl von Massivholz und Oberfläche", "Fertigung und Schliff in der Werkstatt", "Lieferung und Aufstellung"],
        } as L<string[]>,
      },
    ],
  },

  materials: {
    eyebrow: { bs: "MATERIJALI", de: "MATERIALIEN" } as L,
    title: { bs: "Tri obrade koje najčešće biramo.", de: "Drei Oberflächen, die wir am häufigsten wählen." } as L,
    lead: {
      bs: "Uzorci završne obrade. Odaberite jednu da vidite površinu i gdje je najbolje koristiti.",
      de: "Muster der Oberflächen. Wählen Sie eine, um die Fläche zu sehen und zu erfahren, wofür sie sich eignet.",
    } as L,
    sampleLabel: { bs: "Uzorak obrade", de: "Oberflächenmuster" } as L,
    useForLabel: { bs: "Gdje je koristimo", de: "Wo wir sie einsetzen" } as L,
    items: [
      {
        id: "oak" as WoodFinish,
        image: "hrast-materijal-hrast" as ImageKey,
        name: { bs: "Hrast, uljeni", de: "Eiche, geölt" } as L,
        note: {
          bs: "Topao ton s vidljivim crtežom. Ulje se obnavlja kod kuće, pa se ogrebotine ne vide brzo.",
          de: "Warmer Ton mit sichtbarer Maserung. Das Öl lässt sich zu Hause auffrischen, kleine Kratzer fallen kaum auf.",
        } as L,
        useFor: {
          bs: ["Plakari i police u dnevnom boravku", "Radne ploče koje se često koriste", "Prostori s malo dnevnog svjetla"],
          de: ["Schränke und Regale im Wohnbereich", "Häufig genutzte Arbeitsplatten", "Räume mit wenig Tageslicht"],
        } as L<string[]>,
      },
      {
        id: "walnut" as WoodFinish,
        image: "hrast-materijal-orah" as ImageKey,
        name: { bs: "Orah, mat lak", de: "Nuss, matt lackiert" } as L,
        note: {
          bs: "Tamniji ton i mirna površina. Mat lak ne sjaji pod reflektorima i lakše se održava od visokog sjaja.",
          de: "Dunklerer Ton, ruhige Oberfläche. Mattlack spiegelt nicht unter Strahlern und ist pflegeleichter als Hochglanz.",
        } as L,
        useFor: {
          bs: ["Kuhinjske fronte", "Komadi koji trebaju biti fokus prostora", "Prostori s puno svjetla"],
          de: ["Küchenfronten", "Stücke, die den Raum prägen sollen", "Helle Räume"],
        } as L<string[]>,
      },
      {
        id: "white" as WoodFinish,
        image: "hrast-materijal-mat-bijela" as ImageKey,
        name: { bs: "Mat bijela", de: "Mattweiß" } as L,
        note: {
          bs: "Bez crteža drva. Vizuelno širi uski prostor i lako se kombinuje s postojećim namještajem.",
          de: "Ohne Holzmaserung. Lässt schmale Räume weiter wirken und kombiniert sich leicht mit vorhandenen Möbeln.",
        } as L,
        useFor: {
          bs: ["Male kuhinje i uski hodnici", "Gornji elementi iznad radne ploče", "Prostori gdje već ima dosta drva"],
          de: ["Kleine Küchen und schmale Flure", "Oberschränke über der Arbeitsplatte", "Räume mit bereits viel Holz"],
        } as L<string[]>,
      },
    ],
  },

  detail: {
    eyebrow: { bs: "DETALJI IZRADE", de: "DETAILS DER AUSFÜHRUNG" } as L,
    title: { bs: "Spoj se vidi izbliza.", de: "Die Verbindung sieht man aus der Nähe." } as L,
    body: {
      bs: "Uglove radimo spojem koji drži bez vidljivog okova. Zato ladica ostaje u liniji i nakon nekoliko godina korištenja.",
      de: "Die Ecken fertigen wir mit einer Verbindung, die ohne sichtbare Beschläge hält. Deshalb bleibt die Schublade auch nach Jahren in der Flucht.",
    } as L,
  },

  measuring: {
    title: { bs: "Kako izgleda mjerenje", de: "So läuft das Aufmaß ab" } as L,
    lead: {
      bs: "Mjerenje je besplatno i ne obavezuje vas ni na šta. Evo šta se na njemu dešava.",
      de: "Das Aufmaß ist kostenlos und unverbindlich. Das passiert dabei.",
    } as L,
    steps: [
      {
        title: { bs: "Dolazimo s metrom i kamerom", de: "Wir kommen mit Maßband und Kamera" } as L,
        body: {
          bs: "Snimimo prostor, provjerimo odstupanja zidova i položaj instalacija. Traje oko 40 minuta.",
          de: "Wir erfassen den Raum, prüfen Wandabweichungen und die Lage der Anschlüsse. Dauert etwa 40 Minuten.",
        } as L,
      },
      {
        title: { bs: "Dogovaramo raspored", de: "Wir stimmen die Aufteilung ab" } as L,
        body: {
          bs: "Na licu mjesta skiciramo raspored elemenata i objasnimo šta je moguće, a šta nije zbog instalacija.",
          de: "Vor Ort skizzieren wir die Aufteilung und erklären, was möglich ist und was wegen der Installationen nicht.",
        } as L,
      },
      {
        title: { bs: "Dobijate ponudu s dimenzijama", de: "Sie erhalten ein Angebot mit Maßen" } as L,
        body: {
          bs: "Ponuda sadrži tačne dimenzije, odabranu obradu i popis okova. Bez skrivenih stavki.",
          de: "Das Angebot enthält exakte Maße, die gewählte Oberfläche und eine Beschlagliste. Ohne versteckte Posten.",
        } as L,
      },
    ],
  },

  contact: {
    title: { bs: "Dogovorite mjerenje", de: "Aufmaß vereinbaren" } as L,
    lead: {
      bs: "Recite nam koji prostor uređujete i gdje se nalazi. Javljamo se s terminom izlaska.",
      de: "Sagen Sie uns, welchen Raum Sie einrichten und wo er liegt. Wir melden uns mit einem Termin.",
    } as L,
    cta: { bs: "Dogovorite mjerenje", de: "Aufmaß vereinbaren" } as L,
    coverageLabel: { bs: "Područje rada", de: "Einsatzgebiet" } as L,
    coverage: { bs: "Područje rada (demo podatak)", de: "Einsatzgebiet (Demo-Angabe)" } as L,
    workshopLabel: { bs: "Radionica", de: "Werkstatt" } as L,
    workshop: { bs: "Adresa radionice (demo podatak)", de: "Adresse der Werkstatt (Demo-Angabe)" } as L,
  },
} as const;
