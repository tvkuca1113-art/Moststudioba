import { guides } from "./guides";
import type { Locale, RouteRef } from "@/lib/i18n/config";

export const contentPageKeys = ["website", "webshop", "redesign", "coverage", "pricing", "googleVisibility", "socialWebsite"] as const;
export type ContentPageKey = (typeof contentPageKeys)[number];

export type ContentPage = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  summaryTitle: string;
  summary: string[];
  publishedOn?: string;
  sources?: { label: string; href: string }[];
  sections: {
    id: string; title: string; paragraphs: string[]; points?: string[];
    links?: { label: string; route: RouteRef }[];
    table?: { caption: string; columns: [string, string]; rows: [string, string][] };
  }[];
  proof: { title: string; text: string; project?: string; shop?: boolean };
  faq: { question: string; answer: string }[];
};

/** Authored pages with distinct buying questions; no generated city-page matrix. */
export const contentPages: Record<Locale, Record<ContentPageKey, ContentPage>> = {
  bs: {
    ...guides.bs,
    website: {
      title: "Izrada web stranica za firme u BiH | MOST Studio",
      description: "Izrada poslovnih web stranica za firme u BiH: struktura, dizajn, mobilna izvedba i SEO osnove. Online saradnja, jasan obim i ponuda za vaš projekt.",
      eyebrow: "IZRADA WEB STRANICA",
      heading: "Izrada poslovnih web stranica.",
      lead: "MOST Studio dizajnira i izrađuje poslovne web stranice za firme u Bosni i Hercegovini. Povezujemo vašu ponudu, radove i kontakt u put koji kupac može razumjeti na mobitelu i računaru.",
      summaryTitle: "Od ideje do objavljene stranice",
      summary: ["Struktura i sadržaj prije dizajna", "Pregled na mobitelu i računaru", "Cijena i obim dogovoreni prije izrade"],
      sections: [
        { id: "namjena", title: "Šta vaša stranica treba riješiti?", paragraphs: ["Za stolariju je važan pregled izvedbi i jasan zahtjev za ponudu. Za ordinaciju su važni razumljive usluge i sljedeći korak do termina. Za savjetnika su to područja rada i dobar prvi upit. Zato strukturu ne određujemo samo prema broju stranica.", "Na početku biramo glavni zadatak: upit, poziv, predstavljanje radova ili prodaju. Ako je potrebna kupovina s korpom i narudžbom, zajedno definišemo obim webshopa."] },
        { id: "izrada", links: [{ label: "Uporedite cijenu i obim izrade", route: { key: "pricing" } }, { label: "Treba li vam web uz Instagram?", route: { key: "socialWebsite" } }], title: "Šta obuhvata izrada", paragraphs: ["Ponuda precizira stranice, funkcije, jezike i sadržaj. U standardni razgovor o izradi ulaze sljedeće cjeline; konačan popis isporuke usaglašavamo za vaš posao."], points: ["Mapa stranica i raspored informacija: usluge, radovi, o firmi i kontakt.", "Vizuelni smjer, čitljiva tipografija i raspored prilagođen malim ekranima.", "Funkcionalni linkovi, navigacija i dogovoreni način slanja upita.", "Naslovi i opisi stranica, razumljivi URL-ovi, sitemap i tehnički uslovi za indeksiranje.", "Optimizacija fotografija te provjera menija, obrazaca, linkova i prikaza prije objave."] },
        { id: "saradnja", title: "Saradnja bez dolaska u ured", paragraphs: ["Radimo online s firmama iz Mostara i drugih gradova BiH. Materijale razmjenjujemo emailom, a dogovor i povratne informacije ostaju pregledni kroz faze projekta.", "Pošaljite kratak opis djelatnosti, usluge koje želite predstaviti, postojeći web ako ga imate i primjere koji vam se sviđaju. Prije početka razjasnimo ko priprema tekstove, fotografije i prevode. Nedostatak materijala tako se vidi prije dogovora o roku."] },
        { id: "nakon-objave", links: [{ label: "Šta provjeriti ako web nije na Googleu", route: { key: "googleVisibility" } }], title: "Objava je dio dogovorene isporuke", paragraphs: ["Prije objave provjeravamo važne korisničke korake i postavljamo dogovorenu domenu. Pristup domeni, hostingu, sadržaju i eventualnom sistemu za uređivanje definišemo u ponudi.", "Ako želite sami mijenjati sadržaj, to recite na početku kako bismo planirali uređivanje i upute. Održavanje, nove funkcije, hosting i plaćene licence jasno odvajamo od jednokratne izrade. SEO osnova olakšava pretraživačima razumijevanje stranice; ne predstavlja obećanje određene pozicije."] },
        { id: "obim-i-predaja", title: "Cijena, rok i vlasništvo nad isporukom", paragraphs: ["Na cijenu i rok utiču broj i složenost stranica, priprema sadržaja, jezici, integracije i odobrenja. Precizan obim i raspored utvrđujemo prije izrade; ne objavljujemo univerzalnu početnu cijenu.", "U ponudi treba navesti na čije ime se registruju domena i hosting, ko ima pristup računima i šta dobijate pri predaji: sadržaj, datoteke, kod ili pristup sistemu za uređivanje. Prava na isporuku i ograničenja licenci potvrđuju se dogovorom. Održavanje, obnova domene, hosting i vanjski servisi zasebne su stavke koje treba razjasniti."] },
      ],
      proof: { title: "Pogledajte kako smo riješili izbor namještaja", text: "U demo konceptu Hrast kupac bira vrstu namještaja, materijal i dimenzije. Primjer pokazuje kako web može pripremiti konkretniji upit. Nije klijentski projekt niti dokaz izmjerenog rasta prodaje.", project: "stolarija-hrast" },
      faq: [
        { question: "Koliko košta izrada web stranice?", answer: "Cijena zavisi od strukture, količine sadržaja, jezika i funkcija. Nakon opisa projekta pripremamo ponudu s popisom onoga što je uključeno. Vodič o cijeni pomaže vam pripremiti uporediv zahtjev." },
        { question: "Može li stranica biti na više jezika?", answer: "Da. Dogovaramo jezike, prevode i zasebne URL-ove. Bosanska i njemačka verzija ove stranice pokazuju kako posjetilac može promijeniti jezik i ostati na odgovarajućoj stranici." },
        { question: "Šta određuje rok izrade?", answer: "Rok zavisi od obima, spremnosti tekstova i fotografija, prevoda, integracija i povratnih informacija. Dostupnost i raspored potvrđujemo nakon pregleda zahtjeva, prije početka rada." },
      ],
    },
    webshop: {
      title: "Izrada web shopa u BiH | MOST Studio",
      description: "Planiranje i izrada webshopa za BiH: katalog, kategorije, varijante, korpa i tok narudžbe. Isprobajte demo s 50 artikala i zatražite ponudu.",
      eyebrow: "IZRADA WEB SHOPA",
      heading: "Izrada webshopa za prodaju u BiH.",
      lead: "Webshop treba pomoći kupcu da pronađe proizvod, izabere odgovarajuću varijantu i razumije ukupan iznos prije narudžbe. MOST Studio planira i izrađuje taj tok za vaš katalog i način poslovanja.",
      summaryTitle: "Prvo prodajni proces, zatim ekran",
      summary: ["Katalog i varijante proizvoda", "Korpa i razumljiv tok kupovine", "Plaćanje i dostava prema dogovoru"],
      sections: [
        { id: "katalog", title: "Katalog koji se lako pretražuje", paragraphs: ["Prvo pregledamo broj artikala, kategorije, fotografije i podatke koje kupac koristi za izbor. Veličina, boja, materijal i dostupnost moraju imati smislen prikaz, posebno na telefonu.", "Dogovaramo ko unosi proizvode i kako se kasnije ažuriraju. Pedeset gotovih artikala u tabeli nije isti posao kao stotine proizvoda bez fotografija, opisa ili usklađenih šifri."], points: ["Kategorije i filteri prema stvarnim osobinama proizvoda.", "Opis, fotografije, cijena i izbor varijante na stranici proizvoda.", "Pretraga i razumljivo prazno stanje kada nema rezultata.", "Korpa s promjenom količine i pregledom odabranih artikala."] },
        { id: "narudzba", title: "Plaćanje, dostava i narudžbe", paragraphs: ["Prije izbora rješenja utvrđujemo prodajete li samo u BiH ili i izvan nje, kako obrađujete narudžbe i koje načine plaćanja zaista možete ponuditi. Plaćanje pouzećem, uplata na račun i kartično plaćanje imaju različite tehničke zahtjeve.", "Kartično plaćanje i povezivanje s dostavnom službom zavise od odabranog pružaoca i njegovih uslova. U ponudi navodimo integracije i odgovornost za troškove tih servisa. Potvrde narudžbe, zalihe, administracija i pravila dostave planiraju se prije razvoja, a ne tek pred objavu."] },
        { id: "demo", title: "Šta možete provjeriti u našem demou", paragraphs: ["Demo webshop ima 50 artikala. Možete isprobati kategorije, filtere, izbor proizvoda, korpu i probni završetak kupovine. Proizvodi i fotografije služe predstavljanju koncepta.", "Demo ne naplaćuje kupovinu, ne kreira stvarne narudžbe i nije povezan s vašim zalihama. Produkcijski webshop dobija posebno dogovoren sistem za narudžbe i upravljanje, uz provjeru cijelog toka prije pokretanja."] },
        { id: "priprema", title: "Šta poslati za procjenu", paragraphs: ["Pošaljite djelatnost, približan broj artikala i varijanti, primjer podataka za jedan proizvod, željene načine plaćanja i područje dostave. Navedite imate li postojeći webshop ili poslovni sistem s kojim se treba povezati.", "Prije objave zajedno prolazimo od izbora artikla do potvrde testne narudžbe, uključujući nedostupnu varijantu i pogrešno unesene podatke. Dizajn prati taj proces i vaš vizuelni identitet."] },
        { id: "obim-i-predaja", title: "Cijena, rok i vlasništvo nad isporukom", paragraphs: ["Na cijenu i rok utiču broj i složenost stranica, priprema sadržaja, jezici, integracije i odobrenja. Precizan obim i raspored utvrđujemo prije izrade; ne objavljujemo univerzalnu početnu cijenu.", "U ponudi treba navesti na čije ime se registruju domena i hosting, ko ima pristup računima i šta dobijate pri predaji: sadržaj, datoteke, kod ili pristup sistemu za uređivanje. Prava na isporuku i ograničenja licenci potvrđuju se dogovorom. Održavanje, obnova domene, hosting i vanjski servisi zasebne su stavke koje treba razjasniti."] },
      ],
      proof: { title: "Isprobajte webshop s 50 artikala", text: "Pregledajte katalog i završite probnu kupovinu. Sve je demonstracija: bez naplate i stvarne narudžbe.", shop: true },
      faq: [
        { question: "Je li broj artikala jedino što određuje cijenu?", answer: "Nije. Na obim utiču varijante, kvalitet ulaznih podataka, načini plaćanja, dostava, administracija i integracije. Manji katalog sa složenim pravilima može zahtijevati više rada od većeg, jednostavnog kataloga." },
        { question: "Mogu li sam dodavati proizvode?", answer: "Da, ako je upravljanje katalogom dio dogovorenog rješenja. Prije izrade definišemo koje podatke uređujete, korisničke pristupe i upute za rad." },
        { question: "Da li demo već prima online uplate?", answer: "Ne. Demo prikazuje iskustvo kupovine. Stvarna naplata zahtijeva odabranog pružaoca, odgovarajući račun i odvojenu implementaciju i testiranje." },
      ],
    },
    redesign: {
      title: "Redizajn web stranica i migracija | MOST Studio",
      description: "Redizajn postojećih web stranica: pregled sadržaja, bolji mobilni UX, jasnija ponuda i plan važnih URL-ova. Online saradnja s firmama u BiH.",
      eyebrow: "REDIZAJN WEB STRANICA",
      heading: "Redizajn web stranice koja treba pratiti vaš posao.",
      lead: "Kada je stranica spora, teško se koristi na mobitelu ili ne predstavlja ono što danas radite, počinjemo pregledom. Zatim planiramo šta zadržati, šta poboljšati i kako sigurno objaviti promjene.",
      summaryTitle: "Prije novog izgleda, jasan plan",
      summary: ["Pregled postojećeg sadržaja i tokova", "Dizajn prema današnjoj ponudi", "Provjera URL-ova i preusmjeravanja"],
      sections: [
        { id: "pregled", links: [{ label: "Provjera indeksiranja i vidljivosti na Googleu", route: { key: "googleVisibility" } }], title: "Prvo utvrđujemo gdje posjetilac zapinje", paragraphs: ["Provjeravamo razumljivost ponude, navigaciju, čitljivost, mobilni meni, kontakt i važne obrasce. Ako imate podatke iz Search Consolea ili analitike, koristimo ih da razlikujemo stvarni problem od pretpostavke.", "Nekada je dovoljna jasnija uslužna stranica i bolji kontakt. Nekada postojeći sistem ograničava promjene pa je potrebna nova izrada. Preporuku vežemo za ciljeve i održavanje, ne samo za izgled."] },
        { id: "sadrzaj", title: "Zadržati ono što već vrijedi", paragraphs: ["Tekstovi, fotografije, radovi i stranice koje već dovode posjetioce ne odbacuju se automatski. Pravimo popis sadržaja, dogovaramo izmjene i povezujemo svaku važnu staru adresu s odgovarajućim odredištem."], points: ["Popis postojećih stranica i odluka: zadržati, doraditi ili spojiti.", "Nova struktura usluga i jasni pozivi na kontakt.", "Raspored za mobitel, čitljiv kontrast i pristupačna polja.", "Plan trajnih preusmjeravanja za promijenjene URL-ove.", "Provjera canonical i jezičkih oznaka, sitemapa i dozvole za indeksiranje."] },
        { id: "objava", title: "Kako izgleda prelazak", paragraphs: ["Novu verziju pregledate prije promjene javne stranice. Dogovaramo trenutak objave, sigurnosnu kopiju gdje je primjenjiva i način povratka ako se pojavi ozbiljan problem.", "Nakon objave provjeravamo početnu, usluge, važne stare linkove i kontaktne tokove. Promjena sadržaja ili strukture može uticati na pretragu; plan migracije smanjuje rizik, ali ne garantuje očuvanje svih pozicija."] },
        { id: "za-ponudu", title: "Šta nam treba od vas", paragraphs: ["Pošaljite adresu postojeće stranice i tri stvari koje vam najviše smetaju. Dodajte šta se promijenilo u poslu, koje funkcije trebate i ko danas uređuje sadržaj.", "Pristupe hostingu, domeni i analitici usklađujemo tek kada su potrebni za dogovoreni posao. Lozinke ne unosite u projektni upit. Obim, migraciju, dodatne licence i eventualno održavanje navodimo u ponudi."] },
        { id: "obim-i-predaja", title: "Cijena, rok i vlasništvo nad isporukom", paragraphs: ["Na cijenu i rok utiču broj i složenost stranica, priprema sadržaja, jezici, integracije i odobrenja. Precizan obim i raspored utvrđujemo prije izrade; ne objavljujemo univerzalnu početnu cijenu.", "U ponudi treba navesti na čije ime se registruju domena i hosting, ko ima pristup računima i šta dobijate pri predaji: sadržaj, datoteke, kod ili pristup sistemu za uređivanje. Prava na isporuku i ograničenja licenci potvrđuju se dogovorom. Održavanje, obnova domene, hosting i vanjski servisi zasebne su stavke koje treba razjasniti."] },
      ],
      proof: { title: "Pogledajte primjer jasnijeg puta do usluge", text: "Demo Lipa vodi posjetioca kroz izbor usluge i termina. Pokazuje način razmišljanja o korisničkom toku; ne prikazuje rezultat stvarne ordinacije.", project: "ordinacija-lipa" },
      faq: [
        { question: "Moramo li promijeniti domenu?", answer: "Ne. Redizajn obično može ostati na postojećoj domeni. Promjenu domene razmatramo samo ako postoji stvaran razlog i uz zaseban plan preusmjeravanja." },
        { question: "Hoće li postojeći linkovi raditi?", answer: "Važne URL-ove popisujemo i planiramo njihovo očuvanje ili odgovarajuće preusmjeravanje. To se provjerava pri objavi. Za potpun pregled trebaju nam dostupni podaci o postojećoj stranici." },
        { question: "Možete li prvo pregledati postojeći web?", answer: "Pošaljite link i cilj projekta. Na osnovu početnog pregleda dogovaramo treba li ciljana dorada ili širi redizajn; detaljna analiza i izvedba ulaze u definisani obim." },
      ],
    },
    coverage: {
      title: "Izrada web stranica u BiH — online saradnja | MOST Studio",
      description: "Izrada web stranica za firme širom Bosne i Hercegovine, uz online saradnju. MOST Studio: dizajn, webshop i redizajn uz jasan dogovor na daljinu.",
      eyebrow: "ONLINE SARADNJA · BOSNA I HERCEGOVINA",
      heading: "Izrada web stranica u Bosni i Hercegovini.",
      lead: "MOST Studio pruža web dizajn, izradu web stranica, webshopa i redizajn za klijente širom Bosne i Hercegovine. Cijeli projekt možemo dogovoriti i voditi online, od prvog opisa do pregleda i objave.",
      summaryTitle: "Usluga dostupna širom BiH",
      summary: ["Mostar i Hercegovina", "Firmama širom Bosne i Hercegovine", "Online dogovor na bosanskom ili njemačkom"],
      sections: [
        { id: "mostar", title: "Web stranice za firme iz Mostara", paragraphs: ["Ako vaš posao posluje u Mostaru, stranica treba jasno objasniti šta nudite, kome i kako vas kupac može kontaktirati. Za uslužnu firmu to može biti pregled izvedbi i upit, za smještaj pregled ponude i dogovorena rezervacija, a za trgovinu katalog ili webshop.", "MOST Studio radi online. Saradnja ne zahtijeva dolazak u naš ured: pošaljete opis i materijale, zajedno uskladimo smjer, a svaku fazu pregledate preko linka. Prikaz lokacije, telefona ili radnog vremena na vašoj stranici zasnivamo na vašim stvarnim podacima."] },
        { id: "gradovi", links: [{ label: "Poslovne web stranice: sadržaj i funkcije", route: { key: "website" } }, { label: "Webshop za prodaju i dostavu u BiH", route: { key: "webshop" } }], title: "Isti pristup za ostale gradove u BiH", paragraphs: ["Online saradnja dostupna je firmama iz Sarajeva, Banje Luke, Tuzle, Zenice i drugih gradova i mjesta u BiH. Prije izrade razjasnimo gdje su vaši kupci, područje usluge ili dostave te jezik na kojem biraju i naručuju. Mjesto vašeg poslovanja nije prepreka za dogovor i pregled projekta na daljinu.", "Za posao koji radi u više gradova prvo utvrđujemo postoji li različita ponuda ili stvarni lokalni sadržaj. Posebna stranica za grad ima smisla kada posjetiocu daje korisne informacije, kao što su stvarno područje dostave, tim ili izvedeni radovi. Samo ponavljanje imena gradova ne objašnjava vašu vrijednost."] },
        { id: "online-proces", title: "Kako teče projekt na daljinu", paragraphs: ["Prvi upit sadrži djelatnost, cilj weba, postojeću adresu i potrebne funkcije. Nakon razjašnjenja šaljemo dogovoreni obim i ponudu. Tek zatim planiramo raspored izrade."], points: ["Materijali: usluge, fotografije, identitet i potvrđeni podaci o firmi.", "Smjer: mapa stranica i pregled dizajna s vašim komentarima.", "Izrada: probna verzija koju provjeravate na telefonu i računaru.", "Objava: provjera linkova, upita, domene i dogovorene isporuke."] },
        { id: "publika", title: "Za domaće i njemačko govorno područje", paragraphs: ["Ako radite i s klijentima iz Njemačke, možemo planirati bosansku i njemačku verziju weba. Svaki jezik dobija svoj sadržaj, navigaciju i odgovarajuću adresu. Prevod i provjeru poslovnih izraza dogovaramo u obimu.", "Cijena zavisi od onoga što treba izraditi, a ne od naziva grada. Pogledajte usluge, isprobajte demo koncepte i pošaljite kratak opis da utvrdimo šta vaš projekt stvarno treba."] },
      ],
      proof: { title: "Provjerite pristup prije razgovora", text: "Meridijan je samostalno izrađen koncept poslovnog savjetovanja. Kratka interaktivna procjena pokazuje kako se posjetilac može usmjeriti na odgovarajuću uslugu.", project: "meridijan-savjetovanje" },
      faq: [
        { question: "Imate li ured za dolazak u Mostaru?", answer: "Saradnju vodimo online; ne predstavljamo ovu uslugu kao fizički ured za posjete u Mostaru ili drugim gradovima. Javite nam se na Instagramu ili emailom." },
        { question: "Radite li i za manje gradove i obrte?", answer: "Da. Lokacija u BiH nije prepreka za online saradnju. Obim prilagođavamo ponudi i zadatku stranice, bilo da je riječ o jednom obrtu ili firmi s više usluga." },
        { question: "Hoćete li garantovati prvo mjesto na Googleu?", answer: "Ne. Možemo urediti tehničku osnovu, sadržaj i strukturu za pretragu. Rezultat zavisi i od konkurencije, reputacije, stvarnih referenci i načina na koji Google procjenjuje stranicu." },
      ],
    },
    pricing: {
      title: "Cijena izrade web stranice u BiH: šta utiče na ponudu",
      description: "Šta određuje cijenu web stranice ili webshopa u BiH? Uporedite obim, sadržaj, jezike, integracije i troškove nakon objave uz vodič MOST Studija.",
      eyebrow: "VODIČ ZA PLANIRANJE",
      heading: "Koliko košta izrada web stranice u BiH?",
      lead: "Cijena izrade web stranice u BiH zavisi od sadržaja, funkcija, jezika i odgovornosti za pripremu materijala. MOST Studio daje ponudu nakon kratkog opisa projekta, s jasno navedenim obimom i dodatnim troškovima.",
      summaryTitle: "Za uporedivu ponudu navedite",
      summary: ["Cilj stranice i približan sadržaj", "Funkcije i broj jezika", "Šta već imate i željeni rok"],
      sections: [
        { id: "obim", title: "Različiti zadaci, različit obim", table: { caption: "Šta porediti u ponudama", columns: ["Vrsta projekta", "Šta treba precizirati"], rows: [["Poslovna prezentacija", "Popis stranica, priprema tekstova i slika, kontakt i način uređivanja."], ["Višejezična stranica", "Ko priprema prevode, obim svakog jezika i provjera jezičkih verzija."], ["Webshop", "Broj proizvoda i varijanti, unos, zalihe, naplata, dostava i administracija."], ["Redizajn", "Sadržaj koji ostaje, stare adrese, migracija i preusmjeravanja."]] }, links: [{ label: "Izrada poslovne stranice", route: { key: "website" } }, { label: "Izrada webshopa", route: { key: "webshop" } }, { label: "Redizajn i migracija", route: { key: "redesign" } }], paragraphs: ["Prezentacijska stranica predstavlja djelatnost, usluge i kontakt. Višejezična poslovna stranica dodaje zaseban sadržaj i provjeru svake jezičke verzije. Webshop uvodi proizvode, varijante, korpu, narudžbe, plaćanje i administraciju.", "Zato dvije ponude za ‘web stranicu’ nisu nužno uporedive. Tražite popis stranica, funkcija i odgovornosti, a ne samo konačan broj. Jeftinija ponuda može pokrivati manji zadatak, dok skuplja bez jasno definisane isporuke nije automatski bolja."] },
        { id: "faktori", title: "Šta najviše mijenja cijenu", paragraphs: ["Ove stavke treba razjasniti prije prihvatanja ponude."], points: ["Sadržaj: gotovi tekstovi i fotografije ili njihova priprema i obrada.", "Struktura: jedna prodajna stranica ili više različitih uslužnih i sadržajnih stranica.", "Jezici: količina prevoda, odobrenje sadržaja i provjera svake verzije.", "Funkcije: kontaktni link, obrazac, rezervacije, konfigurator ili naplata.", "Integracije: povezivanje s katalogom, poslovnim softverom, dostavom ili email servisom.", "Migracija: postojeći sadržaj, važni URL-ovi i preusmjeravanja.", "Uređivanje: da li sadržaj mijenjate sami i koje kontrole su vam potrebne."] },
        { id: "troskovi", title: "Jednokratna izrada i troškovi nakon objave", paragraphs: ["U ponudi razdvojite izradu od domene, hostinga, licenci i vanjskih servisa. Kod webshopa mogu postojati i naknade pružaoca naplate. Svaka stavka treba imati jasno objašnjenje ko je plaća i kada se obnavlja.", "Održavanje može obuhvatati provjere, ažuriranja i dogovoreni obim dorada. Nove stranice, kampanje ili veće funkcije nisu nužno dio održavanja. Pitajte ko ima pristup računima, kako se predaju materijali i šta dobijate po završetku projekta."] },
        { id: "rok", title: "Rok i povratne informacije su dio plana", paragraphs: ["Izrada može napredovati tek kada su ključni sadržaji i odluke spremni. Dogovorite ko odobrava dizajn, koliko krugova dorada je uključeno i kada trebaju stići materijali.", "Umjesto obećanja istog roka za svaki projekt, tražite faze: struktura, dizajn, izrada, provjera i objava. Tako promjena obima ima vidljiv uticaj na rok i cijenu."] },
        { id: "zahtjev", title: "Kratak zahtjev koji možete poslati danas", paragraphs: ["Napišite čime se bavite, ko su vaši kupci, šta želite da posjetilac uradi i koje funkcije su obavezne. Dodajte postojeći web, broj jezika, materijale koje već imate i željeni termin.", "Okvirni budžet, ako ga imate, pomaže odrediti prioritete i faze. Odgovor treba biti konkretan obim rada i ponuda. Naš projektni upit ispod priprema poruku za Instagram, koju možete pregledati prije slanja."] },
      ],
      proof: { title: "Uporedite funkcije, ne samo izgled", text: "Demo Hrast uključuje izbor namještaja, materijala i dimenzija. Takva interakcija ima drugačiji obim od statične galerije. Isprobajte je kao primjer pri definisanju zahtjeva.", project: "stolarija-hrast" },
      faq: [
        { question: "Imate li fiksnu početnu cijenu?", answer: "Trenutno ne objavljujemo univerzalnu početnu cijenu, jer prvo utvrđujemo obim. Pošaljite opis i potrebne funkcije da dobijete ponudu koja odgovara konkretnom projektu." },
        { question: "Da li su domena i hosting uključeni?", answer: "To se jasno navodi u ponudi. Prije prihvatanja provjerite iznos, trajanje, obnavljanje i vlasništvo nad računima. Nemojte pretpostaviti da su trajno uključeni u jednokratnu izradu." },
        { question: "Je li SEO isto što i plaćanje za prvo mjesto?", answer: "Ne. Tehnička priprema i kvalitetan sadržaj pomažu da pretraživač razumije stranicu. Organska pozicija se ne kupuje kroz izradu weba i ne može se garantovati; Google oglasi su zasebna usluga." },
      ],
    },
  },
  de: {
    ...guides.de,
    website: {
      title: "Website-Erstellung für Unternehmen in BiH | MOST Studio",
      description: "Websites für Unternehmen in Bosnien-Herzegowina: Struktur, Design, mobile Umsetzung und SEO-Grundlagen. Online-Zusammenarbeit mit klarem Projektumfang.",
      eyebrow: "WEBSITE-ERSTELLUNG",
      heading: "Unternehmenswebsites erstellen lassen.",
      lead: "MOST Studio gestaltet und entwickelt Unternehmenswebsites für Bosnien-Herzegowina. Wir verbinden Angebot, Arbeiten und Kontakt zu einem nachvollziehbaren Weg auf Smartphone und Computer.",
      summaryTitle: "Von der Idee zur veröffentlichten Website",
      summary: ["Struktur und Inhalte vor dem Design", "Vorschau auf Handy und Computer", "Preis und Umfang vor dem Start vereinbart"],
      sections: [
        { id: "namjena", title: "Welche Aufgabe soll Ihre Website lösen?", paragraphs: ["Für eine Tischlerei sind Beispiele und eine konkrete Angebotsanfrage wichtig. Für eine Praxis zählen verständliche Leistungen und der nächste Schritt zum Termin. Für eine Beratung sind es Tätigkeitsfelder und eine passende Erstanfrage. Deshalb entscheidet nicht allein die Seitenzahl über die Struktur.", "Zu Beginn legen wir das Hauptziel fest: Anfrage, Anruf, Arbeitsproben oder Verkauf. Benötigen Sie einen Einkauf mit Warenkorb und Bestellung, definieren wir gemeinsam den Umfang eines Onlineshops."] },
        { id: "izrada", links: [{ label: "Kosten und Leistungsumfang vergleichen", route: { key: "pricing" } }, { label: "Eine Website neben Instagram?", route: { key: "socialWebsite" } }], title: "Was die Umsetzung umfasst", paragraphs: ["Im Angebot werden Seiten, Funktionen, Sprachen und Inhalte festgehalten. Die folgenden Bereiche gehören in die Planung; die konkrete Leistungsliste stimmen wir auf Ihr Unternehmen ab."], points: ["Seitenstruktur und Informationsfolge: Leistungen, Arbeiten, Unternehmen und Kontakt.", "Gestalterische Richtung, lesbare Typografie und Layout für kleine Bildschirme.", "Funktionierende Links, Navigation und der vereinbarte Kontaktweg.", "Seitentitel, Beschreibungen, verständliche URLs, Sitemap und technische Indexierbarkeit.", "Optimierung von Bildern und Prüfung von Menü, Formularen, Links und Darstellung vor dem Start."] },
        { id: "saradnja", title: "Zusammenarbeit ohne Bürobesuch", paragraphs: ["Wir arbeiten online mit Unternehmen aus Mostar und anderen Städten in BiH. Materialien werden per E-Mail ausgetauscht, Absprachen und Rückmeldungen bleiben in den Projektphasen nachvollziehbar.", "Senden Sie eine kurze Beschreibung Ihrer Tätigkeit, die gewünschten Leistungen, eine vorhandene Website und Beispiele, die Ihnen gefallen. Vor dem Start klären wir, wer Texte, Bilder und Übersetzungen vorbereitet. Fehlende Materialien werden so vor der Terminvereinbarung sichtbar."] },
        { id: "nakon-objave", links: [{ label: "Website nicht bei Google: Was prüfen?", route: { key: "googleVisibility" } }], title: "Veröffentlichung als Teil der vereinbarten Leistung", paragraphs: ["Vor der Veröffentlichung prüfen wir wichtige Nutzerwege und richten die vereinbarte Domain ein. Zugänge zu Domain, Hosting, Inhalten und einem möglichen Redaktionssystem werden im Angebot geklärt.", "Möchten Sie Inhalte selbst ändern, berücksichtigen wir Bedienung und Einweisung von Anfang an. Wartung, neue Funktionen, Hosting und kostenpflichtige Lizenzen werden von der einmaligen Erstellung getrennt. SEO-Grundlagen erleichtern Suchmaschinen das Verständnis, versprechen aber keine bestimmte Position."] },
        { id: "obim-i-predaja", title: "Preis, Zeitplan und Rechte an der Übergabe", paragraphs: ["Anzahl und Komplexität der Seiten, Inhalte, Sprachen, Integrationen und Freigaben beeinflussen Preis und Dauer. Umfang und Zeitplan werden vor der Umsetzung vereinbart; einen pauschalen Einstiegspreis veröffentlichen wir nicht.", "Im Angebot sollte stehen, auf wen Domain und Hosting registriert werden, wer Kontozugänge erhält und was übergeben wird: Inhalte, Dateien, Code oder Zugang zur Inhaltsverwaltung. Nutzungsrechte und Lizenzbeschränkungen werden vereinbart. Wartung, Domainverlängerung, Hosting und externe Dienste sind gesondert zu klärende Positionen."] },
      ],
      proof: { title: "So haben wir die Möbelauswahl gestaltet", text: "Im Demokonzept Hrast wählen Besucher Möbelart, Material und Maße. Das Beispiel zeigt einen Weg zur konkreteren Anfrage. Es ist kein Kundenprojekt und kein Beleg für gemessenen Umsatzanstieg.", project: "stolarija-hrast" },
      faq: [
        { question: "Was kostet eine Website?", answer: "Der Preis hängt von Struktur, Inhalten, Sprachen und Funktionen ab. Nach der Projektbeschreibung erstellen wir ein Angebot mit enthaltenen Leistungen. Unser Kostenratgeber hilft bei einer vergleichbaren Anfrage." },
        { question: "Sind mehrere Sprachen möglich?", answer: "Ja. Sprachen, Übersetzungen und eigene URLs werden vereinbart. Die bosnische und deutsche Version dieser Website zeigen einen Sprachwechsel, der auf der entsprechenden Seite bleibt." },
        { question: "Wovon hängt der Zeitplan ab?", answer: "Umfang, fertige Texte und Bilder, Übersetzungen, Integrationen und Rückmeldungen bestimmen den Zeitplan. Verfügbarkeit und Ablauf bestätigen wir nach Prüfung der Anfrage und vor Beginn der Arbeit." },
      ],
    },
    webshop: {
      title: "Onlineshop erstellen für BiH | MOST Studio",
      description: "Onlineshops für Bosnien-Herzegowina: Katalog, Kategorien, Varianten, Warenkorb und Bestellablauf. Demo mit 50 Artikeln testen und Projekt anfragen.",
      eyebrow: "ONLINESHOP-ENTWICKLUNG",
      heading: "Vom guten Produkt zur verständlichen Bestellung.",
      lead: "Ein Onlineshop soll Kunden helfen, ein Produkt zu finden, die passende Variante zu wählen und den Gesamtpreis vor der Bestellung zu verstehen. MOST Studio plant und entwickelt diesen Ablauf für Ihren Katalog und Ihr Geschäft.",
      summaryTitle: "Zuerst der Verkaufsablauf, dann der Bildschirm",
      summary: ["Produktkatalog und Varianten", "Warenkorb und verständlicher Einkauf", "Zahlung und Versand nach Vereinbarung"],
      sections: [
        { id: "katalog", title: "Ein Katalog, in dem man sich zurechtfindet", paragraphs: ["Zuerst prüfen wir Artikelzahl, Kategorien, Bilder und die für die Auswahl benötigten Angaben. Größe, Farbe, Material und Verfügbarkeit müssen sinnvoll dargestellt werden, besonders auf dem Smartphone.", "Wir klären, wer Produkte einpflegt und später aktualisiert. Fünfzig vollständige Artikel in einer Tabelle bedeuten einen anderen Aufwand als Hunderte Produkte ohne Bilder, Beschreibungen oder einheitliche Artikelnummern."], points: ["Kategorien und Filter anhand tatsächlicher Produkteigenschaften.", "Beschreibung, Bilder, Preis und Variantenauswahl auf der Produktseite.", "Suche und verständliche Anzeige bei fehlenden Treffern.", "Warenkorb mit Mengenänderung und Übersicht ausgewählter Artikel."] },
        { id: "narudzba", title: "Zahlung, Versand und Bestellungen", paragraphs: ["Vor der Auswahl einer Lösung klären wir, ob Sie nur in BiH oder auch international verkaufen, wie Bestellungen bearbeitet werden und welche Zahlungsarten Sie tatsächlich anbieten können. Nachnahme, Überweisung und Kartenzahlung haben unterschiedliche technische Anforderungen.", "Kartenzahlung und Versandanbindung hängen vom jeweiligen Anbieter und dessen Bedingungen ab. Das Angebot nennt Integrationen und die Verantwortung für deren Kosten. Bestellbestätigungen, Bestände, Verwaltung und Versandregeln planen wir vor der Entwicklung."] },
        { id: "demo", title: "Was Sie in unserer Demo testen können", paragraphs: ["Der Demo-Onlineshop enthält 50 Artikel. Testen Sie Kategorien, Filter, Produktauswahl, Warenkorb und einen simulierten Kaufabschluss. Produkte und Bilder dienen der Darstellung des Konzepts.", "Die Demo belastet keine Zahlungsmittel, erzeugt keine echten Bestellungen und ist nicht mit Ihrem Lager verbunden. Ein produktiver Shop erhält eine gesondert vereinbarte Bestellverwaltung und wird vor dem Start im gesamten Ablauf geprüft."] },
        { id: "priprema", title: "Was wir für eine Einschätzung benötigen", paragraphs: ["Schicken Sie Ihre Tätigkeit, die ungefähre Anzahl von Artikeln und Varianten, Beispieldaten eines Produkts, gewünschte Zahlungsarten und das Versandgebiet. Erwähnen Sie einen bestehenden Shop oder ein anzubindendes Geschäftssystem.", "Vor dem Start prüfen wir gemeinsam den Weg vom Artikel bis zur Testbestätigung, einschließlich nicht verfügbarer Varianten und fehlerhafter Eingaben. Das Design folgt diesem Ablauf und Ihrem Markenauftritt."] },
        { id: "obim-i-predaja", title: "Preis, Zeitplan und Rechte an der Übergabe", paragraphs: ["Anzahl und Komplexität der Seiten, Inhalte, Sprachen, Integrationen und Freigaben beeinflussen Preis und Dauer. Umfang und Zeitplan werden vor der Umsetzung vereinbart; einen pauschalen Einstiegspreis veröffentlichen wir nicht.", "Im Angebot sollte stehen, auf wen Domain und Hosting registriert werden, wer Kontozugänge erhält und was übergeben wird: Inhalte, Dateien, Code oder Zugang zur Inhaltsverwaltung. Nutzungsrechte und Lizenzbeschränkungen werden vereinbart. Wartung, Domainverlängerung, Hosting und externe Dienste sind gesondert zu klärende Positionen."] },
      ],
      proof: { title: "Testen Sie den Shop mit 50 Artikeln", text: "Sehen Sie sich den Katalog an und schließen Sie einen Testkauf ab. Die Demo führt weder Zahlungen noch echte Bestellungen aus.", shop: true },
      faq: [
        { question: "Bestimmt nur die Artikelzahl den Preis?", answer: "Nein. Varianten, Datenqualität, Zahlungsarten, Versand, Verwaltung und Integrationen beeinflussen den Umfang. Ein kleiner Katalog mit komplexen Regeln kann mehr Aufwand bedeuten als ein größerer, einfacher Katalog." },
        { question: "Kann ich Produkte selbst hinzufügen?", answer: "Ja, wenn die Katalogverwaltung Teil der vereinbarten Lösung ist. Vor der Umsetzung definieren wir bearbeitbare Daten, Zugänge und die Einführung in die Bedienung." },
        { question: "Nimmt die Demo bereits Zahlungen entgegen?", answer: "Nein. Sie zeigt das Einkaufserlebnis. Echte Zahlungen benötigen einen ausgewählten Anbieter, ein passendes Konto sowie separate Umsetzung und Tests." },
      ],
    },
    redesign: {
      title: "Website-Relaunch und Migration | MOST Studio",
      description: "Bestehende Websites verbessern: Inhalte prüfen, mobile Bedienung und Angebot schärfen, wichtige URLs planen. Online-Zusammenarbeit für Firmen in BiH.",
      eyebrow: "WEBSITE-RELAUNCH",
      heading: "Ihr Unternehmen entwickelt sich. Ihre Website sollte mitgehen.",
      lead: "Wenn die Website langsam, auf dem Handy schwer nutzbar oder inhaltlich überholt ist, beginnen wir mit einer Prüfung. Anschließend planen wir, was bleibt, was verbessert wird und wie Änderungen veröffentlicht werden.",
      summaryTitle: "Vor dem neuen Auftritt steht ein Plan",
      summary: ["Bestehende Inhalte und Abläufe prüfen", "Design für Ihr heutiges Angebot", "URLs und Weiterleitungen kontrollieren"],
      sections: [
        { id: "pregled", links: [{ label: "Indexierung und Google-Sichtbarkeit prüfen", route: { key: "googleVisibility" } }], title: "Wo kommen Besucher nicht weiter?", paragraphs: ["Wir prüfen Angebot, Navigation, Lesbarkeit, mobiles Menü, Kontakt und wichtige Formulare. Vorhandene Daten aus Search Console oder Analytics helfen dabei, tatsächliche Probleme von Annahmen zu unterscheiden.", "Manchmal reichen eine verständlichere Leistungsseite und ein besserer Kontaktweg. Manchmal begrenzt das vorhandene System notwendige Änderungen. Unsere Empfehlung orientiert sich an Zielen und Pflege, nicht nur am Aussehen."] },
        { id: "sadrzaj", title: "Erhalten, was bereits einen Wert hat", paragraphs: ["Texte, Bilder, Arbeiten und Seiten, die Besucher bringen, werden nicht automatisch verworfen. Wir erfassen Inhalte, vereinbaren Änderungen und ordnen wichtigen alten Adressen passende Ziele zu."], points: ["Vorhandene Seiten erfassen: behalten, verbessern oder zusammenführen.", "Leistungen neu ordnen und klare Kontaktmöglichkeiten schaffen.", "Mobiles Layout, lesbare Kontraste und zugängliche Formularfelder.", "Dauerhafte Weiterleitungen für geänderte URLs planen.", "Canonical- und Sprachangaben, Sitemap und Indexierbarkeit prüfen."] },
        { id: "objava", title: "So wird der Wechsel vorbereitet", paragraphs: ["Sie prüfen die neue Version, bevor die öffentliche Website umgestellt wird. Zeitpunkt, eine passende Sicherung und ein Rückweg bei schwerwiegenden Problemen werden vereinbart.", "Nach der Veröffentlichung kontrollieren wir Startseite, Leistungen, wichtige alte Links und Kontaktabläufe. Struktur- oder Inhaltsänderungen können Suchpositionen beeinflussen. Ein Migrationsplan reduziert Risiken, garantiert aber nicht den Erhalt aller Rankings."] },
        { id: "za-ponudu", title: "Was wir von Ihnen benötigen", paragraphs: ["Senden Sie die bestehende Adresse und drei Punkte, die Sie am meisten stören. Beschreiben Sie Änderungen im Geschäft, benötigte Funktionen und wer aktuell Inhalte pflegt.", "Zugänge zu Hosting, Domain und Analytics stimmen wir erst ab, wenn sie für die vereinbarte Arbeit benötigt werden. Geben Sie keine Passwörter in die Projektanfrage ein. Umfang, Migration, Lizenzen und mögliche Wartung werden im Angebot beschrieben."] },
        { id: "obim-i-predaja", title: "Preis, Zeitplan und Rechte an der Übergabe", paragraphs: ["Anzahl und Komplexität der Seiten, Inhalte, Sprachen, Integrationen und Freigaben beeinflussen Preis und Dauer. Umfang und Zeitplan werden vor der Umsetzung vereinbart; einen pauschalen Einstiegspreis veröffentlichen wir nicht.", "Im Angebot sollte stehen, auf wen Domain und Hosting registriert werden, wer Kontozugänge erhält und was übergeben wird: Inhalte, Dateien, Code oder Zugang zur Inhaltsverwaltung. Nutzungsrechte und Lizenzbeschränkungen werden vereinbart. Wartung, Domainverlängerung, Hosting und externe Dienste sind gesondert zu klärende Positionen."] },
      ],
      proof: { title: "Ein Beispiel für einen klareren Weg zur Leistung", text: "Die Demo Lipa führt durch Leistungs- und Terminauswahl. Sie zeigt unsere Herangehensweise an Nutzerwege, kein Ergebnis einer tatsächlichen Praxis.", project: "ordinacija-lipa" },
      faq: [
        { question: "Müssen wir die Domain wechseln?", answer: "Nein. Ein Relaunch kann normalerweise auf der bisherigen Domain bleiben. Einen Wechsel erwägen wir nur mit konkretem Grund und gesondertem Weiterleitungsplan." },
        { question: "Funktionieren bestehende Links weiter?", answer: "Wichtige URLs werden erfasst und erhalten oder passend weitergeleitet. Das prüfen wir beim Start. Für einen vollständigen Überblick benötigen wir zugängliche Daten zur bestehenden Website." },
        { question: "Können Sie die Website zunächst ansehen?", answer: "Senden Sie Link und Projektziel. Nach einer ersten Sichtung klären wir, ob gezielte Verbesserungen oder ein größerer Relaunch sinnvoll sind. Ausführliche Analyse und Umsetzung gehören in den vereinbarten Umfang." },
      ],
    },
    coverage: {
      title: "Webdesign in Bosnien-Herzegowina: online arbeiten | MOST Studio",
      description: "Website-Erstellung für Unternehmen in ganz Bosnien-Herzegowina mit Online-Zusammenarbeit. MOST Studio: Webdesign, Onlineshop und Relaunch mit klarer Zusammenarbeit.",
      eyebrow: "ONLINE-ZUSAMMENARBEIT · BOSNIEN-HERZEGOWINA",
      heading: "Websites für Unternehmen in Bosnien-Herzegowina.",
      lead: "MOST Studio bietet Webdesign, Website-Erstellung, Onlineshops und Relaunches für Kunden in ganz Bosnien-Herzegowina. Das Projekt lässt sich von der ersten Beschreibung bis zur Freigabe und Veröffentlichung online durchführen.",
      summaryTitle: "Für Unternehmen in ganz BiH",
      summary: ["Mostar und Herzegowina", "Für Unternehmen in ganz Bosnien-Herzegowina", "Online-Abstimmung auf Bosnisch oder Deutsch"],
      sections: [
        { id: "mostar", title: "Websites für Unternehmen aus Mostar", paragraphs: ["Für ein Unternehmen in Mostar sollte die Website Angebot, Zielgruppe und Kontakt verständlich machen. Bei einem Dienstleister können das Arbeitsbeispiele und eine Anfrage sein, bei einer Unterkunft das Angebot und eine vereinbarte Buchung, bei einem Händler Katalog oder Shop.", "MOST Studio arbeitet online. Ein Bürobesuch ist nicht erforderlich: Sie senden Beschreibung und Materialien, wir stimmen die Richtung ab und Sie prüfen die einzelnen Phasen über einen Link. Standort, Telefonnummer und Öffnungszeiten auf Ihrer Website beruhen auf Ihren tatsächlichen Angaben."] },
        { id: "gradovi", links: [{ label: "Unternehmenswebsites: Inhalt und Funktionen", route: { key: "website" } }, { label: "Onlineshop und Lieferung in BiH", route: { key: "webshop" } }], title: "Derselbe Ansatz für andere Städte in BiH", paragraphs: ["Unsere Online-Zusammenarbeit steht Unternehmen aus Sarajevo, Banja Luka, Tuzla, Zenica und anderen Orten in Bosnien-Herzegowina offen. Vor der Umsetzung klären wir Kundengebiet, Einsatz- oder Liefergebiet und die benötigten Sprachen. Ihr Standort steht der Abstimmung und Projektprüfung auf Distanz nicht im Weg.", "Bedient ein Unternehmen mehrere Städte, prüfen wir zunächst, ob sich Angebot oder lokale Inhalte unterscheiden. Eine eigene Stadtseite ist sinnvoll, wenn sie nützliche Informationen wie tatsächliche Liefergebiete, Teams oder ausgeführte Arbeiten enthält. Stadtnamen allein erklären keinen Nutzen."] },
        { id: "online-proces", title: "So läuft ein Projekt auf Distanz ab", paragraphs: ["Die erste Anfrage beschreibt Tätigkeit, Website-Ziel, vorhandene Adresse und benötigte Funktionen. Nach der Klärung folgen vereinbarter Umfang und Angebot. Darauf baut der Zeitplan auf."], points: ["Materialien: Leistungen, Fotos, Markenauftritt und bestätigte Unternehmensdaten.", "Richtung: Seitenstruktur und Designvorschau mit Ihren Rückmeldungen.", "Umsetzung: Testversion zur Prüfung auf Handy und Computer.", "Veröffentlichung: Links, Anfragen, Domain und vereinbarte Übergabe prüfen."] },
        { id: "publika", title: "Für den heimischen und deutschsprachigen Markt", paragraphs: ["Arbeiten Sie auch mit Kunden in Deutschland, können wir eine bosnische und deutsche Website-Version planen. Jede Sprache erhält passende Inhalte, Navigation und eine eigene Adresse. Übersetzung und Prüfung geschäftlicher Begriffe werden im Umfang vereinbart.", "Der Preis hängt von der benötigten Umsetzung ab, nicht vom Stadtnamen. Informieren Sie sich über Leistungen, testen Sie Demokonzepte und senden Sie eine kurze Beschreibung Ihres Projekts."] },
      ],
      proof: { title: "Den Ansatz vor dem Gespräch prüfen", text: "Meridijan ist ein eigenständig entwickeltes Beratungskonzept. Eine kurze interaktive Einschätzung zeigt, wie Besucher zur passenden Leistung geführt werden können.", project: "meridijan-savjetovanje" },
      faq: [
        { question: "Kann ich ein Büro in Mostar besuchen?", answer: "Unsere Zusammenarbeit findet online statt. Wir stellen dieses Angebot nicht als besuchbares Büro in Mostar oder anderen Städten dar. Kontaktieren Sie uns auf Instagram oder per E-Mail." },
        { question: "Arbeiten Sie auch für kleinere Orte und Betriebe?", answer: "Ja. Ein Standort in BiH ist kein Hindernis für die Online-Zusammenarbeit. Der Umfang richtet sich nach Angebot und Aufgabe, vom einzelnen Betrieb bis zum Unternehmen mit mehreren Leistungen." },
        { question: "Garantieren Sie Platz eins bei Google?", answer: "Nein. Wir können technische Grundlagen, Inhalte und Struktur verbessern. Suchergebnisse hängen auch von Wettbewerb, Reputation, echten Referenzen und Googles Bewertung der Website ab." },
      ],
    },
    pricing: {
      title: "Website-Kosten in BiH: Was ein Angebot bestimmt | MOST Studio",
      description: "Was bestimmt die Kosten einer Website oder eines Shops in BiH? Umfang, Inhalte, Sprachen, Integrationen und laufende Kosten mit MOST Studio vergleichen.",
      eyebrow: "RATGEBER ZUR PROJEKTPLANUNG",
      heading: "Was kostet eine Website in Bosnien-Herzegowina?",
      lead: "Website-Kosten in Bosnien-Herzegowina hängen von Inhalten, Funktionen, Sprachen und der Vorbereitung ab. MOST Studio erstellt nach einer kurzen Projektbeschreibung ein Angebot mit definiertem Umfang und zusätzlichen Kosten.",
      summaryTitle: "Für ein vergleichbares Angebot nennen Sie",
      summary: ["Website-Ziel und ungefähre Inhalte", "Funktionen und Anzahl der Sprachen", "Vorhandene Materialien und Wunschtermin"],
      sections: [
        { id: "obim", title: "Drei Aufgaben mit unterschiedlichem Umfang", table: { caption: "Was Sie in Angeboten vergleichen sollten", columns: ["Projektart", "Was konkret vereinbart werden sollte"], rows: [["Unternehmenspräsentation", "Seitenumfang, Texte und Bilder, Kontakt und Inhaltsverwaltung."], ["Mehrsprachige Website", "Verantwortung für Übersetzungen, Umfang je Sprache und Prüfung aller Versionen."], ["Onlineshop", "Produkte und Varianten, Datenpflege, Bestand, Zahlung, Lieferung und Verwaltung."], ["Relaunch", "Erhaltenswerte Inhalte, alte Adressen, Migration und Weiterleitungen."]] }, links: [{ label: "Unternehmenswebsite erstellen lassen", route: { key: "website" } }, { label: "Onlineshop erstellen lassen", route: { key: "webshop" } }, { label: "Relaunch und Migration", route: { key: "redesign" } }], paragraphs: ["Eine Präsentationswebsite stellt Tätigkeit, Leistungen und Kontakt vor. Eine mehrsprachige Unternehmenswebsite ergänzt eigene Inhalte und die Prüfung jeder Sprachfassung. Ein Onlineshop bringt Produkte, Varianten, Warenkorb, Bestellungen, Zahlung und Verwaltung hinzu.", "Zwei Angebote für eine ‘Website’ sind deshalb nicht automatisch vergleichbar. Verlangen Sie eine Liste von Seiten, Funktionen und Verantwortlichkeiten. Ein günstigeres Angebot kann eine kleinere Aufgabe abdecken; ein höherer Preis ohne klare Leistung ist nicht automatisch besser."] },
        { id: "faktori", title: "Was den Preis besonders beeinflusst", paragraphs: ["Diese Punkte sollten vor der Annahme eines Angebots geklärt sein."], points: ["Inhalte: fertige Texte und Bilder oder deren Vorbereitung und Bearbeitung.", "Struktur: eine Landingpage oder mehrere eigenständige Leistungs- und Inhaltsseiten.", "Sprachen: Übersetzungsumfang, Freigabe und Prüfung jeder Fassung.", "Funktionen: Kontaktlink, Formular, Buchung, Konfigurator oder Zahlung.", "Integrationen: Katalog, Geschäftssoftware, Versand oder E-Mail-Dienst.", "Migration: bestehende Inhalte, wichtige URLs und Weiterleitungen.", "Bearbeitung: welche Inhalte Sie später selbst ändern möchten."] },
        { id: "troskovi", title: "Einmalige Erstellung und laufende Kosten", paragraphs: ["Trennen Sie Erstellung, Domain, Hosting, Lizenzen und externe Dienste. Bei Shops können Gebühren des Zahlungsanbieters hinzukommen. Jede Position sollte erklären, wer zahlt und wann sie verlängert wird.", "Wartung kann Prüfungen, Aktualisierungen und vereinbarte kleinere Änderungen umfassen. Neue Seiten, Kampagnen oder größere Funktionen gehören nicht automatisch dazu. Fragen Sie nach Kontozugängen, Materialübergabe und dem Ergebnis am Projektende."] },
        { id: "rok", title: "Termin und Rückmeldungen gehören zum Plan", paragraphs: ["Die Umsetzung kann vorankommen, wenn wichtige Inhalte und Entscheidungen verfügbar sind. Klären Sie die Freigabe, enthaltene Korrekturrunden und den Zeitpunkt der Materiallieferung.", "Statt derselben Frist für jedes Projekt sollten Phasen vereinbart werden: Struktur, Design, Umsetzung, Prüfung und Veröffentlichung. Umfangsänderungen haben dadurch einen nachvollziehbaren Einfluss auf Zeit und Kosten."] },
        { id: "zahtjev", title: "Eine kurze Anfrage, die Sie heute senden können", paragraphs: ["Beschreiben Sie Tätigkeit, Kunden, gewünschte Besucheraktion und notwendige Funktionen. Ergänzen Sie vorhandene Website, Sprachen, verfügbare Materialien und Wunschtermin.", "Ein vorhandener Budgetrahmen hilft bei Prioritäten und Phasen. Als Antwort sollten ein konkreter Umfang und ein Angebot stehen. Unsere Projektanfrage bereitet eine Instagram-Nachricht vor, die Sie vor dem Versand prüfen können."] },
      ],
      proof: { title: "Funktionen vergleichen, nicht nur das Aussehen", text: "Die Demo Hrast enthält Möbel-, Material- und Maßauswahl. Diese Interaktion bedeutet einen anderen Umfang als eine statische Galerie. Testen Sie das Beispiel zur Vorbereitung Ihrer Anforderungen.", project: "stolarija-hrast" },
      faq: [
        { question: "Gibt es einen festen Einstiegspreis?", answer: "Aktuell veröffentlichen wir keinen universellen Einstiegspreis, weil zuerst der Umfang geklärt wird. Senden Sie Beschreibung und Funktionen für ein konkretes Projektangebot." },
        { question: "Sind Domain und Hosting enthalten?", answer: "Das wird im Angebot festgehalten. Prüfen Sie Betrag, Laufzeit, Verlängerung und Kontoinhaberschaft. Gehen Sie nicht davon aus, dass diese dauerhaft im einmaligen Erstellungspreis enthalten sind." },
        { question: "Bedeutet SEO, für Platz eins zu bezahlen?", answer: "Nein. Technische Vorbereitung und gute Inhalte helfen Suchmaschinen beim Verständnis. Eine organische Position wird nicht mit der Website-Erstellung gekauft und kann nicht garantiert werden. Google-Anzeigen sind eine separate Leistung." },
      ],
    },
  },
};

export const pageLabels: Record<Locale, Record<ContentPageKey, string>> = {
  bs: { website: "Izrada web stranica", webshop: "Izrada webshopa", redesign: "Redizajn web stranica", coverage: "Online saradnja u BiH", pricing: "Cijena izrade web stranice", googleVisibility: "Vidljivost na Googleu", socialWebsite: "Web stranica i Instagram" },
  de: { website: "Website-Erstellung", webshop: "Onlineshop", redesign: "Website-Relaunch", coverage: "Online-Zusammenarbeit in BiH", pricing: "Website-Kosten", googleVisibility: "Google-Sichtbarkeit", socialWebsite: "Website und Instagram" },
};
