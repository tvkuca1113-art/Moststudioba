import { Photo } from "@/components/media/Photo";
import { ArrowUpRight } from "@/components/ui/icons";
import type { DemoKey } from "@/content/projects";
import type { ImageKey } from "@/content/images";
import type { Locale } from "@/lib/i18n/config";
import s from "./PremiumDemos.module.css";

/** The real first screen is shared with portfolio previews, so they never drift. */
export function DemoCover({
  kind,
  locale,
  primary = "#kontakt",
  secondary = "#projekti",
  preview = false,
  priority = false,
}: {
  kind: DemoKey;
  locale: Locale;
  primary?: string;
  secondary?: string;
  preview?: boolean;
  priority?: boolean;
}) {
  const de = locale === "de";
  const data =
    kind === "trades"
      ? {
          brand: "HRAST",
          eyebrow: de ? "TISCHLEREI · NACH MASS" : "STOLARIJA · PO MJERI",
          first: de ? "Ein Raum." : "Vaš prostor.",
          last: de ? "Ganz Ihrer." : "Vaša mjera.",
          lead: de
            ? "Küchen, Einbauschränke und Möbel, die Ihren Alltag verstehen. Vom ersten Maß bis zum letzten Detail."
            : "Kuhinje, plakari i namještaj koji prate vaš način života. Od prve mjere do posljednjeg detalja.",
          cta: de ? "Projekt zusammenstellen" : "Sastavite svoj projekt",
          nav: de ? "Kollektion" : "Kolekcija",
          photo: "hrast-kuhinja",
          label: de
            ? "Die Küche als Mittelpunkt."
            : "Kuhinja kao središte doma.",
          caption: de
            ? "Material, Licht und klare Linien."
            : "Materijal, svjetlo i čiste linije.",
          facts: de
            ? [
                ["01 / KONZEPT", "Ihr Raum, Ihr Rhythmus"],
                ["02 / MATERIAL", "Eiche. Nuss. Mattweiß."],
                ["03 / PROJEKT", "Mit wenigen Angaben beginnen"],
              ]
            : [
                ["01 / KONCEPT", "Prostor koji prati vas"],
                ["02 / MATERIJAL", "Hrast. Orah. Mat bijela."],
                ["03 / PROJEKT", "Počnite s nekoliko odabira"],
              ],
        }
      : kind === "clinic"
        ? {
            brand: "lipa.",
            eyebrow: de ? "ZAHNMEDIZIN MIT RUHE" : "STOMATOLOGIJA S PAŽNJOM",
            first: de ? "Gut aufgehoben." : "Mirniji dolazak.",
            last: de ? "Gut lächeln." : "Ljepši osmijeh.",
            lead: de
              ? "Zeit für Ihre Fragen. Ein verständlicher Plan. Und ein erster Besuch, bei dem Sie wissen, was Sie erwartet."
              : "Vrijeme za vaša pitanja. Razumljiv plan. I prvi pregled na koji dolazite znajući šta vas očekuje.",
            cta: de ? "Wunschtermin wählen" : "Odaberite svoj termin",
            nav: de ? "Behandlungen" : "Usluge",
            photo: "lipa-hero",
            label: de
              ? "Ihr Besuch beginnt hier."
              : "Vaša posjeta počinje ovdje.",
            caption: de
              ? "Leistung → Termin → Übersicht"
              : "Usluga → Termin → Pregled",
            facts: de
              ? [
                  ["ERSTER BESUCH", "Raum für Ihre Fragen"],
                  ["TERMINWAHL", "Online in drei Schritten"],
                  ["IHR PLAN", "Jeder Schritt verständlich"],
                ]
              : [
                  ["PRVI DOLAZAK", "Prostor za vaša pitanja"],
                  ["ODABIR TERMINA", "Online u tri koraka"],
                  ["VAŠ PLAN", "Svaki korak jasno objašnjen"],
                ],
          }
        : {
            brand: "MERIDIJAN",
            eyebrow: de
              ? "KLARHEIT FÜR UNTERNEHMEN"
              : "JASAN SMJER ZA VAŠU FIRMU",
            first: de ? "Komplexe Fragen." : "Složene odluke.",
            last: de ? "Klare nächste Schritte." : "Jasan sljedeći korak.",
            lead: de
              ? "Finanzen, Organisation, Wachstum. Wir übersetzen Ihre Herausforderungen in einen überschaubaren Arbeitsplan."
              : "Finansije, organizacija, rast. Poslovne izazove pretvaramo u pregledan plan rada s jasnim prioritetima.",
            cta: de ? "Zusammenarbeit planen" : "Sastavite plan saradnje",
            nav: de ? "Unsere Arbeitsfelder" : "Područja rada",
            photo: "meridijan-hero",
            label: de ? "Perspektive vor Aktion." : "Perspektiva prije poteza.",
            caption: de
              ? "Ein Gespräch. Ein klarer Anfang."
              : "Jedan razgovor. Jasan početak.",
            facts: de
              ? [
                  ["01 / VERSTEHEN", "Die richtigen Fragen"],
                  ["02 / FOKUS", "Ein gemeinsamer Schwerpunkt"],
                  ["03 / UMSETZEN", "Ein konkreter Arbeitsplan"],
                ]
              : [
                  ["01 / RAZUMJETI", "Prava pitanja"],
                  ["02 / FOKUS", "Zajednički prioritet"],
                  ["03 / DJELOVATI", "Konkretan plan rada"],
                ],
          };
  const Heading = preview ? "div" : "h1";
  return (
    <div
      className={`${s.surface} ${kind === "clinic" ? s.clinic : kind === "advisory" ? s.advisory : ""}`}
    >
      <div className={s.coverNav}>
        <span className={s.wordmark}>{data.brand}</span>
        <nav
          className={s.navLinks}
          aria-label={preview ? undefined : data.brand}
        >
          <a href={secondary}>{data.nav}</a>
          <a href={primary}>{de ? "So starten wir" : "Kako počinjemo"}</a>
        </nav>
        <a className={s.navAction} href={primary}>
          {de ? "Projekt entdecken" : "Započnimo"}
        </a>
      </div>
      <section className={s.coverGrid}>
        <div className={s.coverCopy}>
          <p className={s.eyebrow}>{data.eyebrow}</p>
          <Heading className={s.coverTitle}>
            {data.first}
            <br />
            <em>{data.last}</em>
          </Heading>
          <p className={s.coverLead}>{data.lead}</p>
          <a className={s.action} href={primary}>
            {data.cta}
            <ArrowUpRight />
          </a>
        </div>
        <div className={s.coverPhoto}>
          <Photo
            name={data.photo as ImageKey}
            locale={locale}
            priority={priority}
            decorative
            className={s.photo}
            sizes={
              preview
                ? "(max-width: 768px) 100vw, 60vw"
                : "(max-width: 760px) 100vw, 55vw"
            }
          />
          <div className={s.photoLabel}>
            <div>
              <strong>{data.label}</strong>
              {data.caption}
            </div>
            <span aria-hidden="true">01 / 03</span>
          </div>
        </div>
      </section>
      <div className={s.coverFoot}>
        {data.facts.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
