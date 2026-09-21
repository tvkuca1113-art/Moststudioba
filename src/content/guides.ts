import type { Locale } from "@/lib/i18n/config";
import type { ContentPage } from "./service-pages";

export const guideKeys = ["googleVisibility", "socialWebsite"] as const;
export type GuideKey = (typeof guideKeys)[number];

const googleSources = [
  { label: "Google: URL Inspection", href: "https://support.google.com/webmasters/answer/9012289?hl=en" },
  { label: "Google: Page indexing report", href: "https://support.google.com/webmasters/answer/7440203?hl=en" },
  { label: "Google: Performance report", href: "https://support.google.com/webmasters/answer/7576553?hl=en" },
  { label: "Google: Request a recrawl", href: "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl" },
  { label: "Google: SEO Starter Guide", href: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" },
  { label: "Google: AI features and your website", href: "https://developers.google.com/search/docs/appearance/ai-features" },
];

/** Two authored buyer guides, with full translations and no city-page generator. */
export const guides: Record<Locale, Record<GuideKey, ContentPage>> = {
  bs: {
    googleVisibility: {
      title: "Zašto se web stranica ne pojavljuje na Googleu? | MOST Studio",
      description: "Stranica je objavljena, a nema prikazivanja? Provjerite indeksiranje, canonical i upite u Search Consoleu. Koraci za vlasnike firmi, bez obećanja prvog mjesta.",
      eyebrow: "VODIČ · GOOGLE PRETRAGA",
      heading: "Zašto se vaša web stranica ne pojavljuje na Googleu?",
      lead: "Prvo utvrdite je li Google indeksirao konkretnu stranicu. Ako jeste, sljedeće pitanje je za koje je pretrage prikazuje. Objavljena stranica, indeksirana stranica i stranica koja dobija upite tri su različite stvari.",
      publishedOn: "2026-09-18",
      summaryTitle: "Tri provjere prije izmjena",
      summary: ["Indeksiranje tačne adrese", "Prikazivanja i upiti u Search Consoleu", "Sadržaj koji odgovara traženoj usluzi"],
      sections: [
        { id: "pregled-adrese", title: "1. Provjerite tačan URL", paragraphs: ["U Google Search Consoleu izaberite svoju domenu i otvorite Pregled URL-a. Unesite adresu početne, a zatim važne uslužne stranice. Zapišite status, datum posljednjeg crawlanja i canonical koji je Google odabrao. Zelena oznaka početne ne potvrđuje da su indeksirane sve podstranice.", "Ako stranica nije indeksirana, pogledajte navedeni razlog i testirajte URL uživo. Razlikujte namjerno isključen demo ili duplikat od poslovne stranice koja treba biti dostupna. Kod promjene domene provjerite i da stara adresa preusmjerava na odgovarajuću novu stranicu."] },
        { id: "status", title: "2. Pročitajte razlog, pa izaberite zahvat", paragraphs: ["Različiti statusi traže različit posao. Sljedeća tabela je početna provjera, a ne zaključak o vašoj stranici."], table: { caption: "Šta prvo provjeriti prema statusu", columns: ["Nalaz", "Sljedeća provjera"], rows: [
          ["Isključeno oznakom noindex", "Treba li ta stranica biti u pretrazi? Uklonite oznaku samo ako je javna i namijenjena indeksiranju."],
          ["Blokirano datotekom robots.txt", "Provjerite pravilo za tu putanju. Google treba moći dohvatiti sadržaj."],
          ["Alternativna stranica / druga canonical adresa", "Otvorite odabranu canonical adresu i provjerite odgovara li željenoj stranici."],
          ["Otkriveno ili pretraženo — trenutno nije indeksirano", "Pregledajte puni razlog u konzoli, dostupnost, sadržaj i interne linkove. Status sam ne dokazuje kaznu."],
          ["URL je na Googleu, ali nema prikazivanja", "Provjerite period izvještaja, filtere, upite i relevantnost sadržaja."],
        ] } },
        { id: "prikazivanja", title: "3. Mjerite stvarne pretrage", paragraphs: ["U izvještaju Uspješnost uključite prikazivanja, klikove i prosječnu poziciju. Provjerite odabranu domenu, period i aktivne filtere. Novi ili nepotpun izvještaj nije dovoljan za ocjenu dugoročnog učinka.", "Odvojeno pratite naziv firme i uslužne pretrage. Za stolariju to mogu biti ‘kuhinje po mjeri Mostar’ i pitanja o materijalu; za web studio izrada, redizajn ili webshop. To su primjeri namjere, ne izmjereni podaci o broju pretraga. Pratite i koje stranice dobijaju prikazivanja, ne samo prosjek cijelog sajta."] },
        { id: "upiti-po-stranici", title: "4. Od upita u Search Consoleu do korisne dorade", paragraphs: ["U izvještaju Uspješnost otvorite Stranice, odaberite tačan URL i zatim otvorite Upite. Tako vidite dostupne upite povezane s tom stranicom u odabranom periodu. Izvoz nije potpun popis svih pretraga: neki upiti izostaju radi privatnosti.", "Grupišite pitanja prema potrebi kupca. Ako stranica dobija prikazivanja za pitanja o cijeni, a ne objašnjava obim i troškove, dopunite taj odgovor. Za pitanje o online narudžbama povežite odgovarajuću uslugu webshopa. Dodajte samo sadržaj koji odgovara vašoj stvarnoj ponudi; ne ponavljajte svaku varijaciju ključne riječi.", "Zabilježite datum izmjene i uporedite jednake periode, uz iste filtere. Pratite klikove i stvarne upite kupaca zajedno s prikazivanjima. Kada ima malo podataka, sačekajte duži period prije zaključka o učinku."], links: [{ label: "Primjer jasnog odgovora o cijeni web stranice", route: { key: "pricing" } }, { label: "Izrada webshopa: katalog i tok narudžbe", route: { key: "webshop" } }] },
        { id: "sadrzaj", title: "5. Dajte kupcu razlog da izabere vašu stranicu", paragraphs: ["Uslužna stranica treba objasniti kome je namijenjena, šta uključuje, kako izgleda saradnja i koji je sljedeći korak. Naslov ‘Usluge’ uz jednu rečenicu i galeriju često ostavlja više pitanja nego odgovora.", "Dodajte stvarne primjere rada, odgovore na pitanja klijenata i link prema odgovarajućoj usluzi. Ako tek počinjete, jasno označeni demonstracijski rad može pokazati pristup. Ne predstavljajte ga kao klijentsku referencu i ne obećavajte rezultat koji niste izmjerili."], links: [{ label: "Kako planiramo izradu poslovne web stranice", route: { key: "website" } }, { label: "Pregled i redizajn postojeće stranice", route: { key: "redesign" } }] },
        { id: "nakon-ispravke", title: "6. Nakon popravke ostavite trag i pratite promjenu", paragraphs: ["Zabilježite šta je izmijenjeno i kada. Za nekoliko važnih URL-ova možete zatražiti indeksiranje; sitemap služi otkrivanju većeg skupa stranica. Ponovljeno slanje istog zahtjeva ne ubrzava postupak.", "Google navodi da promjene mogu trebati od nekoliko sati do više mjeseci. Zato ocjenjujte trend kroz više sedmica i stvarne upite kupaca. Za AI odgovore u Google pretrazi vrijede iste SEO osnove: koristan dostupan sadržaj, razumljivi linkovi i podaci koji odgovaraju onome što posjetilac vidi. Posebna ‘GEO’ oznaka ne garantuje preporuku."] },
      ],
      proof: { title: "Kako izgleda jasno objašnjena usluga", text: "U konceptu Meridijan posjetilac bira poslovni problem i dobija odgovarajući smjer. To je primjer oblikovanja korisničkog puta, a ne dokaz SEO pozicije ili stvarne prodaje.", project: "meridijan-savjetovanje" },
      faq: [
        { question: "Znači li 0 prikazivanja da je sajt pokvaren?", answer: "Ne nužno. Treba provjeriti indeksiranje pojedinačnih stranica, period i filtere izvještaja. Ako je sve dostupno, pregled se nastavlja kroz sadržaj, relevantnost za upite i razvoj reputacije." },
        { question: "Treba li svaki dan tražiti indeksiranje?", answer: "Ne. Pošaljite važan URL nakon stvarne izmjene i pratite stanje. Učestalo ponavljanje zahtjeva nije prečica do bolje pozicije." },
        { question: "Možete li pregledati moju stranicu?", answer: "Pošaljite javnu adresu i opišite šta vas brine. Ako imate Search Console izvještaj, možete dostaviti relevantan snimak ili izvoz bez lozinki i nepotrebnih ličnih podataka." },
      ],
      sources: googleSources,
    },
    socialWebsite: {
      title: "Web stranica ili Instagram za firmu u BiH? | MOST Studio",
      description: "Kada je dovoljan Instagram, a kada firmi treba web stranica ili webshop? Uporedite zadatke, primjere i najmanji koristan početak za svoj posao.",
      eyebrow: "VODIČ · PLANIRANJE WEBA",
      heading: "Imate Instagram. Treba li vam i web stranica?",
      lead: "Ako kupci stalno pitaju šta nudite, gdje mogu vidjeti radove ili kako naručiti, web može okupiti odgovore na jednom mjestu. Instagram može ostati glavni kanal za poruke. Odluka zavisi od zadatka koji danas otežava prodaju.",
      publishedOn: "2026-09-18",
      summaryTitle: "Krenite od pitanja kupca",
      summary: ["Šta nudite i kome?", "Šta kupac treba znati prije poruke?", "Treba li upit ili stvarna online kupovina?"],
      sections: [
        { id: "uloge", title: "Različiti kanali, povezan put do upita", paragraphs: ["Društveni profil je koristan za novosti, svakodnevne radove i razgovor. Web stranica daje pregled koji posjetilac može otvoriti direktno: usluge, primjere, uslove saradnje i kontakt. Ne mora zamijeniti način na koji već komunicirate.", "Primjer toka: objava pokaže kuhinju, link otvori galeriju izvedbi i materijala, a dugme vodi na Instagram za dogovor. Za trgovinu s mnogo veličina i varijanti zadatak može biti drugačiji: izbor proizvoda i narudžba kroz webshop."], table: { caption: "Koji problem želite riješiti?", columns: ["Situacija", "Razuman početak"], rows: [
          ["Ponavljate iste odgovore u porukama", "Jedna jasna stranica s ponudom, čestim pitanjima i društvenim kontaktom."],
          ["Imate nekoliko različitih usluga", "Zasebne uslužne stranice s primjerima i jasnim sljedećim korakom."],
          ["Kupci moraju birati dimenzije ili materijal", "Galerija, a konfigurator kada izbor donosi korisne podatke za ponudu."],
          ["Narudžbe i zalihe postaju nepregledne", "Webshop uz dogovoren proces obrade, dostave i stvarne naplate."],
        ] } },
        { id: "najmanji-pocetak", title: "Šta treba prva poslovna stranica", paragraphs: ["Za početak pripremite opis ponude običnim jezikom, kome je namijenjena, područje u kojem zaista radite, vlastite fotografije i potvrđen kontakt. Dodajte pitanja koja vam kupci već postavljaju: rok, način dogovora, šta utiče na cijenu i šta trebaju poslati.", "Ne mora svaka funkcija biti spremna prvog dana. Ako je glavni cilj upit za namještaj, pregled radova i jasan zahtjev mogu biti važniji od složenog sistema prijave. Ako trebate naplatu i praćenje narudžbi, obična prezentacijska stranica neće ispuniti taj zadatak."], links: [{ label: "Obim izrade web stranice", route: { key: "website" } }, { label: "Šta obuhvata izrada webshopa", route: { key: "webshop" } }] },
        { id: "provjerite-primjere", title: "Tri stvari koje možete isprobati prije odluke", paragraphs: ["Naši primjeri su demonstracije izrade, bez stvarnih narudžbi i rezervacija. Koristite ih kao pitanja za vlastiti projekt."], points: ["Hrast: promijenite namještaj i završnu obradu. Provjerite pomaže li vam pregled da opišete željeni proizvod.", "Lipa: krenite od potrebe, odaberite uslugu i probni termin. Razmislite treba li vašem poslu izbor termina ili je poruka dovoljna.", "Webshop: pronađite proizvod, izaberite veličinu i promijenite količinu. Provjerite jesu li artikli i ukupan iznos jasni prije probne narudžbe."], links: [{ label: "Koncept stolarije Hrast", route: { key: "project", slug: "stolarija-hrast" } }, { label: "Koncept ordinacije Lipa", route: { key: "project", slug: "ordinacija-lipa" } }, { label: "Planiranje online prodaje", route: { key: "webshop" } }] },
        { id: "vrijednost", title: "Dogovorite kako ćete procijeniti vrijednost", paragraphs: ["Prije izrade odaberite šta želite pratiti: kvalitetne upite, zahtjeve za ponudu ili potvrđene narudžbe. Klik na Instagram pokazuje namjeru za kontakt; sam po sebi nije poslana poruka niti novi klijent.", "Zabilježite koja se pitanja ponavljaju prije objave i nakon nje. Uz saglasnost klijenta sačuvajte konkretan primjer poboljšanja. Tako dobijate osnovu za odluke o sljedećoj nadogradnji, bez oslanjanja samo na broj posjeta."] },
        { id: "ponuda", title: "Šta poslati za uporedivu ponudu", paragraphs: ["Dovoljan početak je: ‘Bavimo se __, kupci su __, želimo da na stranici __. Imamo ove fotografije i tekstove __. Trebamo ove jezike i funkcije __.’ Dodajte postojeći profil ili web i željeni termin.", "Zatražite odvojeno navedene izradu, domenu, hosting, održavanje i eventualne vanjske servise. Obim treba odgovarati zadatku, a svaki sljedeći trošak biti razumljiv prije prihvatanja ponude."], links: [{ label: "Kako uporediti cijenu izrade web stranice", route: { key: "pricing" } }, { label: "Online saradnja za firme u BiH", route: { key: "coverage" } }] },
      ],
      proof: { title: "Isprobajte složeniji put kupca", text: "Naš webshop s 50 artikala pokazuje pretragu, izbor varijante i probnu kupovinu. Nije aktivna trgovina: nema stvarne naplate ni slanja proizvoda.", shop: true },
      faq: [
        { question: "Može li Instagram ostati glavni kontakt?", answer: "Da. Na webu možete objasniti ponudu, a posjetioca usmjeriti na potvrđeni Instagram ili Facebook profil. Jasno pokažite da se poruka šalje u toj aplikaciji." },
        { question: "Da li web automatski donosi kupce?", answer: "Ne. Potrebni su relevantna ponuda, koristan sadržaj, vidljivost i rad s pristiglim upitima. Izrada stranice nije garancija prodaje niti određene pozicije na Googleu." },
        { question: "Moram li odmah imati webshop?", answer: "Ne. Ako cijena zavisi od individualnog dogovora, prezentacija i dobar upit mogu biti prikladniji. Webshop ima smisla kada proizvodi, cijene i proces narudžbe mogu biti jasno definisani." },
      ],
    },
  },
  de: {
    googleVisibility: {
      title: "Warum erscheint meine Website nicht bei Google? | MOST Studio",
      description: "Website veröffentlicht, aber keine Impressionen? Indexierung, Canonical und Suchanfragen in der Search Console prüfen. Ein Leitfaden für Unternehmen.",
      eyebrow: "RATGEBER · GOOGLE-SUCHE",
      heading: "Warum erscheint Ihre Website nicht bei Google?",
      lead: "Prüfen Sie zuerst, ob Google die konkrete Seite indexiert hat. Danach geht es darum, bei welchen Suchanfragen sie erscheint. Veröffentlichung, Indexierung und tatsächliche Kundenanfragen sind verschiedene Schritte.",
      publishedOn: "2026-09-18",
      summaryTitle: "Drei Prüfungen vor Änderungen",
      summary: ["Indexierung der genauen Adresse", "Impressionen und Suchanfragen", "Inhalte passend zur gesuchten Leistung"],
      sections: [
        { id: "pregled-adrese", title: "1. Die genaue URL prüfen", paragraphs: ["Wählen Sie Ihre Domain in der Google Search Console und öffnen Sie die URL-Prüfung. Prüfen Sie die Startseite und wichtige Leistungsseiten einzeln. Notieren Sie Status, letztes Crawling und die von Google gewählte kanonische URL. Eine indexierte Startseite bestätigt nicht automatisch alle Unterseiten.", "Ist die Seite nicht indexiert, lesen Sie die Begründung und führen Sie einen Live-Test durch. Unterscheiden Sie bewusst ausgeschlossene Demos oder Duplikate von wichtigen Unternehmensseiten. Nach einem Domainwechsel sollte die alte Adresse zur passenden neuen Seite weiterleiten."] },
        { id: "status", title: "2. Den Status in eine konkrete Prüfung übersetzen", paragraphs: ["Unterschiedliche Meldungen erfordern unterschiedliche Maßnahmen. Die Tabelle ist ein Einstieg, keine Diagnose Ihrer Website."], table: { caption: "Was Sie je nach Status zuerst prüfen sollten", columns: ["Befund", "Nächste Prüfung"], rows: [
          ["Durch noindex ausgeschlossen", "Soll diese öffentliche Seite in der Suche erscheinen? Nur dann die Anweisung entfernen."],
          ["Durch robots.txt blockiert", "Die Regel für diesen Pfad prüfen. Google muss den Inhalt abrufen können."],
          ["Alternative Seite / andere kanonische URL", "Die ausgewählte URL öffnen und mit dem gewünschten Ziel vergleichen."],
          ["Gefunden oder gecrawlt, derzeit nicht indexiert", "Begründung, Erreichbarkeit, Inhalt und interne Links prüfen. Die Meldung allein belegt keine Abstrafung."],
          ["URL ist auf Google, aber ohne Impressionen", "Berichtszeitraum, Filter, Suchanfragen und Relevanz des Inhalts prüfen."],
        ] } },
        { id: "prikazivanja", title: "3. Tatsächliche Suchanfragen messen", paragraphs: ["Aktivieren Sie im Leistungsbericht Impressionen, Klicks und durchschnittliche Position. Prüfen Sie Domain, Zeitraum und aktive Filter. Ein neuer oder unvollständiger Bericht reicht nicht aus, um die langfristige Wirkung zu bewerten.", "Beobachten Sie Markenname und Leistungssuchen getrennt. Bei einer Tischlerei könnten das ‘Küchen nach Maß Mostar’ und Materialfragen sein, bei einem Webstudio Erstellung, Relaunch oder Onlineshop. Das sind Beispiele für Suchabsichten, keine gemessenen Suchvolumina. Betrachten Sie auch einzelne Zielseiten statt nur den Website-Durchschnitt."] },
        { id: "upiti-po-stranici", title: "4. Suchanfragen in konkrete Verbesserungen übersetzen", paragraphs: ["Öffnen Sie im Leistungsbericht Seiten, wählen Sie die genaue URL und wechseln Sie zu Suchanfragen. Sie sehen die verfügbaren Suchanfragen für diese Seite im gewählten Zeitraum. Der Export ist keine vollständige Liste aller Suchen: Manche Anfragen fehlen aus Datenschutzgründen.", "Gruppieren Sie Fragen nach Kundenbedarf. Erhält die Seite Impressionen für Preisfragen, erklärt aber weder Umfang noch Kosten, ergänzen Sie diese Antwort. Bei Fragen zu Onlinebestellungen verlinken Sie die passende Shop-Leistung. Ergänzen Sie nur Inhalte, die zu Ihrem tatsächlichen Angebot passen; wiederholen Sie nicht jede Keyword-Variante.", "Notieren Sie das Änderungsdatum und vergleichen Sie gleich lange Zeiträume mit denselben Filtern. Betrachten Sie Klicks und echte Kundenanfragen zusammen mit Impressionen. Bei wenigen Daten brauchen Sie einen längeren Zeitraum, bevor Sie die Wirkung bewerten."], links: [{ label: "Beispiel einer konkreten Antwort zu Website-Kosten", route: { key: "pricing" } }, { label: "Onlineshop: Katalog und Bestellablauf", route: { key: "webshop" } }] },
        { id: "sadrzaj", title: "5. Eine hilfreiche Antwort auf die Suche liefern", paragraphs: ["Eine Leistungsseite sollte Zielgruppe, Umfang, Zusammenarbeit und nächsten Schritt erklären. Eine Überschrift ‘Leistungen’ mit einem Satz und einer Galerie lässt viele Fragen offen.", "Ergänzen Sie echte Arbeitsbeispiele, Kundenfragen und Links zur passenden Leistung. Am Anfang kann ein eindeutig bezeichnetes Demoprojekt Ihren Ansatz zeigen. Stellen Sie es nicht als Kundenreferenz dar und versprechen Sie keine ungemessenen Ergebnisse."], links: [{ label: "So planen wir Unternehmenswebsites", route: { key: "website" } }, { label: "Prüfung und Relaunch einer bestehenden Website", route: { key: "redesign" } }] },
        { id: "nakon-ispravke", title: "6. Änderungen dokumentieren und beobachten", paragraphs: ["Halten Sie fest, was Sie wann geändert haben. Für wenige wichtige URLs können Sie eine Indexierung beantragen; eine Sitemap hilft beim Entdecken mehrerer Seiten. Wiederholte Anträge für dieselbe URL beschleunigen den Vorgang nicht.", "Laut Google können Änderungen nach Stunden, aber auch erst nach Monaten Wirkung zeigen. Bewerten Sie deshalb Trends über mehrere Wochen und tatsächliche Kundenanfragen. Für KI-Antworten in der Google-Suche gelten dieselben SEO-Grundlagen: hilfreiche zugängliche Inhalte, verständliche Links und Angaben, die zum sichtbaren Inhalt passen. Eine besondere ‘GEO’-Kennzeichnung garantiert keine Empfehlung."] },
      ],
      proof: { title: "Eine verständlich erklärte Leistung ausprobieren", text: "Im Demokonzept Meridijan wählt der Besucher ein geschäftliches Problem und erhält eine passende Richtung. Das zeigt Nutzerführung, keine nachgewiesene Suchposition oder echte Verkäufe.", project: "meridijan-savjetovanje" },
      faq: [
        { question: "Bedeuten null Impressionen einen technischen Defekt?", answer: "Nicht unbedingt. Prüfen Sie Indexierung, Berichtszeitraum und Filter. Sind die Seiten erreichbar, folgen Inhalt, Relevanz für Suchanfragen und der Aufbau echter Reputation." },
        { question: "Soll ich täglich eine Indexierung beantragen?", answer: "Nein. Reichen Sie eine wichtige URL nach einer tatsächlichen Änderung ein und beobachten Sie den Status. Wiederholte Anträge sind keine Abkürzung zu besseren Positionen." },
        { question: "Können Sie meine Website prüfen?", answer: "Senden Sie die öffentliche Adresse und beschreiben Sie Ihr Anliegen. Relevante Search-Console-Screenshots oder Exporte können helfen; Passwörter und unnötige persönliche Angaben gehören nicht in die Anfrage." },
      ],
      sources: googleSources,
    },
    socialWebsite: {
      title: "Website oder Instagram für Ihr Unternehmen? | MOST Studio",
      description: "Wann reicht Instagram, wann braucht Ihr Unternehmen eine Website oder einen Shop? Aufgaben, Beispiele und einen sinnvollen ersten Umfang vergleichen.",
      eyebrow: "RATGEBER · WEBSITE-PLANUNG",
      heading: "Sie haben Instagram. Brauchen Sie auch eine Website?",
      lead: "Fragen Kunden immer wieder nach Angebot, Arbeitsbeispielen oder Bestellung, kann eine Website diese Antworten bündeln. Instagram darf Ihr wichtigster Nachrichtenkanal bleiben. Entscheidend ist die Aufgabe, die den Verkauf heute erschwert.",
      publishedOn: "2026-09-18",
      summaryTitle: "Mit der Kundenfrage beginnen",
      summary: ["Was bieten Sie wem an?", "Was braucht der Kunde vor der Nachricht?", "Geht es um eine Anfrage oder einen Onlinekauf?"],
      sections: [
        { id: "uloge", title: "Kanäle zu einem verständlichen Weg verbinden", paragraphs: ["Ein Social-Media-Profil eignet sich für Neuigkeiten, aktuelle Arbeiten und Gespräche. Eine Website bietet einen direkt erreichbaren Überblick über Leistungen, Beispiele, Zusammenarbeit und Kontakt. Sie muss Ihre bewährte Kommunikation nicht ersetzen.", "Ein möglicher Weg: Ein Beitrag zeigt eine Küche, der Link führt zu Ausführungen und Materialien, der Kontaktbutton zurück zu Instagram. Ein Händler mit vielen Größen und Varianten braucht möglicherweise einen anderen Ablauf: Produktauswahl und Bestellung im Onlineshop."], table: { caption: "Welches Problem möchten Sie lösen?", columns: ["Situation", "Sinnvoller Einstieg"], rows: [
          ["Dieselben Fragen kommen immer wieder", "Eine klare Seite mit Angebot, häufigen Fragen und Social-Media-Kontakt."],
          ["Sie bieten mehrere unterschiedliche Leistungen", "Eigene Leistungsseiten mit Beispielen und einem klaren nächsten Schritt."],
          ["Kunden müssen Maße oder Materialien wählen", "Galerie; ein Konfigurator, wenn die Auswahl nützliche Angebotsdaten liefert."],
          ["Bestellungen und Bestand werden unübersichtlich", "Onlineshop mit vereinbarter Bearbeitung, Lieferung und echter Zahlungsabwicklung."],
        ] } },
        { id: "najmanji-pocetak", title: "Was die erste Unternehmenswebsite braucht", paragraphs: ["Bereiten Sie eine verständliche Beschreibung von Angebot und Zielgruppe, Ihr tatsächliches Einsatzgebiet, eigene Fotos und einen bestätigten Kontakt vor. Ergänzen Sie Fragen, die Kunden bereits stellen: Termin, Ablauf, Preisfaktoren und erforderliche Angaben.", "Nicht jede Funktion muss am ersten Tag vorhanden sein. Bei individuellen Möbelanfragen können Arbeitsbeispiele und eine gute Anfrage wichtiger sein als ein aufwendiges Benutzerkonto. Benötigen Sie Zahlung und Bestellverwaltung, reicht eine reine Präsentationsseite dagegen nicht aus."], links: [{ label: "Umfang einer Unternehmenswebsite", route: { key: "website" } }, { label: "Was zur Shop-Erstellung gehört", route: { key: "webshop" } }] },
        { id: "provjerite-primjere", title: "Drei Dinge vor der Entscheidung ausprobieren", paragraphs: ["Unsere Beispiele demonstrieren die Umsetzung, ohne echte Bestellungen oder Buchungen. Nutzen Sie sie als Fragen für Ihr eigenes Projekt."], points: ["Hrast: Möbeltyp und Oberfläche ändern. Hilft die Vorschau, das gewünschte Produkt zu beschreiben?", "Lipa: Von einem Anliegen zur Leistung und zum Testtermin gehen. Braucht Ihr Betrieb eine Terminwahl oder genügt eine Nachricht?", "Shop: Ein Produkt suchen, Größe wählen und Menge ändern. Sind Artikel und Gesamtsumme vor der Testbestellung verständlich?"], links: [{ label: "Tischlerei-Konzept Hrast", route: { key: "project", slug: "stolarija-hrast" } }, { label: "Praxiskonzept Lipa", route: { key: "project", slug: "ordinacija-lipa" } }, { label: "Onlineverkauf planen", route: { key: "webshop" } }] },
        { id: "vrijednost", title: "Festlegen, woran Sie den Nutzen erkennen", paragraphs: ["Bestimmen Sie vor der Umsetzung, was Sie beobachten möchten: qualifizierte Anfragen, Angebotswünsche oder bestätigte Bestellungen. Ein Instagram-Klick signalisiert Kontaktinteresse; er ist noch keine gesendete Nachricht und kein neuer Kunde.", "Notieren Sie wiederkehrende Fragen vor und nach der Veröffentlichung. Dokumentieren Sie mit Zustimmung des Kunden ein konkretes Verbesserungsbeispiel. So können Sie spätere Erweiterungen auf mehr als bloße Besucherzahlen stützen."] },
        { id: "ponuda", title: "Ein vergleichbares Angebot vorbereiten", paragraphs: ["Ein guter Anfang lautet: ‘Wir bieten __ an, unsere Kunden sind __, Besucher sollen auf der Website __. Diese Texte und Fotos liegen vor __. Diese Sprachen und Funktionen brauchen wir __.’ Ergänzen Sie bestehendes Profil oder Website und den Wunschtermin.", "Lassen Sie Erstellung, Domain, Hosting, Wartung und externe Dienste getrennt aufführen. Der Umfang sollte zur Aufgabe passen; spätere Kosten sollten vor der Angebotsannahme verständlich sein."], links: [{ label: "Website-Angebote und Kosten vergleichen", route: { key: "pricing" } }, { label: "Online-Zusammenarbeit für Unternehmen in BiH", route: { key: "coverage" } }] },
      ],
      proof: { title: "Einen umfangreicheren Kaufablauf testen", text: "Unser Shop mit 50 Artikeln zeigt Suche, Variantenwahl und Testkauf. Er ist kein aktiver Handel: Es erfolgen weder echte Zahlung noch Versand.", shop: true },
      faq: [
        { question: "Kann Instagram der wichtigste Kontakt bleiben?", answer: "Ja. Ihre Website kann das Angebot erklären und zum bestätigten Instagram- oder Facebook-Profil führen. Machen Sie deutlich, dass die Nachricht dort gesendet wird." },
        { question: "Bringt eine Website automatisch Kunden?", answer: "Nein. Dazu gehören ein relevantes Angebot, hilfreiche Inhalte, Sichtbarkeit und die Bearbeitung von Anfragen. Die Erstellung garantiert weder Verkäufe noch eine bestimmte Google-Position." },
        { question: "Brauche ich sofort einen Onlineshop?", answer: "Nein. Bei individuell vereinbarten Preisen können Präsentation und Anfrage besser passen. Ein Shop ist sinnvoll, wenn Produkte, Preise und Bestellabläufe klar definiert werden können." },
      ],
    },
  },
};
