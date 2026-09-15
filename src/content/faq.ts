import type { L } from "@/lib/i18n/localized";

export type FaqItem = {
  id: string;
  question: L;
  answer: L<string[]>;
};

export const faqItems: FaqItem[] = [
  {
    id: "redesign",
    question: {
      bs: "Možete li redizajnirati postojeću stranicu?",
      de: "Können Sie eine bestehende Website neu gestalten?",
    },
    answer: {
      bs: [
        "Da. Prvo pregledamo šta na postojećoj stranici funkcioniše, koji sadržaj vrijedi zadržati i gdje posjetioci zapinju.",
        "Prije objave napravimo plan za važne URL-ove, da linkovi koje ste do sada dijelili i dalje vode na pravo mjesto.",
      ],
      de: [
        "Ja. Zuerst sehen wir uns an, was auf der bestehenden Seite funktioniert, welche Inhalte erhalten bleiben sollten und wo Besucher hängen bleiben.",
        "Vor der Veröffentlichung erstellen wir einen Plan für die wichtigen URLs, damit bisher geteilte Links weiterhin am richtigen Ort landen.",
      ],
    },
  },
  {
    id: "mobile",
    question: {
      bs: "Da li će stranica raditi na mobitelu?",
      de: "Funktioniert die Website auf dem Handy?",
    },
    answer: {
      bs: [
        "Da, i to nije dodatna opcija nego dio izrade. Mobilni raspored planiramo zajedno s dizajnom, a ne naknadno.",
        "Testiramo na uobičajenim širinama ekrana — od malih telefona do velikih monitora — i provjeravamo veličinu teksta i dugmadi.",
      ],
      de: [
        "Ja, und das ist keine Zusatzoption, sondern Teil der Umsetzung. Das mobile Layout planen wir gemeinsam mit dem Design, nicht nachträglich.",
        "Wir testen auf den üblichen Bildschirmbreiten — vom kleinen Telefon bis zum großen Monitor — und prüfen Text- und Buttongrößen.",
      ],
    },
  },
  {
    id: "languages",
    question: {
      bs: "Može li stranica biti na bosanskom i njemačkom?",
      de: "Kann die Website auf Bosnisch und Deutsch sein?",
    },
    answer: {
      bs: [
        "Može. Ova stranica je upravo takav primjer: svaka stranica ima svoju adresu na oba jezika, a prebacivanje jezika vas zadržava na istoj stranici.",
        "Dvojezičnost utiče na obim projekta, jer svaki tekst treba postojati u obje verzije.",
      ],
      de: [
        "Ja. Diese Website ist genau so ein Beispiel: Jede Seite hat ihre eigene Adresse in beiden Sprachen, und der Sprachwechsel bleibt auf derselben Seite.",
        "Zweisprachigkeit wirkt sich auf den Projektumfang aus, weil jeder Text in beiden Fassungen vorliegen muss.",
      ],
    },
  },
  {
    id: "prepare",
    question: {
      bs: "Šta trebamo pripremiti za početak?",
      de: "Was sollten wir für den Start vorbereiten?",
    },
    answer: {
      bs: [
        "Kratak opis onoga čime se bavite, popis usluga i informaciju kome se obraćate.",
        "Ako imate logo, fotografije ili tekstove — pošaljite ih. Ako nemate, dogovorimo šta je stvarno potrebno prije nego što nešto kupujete ili naručujete.",
      ],
      de: [
        "Eine kurze Beschreibung Ihrer Tätigkeit, eine Liste der Leistungen und die Angabe, wen Sie ansprechen.",
        "Wenn Sie Logo, Fotos oder Texte haben, schicken Sie sie uns. Falls nicht, klären wir gemeinsam, was wirklich nötig ist, bevor Sie etwas kaufen oder beauftragen.",
      ],
    },
  },
  {
    id: "price",
    question: {
      bs: "Od čega zavisi cijena?",
      de: "Wovon hängt der Preis ab?",
    },
    answer: {
      bs: [
        "Od obima: koliko stranica i sekcija ima, koliko sadržaja treba oblikovati i da li je potreban rad na tekstovima i fotografijama.",
        "Od jezika: dvojezična stranica traži više posla od jednojezične.",
        "Od funkcionalnosti i integracija: jednostavan kontakt link nije isto što i obrazac, rezervacija termina ili povezivanje s postojećim sistemom.",
        "Cijenu dajemo tek kada znamo šta stranica treba sadržavati. Ne objavljujemo unaprijed određene pakete.",
      ],
      de: [
        "Vom Umfang: wie viele Seiten und Abschnitte es gibt, wie viel Inhalt zu gestalten ist und ob an Texten und Fotos gearbeitet werden muss.",
        "Von den Sprachen: eine zweisprachige Website bedeutet mehr Arbeit als eine einsprachige.",
        "Von Funktionen und Integrationen: ein einfacher Kontaktlink ist etwas anderes als ein Formular, eine Terminbuchung oder die Anbindung an ein bestehendes System.",
        "Einen Preis nennen wir erst, wenn feststeht, was die Website enthalten soll. Wir veröffentlichen keine vorgefertigten Pakete.",
      ],
    },
  },
  {
    id: "timeline",
    question: {
      bs: "Od čega zavisi rok izrade?",
      de: "Wovon hängt die Dauer ab?",
    },
    answer: {
      bs: [
        "Od istih stvari kao i cijena — obima, sadržaja, jezika i funkcionalnosti.",
        "Najčešći razlog kašnjenja nije izrada nego čekanje na tekstove, fotografije i povratne informacije. Zato u svakom koraku jasno pišemo šta nam treba od vas.",
        "Konkretan rok dogovaramo nakon što znamo obim. Ne obećavamo termin prije toga.",
      ],
      de: [
        "Von denselben Dingen wie der Preis — Umfang, Inhalt, Sprachen und Funktionen.",
        "Der häufigste Grund für Verzögerungen ist nicht die Umsetzung, sondern das Warten auf Texte, Fotos und Rückmeldungen. Deshalb schreiben wir in jedem Schritt klar, was wir von Ihnen brauchen.",
        "Einen konkreten Termin vereinbaren wir, sobald der Umfang feststeht. Vorher nennen wir keine Frist.",
      ],
    },
  },
  {
    id: "real-clients",
    question: {
      bs: "Jesu li prikazani projekti stvarni klijentski radovi?",
      de: "Sind die gezeigten Projekte echte Kundenarbeiten?",
    },
    answer: {
      bs: [
        "Ne. Trenutno prikazujemo demo koncepte koje smo sami osmislili i izradili. Firme, imena i podaci u njima su izmišljeni.",
        "Odlučili smo ih prikazati jer najbolje pokazuju kako radimo: možete ih otvoriti, kliknuti i provjeriti na mobitelu, umjesto da čitate obećanja.",
        "Kada budemo imali objavljene klijentske projekte, biće jasno označeni kao takvi.",
      ],
      de: [
        "Nein. Derzeit zeigen wir Demo-Konzepte, die wir selbst entworfen und gebaut haben. Unternehmen, Namen und Angaben darin sind erfunden.",
        "Wir zeigen sie, weil sie am besten belegen, wie wir arbeiten: Sie können sie öffnen, anklicken und auf dem Handy prüfen, statt Versprechen zu lesen.",
        "Sobald wir veröffentlichte Kundenprojekte haben, werden diese eindeutig als solche gekennzeichnet.",
      ],
    },
  },
];
