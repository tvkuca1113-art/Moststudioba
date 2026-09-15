import type { L } from "@/lib/i18n/localized";

export type AdvisoryArea = "finance" | "organisation" | "growth";

export const advisoryContent = {
  brand: "Meridijan",
  nav: {
    areas: { bs: "Područja rada", de: "Arbeitsfelder" } as L,
    orientation: { bs: "Orijentacija", de: "Orientierung" } as L,
    contact: { bs: "Razgovor", de: "Gespräch" } as L,
    cta: { bs: "Dogovorite razgovor", de: "Gespräch vereinbaren" } as L,
  },
  hero: {
    eyebrow: { bs: "POSLOVNO SAVJETOVANJE", de: "UNTERNEHMENSBERATUNG" } as L,
    title: {
      bs: "Kada firma raste brže nego što se stigne dogovoriti.",
      de: "Wenn ein Unternehmen schneller wächst, als man sich abstimmen kann.",
    } as L,
    lead: {
      bs: "Firme nam se najčešće jave u jednoj od tri situacije: promet raste ali se ne vidi zarada, poslovi se drže na jednoj osobi, ili se ista ponuda prodaje sve teže.",
      de: "Unternehmen melden sich meist in einer von drei Situationen: Der Umsatz wächst, aber der Gewinn ist nicht sichtbar; alles hängt an einer Person; oder dasselbe Angebot lässt sich immer schwerer verkaufen.",
    } as L,
    note: {
      bs: "Radimo u kratkim, jasno omeđenim angažmanima. Prvi razgovor traje sat vremena i ne obavezuje ni na šta.",
      de: "Wir arbeiten in kurzen, klar abgegrenzten Mandaten. Das erste Gespräch dauert eine Stunde und ist unverbindlich.",
    } as L,
    cta: { bs: "Dogovorite razgovor", de: "Gespräch vereinbaren" } as L,
    meta: [
      {
        label: { bs: "Prvi razgovor", de: "Erstes Gespräch" } as L,
        value: { bs: "60 minuta, bez obaveze", de: "60 Minuten, unverbindlich" } as L,
      },
      {
        label: { bs: "Angažman", de: "Mandat" } as L,
        value: { bs: "Omeđen, s dogovorenim krajem", de: "Abgegrenzt, mit vereinbartem Ende" } as L,
      },
      {
        label: { bs: "Radimo s", de: "Wir arbeiten mit" } as L,
        value: { bs: "Malim i srednjim firmama", de: "Kleinen und mittleren Unternehmen" } as L,
      },
    ],
  },
  areas: {
    title: { bs: "Područja rada", de: "Arbeitsfelder" } as L,
    items: [
      {
        id: "finance" as AdvisoryArea,
        name: { bs: "Finansijski pregled", de: "Finanzieller Überblick" } as L,
        body: {
          bs: "Gdje nastaje trošak, koliko zaista košta svaka usluga i koje cijene ne pokrivaju rad. Radimo s brojevima koje već imate, ne uvodimo novi sistem prije nego što se zna šta nedostaje.",
          de: "Wo Kosten entstehen, was jede Leistung wirklich kostet und welche Preise die Arbeit nicht decken. Wir arbeiten mit den Zahlen, die Sie bereits haben — ein neues System kommt erst, wenn klar ist, was fehlt.",
        } as L,
        meeting: {
          bs: [
            "Kako danas pratite prihode i troškove",
            "Koje usluge donose najviše posla, a koje najviše zarade",
            "Šta bi se promijenilo kada biste imali mjesečni pregled",
          ],
          de: [
            "Wie Sie heute Einnahmen und Ausgaben verfolgen",
            "Welche Leistungen am meisten Arbeit und welche am meisten Ertrag bringen",
            "Was sich ändern würde, wenn Sie eine monatliche Übersicht hätten",
          ],
        } as L<string[]>,
      },
      {
        id: "organisation" as AdvisoryArea,
        name: { bs: "Organizacija i odgovornosti", de: "Organisation und Verantwortung" } as L,
        body: {
          bs: "Ko odlučuje, ko izvršava i gdje se posao zaustavlja. Cilj nije organigram nego to da firma može raditi i kada vlasnik nije prisutan.",
          de: "Wer entscheidet, wer ausführt und wo die Arbeit stockt. Ziel ist kein Organigramm, sondern dass das Unternehmen auch ohne die Inhaberin oder den Inhaber arbeiten kann.",
        } as L,
        meeting: {
          bs: [
            "Koje odluke danas moraju proći kroz vas",
            "Gdje se posao najčešće zaustavlja i čeka",
            "Šta bi tim mogao preuzeti u sljedeća tri mjeseca",
          ],
          de: [
            "Welche Entscheidungen heute zwingend über Sie laufen",
            "Wo die Arbeit am häufigsten stockt und wartet",
            "Was das Team in den nächsten drei Monaten übernehmen könnte",
          ],
        } as L<string[]>,
      },
      {
        id: "growth" as AdvisoryArea,
        name: { bs: "Ponuda i novi klijenti", de: "Angebot und neue Kundschaft" } as L,
        body: {
          bs: "Šta prodajete, kome i zašto bi to neko odabrao umjesto konkurencije. Prije nego što se ulaže u oglašavanje, provjeravamo da li je ponuda razumljiva.",
          de: "Was Sie verkaufen, an wen und warum man sich dafür statt für den Wettbewerb entscheidet. Bevor in Werbung investiert wird, prüfen wir, ob das Angebot verständlich ist.",
        } as L,
        meeting: {
          bs: [
            "Kako danas objašnjavate svoju uslugu novom klijentu",
            "Odakle dolaze klijenti koje ste dobili ove godine",
            "Koja bi se ponuda mogla ponoviti, a koja je bila jednokratna",
          ],
          de: [
            "Wie Sie Ihre Leistung heute einer neuen Kundschaft erklären",
            "Woher die Kunden kommen, die Sie dieses Jahr gewonnen haben",
            "Welches Angebot sich wiederholen ließe und welches einmalig war",
          ],
        } as L<string[]>,
      },
    ],
  },
  orientation: {
    eyebrow: { bs: "ORIJENTACIJA", de: "ORIENTIERUNG" } as L,
    title: { bs: "Gdje je vaš fokus?", de: "Wo liegt Ihr Fokus?" } as L,
    lead: {
      bs: "Tri pitanja, bez ocjenjivanja i bez procjene vrijednosti firme. Rezultat je jedno područje rada i sadržaj prvog sastanka.",
      de: "Drei Fragen, ohne Bewertung und ohne Einschätzung des Unternehmenswerts. Das Ergebnis ist ein Arbeitsfeld und der Inhalt des ersten Gesprächs.",
    } as L,
    resultLabel: { bs: "Predloženo područje", de: "Vorgeschlagenes Arbeitsfeld" } as L,
    meetingLabel: { bs: "O čemu bismo razgovarali", de: "Worüber wir sprechen würden" } as L,
    emptyState: {
      bs: "Odgovorite na sva tri pitanja da biste vidjeli prijedlog.",
      de: "Beantworten Sie alle drei Fragen, um den Vorschlag zu sehen.",
    } as L,
    reset: { bs: "Počni ispočetka", de: "Von vorn beginnen" } as L,
    disclaimer: {
      bs: "Ovo je orijentacija, ne analiza. Prijedlog se zasniva samo na vaša tri odgovora.",
      de: "Das ist eine Orientierung, keine Analyse. Der Vorschlag beruht ausschließlich auf Ihren drei Antworten.",
    } as L,
    questions: [
      {
        id: "q1",
        text: { bs: "Šta vas trenutno najviše zaokuplja?", de: "Was beschäftigt Sie derzeit am meisten?" } as L,
        options: [
          { area: "finance" as AdvisoryArea, text: { bs: "Promet raste, ali ne vidim zaradu.", de: "Der Umsatz wächst, aber ich sehe keinen Gewinn." } as L },
          { area: "organisation" as AdvisoryArea, text: { bs: "Sve se zaustavlja dok ja ne odlučim.", de: "Alles stockt, bis ich entscheide." } as L },
          { area: "growth" as AdvisoryArea, text: { bs: "Teže dolazimo do novih klijenata.", de: "Wir gewinnen schwerer neue Kundschaft." } as L },
        ],
      },
      {
        id: "q2",
        text: { bs: "Šta bi vam najviše pomoglo za tri mjeseca?", de: "Was würde Ihnen in drei Monaten am meisten helfen?" } as L,
        options: [
          { area: "finance" as AdvisoryArea, text: { bs: "Jasan mjesečni pregled troškova.", de: "Eine klare monatliche Kostenübersicht." } as L },
          { area: "organisation" as AdvisoryArea, text: { bs: "Podijeljene odgovornosti u timu.", de: "Verteilte Verantwortung im Team." } as L },
          { area: "growth" as AdvisoryArea, text: { bs: "Ponuda koju klijent odmah razumije.", de: "Ein Angebot, das sofort verstanden wird." } as L },
        ],
      },
      {
        id: "q3",
        text: { bs: "Šta vam najčešće oduzima vrijeme?", de: "Was kostet Sie am häufigsten Zeit?" } as L,
        options: [
          { area: "finance" as AdvisoryArea, text: { bs: "Računi, ponude i naplata.", de: "Rechnungen, Angebote und Zahlungseingänge." } as L },
          { area: "organisation" as AdvisoryArea, text: { bs: "Dogovaranje unutar tima.", de: "Abstimmung innerhalb des Teams." } as L },
          { area: "growth" as AdvisoryArea, text: { bs: "Objašnjavanje usluge novim klijentima.", de: "Die Leistung neuer Kundschaft zu erklären." } as L },
        ],
      },
    ],
  },
  cooperation: {
    title: { bs: "Kako izgleda saradnja", de: "So läuft die Zusammenarbeit" } as L,
    steps: [
      {
        title: { bs: "Razgovor od sat vremena", de: "Ein Gespräch von einer Stunde" } as L,
        body: { bs: "Bez pripreme i bez dokumenata. Slušamo i postavljamo pitanja.", de: "Ohne Vorbereitung und ohne Unterlagen. Wir hören zu und stellen Fragen." } as L,
      },
      {
        title: { bs: "Pisani sažetak", de: "Eine schriftliche Zusammenfassung" } as L,
        body: { bs: "Nakon razgovora dobijate sažetak onoga što smo čuli i prijedlog obima rada.", de: "Nach dem Gespräch erhalten Sie eine Zusammenfassung des Gehörten und einen Vorschlag zum Umfang." } as L,
      },
      {
        title: { bs: "Omeđen angažman", de: "Ein abgegrenztes Mandat" } as L,
        body: { bs: "Radimo na jednom području, s jasnim početkom i krajem. Bez otvorenih ugovora.", de: "Wir arbeiten an einem Feld, mit klarem Anfang und Ende. Ohne offene Verträge." } as L,
      },
    ],
  },
  contact: {
    title: { bs: "Dogovorite razgovor", de: "Gespräch vereinbaren" } as L,
    lead: {
      bs: "Napišite u nekoliko rečenica čime se firma bavi i šta vas trenutno najviše zaokuplja.",
      de: "Beschreiben Sie in wenigen Sätzen, was Ihr Unternehmen macht und was Sie derzeit am meisten beschäftigt.",
    } as L,
    cta: { bs: "Dogovorite razgovor", de: "Gespräch vereinbaren" } as L,
  },
} as const;
