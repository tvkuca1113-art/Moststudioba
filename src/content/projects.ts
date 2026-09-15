import type { L } from "@/lib/i18n/localized";

export type DemoKey = "clinic" | "trades" | "advisory";

export type Decision = { title: L; body: L };

/**
 * The three explanations behind "Zašto je ovako dizajnirano?". The ids match
 * `data-annotation` markers rendered inside each demo, so every explanation
 * points at a concrete element rather than at the page in general.
 */
export type AnnotationId = "offer" | "services" | "contact";

export type Annotation = { id: AnnotationId; title: L; body: L };

export type DemoProject = {
  slug: string;
  key: DemoKey;
  /** Invented business name — a demo concept, not a real company. */
  brand: string;
  sector: L;
  tagline: L;
  goal: L;
  shows: L;
  needs: L<string[]>;
  decisions: Decision[];
  implemented: L<string[]>;
  annotations: Annotation[];
  /** Card theming on the MOST site, mirroring each concept's own palette. */
  swatch: { bg: string; fg: string; accent: string };
};

export const demoProjects: DemoProject[] = [
  {
    slug: "ordinacija-lipa",
    key: "clinic",
    brand: "Ordinacija Lipa",
    sector: { bs: "Stomatološka ordinacija", de: "Zahnarztpraxis" },
    tagline: {
      bs: "Ordinacija koja objasni prvi dolazak prije nego što pacijent nazove.",
      de: "Eine Praxis, die den ersten Besuch erklärt, bevor jemand anruft.",
    },
    goal: {
      bs: "da pacijent koji prvi put traži zubara u nekoliko sekundi vidi šta ordinacija radi, koliko traje prvi pregled i kako da zakaže termin.",
      de: "dass jemand, der zum ersten Mal eine Zahnarztpraxis sucht, in wenigen Sekunden sieht, was die Praxis macht, wie lange die erste Untersuchung dauert und wie ein Termin zustande kommt.",
    },
    shows: {
      bs: "kako se popis usluga može pregledati bez traženja i kako kontakt ostaje nadohvat ruke dok pacijent čita.",
      de: "wie sich die Leistungen ohne Suchen überblicken lassen und wie der Kontakt in Reichweite bleibt, während gelesen wird.",
    },
    needs: {
      bs: [
        "Pacijent najčešće traži tri stvari: mogu li doći, kada i koliko to traje.",
        "Popisi usluga na stranicama ordinacija često su napisani stručnim jezikom koji pacijent ne koristi.",
        "Broj za zakazivanje obično stoji samo u podnožju, daleko od trenutka u kojem se pacijent odluči.",
      ],
      de: [
        "Patientinnen und Patienten suchen meist drei Dinge: ob sie kommen können, wann und wie lange es dauert.",
        "Leistungslisten auf Praxisseiten sind oft in Fachsprache geschrieben, die Patienten selbst nicht verwenden.",
        "Die Nummer für die Terminvergabe steht meist nur im Fußbereich — weit weg vom Moment der Entscheidung.",
      ],
    },
    decisions: [
      {
        title: { bs: "Mirna podloga i velika veličina teksta", de: "Ruhiger Untergrund und große Schrift" },
        body: {
          bs: "Zdravstveni sadržaj se čita u napetom trenutku. Svijetla podloga, širi razmaci i tekst od 17 piksela naviše smanjuju osjećaj gužve i olakšavaju čitanje starijim pacijentima.",
          de: "Gesundheitsinhalte werden in angespannten Momenten gelesen. Heller Untergrund, größere Abstände und Text ab 17 Pixeln nehmen Druck heraus und erleichtern älteren Patienten das Lesen.",
        },
      },
      {
        title: { bs: "Odabir po tegobi, ne po stručnom nazivu", de: "Auswahl nach Beschwerde, nicht nach Fachbegriff" },
        body: {
          bs: "Pacijent bira ono što osjeća — „boli me zub“, „krvare desni“ — a stranica to prevodi u uslugu, trajanje i objašnjenje prvog dolaska.",
          de: "Man wählt, was man spürt — „Zahnschmerzen“, „Zahnfleischbluten“ — und die Seite übersetzt das in Leistung, Dauer und Ablauf des ersten Besuchs.",
        },
      },
      {
        title: { bs: "Usluge s trajanjem, ne samo s nazivom", de: "Leistungen mit Dauer, nicht nur mit Namen" },
        body: {
          bs: "Uz svaku uslugu stoji koliko traje i šta obuhvata. To je prvo pitanje koje pacijent postavlja na telefon, pa nema razloga da odgovor bude skriven.",
          de: "Bei jeder Leistung steht, wie lange sie dauert und was dazugehört. Das ist die erste Frage am Telefon — es gibt keinen Grund, die Antwort zu verstecken.",
        },
      },
      {
        title: { bs: "Traka za zakazivanje koja prati čitanje", de: "Terminleiste, die beim Lesen mitläuft" },
        body: {
          bs: "Na mobitelu traka za zakazivanje ostaje na dnu ekrana dok pacijent lista usluge, pa odluka i sljedeći korak nisu razdvojeni.",
          de: "Auf dem Handy bleibt die Terminleiste am unteren Rand, während die Leistungen durchgesehen werden — Entscheidung und nächster Schritt liegen nicht auseinander.",
        },
      },
    ],
    implemented: {
      bs: [
        "Odabir tegobe koji mijenja prikazanu uslugu, njeno trajanje i sadržaj prvog dolaska.",
        "Raspored koji se stvarno mijenja: na užem ekranu usluge prelaze u listu, a traka za zakazivanje se spušta na dno.",
        "Sve kontrole rade dodirom i tastaturom, sa vidljivim fokusom.",
        "Kontakt je jasno označen kao demonstracijski i ne šalje upite.",
      ],
      de: [
        "Eine Beschwerde-Auswahl, die Leistung, Dauer und Ablauf des ersten Besuchs umschaltet.",
        "Ein Layout, das sich wirklich ändert: bei schmalem Bildschirm werden die Leistungen zur Liste und die Terminleiste rutscht nach unten.",
        "Alle Bedienelemente funktionieren per Touch und Tastatur, mit sichtbarem Fokus.",
        "Der Kontakt ist klar als Demonstration gekennzeichnet und versendet keine Anfragen.",
      ],
    },
    annotations: [
      {
        id: "offer",
        title: { bs: "Ponuda je jasna već na prvom ekranu.", de: "Das Angebot steht schon auf dem ersten Bildschirm." },
        body: {
          bs: "Naslov kaže vrstu ordinacije i grad, a odmah ispod stoji koliko traje prvi pregled. Pacijent ne mora skrolati da bi znao je li na pravom mjestu.",
          de: "Die Überschrift nennt Art der Praxis und Ort, direkt darunter steht die Dauer der ersten Untersuchung. Niemand muss scrollen, um zu wissen, ob er richtig ist.",
        },
      },
      {
        id: "services",
        title: { bs: "Usluge se mogu pregledati bez traženja.", de: "Die Leistungen lassen sich ohne Suchen überblicken." },
        body: {
          bs: "Umjesto padajućeg menija, usluge stoje kao otvoren popis s trajanjem. Odabir tegobe iznad njih vodi pacijenta do prave, bez poznavanja stručnih naziva.",
          de: "Statt eines Aufklappmenüs stehen die Leistungen als offene Liste mit Dauer. Die Beschwerde-Auswahl darüber führt zur passenden — ohne Fachbegriffe zu kennen.",
        },
      },
      {
        id: "contact",
        title: { bs: "Kontakt je dostupan u trenutku odluke.", de: "Der Kontakt ist im Moment der Entscheidung da." },
        body: {
          bs: "Zakazivanje se ponavlja tačno tamo gdje pacijent završi čitanje o usluzi, a na mobitelu ostaje u vidljivoj traci pri dnu.",
          de: "Die Terminvergabe wiederholt sich genau dort, wo das Lesen über eine Leistung endet — auf dem Handy bleibt sie in einer sichtbaren Leiste unten.",
        },
      },
    ],
    swatch: { bg: "#eef3f4", fg: "#12303a", accent: "#3f7f8c" },
  },

  {
    slug: "stolarija-hrast",
    key: "trades",
    brand: "Stolarija Hrast",
    sector: { bs: "Stolarija i montaža po mjeri", de: "Tischlerei und Montage nach Maß" },
    tagline: {
      bs: "Zanatska firma koja pokazuje materijal prije nego što se kupac javi.",
      de: "Ein Handwerksbetrieb, der das Material zeigt, bevor jemand anfragt.",
    },
    goal: {
      bs: "da kupac koji razmišlja o kuhinji ili plakaru po mjeri vidi šta firma radi, u kojim završnim obradama i kako izgleda dogovor oko mjerenja.",
      de: "dass jemand, der über eine Küche oder einen Einbauschrank nach Maß nachdenkt, sieht, was der Betrieb macht, in welchen Oberflächen und wie die Terminvereinbarung für das Aufmaß abläuft.",
    },
    shows: {
      bs: "kako jedan konfigurator može zamijeniti galeriju od pedeset fotografija: kupac bira prostor i završnu obradu, a prikaz, opis i popis uključenog mijenjaju se zajedno.",
      de: "wie ein Konfigurator eine Galerie mit fünfzig Fotos ersetzen kann: Raum und Oberfläche werden gewählt, und Darstellung, Beschreibung und Leistungsumfang ändern sich gemeinsam.",
    },
    needs: {
      bs: [
        "Zanatske firme obično imaju galeriju fotografija bez objašnjenja šta je na njima njihov rad.",
        "Kupac ne zna koje završne obrade uopšte može birati ni šta ulazi u cijenu.",
        "Nigdje ne piše kako saradnja počinje, pa prvi poziv djeluje kao obaveza.",
      ],
      de: [
        "Handwerksbetriebe haben meist eine Fotogalerie, ohne zu erklären, was daran ihre eigene Arbeit ist.",
        "Kundinnen und Kunden wissen nicht, welche Oberflächen zur Wahl stehen und was im Preis enthalten ist.",
        "Nirgends steht, wie die Zusammenarbeit beginnt — der erste Anruf wirkt wie eine Verpflichtung.",
      ],
    },
    decisions: [
      {
        title: { bs: "Tamna podloga i težak naslov", de: "Dunkler Untergrund und schwere Überschrift" },
        body: {
          bs: "Drvo i metal bolje se čitaju na tamnoj podlozi. Naslov u najtežem rezu odgovara zanatu koji radi s masivnim materijalom i odmah razlikuje ovu stranicu od ordinacije.",
          de: "Holz und Metall wirken auf dunklem Untergrund besser. Die Überschrift im schwersten Schnitt passt zu einem Handwerk mit massivem Material und unterscheidet diese Seite sofort von der Praxis.",
        },
      },
      {
        title: { bs: "Konfigurator umjesto galerije", de: "Konfigurator statt Galerie" },
        body: {
          bs: "Umjesto niza slika bez konteksta, kupac sam bira prostor i obradu. Uz svaki izbor mijenja se i popis onoga što je uključeno, pa kupac vidi obim posla, a ne samo rezultat.",
          de: "Statt einer Bilderreihe ohne Kontext wählt man Raum und Oberfläche selbst. Mit jeder Auswahl ändert sich auch der Leistungsumfang — sichtbar wird der Arbeitsumfang, nicht nur das Ergebnis.",
        },
      },
      {
        title: { bs: "Materijali su nacrtani, ne fotografisani", de: "Materialien sind gezeichnet, nicht fotografiert" },
        body: {
          bs: "Završne obrade izvedene su kao vektorska tekstura s crtežom drva, pa se mijenjaju odmah i bez učitavanja novih slika. Cijela sekcija teži manje od jedne fotografije.",
          de: "Die Oberflächen sind als Vektortextur mit Holzzeichnung umgesetzt und wechseln sofort, ohne neue Bilder zu laden. Der ganze Abschnitt wiegt weniger als ein einzelnes Foto.",
        },
      },
      {
        title: { bs: "Mjerenje kao prvi korak, ne poziv", de: "Aufmaß als erster Schritt, nicht der Anruf" },
        body: {
          bs: "Umjesto „pozovite nas“, stranica objašnjava šta se dešava na mjerenju i šta kupac dobije nakon njega. Poziv postaje očekivan korak, a ne skok u nepoznato.",
          de: "Statt „rufen Sie uns an“ erklärt die Seite, was beim Aufmaß passiert und was man danach bekommt. Der Anruf wird zum erwarteten Schritt statt zum Sprung ins Ungewisse.",
        },
      },
    ],
    implemented: {
      bs: [
        "Konfigurator s tri prostora i tri završne obrade; prikaz, opis i popis uključenog mijenjaju se zajedno.",
        "Završne obrade su generisane u SVG-u, pa promjena obrade ne učitava nijednu novu datoteku.",
        "Prostori su izvedeni kao tabovi s punom podrškom za tastaturu (strelice, Home, End).",
        "Na užem ekranu konfigurator prelazi iz dvije kolone u jednu, a izbor obrada u horizontalnu traku.",
      ],
      de: [
        "Ein Konfigurator mit drei Räumen und drei Oberflächen; Darstellung, Beschreibung und Leistungsumfang wechseln gemeinsam.",
        "Die Oberflächen werden als SVG erzeugt — ein Wechsel lädt keine einzige neue Datei.",
        "Die Räume sind als Tabs mit vollständiger Tastaturunterstützung umgesetzt (Pfeiltasten, Pos1, Ende).",
        "Bei schmalem Bildschirm wird aus zwei Spalten eine, und die Oberflächenauswahl wird zur horizontalen Leiste.",
      ],
    },
    annotations: [
      {
        id: "offer",
        title: { bs: "Ponuda je jasna već na prvom ekranu.", de: "Das Angebot steht schon auf dem ersten Bildschirm." },
        body: {
          bs: "Naslov imenuje tri stvari koje firma radi — kuhinje, plakare i namještaj po mjeri — umjesto opšte rečenice o kvalitetu i tradiciji.",
          de: "Die Überschrift nennt drei Dinge, die der Betrieb macht — Küchen, Schränke und Möbel nach Maß — statt eines allgemeinen Satzes über Qualität und Tradition.",
        },
      },
      {
        id: "services",
        title: { bs: "Usluge se mogu pregledati bez traženja.", de: "Die Leistungen lassen sich ohne Suchen überblicken." },
        body: {
          bs: "Konfigurator je ujedno i popis usluga: prelaskom kroz tri prostora kupac vidi cijelu ponudu, a uz svaki prikaz stoji šta je uključeno.",
          de: "Der Konfigurator ist zugleich die Leistungsübersicht: Wer die drei Räume durchgeht, sieht das ganze Angebot — mit dem Leistungsumfang direkt daneben.",
        },
      },
      {
        id: "contact",
        title: { bs: "Kontakt je dostupan u trenutku odluke.", de: "Der Kontakt ist im Moment der Entscheidung da." },
        body: {
          bs: "Dogovor za mjerenje stoji odmah ispod konfiguratora — tamo gdje kupac upravo vidi šta bi naručio, a ne na zasebnoj stranici.",
          de: "Die Terminvereinbarung fürs Aufmaß steht direkt unter dem Konfigurator — dort, wo man gerade sieht, was man bestellen würde, nicht auf einer eigenen Seite.",
        },
      },
    ],
    swatch: { bg: "#1b1a18", fg: "#f2ece2", accent: "#c8864a" },
  },

  {
    slug: "meridijan-savjetovanje",
    key: "advisory",
    brand: "Meridijan",
    sector: { bs: "Poslovno savjetovanje", de: "Unternehmensberatung" },
    tagline: {
      bs: "Savjetovanje koje odmah kaže o čemu se razgovara na prvom sastanku.",
      de: "Beratung, die gleich sagt, worüber im ersten Gespräch gesprochen wird.",
    },
    goal: {
      bs: "da vlasnik firme prepozna svoju situaciju u prvih nekoliko redaka i vidi o čemu bi konkretno razgovarali, umjesto da čita opšte fraze o rastu i potencijalu.",
      de: "dass Unternehmerinnen und Unternehmer ihre Lage in den ersten Zeilen wiedererkennen und sehen, worüber konkret gesprochen würde — statt allgemeine Sätze über Wachstum und Potenzial zu lesen.",
    },
    shows: {
      bs: "kako se apstraktna usluga može objasniti kroz kratku orijentaciju od tri pitanja, i kako se karakter stranice može promijeniti bez uvođenja novog pisma.",
      de: "wie sich eine abstrakte Leistung über eine kurze Orientierung aus drei Fragen erklären lässt — und wie sich der Charakter einer Seite ohne neue Schriftfamilie ändern kann.",
    },
    needs: {
      bs: [
        "Savjetodavne usluge na stranicama zvuče gotovo identično, pa se firme ne razlikuju.",
        "Vlasnik firme ne zna pripada li njegov problem baš ovoj firmi.",
        "Prvi kontakt djeluje kao obaveza, jer nigdje ne piše šta se na njemu dešava.",
      ],
      de: [
        "Beratungsleistungen klingen auf Websites fast identisch — die Anbieter sind nicht unterscheidbar.",
        "Unternehmerinnen und Unternehmer wissen nicht, ob ihr Anliegen zu genau diesem Anbieter passt.",
        "Der erste Kontakt wirkt wie eine Verpflichtung, weil nirgends steht, was dabei passiert.",
      ],
    },
    decisions: [
      {
        title: { bs: "Uredničko slaganje umjesto kartica", de: "Redaktioneller Satz statt Kartenraster" },
        body: {
          bs: "Uska mjera reda, tanke linije i veliki razmaci daju ton mirnog pisanog savjeta. Nema mreže identičnih kartica, jer bi izjednačila sadržaj koji nije jednak.",
          de: "Schmales Satzmaß, feine Linien und großzügige Abstände erzeugen den Ton eines ruhigen schriftlichen Rats. Kein Raster gleicher Karten — es würde Ungleiches gleich aussehen lassen.",
        },
      },
      {
        title: { bs: "Tri pitanja umjesto tri paragrafa", de: "Drei Fragen statt drei Absätze" },
        body: {
          bs: "Kratka orijentacija vodi posjetioca do jednog područja rada. Rezultat nije ocjena ni procjena nego objašnjenje o čemu bi se razgovaralo na prvom sastanku.",
          de: "Eine kurze Orientierung führt zu einem Arbeitsfeld. Das Ergebnis ist keine Bewertung und keine Schätzung, sondern die Erklärung, worüber im ersten Gespräch gesprochen würde.",
        },
      },
      {
        title: { bs: "Bez brojki koje ništa ne znače", de: "Keine Zahlen, die nichts bedeuten" },
        body: {
          bs: "Nema izmišljenih postotaka rasta ni broja klijenata. Umjesto toga stoji šta se radi, koliko traje i šta klijent dobije nakon prvog sastanka.",
          de: "Keine erfundenen Wachstumsprozente, keine Kundenzahlen. Stattdessen steht da, was gemacht wird, wie lange es dauert und was nach dem ersten Gespräch vorliegt.",
        },
      },
      {
        title: { bs: "Ista dva pisma, drugačiji ton", de: "Dieselben zwei Schriften, anderer Ton" },
        body: {
          bs: "Cijela stranica koristi iste porodice fontova kao i MOST, ali u lakšim rezovima, s razvučenim razmakom i drugačijim ritmom — karakter ne zavisi od broja fontova nego od načina na koji se koriste.",
          de: "Die Seite nutzt dieselben Schriftfamilien wie MOST, aber in leichteren Schnitten, mit weiterer Laufweite und anderem Rhythmus — Charakter hängt nicht von der Anzahl der Schriften ab, sondern vom Umgang mit ihnen.",
        },
      },
    ],
    implemented: {
      bs: [
        "Orijentacija od tri pitanja koja vodi do jednog od tri područja rada, s objašnjenjem sadržaja prvog sastanka.",
        "Rezultat se može promijeniti i poništiti bez ponovnog učitavanja stranice.",
        "Tekst rezultata se najavljuje čitačima ekrana kada se pojavi.",
        "Uredničko slaganje ostaje čitljivo na 360 piksela: mjera reda se sužava, a linije se prorjeđuju.",
      ],
      de: [
        "Eine Orientierung aus drei Fragen, die zu einem von drei Arbeitsfeldern führt — mit Erklärung zum Inhalt des ersten Gesprächs.",
        "Das Ergebnis lässt sich ohne Neuladen der Seite ändern und zurücksetzen.",
        "Der Ergebnistext wird Screenreadern angekündigt, sobald er erscheint.",
        "Der redaktionelle Satz bleibt bei 360 Pixeln lesbar: das Satzmaß wird schmaler, die Linien werden sparsamer.",
      ],
    },
    annotations: [
      {
        id: "offer",
        title: { bs: "Ponuda je jasna već na prvom ekranu.", de: "Das Angebot steht schon auf dem ersten Bildschirm." },
        body: {
          bs: "Prva rečenica imenuje tri situacije u kojima se firme javljaju. Posjetilac prepoznaje svoju prije nego što pročita ijedan opis usluge.",
          de: "Der erste Satz nennt drei Situationen, in denen Unternehmen sich melden. Man erkennt die eigene, bevor man eine Leistungsbeschreibung liest.",
        },
      },
      {
        id: "services",
        title: { bs: "Usluge se mogu pregledati bez traženja.", de: "Die Leistungen lassen sich ohne Suchen überblicken." },
        body: {
          bs: "Područja rada stoje kao otvoren popis s kratkim opisom ispod svakog naslova — bez otvaranja, bez padajućih menija i bez zasebnih stranica.",
          de: "Die Arbeitsfelder stehen als offene Liste mit kurzer Beschreibung unter jeder Überschrift — ohne Aufklappen, ohne Menüs, ohne eigene Unterseiten.",
        },
      },
      {
        id: "contact",
        title: { bs: "Kontakt je dostupan u trenutku odluke.", de: "Der Kontakt ist im Moment der Entscheidung da." },
        body: {
          bs: "Orijentacija završava prijedlogom razgovora, pa se kontakt nudi tačno kada posjetilac prvi put ima konkretan povod.",
          de: "Die Orientierung endet mit dem Vorschlag eines Gesprächs — der Kontakt wird genau dann angeboten, wenn es zum ersten Mal einen konkreten Anlass gibt.",
        },
      },
    ],
    swatch: { bg: "#efece4", fg: "#23211c", accent: "#7a6a52" },
  },
];

export const demoProjectBySlug = new Map(demoProjects.map((project) => [project.slug, project]));

export function getProject(slug: string): DemoProject | undefined {
  return demoProjectBySlug.get(slug);
}

export function nextProject(slug: string): DemoProject {
  const index = demoProjects.findIndex((project) => project.slug === slug);
  return demoProjects[(index + 1) % demoProjects.length];
}
