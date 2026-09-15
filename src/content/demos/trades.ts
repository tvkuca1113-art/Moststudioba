import type { RoomVariant, WoodFinish } from "@/components/demos/art";
import type { L } from "@/lib/i18n/localized";

export const tradesContent = {
  brand: "Stolarija Hrast",
  nav: {
    work: { bs: "Radovi", de: "Arbeiten" } as L,
    materials: { bs: "Materijali", de: "Materialien" } as L,
    measuring: { bs: "Mjerenje", de: "Aufmaß" } as L,
    cta: { bs: "Dogovorite mjerenje", de: "Aufmaß vereinbaren" } as L,
  },
  hero: {
    eyebrow: { bs: "STOLARIJA I MONTAŽA PO MJERI", de: "TISCHLEREI UND MONTAGE NACH MASS" } as L,
    titleLines: {
      bs: ["Kuhinje.", "Plakari.", "Namještaj po mjeri."],
      de: ["Küchen.", "Schränke.", "Möbel nach Maß."],
    } as L<string[]>,
    lead: {
      bs: "Radimo od mjerenja do montaže. Vi birate prostor i završnu obradu, mi izlazimo na teren i dajemo ponudu s tačnim dimenzijama.",
      de: "Wir arbeiten vom Aufmaß bis zur Montage. Sie wählen Raum und Oberfläche, wir kommen vor Ort und erstellen ein Angebot mit exakten Maßen.",
    } as L,
    cta: { bs: "Dogovorite mjerenje", de: "Aufmaß vereinbaren" } as L,
    secondary: { bs: "Pogledajte obrade", de: "Oberflächen ansehen" } as L,
  },
  configurator: {
    eyebrow: { bs: "KONFIGURATOR", de: "KONFIGURATOR" } as L,
    title: { bs: "Odaberite prostor i obradu.", de: "Raum und Oberfläche wählen." } as L,
    lead: {
      bs: "Prikaz se mijenja zajedno s vašim izborom, kao i popis onoga što ulazi u posao.",
      de: "Die Darstellung ändert sich mit Ihrer Auswahl — ebenso der Umfang der Arbeiten.",
    } as L,
    roomLabel: { bs: "Prostor", de: "Raum" } as L,
    finishLabel: { bs: "Završna obrada", de: "Oberfläche" } as L,
    includesLabel: { bs: "Šta ulazi u posao", de: "Was zum Auftrag gehört" } as L,
    finishNote: {
      bs: "Obrade su nacrtane u vektoru — promjena ne učitava nove slike.",
      de: "Die Oberflächen sind als Vektor gezeichnet — ein Wechsel lädt keine neuen Bilder.",
    } as L,
    rooms: [
      {
        id: "kitchen" as RoomVariant,
        name: { bs: "Kuhinja", de: "Küche" } as L,
        body: {
          bs: "Donji i gornji elementi, visoki ormar i radna ploča. Dimenzije se prilagođavaju postojećim instalacijama, a ne obrnuto.",
          de: "Unter- und Oberschränke, Hochschrank und Arbeitsplatte. Die Maße richten sich nach den vorhandenen Anschlüssen, nicht umgekehrt.",
        } as L,
        includes: {
          bs: [
            "Izlazak na teren i mjerenje prostora",
            "Izrada korpusa, fronti i radne ploče",
            "Ugradnja okova s mekim zatvaranjem",
            "Montaža i spajanje s postojećim instalacijama",
          ],
          de: [
            "Termin vor Ort und Aufmaß des Raums",
            "Fertigung von Korpus, Fronten und Arbeitsplatte",
            "Einbau von Beschlägen mit Dämpfung",
            "Montage und Anschluss an die vorhandene Installation",
          ],
        } as L<string[]>,
      },
      {
        id: "wardrobe" as RoomVariant,
        name: { bs: "Plakar", de: "Einbauschrank" } as L,
        body: {
          bs: "Ugradni plakar od poda do plafona, s kliznim ili klasičnim vratima. Unutrašnja podjela se dogovara prema tome šta se u njemu drži.",
          de: "Einbauschrank vom Boden bis zur Decke, mit Schiebe- oder Drehtüren. Die Innenaufteilung richtet sich danach, was darin verstaut wird.",
        } as L,
        includes: {
          bs: [
            "Mjerenje niše i provjera odstupanja zidova",
            "Izrada korpusa i vrata po mjeri",
            "Unutrašnja podjela prema dogovoru",
            "Montaža i regulacija vrata na licu mjesta",
          ],
          de: [
            "Aufmaß der Nische und Prüfung der Wandabweichungen",
            "Fertigung von Korpus und Türen nach Maß",
            "Innenaufteilung nach Absprache",
            "Montage und Justierung der Türen vor Ort",
          ],
        } as L<string[]>,
      },
      {
        id: "furniture" as RoomVariant,
        name: { bs: "Namještaj po mjeri", de: "Möbel nach Maß" } as L,
        body: {
          bs: "Trpezarijski stolovi, klupe i radni stolovi od masiva. Radimo komad po komad, prema prostoru u koji ulazi.",
          de: "Esstische, Bänke und Schreibtische aus Massivholz. Wir fertigen Stück für Stück, passend zum Raum.",
        } as L,
        includes: {
          bs: [
            "Dogovor o dimenzijama i namjeni komada",
            "Odabir masiva i završne obrade",
            "Izrada i brušenje u radionici",
            "Dostava i postavljanje",
          ],
          de: [
            "Abstimmung von Maßen und Verwendung",
            "Auswahl von Massivholz und Oberfläche",
            "Fertigung und Schliff in der Werkstatt",
            "Lieferung und Aufstellung",
          ],
        } as L<string[]>,
      },
    ],
    finishes: [
      {
        id: "oak" as WoodFinish,
        name: { bs: "Hrast, uljeni", de: "Eiche, geölt" } as L,
        note: { bs: "Topao ton, vidljiv crtež", de: "Warmer Ton, sichtbare Maserung" } as L,
      },
      {
        id: "walnut" as WoodFinish,
        name: { bs: "Orah, mat lak", de: "Nuss, matt lackiert" } as L,
        note: { bs: "Tamniji ton, mirna površina", de: "Dunklerer Ton, ruhige Oberfläche" } as L,
      },
      {
        id: "white" as WoodFinish,
        name: { bs: "Mat bijela", de: "Mattweiß" } as L,
        note: { bs: "Bez crteža, za male prostore", de: "Ohne Maserung, für kleine Räume" } as L,
      },
    ],
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
