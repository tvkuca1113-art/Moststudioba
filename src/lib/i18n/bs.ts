/**
 * Bosnian UI copy. This object is the source of truth for the shape of the
 * dictionary — `de.ts` is typed against it, so a missing German string fails
 * the type check instead of shipping a half-translated page.
 */
export const bs = {
  common: {
    skipToContent: "Pređi na sadržaj",
    demoBadge: "Demo koncept",
    demoNotice: "Demo koncept — prikaz dizajna i funkcionalnosti.",
    openMenu: "Otvori meni",
    closeMenu: "Zatvori meni",
    backToTop: "Na vrh",
    language: "Jezik",
    switchTo: "Pogledajte ovu stranicu na njemačkom",
    loading: "Učitavanje…",
    optional: "opcionalno",
  },

  nav: {
    projects: "Projekti",
    services: "Usluge",
    process: "Kako radimo",
    studio: "Studio",
    contact: "Kontakt",
    cta: "Razgovarajmo",
    ariaLabel: "Glavna navigacija",
  },

  hero: {
    eyebrow: "WEB DIZAJN I IZRADA · BiH + NJEMAČKA",
    titleLine1: "Web stranice",
    titleLine2: "s vašim potpisom.",
    lead: "Dizajniramo i izrađujemo web stranice koje jasno predstavljaju vaš posao i olakšavaju sljedeći korak — da vam se klijent javi.",
    ctaPrimary: "Razgovarajmo o vašem projektu",
    ctaSecondary: "Pogledajte demo radove",
    support: "Dizajn · Izrada · Redizajn",
    figureLabel: "Kompozicija sastavljena od stvarnih dijelova web stranice: navigacija, naslov, kartice usluga i kontakt.",
    scrollHint: "Nastavite niže",
  },

  heroFigure: {
    navWork: "Projekti",
    navServices: "Usluge",
    navContact: "Kontakt",
    title: "Vaš posao. Jasno online.",
    body: "Moderne web stranice za firme u BiH i Njemačkoj.",
    cta: "Razgovarajmo",
    cardOne: "Dizajn",
    cardTwo: "Izrada",
    cardThree: "Redizajn",
    mobileTitle: "Jasno. Jednostavno.",
    mobileBody: "Web rješenja koja pokreću vaš biznis.",
    mobileCta: "Započnite",
    formTitle: "Pripremite upit",
    formField: "Čime se bavite?",
    formCta: "Kopiraj poruku",
    pierLabel: "Stub",
    spanLabel: "Raspon",
  },

  showcase: {
    eyebrow: "ISPROBAJTE",
    title: "Pogledajte šta možemo napraviti.",
    lead: "Odaberite vrstu poslovanja i pregledajte kako izgleda rješenje za nju. Svaki koncept ima svoj raspored, tipografiju i ponudu — nije ista stranica u tri boje.",
    conceptLabel: "Vrsta poslovanja",
    deviceLabel: "Prikaz",
    device: {
      desktop: "Računar",
      mobile: "Mobitel",
    },
    reasonsToggle: "Zašto je ovako dizajnirano?",
    reasonsToggleHide: "Sakrij objašnjenja",
    reasonsHeading: "Tri odluke u ovom primjeru",
    annotationLabel: "Objašnjenje",
    reasonsHint: "Oznake u primjeru pokazuju na dijelove na koje se objašnjenja odnose.",
    openDemo: "Isprobajte demo",
    openCase: "Pogledajte prezentaciju",
    previewLabel: "Živi prikaz koncepta: {name}",
    liveNote: "Ovo nije slika — to je stvarni interfejs koji se ponovo raspoređuje kada promijenite prikaz.",
  },

  projects: {
    eyebrow: "DEMO RADOVI",
    title: "Različiti poslovi. Promišljena rješenja.",
    lead: "Tri koncepta koja smo osmislili i izradili da pokažemo kako razmišljamo o strukturi, sadržaju i sljedećem koraku posjetioca.",
    all: "Svi demo projekti",
    cardCta: "Pogledajte prezentaciju",
    overviewTitle: "Demo projekti",
    overviewLead: "Ovo su naši demo koncepti. Nisu plaćeni klijentski projekti — osmislili smo ih da pokažemo pristup, dizajn i tehničku izradu na konkretnim primjerima.",
    forBusiness: "Za koju vrstu poslovanja",
    theChallenge: "Šta koncept rješava",
    decisions: "Ključne dizajnerske odluke",
    implemented: "Šta je funkcionalno implementirano",
    views: "Prikaz na računaru i mobitelu",
    viewDesktop: "Prikaz na računaru",
    viewMobile: "Prikaz na mobitelu",
    tryDemo: "Isprobajte demo",
    backToProjects: "Nazad na demo projekte",
    nextProject: "Sljedeći demo koncept",
    goalPrefix: "Cilj ovog koncepta je",
    showPrefix: "U ovom primjeru prikazujemo",
  },

  services: {
    eyebrow: "USLUGE",
    title: "Od prve ideje do objave.",
    lead: "Tri cjeline koje se nadovezuju jedna na drugu. Možete uzeti sve ili samo dio — u razgovoru dogovorimo obim.",
    includes: "Šta obuhvata",
    outcome: "Šta vi dobijate",
    cta: "Razgovarajmo o vašem projektu",
    pageLead: "Radimo dizajn, izradu i redizajn web stranica. Ispod je detaljno šta svaka usluga obuhvata i šta konkretno dobijate.",
    scopeNote: "Obim, cijenu i rok dogovaramo nakon razgovora o vašem projektu. Ne nudimo pakete s unaprijed određenim cijenama jer se potrebe razlikuju.",
    notOffered: "Šta ne radimo",
    notOfferedLead: "Bolje je da odmah znate. Fokusirani smo na dizajn i izradu stranica i ne preuzimamo poslove koje ne radimo redovno:",
    notOfferedItems: [
      "Vođenje društvenih mreža i izrada objava.",
      "Upravljanje plaćenim oglasima.",
      "Garantovane SEO pozicije ili obećanja o mjestu u pretrazi.",
    ],
  },

  process: {
    eyebrow: "PROCES",
    title: "Znate šta slijedi.",
    lead: "Četiri koraka, bez nejasnoća oko toga ko šta radi i kada.",
    youGive: "Šta vi dajete",
    youGet: "Šta dobijate na pregled",
    timingNote: "Rok zavisi od obima projekta i brzine povratnih informacija. Konkretan termin dogovaramo tek kada znamo šta stranica treba sadržavati — ne obećavamo rokove prije toga.",
  },

  studio: {
    eyebrow: "STUDIO",
    title: "Dizajn i izrada na jednom mjestu.",
    paragraph1: "MOST Studio spaja dizajn i izradu web stranica u jednu cjelinu. Polazimo od vašeg posla: šta nudite, kome se obraćate i šta posjetilac treba uraditi nakon što vas upozna.",
    paragraph2: "Radimo s firmama iz Bosne i Hercegovine i Njemačke, uz jasnu komunikaciju i pažljivo dogovoren obim projekta.",
    marketsLabel: "Tržišta",
    proofTitle: "Kako to izgleda u praksi",
    proof: [
      {
        title: "Odluke koje možemo objasniti",
        body: "Za svaki koncept napisali smo zašto je nešto postavljeno tamo gdje jeste. Isto radimo i na vašem projektu.",
      },
      {
        title: "Radovi koji stvarno rade",
        body: "Demo koncepti na ovoj stranici nisu slike. Možete ih otvoriti, kliknuti i pregledati na mobitelu.",
      },
      {
        title: "Pregledan proces",
        body: "Znate šta se dešava u kojem koraku, šta trebate pripremiti i šta dobijate na pregled.",
      },
      {
        title: "Briga o detaljima",
        body: "Kontrast teksta, veličina dodirnih površina, ponašanje na tastaturi i brzina učitavanja nisu naknadna misao.",
      },
    ],
  },

  faq: {
    eyebrow: "ČESTA PITANJA",
    title: "Pitanja koja obično dobijemo.",
    lead: "Ako nešto nije jasno, pitajte nas direktno na Instagramu.",
  },

  contact: {
    eyebrow: "KONTAKT",
    titleLine1: "Recite nam čime se bavite.",
    titleLine2: "Razgovarajmo o vašem webu.",
    lead: "Imate postojeću stranicu ili tek počinjete? Javite nam šta želite predstaviti i kome se obraćate.",
    primaryLabel: "Pišite nam na Instagramu",
    primaryHint: "Instagram je naš glavni kanal za kontakt.",
    handle: "@moststudioba",
    pageTitle: "Kontakt",
    pageLead: "Najlakše nam je javiti se porukom na Instagramu. Ispod možete pripremiti poruku u nekoliko klikova — sadrži sve što nam treba za prvi odgovor.",
    responseNote: "Odgovaramo na poruke na bosanskom i njemačkom jeziku.",
  },

  brief: {
    eyebrow: "PRIPREMITE UPIT",
    title: "Pripremite poruku za nekoliko sekundi.",
    lead: "Odgovorite na tri pitanja. Sastavićemo poruku koju možete pregledati, urediti i poslati našem profilu.",
    q1Label: "Čime se bavite?",
    q1Placeholder: "npr. stomatološka ordinacija u Sarajevu",
    q1Help: "Jedna rečenica je dovoljna.",
    q2Label: "Trebate novu stranicu ili redizajn?",
    q2Options: {
      new: "Nova stranica",
      redesign: "Redizajn postojeće",
      unsure: "Još nisam siguran/na",
    },
    q3Label: "Šta želite da posjetilac najlakše uradi?",
    q3Options: {
      contact: "Da nam se javi",
      services: "Da pregleda usluge",
      appointment: "Da zakaže termin",
      work: "Da vidi naše radove",
    },
    urlLabel: "URL postojeće stranice",
    urlPlaceholder: "www.vasastranica.ba",
    urlHelp: "Opcionalno. Ako nemate stranicu, preskočite ovo polje.",
    messageLabel: "Vaša poruka (možete je urediti)",
    messageHint: "Pregledajte tekst i promijenite ga kako vam odgovara.",
    copy: "Kopiraj poruku",
    copied: "Poruka je kopirana",
    copyFailed: "Kopiranje nije uspjelo. Označite tekst u polju iznad i kopirajte ga ručno.",
    selectAll: "Označi cijeli tekst",
    openInstagram: "Otvori Instagram",
    sendNote: "Kopirajte poruku i pošaljite je našem profilu. Poruka se ne šalje automatski s ove stranice.",
    notSentWarning: "Kopiranje poruke nije isto što i poslan upit — poruku treba poslati na Instagramu.",
    errors: {
      q1: "Upišite čime se bavite.",
      q2: "Odaberite jednu opciju.",
      q3: "Odaberite šta je najvažnije.",
      url: "Provjerite adresu — očekujemo nešto poput www.primjer.ba",
    },
    reset: "Počni ispočetka",
    messageGreeting: "Pozdrav MOST Studio,",
    messageBusiness: "Bavimo se: {business}.",
    messageNeed: "Treba nam: {need}.",
    messageUrl: "Postojeća stranica: {url}",
    messageGoal: "Najvažnije nam je da posjetilac: {goal}.",
    messageClosing: "Možete li nam reći kako izgleda sljedeći korak?",
    needText: {
      new: "nova web stranica",
      redesign: "redizajn postojeće stranice",
      unsure: "savjet da li nam treba nova stranica ili redizajn",
    },
    goalText: {
      contact: "nam se javi",
      services: "pregleda naše usluge",
      appointment: "zakaže termin",
      work: "vidi naše radove",
    },
  },

  footer: {
    blurb: "Web dizajn, izrada i redizajn web stranica. Radimo s firmama u Bosni i Hercegovini i Njemačkoj.",
    navTitle: "Stranice",
    contactTitle: "Kontakt",
    demoTitle: "Demo koncepti",
    disclaimer: "Projekti prikazani na ovoj stranici su demo koncepti koje smo osmislili i izradili sami. Nisu plaćeni klijentski radovi i ne predstavljaju stvarne firme.",
    rights: "© {year} MOST Studio",
    credits: "Fotografije: Unsplash",
  },

  demoChrome: {
    bannerTitle: "Demo koncept",
    bannerBody: "Ovo je primjer koji je izradio MOST Studio. Firma, podaci i sadržaj su izmišljeni radi prikaza dizajna i funkcionalnosti.",
    backToCase: "Pogledajte prezentaciju koncepta",
    backToMost: "MOST Studio",
    formNote: "Demonstracijski kontakt — upiti se ne šalju.",
    formNoticeTitle: "Ovo je prikaz, ne stvarni obrazac.",
    formNoticeBody: "U stvarnom projektu ovdje ide način kontakta koji dogovorimo s klijentom.",
  },

  meta: {
    home: {
      title: "MOST Studio | Web dizajn i izrada web stranica",
      description:
        "MOST Studio dizajnira i izrađuje web stranice za firme u Bosni i Hercegovini i Njemačkoj. Pogledajte demo koncepte, isprobajte ih i javite nam se na Instagramu.",
    },
    projects: {
      title: "Demo projekti | MOST Studio",
      description:
        "Tri demo koncepta web stranica koje smo osmislili i izradili: stomatološka ordinacija, stolarija i poslovno savjetovanje. Svaki se može isprobati.",
    },
    services: {
      title: "Usluge: web dizajn, izrada i redizajn | MOST Studio",
      description:
        "Šta obuhvata web dizajn, izrada web stranice i redizajn postojeće stranice — korak po korak, bez tehničkog žargona.",
    },
    contact: {
      title: "Kontakt | MOST Studio",
      description:
        "Pripremite upit u nekoliko klikova i pošaljite nam ga na Instagram. Razgovaramo o vašem projektu na bosanskom ili njemačkom.",
    },
    demo: {
      titleSuffix: "Demo koncept | MOST Studio",
      descriptionPrefix: "Funkcionalni demo koncept koji je izradio MOST Studio.",
    },
    notFound: {
      title: "Stranica nije pronađena | MOST Studio",
      description: "Tražena stranica ne postoji.",
    },
  },

  notFound: {
    title: "Ova stranica ne postoji.",
    lead: "Link je možda zastario ili je adresa pogrešno upisana.",
    home: "Nazad na početnu",
    projects: "Pogledajte demo projekte",
  },
};

/**
 * Deliberately inferred without `as const`: the German dictionary must match
 * the *shape*, not the literal Bosnian strings.
 */
export type Dictionary = typeof bs;
