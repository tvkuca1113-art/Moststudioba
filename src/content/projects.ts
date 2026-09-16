import type { ImageKey } from "@/content/images";
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
  annotations: Annotation[];
  /** Two photographs from the demo, shown beside its design decisions. */
  decisionImages: [ImageKey, ImageKey];
  /** The one thing a visitor can actually operate in the demo. */
  tryIt: { title: L; body: L };
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
    decisionImages: ["lipa-recepcija", "lipa-tehnologija"],
    tryIt: {
      title: { bs: "Odabir razloga dolaska", de: "Auswahl des Besuchsgrunds" },
      body: {
        bs: "Kliknite razlog dolaska i sadržaj ispod se mijenja: koja usluga ga pokriva, koliko traje i šta obuhvata. Pacijent ne mora znati stručni naziv da bi našao pravo mjesto.",
        de: "Klicken Sie auf einen Besuchsgrund und der Inhalt darunter wechselt: welche Leistung ihn abdeckt, wie lange sie dauert und was dazugehört. Man muss keinen Fachbegriff kennen, um die richtige Stelle zu finden.",
      },
    },
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
      bs: "kako se ponuda pokazuje materijalom: tri koncepta s fotografijama i tri završne obrade koje kupac može uporediti prije nego što dođe u radionicu.",
      de: "wie ein Angebot über das Material gezeigt wird: drei Konzepte mit Fotos und drei Oberflächen, die sich vergleichen lassen, bevor jemand in die Werkstatt kommt.",
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
        title: { bs: "Uz svaki komad piše šta ulazi u posao", de: "Bei jedem Stück steht, was zum Auftrag gehört" },
        body: {
          bs: "Galerija nije niz slika bez konteksta. Uz svaki koncept stoji materijal, dimenzija i popis onoga što ulazi u posao, pa kupac vidi obim, a ne samo rezultat.",
          de: "Die Galerie ist keine Bilderreihe ohne Kontext. Bei jedem Konzept stehen Material, Maß und der Leistungsumfang — sichtbar wird der Umfang, nicht nur das Ergebnis.",
        },
      },
      {
        title: { bs: "Uzorci obrade, jasno nazvani", de: "Oberflächenmuster, klar benannt" },
        body: {
          bs: "Tri obrade stoje kao uzorci, a ne kao fotografije izvedenih radova. Uz svaku piše gdje je koristimo, pa izbor ovisi o prostoru, a ne o tome koja slika bolje izgleda.",
          de: "Die drei Oberflächen stehen als Muster da, nicht als Fotos ausgeführter Arbeiten. Bei jeder steht, wofür wir sie einsetzen — die Wahl hängt vom Raum ab, nicht davon, welches Bild besser aussieht.",
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
    annotations: [
      {
        id: "offer",
        title: { bs: "Ponuda je jasna već na prvom ekranu.", de: "Das Angebot steht schon auf dem ersten Bildschirm." },
        body: {
          bs: "Ispod naslova odmah stoji prvi koncept s materijalom i dimenzijom, pa kupac u prvom ekranu vidi i šta firma radi i u kojem kvalitetu.",
          de: "Direkt unter der Überschrift steht das erste Konzept mit Material und Maß — im ersten Bildschirm sieht man also beides: was der Betrieb macht und in welcher Qualität.",
        },
      },
      {
        id: "services",
        title: { bs: "Usluge se mogu pregledati bez traženja.", de: "Die Leistungen lassen sich ohne Suchen überblicken." },
        body: {
          bs: "Tri koncepta pokrivaju cijelu ponudu — kuhinju, plakar i namještaj po mjeri — a uz svaki stoji šta ulazi u posao.",
          de: "Drei Konzepte decken das ganze Angebot ab — Küche, Schrank und Möbel nach Maß — und bei jedem steht, was zum Auftrag gehört.",
        },
      },
      {
        id: "contact",
        title: { bs: "Kontakt je dostupan u trenutku odluke.", de: "Der Kontakt ist im Moment der Entscheidung da." },
        body: {
          bs: "Dogovor za mjerenje stoji odmah nakon materijala — tamo gdje kupac upravo vidi šta bi naručio, a ne na zasebnoj stranici.",
          de: "Die Terminvereinbarung fürs Aufmaß steht direkt nach den Materialien — dort, wo man gerade sieht, was man bestellen würde, nicht auf einer eigenen Seite.",
        },
      },
    ],
    decisionImages: ["hrast-spoj-detalj", "hrast-plakar"],
    tryIt: {
      title: { bs: "Izbor završne obrade", de: "Auswahl der Oberfläche" },
      body: {
        bs: "Prebacite između tri obrade: mijenja se uzorak, opis i popis prostora u kojima je koristimo. Kupac vidi razliku prije nego što dođe u radionicu.",
        de: "Wechseln Sie zwischen drei Oberflächen: Muster, Beschreibung und die Liste der Räume ändern sich mit. Der Unterschied ist sichtbar, bevor jemand in die Werkstatt kommt.",
      },
    },
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
    decisionImages: ["meridijan-analiza", "meridijan-plan"],
    tryIt: {
      title: { bs: "Orijentacija od tri pitanja", de: "Orientierung aus drei Fragen" },
      body: {
        bs: "Odgovorite na tri pitanja i dobijete jedno predloženo područje rada sa sadržajem prvog sastanka. Nije ocjena firme nego prijedlog teme razgovora.",
        de: "Beantworten Sie drei Fragen und Sie erhalten ein vorgeschlagenes Arbeitsfeld mit dem Inhalt des ersten Gesprächs. Keine Bewertung des Unternehmens, sondern ein Themenvorschlag.",
      },
    },
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
