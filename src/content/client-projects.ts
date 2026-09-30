import type { L } from "@/lib/i18n/localized";

export type ClientProject = {
  slug: string;
  brand: string;
  liveUrl: string;
  title: L;
  description: L;
  sector: L;
  tagline: L;
  goal: L;
  scope: L<string[]>;
  roles: L<string[]>;
  process: L<string[]>;
  decisions: { id: string; title: L; body: L }[];
};

/** Published client work. Authorship is confirmed by the studio owner.
 * No commercial results, testimonials or payment claims are inferred.
 */
export const clientProjects: ClientProject[] = [
  {
    slug: "mirjana-massage",
    brand: "Massage und Wellness Mirjana",
    liveUrl: "https://mirjanamassage.vercel.app/",
    title: {
      bs: "Web stranica za Massage und Wellness Mirjana | MOST Studio",
      de: "Kundenprojekt: Massage und Wellness Mirjana | MOST Studio",
    },
    description: {
      bs: "Klijentski projekt MOST Studija: dizajn, sadržaj i izrada web stranice za Massage und Wellness Mirjana. Pogledajte stvarni desktop i mobilni prikaz.",
      de: "Ein Kundenprojekt von MOST Studio: Design, Inhalte und Website-Erstellung für Massage und Wellness Mirjana. Echte Desktop- und Mobilansichten ansehen.",
    },
    sector: {
      bs: "Masaža i wellness · München",
      de: "Massage und Wellness · München",
    },
    tagline: {
      bs: "Lično predstavljanje, pregled usluga i jasan put do upita za termin.",
      de: "Eine persönliche Vorstellung, übersichtliche Leistungen und ein klarer Weg zur Terminanfrage.",
    },
    goal: {
      bs: "Predstaviti Mirjanu i njenu ponudu tako da posjetilac može pregledati tretmane, trajanje i cijene, a zatim pripremiti upit za termin.",
      de: "Mirjana und ihr Angebot so vorstellen, dass Besucher Behandlungen, Dauer und Preise überblicken und anschließend einen Termin anfragen können.",
    },
    scope: {
      bs: [
        "Struktura i sadržaj poslovne stranice na njemačkom jeziku.",
        "Vizuelni dizajn i raspored za računar i mobitel.",
        "Pregled tretmana, trajanja i cijena te lično predstavljanje Mirjane.",
        "Priprema upita za termin uz kontakt preko WhatsAppa ili telefona.",
      ],
      de: [
        "Struktur und Inhalte einer deutschsprachigen Unternehmenswebsite.",
        "Visuelles Design und Layout für Desktop und Smartphone.",
        "Übersicht über Behandlungen, Dauer und Preise sowie Mirjanas persönliche Vorstellung.",
        "Vorbereitung einer Terminanfrage mit Kontakt über WhatsApp oder Telefon.",
      ],
    },
    roles: {
      bs: ["Dizajn", "Sadržaj", "Izrada"],
      de: ["Design", "Inhalte", "Entwicklung"],
    },
    process: {
      bs: [
        "Ponudu smo rasporedili u jasne cjeline: predstavljanje, usluge i cijene, upit i kontakt.",
        "Mirne boje, fotografije i čitljiv raspored povezali smo s ličnim karakterom studija.",
        "Sadržaj i kontaktni tok prilagodili smo velikom ekranu i mobitelu.",
      ],
      de: [
        "Wir haben das Angebot in klare Bereiche gegliedert: Vorstellung, Leistungen und Preise, Anfrage und Kontakt.",
        "Ruhige Farben, Bilder und ein lesbares Layout verbinden sich mit dem persönlichen Charakter des Studios.",
        "Inhalte und Kontaktweg haben wir für große Bildschirme und Smartphones umgesetzt.",
      ],
    },
    decisions: [
      {
        id: "offer",
        title: {
          bs: "Tretman, trajanje i cijena na jednom mjestu.",
          de: "Behandlung, Dauer und Preis an einem Ort.",
        },
        body: {
          bs: "Uz svaki tretman stoje trajanje i cijena. Različite opcije su grupisane uz istu uslugu, pa posjetilac može uporediti ponudu prije nego što se javi.",
          de: "Bei jeder Behandlung stehen Dauer und Preis. Die Varianten sind der jeweiligen Leistung zugeordnet, damit Besucher das Angebot vor einer Anfrage vergleichen können.",
        },
      },
      {
        id: "person",
        title: {
          bs: "Mirjana je dio ponude.",
          de: "Mirjana steht hinter dem Angebot.",
        },
        body: {
          bs: "Lično predstavljanje objašnjava ko dočekuje klijenta i kakav je pristup u studiju. Tekst i fotografije daju usluzi konkretan kontekst prije pregleda tretmana.",
          de: "Die persönliche Vorstellung erklärt, wer die Kunden empfängt und wie Mirjana im Studio arbeitet. Texte und Bilder geben den Leistungen einen konkreten Rahmen.",
        },
      },
      {
        id: "enquiry",
        title: {
          bs: "Upit za termin s jasnim sljedećim korakom.",
          de: "Eine Terminanfrage mit klarem nächsten Schritt.",
        },
        body: {
          bs: "Kontaktni tok priprema upit za WhatsApp ili poziv. Mirjana lično dogovara i potvrđuje termin; pripremljeni upit nije automatska potvrda rezervacije.",
          de: "Der Kontaktweg bereitet eine Anfrage per WhatsApp oder Telefon vor. Mirjana vereinbart und bestätigt den Termin persönlich; eine vorbereitete Anfrage ist keine automatische Buchungsbestätigung.",
        },
      },
    ],
  },
];

export function getClientProject(slug: string): ClientProject | undefined {
  return clientProjects.find((project) => project.slug === slug);
}
