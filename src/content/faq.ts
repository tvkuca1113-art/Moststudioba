import type { L } from "@/lib/i18n/localized";
import { starterOffer } from "./offer";

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
      bs: "Koliko košta izrada i šta ulazi u početnu cijenu?",
      de: "Was kostet die Website und was ist im Einstieg enthalten?",
    },
    answer: {
      bs: [
        `Jednostranična prezentacija počinje od ${starterOffer.bs.price}: do pet sekcija, jedan jezik, vaši gotovi tekstovi i fotografije, mobilni prikaz, kontakt linkovi, osnovna SEO priprema i jedan krug korekcija.`,
        starterOffer.bs.separate,
        "Više sadržaja, jezika i funkcija znači drugačiji obim. Ukupnu cijenu, uključene stavke i rok potvrđujemo u pisanoj ponudi prije početka.",
      ],
      de: [
        `Eine One-Page-Website beginnt ab ${starterOffer.de.price}: bis zu fünf Abschnitte, eine Sprache, Ihre fertigen Texte und Bilder, mobiles Layout, Kontaktlinks, SEO-Grundlagen und eine Korrekturrunde.`,
        starterOffer.de.separate,
        "Weitere Inhalte, Sprachen und Funktionen verändern den Umfang. Gesamtpreis, Leistungen und Termin bestätigen wir vor dem Start im schriftlichen Angebot.",
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
    id: "after-launch",
    question: { bs: "Šta dobijamo pri predaji i šta slijedi nakon objave?", de: "Was erhalten wir bei der Übergabe und nach dem Start?" },
    answer: {
      bs: ["Prije početka u ponudi definišemo domenu, hosting, pristupe, datoteke i eventualni sistem za uređivanje. Pri predaji prolazimo kontakt, linkove i dogovorene funkcije te objašnjavamo kako tražiti buduće izmjene.", "Domena i hosting imaju svoje troškove. Održavanje, nove funkcije i kontinuirani SEO dogovaraju se zasebno; nisu automatski uključeni u jednokratnu izradu."],
      de: ["Vor dem Start halten wir Domain, Hosting, Zugänge, Dateien und ein mögliches Redaktionssystem im Angebot fest. Bei der Übergabe prüfen wir Kontakt, Links und vereinbarte Funktionen und erklären, wie spätere Änderungen beauftragt werden.", "Domain und Hosting verursachen eigene Kosten. Wartung, neue Funktionen und laufende SEO werden separat vereinbart; sie sind nicht automatisch im einmaligen Erstellungspreis enthalten."],
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
