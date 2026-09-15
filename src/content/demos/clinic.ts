import type { L } from "@/lib/i18n/localized";

export const clinicContent = {
  brand: "Ordinacija Lipa",
  nav: {
    services: { bs: "Usluge", de: "Leistungen" } as L,
    visit: { bs: "Prvi dolazak", de: "Erster Besuch" } as L,
    contact: { bs: "Kontakt", de: "Kontakt" } as L,
    book: { bs: "Zakažite termin", de: "Termin vereinbaren" } as L,
  },
  hero: {
    eyebrow: { bs: "STOMATOLOŠKA ORDINACIJA", de: "ZAHNARZTPRAXIS" } as L,
    title: { bs: "Zubar koji vam objasni šta slijedi.", de: "Zahnmedizin, die erklärt, was als Nächstes kommt." } as L,
    lead: {
      bs: "Prvi pregled traje 30 minuta. Pregledamo stanje, objasnimo mogućnosti i zajedno odlučimo šta se radi — bez naplate prije nego što se dogovorimo.",
      de: "Die erste Untersuchung dauert 30 Minuten. Wir sehen uns den Befund an, erklären die Möglichkeiten und entscheiden gemeinsam — ohne Abrechnung, bevor etwas vereinbart ist.",
    } as L,
    ctaPrimary: { bs: "Zakažite prvi pregled", de: "Erste Untersuchung vereinbaren" } as L,
    ctaSecondary: { bs: "Pogledajte usluge", de: "Leistungen ansehen" } as L,
    facts: [
      { label: { bs: "Prvi pregled", de: "Erste Untersuchung" } as L, value: { bs: "30 minuta", de: "30 Minuten" } as L },
      { label: { bs: "Radno vrijeme", de: "Öffnungszeiten" } as L, value: { bs: "Pon–Pet, 08–19", de: "Mo–Fr, 08–19" } as L },
      { label: { bs: "Jezici", de: "Sprachen" } as L, value: { bs: "BS / DE", de: "BS / DE" } as L },
    ],
  },
  triage: {
    title: { bs: "Šta vas dovodi kod nas?", de: "Was führt Sie zu uns?" } as L,
    lead: {
      bs: "Odaberite ono što vas muči. Pokazaćemo koja usluga to rješava i šta se dešava na prvom dolasku.",
      de: "Wählen Sie, was Sie stört. Wir zeigen, welche Leistung dazu passt und was beim ersten Besuch geschieht.",
    } as L,
    resultLabel: { bs: "Preporučena usluga", de: "Passende Leistung" } as L,
    durationLabel: { bs: "Trajanje", de: "Dauer" } as L,
    includesLabel: { bs: "Šta obuhvata", de: "Was dazugehört" } as L,
    options: [
      {
        id: "pain",
        chip: { bs: "Boli me zub", de: "Zahnschmerzen" } as L,
        service: { bs: "Hitni pregled i sanacija", de: "Notfalluntersuchung und Behandlung" } as L,
        duration: { bs: "20–45 minuta", de: "20–45 Minuten" } as L,
        includes: {
          bs: ["Pregled i snimak zuba koji boli", "Umirivanje boli u istoj posjeti kada je moguće", "Plan daljnjeg liječenja u pisanom obliku"],
          de: ["Untersuchung und Aufnahme des betroffenen Zahns", "Schmerzlinderung möglichst im selben Termin", "Schriftlicher Plan für die weitere Behandlung"],
        } as L<string[]>,
      },
      {
        id: "gums",
        chip: { bs: "Krvare mi desni", de: "Zahnfleischbluten" } as L,
        service: { bs: "Čišćenje i tretman desni", de: "Reinigung und Zahnfleischbehandlung" } as L,
        duration: { bs: "45 minuta", de: "45 Minuten" } as L,
        includes: {
          bs: ["Uklanjanje kamenca i mekih naslaga", "Provjera dubine džepova", "Upute za njegu kod kuće, prilagođene vama"],
          de: ["Entfernung von Zahnstein und weichen Belägen", "Prüfung der Taschentiefen", "Anleitung zur häuslichen Pflege, auf Sie abgestimmt"],
        } as L<string[]>,
      },
      {
        id: "look",
        chip: { bs: "Ne sviđa mi se osmijeh", de: "Mein Lächeln gefällt mir nicht" } as L,
        service: { bs: "Estetski pregled i plan", de: "Ästhetische Beratung und Plan" } as L,
        duration: { bs: "30 minuta", de: "30 Minuten" } as L,
        includes: {
          bs: ["Razgovor o tome šta vam smeta", "Prikaz mogućnosti i njihovih razlika", "Redoslijed zahvata i okvirni raspored"],
          de: ["Gespräch darüber, was Sie stört", "Überblick der Möglichkeiten und ihrer Unterschiede", "Reihenfolge der Schritte und grober Zeitplan"],
        } as L<string[]>,
      },
      {
        id: "check",
        chip: { bs: "Samo redovna kontrola", de: "Nur die Kontrolle" } as L,
        service: { bs: "Redovni pregled", de: "Routineuntersuchung" } as L,
        duration: { bs: "30 minuta", de: "30 Minuten" } as L,
        includes: {
          bs: ["Pregled svih zuba i desni", "Provjera ranijih plombi i nadoknada", "Dogovor o sljedećem terminu"],
          de: ["Untersuchung aller Zähne und des Zahnfleischs", "Kontrolle früherer Füllungen und Versorgungen", "Vereinbarung des nächsten Termins"],
        } as L<string[]>,
      },
    ],
  },
  services: {
    title: { bs: "Usluge i koliko traju", de: "Leistungen und ihre Dauer" } as L,
    lead: {
      bs: "Bez stručnih naziva bez objašnjenja. Uz svaku uslugu stoji koliko traje i šta ulazi u nju.",
      de: "Keine Fachbegriffe ohne Erklärung. Bei jeder Leistung steht, wie lange sie dauert und was dazugehört.",
    } as L,
    items: [
      {
        name: { bs: "Pregled i savjet", de: "Untersuchung und Beratung" } as L,
        duration: { bs: "30 min", de: "30 Min." } as L,
        body: { bs: "Pregled stanja, snimak po potrebi i pisani plan sa mogućnostima.", de: "Befundaufnahme, bei Bedarf eine Aufnahme und ein schriftlicher Plan mit Optionen." } as L,
      },
      {
        name: { bs: "Čišćenje kamenca", de: "Zahnsteinentfernung" } as L,
        duration: { bs: "45 min", de: "45 Min." } as L,
        body: { bs: "Uklanjanje naslaga, poliranje i upute za njegu koje se mogu primijeniti kod kuće.", de: "Entfernung der Beläge, Politur und eine Pflegeanleitung für zu Hause." } as L,
      },
      {
        name: { bs: "Plombe i nadoknade", de: "Füllungen und Versorgungen" } as L,
        duration: { bs: "45–90 min", de: "45–90 Min." } as L,
        body: { bs: "Sanacija karijesa u boji zuba, s provjerom zagriza prije kraja posjete.", de: "Kariesbehandlung in Zahnfarbe, mit Bisskontrolle noch im selben Termin." } as L,
      },
      {
        name: { bs: "Liječenje kanala", de: "Wurzelbehandlung" } as L,
        duration: { bs: "60–90 min", de: "60–90 Min." } as L,
        body: { bs: "Zahvat u jednoj ili dvije posjete, ovisno o nalazu; svaki korak objasnimo unaprijed.", de: "Behandlung in ein bis zwei Terminen, je nach Befund; jeder Schritt wird vorher erklärt." } as L,
      },
      {
        name: { bs: "Estetski zahvati", de: "Ästhetische Behandlungen" } as L,
        duration: { bs: "po dogovoru", de: "nach Absprache" } as L,
        body: { bs: "Izbjeljivanje i korekcije oblika, uvijek nakon pregleda i dogovora o redoslijedu.", de: "Aufhellung und Formkorrekturen — immer nach Untersuchung und Absprache der Reihenfolge." } as L,
      },
    ],
  },
  visit: {
    title: { bs: "Kako izgleda prvi dolazak", de: "So läuft der erste Besuch ab" } as L,
    steps: [
      {
        title: { bs: "Dolazite 5 minuta ranije", de: "Sie kommen 5 Minuten früher" } as L,
        body: { bs: "Popunjavate kratak upitnik o zdravlju. Ako uzimate terapiju, ponesite popis lijekova.", de: "Sie füllen einen kurzen Gesundheitsbogen aus. Falls Sie Medikamente nehmen, bringen Sie bitte eine Liste mit." } as L,
      },
      {
        title: { bs: "Pregled i razgovor", de: "Untersuchung und Gespräch" } as L,
        body: { bs: "Pregledamo stanje i pokažemo vam nalaz na ekranu. Objasnimo šta je hitno, a šta može čekati.", de: "Wir erheben den Befund und zeigen ihn Ihnen am Bildschirm. Wir erklären, was dringend ist und was warten kann." } as L,
      },
      {
        title: { bs: "Plan i dogovor", de: "Plan und Absprache" } as L,
        body: { bs: "Dobijate plan s mogućnostima i redoslijedom. Tek nakon vašeg pristanka dogovaramo sljedeći termin.", de: "Sie erhalten einen Plan mit Optionen und Reihenfolge. Erst nach Ihrer Zustimmung vereinbaren wir den nächsten Termin." } as L,
      },
    ],
  },
  contact: {
    title: { bs: "Zakažite termin", de: "Termin vereinbaren" } as L,
    lead: {
      bs: "Javite nam šta vas muči i kada vam odgovara. Potvrdu termina šaljemo istog dana.",
      de: "Sagen Sie uns, was Sie stört und wann es Ihnen passt. Die Bestätigung senden wir noch am selben Tag.",
    } as L,
    cta: { bs: "Zakažite termin", de: "Termin vereinbaren" } as L,
    hoursLabel: { bs: "Radno vrijeme", de: "Öffnungszeiten" } as L,
    hours: { bs: "Ponedjeljak – petak, 08:00 – 19:00", de: "Montag – Freitag, 08:00 – 19:00 Uhr" } as L,
    addressLabel: { bs: "Adresa", de: "Adresse" } as L,
    address: { bs: "Adresa ordinacije (demo podatak)", de: "Adresse der Praxis (Demo-Angabe)" } as L,
  },
  art: {
    alt: {
      bs: "Ilustracija mirne ordinacije: svjetlo kroz prozor, stolica i biljka.",
      de: "Illustration einer ruhigen Praxis: Licht durch das Fenster, Stuhl und Pflanze.",
    } as L,
  },
} as const;
