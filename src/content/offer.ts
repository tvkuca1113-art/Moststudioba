/** One source for the public starting price and its deliberately limited scope. */
export const starterOffer = {
  amount: 400,
  currency: "BAM",
  bs: {
    eyebrow: "JASAN POČETAK",
    title: "Prvi web. Jasno dogovoren obim.",
    price: "400 KM",
    from: "od",
    billing: "Jednokratna izrada · jednostranična prezentacija",
    intro: "Za firmu kojoj treba pregled usluga, nekoliko fotografija i jednostavan put do kontakta.",
    scope: "1 stranica · do 5 sekcija · 1 jezik",
    includedTitle: "Šta ulazi u početni obim",
    included: [
      "Raspored prilagođen vašem brendu, mobitelu i računaru.",
      "Uređivanje dostavljenih, gotovih tekstova, fotografija i logotipa u dogovorene sekcije.",
      "Kontakt linkovi, naslovi i metaopisi, sitemap i provjera da je indeksiranje dopušteno.",
      "Jedan objedinjeni krug korekcija, provjera linkova i objava na vašoj domeni.",
    ],
    separateTitle: "Šta se posebno dogovara",
    separate: "Domena, hosting i plaćene licence nisu uključeni u 400 KM. Pisanje tekstova, izrada fotografija, dodatne stranice i jezici, obrasci, CMS, rezervacije i webshop zahtijevaju zasebnu ponudu. Održavanje i kontinuirani SEO nisu uključeni.",
    reassurance: "Prije početka dobijate pisanu ponudu s ukupnom cijenom, vanjskim troškovima, rokom i isporukom. Dodatni rad dogovaramo prije nego što ga započnemo.",
    cta: "Provjerimo šta vam treba",
    details: "Kako se formira cijena",
    larger: "Trebate više od prezentacije?",
    largerBody: "Za poslovnu stranicu s više sadržaja, webshop ili integracije prvo definišemo korisnički tok i funkcije, pa pripremimo procjenu.",
    hero: "Jednostranična prezentacija od 400 KM. Pogledajte šta uključuje.",
  },
  de: {
    eyebrow: "EIN KLARER EINSTIEG",
    title: "Die erste Website. Ein klarer Umfang.",
    price: "400 KM (BAM)",
    from: "ab",
    billing: "Einmalige Erstellung · One-Page-Website",
    intro: "Für Unternehmen, die ihre Leistungen, einige Bilder und einen einfachen Kontaktweg präsentieren möchten.",
    scope: "1 Seite · bis zu 5 Abschnitte · 1 Sprache",
    includedTitle: "Das umfasst der Einstieg",
    included: [
      "Ein Layout passend zu Ihrer Marke, für Smartphone und Desktop.",
      "Einbindung Ihrer fertigen Texte, Bilder und Ihres Logos in die vereinbarten Abschnitte.",
      "Kontaktlinks, Überschriften und Metabeschreibungen, Sitemap und Prüfung der Indexierbarkeit.",
      "Eine gebündelte Korrekturrunde, Linkprüfung und Veröffentlichung auf Ihrer Domain.",
    ],
    separateTitle: "Was separat vereinbart wird",
    separate: "Domain, Hosting und kostenpflichtige Lizenzen sind in den 400 KM nicht enthalten. Texterstellung, neue Bilder, weitere Seiten und Sprachen, Formulare, CMS, Buchungen und Onlineshops werden separat angeboten. Wartung und laufende SEO sind nicht enthalten.",
    reassurance: "Vor dem Start erhalten Sie ein schriftliches Angebot mit Gesamtpreis, externen Kosten, Termin und Leistungen. Zusätzliche Arbeiten stimmen wir vorab mit Ihnen ab.",
    cta: "Bedarf gemeinsam klären",
    details: "Wie der Preis entsteht",
    larger: "Mehr als eine Präsentation?",
    largerBody: "Für umfangreichere Unternehmenswebsites, Onlineshops oder Schnittstellen klären wir zuerst Nutzerwege und Funktionen. Darauf basiert das Angebot.",
    hero: "One-Page-Website ab 400 KM (BAM). Leistungen ansehen.",
  },
} as const;

/** Small client-side labels; the complete offer stays server-rendered. */
export const inquiryFields = {
  bs: {
    budget: "Okvirni budžet",
    budgetPlaceholder: "Iznos i valuta, ako već znate",
    timing: "Željeni termin objave",
    timingPlaceholder: "Datum ili okvir, ako ga imate",
  },
  de: {
    budget: "Ungefährer Budgetrahmen",
    budgetPlaceholder: "Betrag und Währung, falls bekannt",
    timing: "Gewünschter Veröffentlichungstermin",
    timingPlaceholder: "Datum oder Zeitraum, falls bekannt",
  },
} as const;
