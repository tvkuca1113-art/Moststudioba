"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Photo } from "@/components/media/Photo";
import { ArrowRight, CheckIcon } from "@/components/ui/icons";
import { tradesContent, type WoodFinish } from "@/content/demos/trades";
import { FurniturePreview } from "./FurniturePreview";
import { advisoryContent } from "@/content/demos/advisory";
import {
  bookingDays,
  bookingDateLabel,
  demoTimes,
  demoTimeAvailable,
  dimensionBounds,
  clampDimension,
  choosePlan,
  type Room,
  type PlanArea,
} from "@/lib/demo-logic";
import type { Locale } from "@/lib/i18n/config";
import { translator } from "@/lib/i18n/localized";
import s from "./PremiumDemos.module.css";

function saveText(filename: string, text: string) {
  const url = URL.createObjectURL(
    new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function DemoNote({ locale }: { locale: Locale }) {
  return (
    <p className={s.fine}>
      {locale === "de"
        ? "Interaktives Demo. Ihre Angaben bleiben in diesem Browser. Keine Bestellung, keine echte Reservierung."
        : "Interaktivni demo. Podaci ostaju u ovom pregledniku. Bez slanja upita i stvarnih rezervacija."}
    </p>
  );
}
function ToolHeader({
  locale,
  number,
  title,
  lead,
}: {
  locale: Locale;
  number: string;
  title: string;
  lead: string;
}) {
  return (
    <div className={s.toolHeader}>
      <div>
        <p className={s.eyebrow}>
          {number} /{" "}
          {locale === "de" ? "IHR NÄCHSTER SCHRITT" : "VAŠ SLJEDEĆI KORAK"}
        </p>
        <h2 className={s.toolTitle}>{title}</h2>
        <p className={s.toolLead}>{lead}</p>
      </div>
      <span className={s.badge}>DEMO</span>
    </div>
  );
}
function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className={s.faq}>
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function FurnitureConfigurator({ locale }: { locale: Locale }) {
  const de = locale === "de";
  const t = translator(locale);
  const uid = useId();
  const [room, setRoom] = useState<Room>("kitchen");
  const [finish, setFinish] = useState<WoodFinish>("oak");
  const [dimension, setDimension] = useState(320);
  const [extras, setExtras] = useState(["measure", "assembly"]);
  const [saved, setSaved] = useState(false);
  const material = tradesContent.materials.items.find(
    (item) => item.id === finish,
  )!;
  const [min, max] = dimensionBounds(room);
  const roomLabels = de
    ? ["Küche", "Einbauschrank", "Esstisch"]
    : ["Kuhinja", "Plakar", "Trpezarijski sto"];
  const extraOptions = [
    ["measure", de ? "Aufmaß vor Ort" : "Mjerenje na lokaciji"],
    ["assembly", de ? "Lieferung und Montage" : "Dostava i montaža"],
    ["finish", de ? "Zusätzliche Schutzbehandlung" : "Dodatna zaštitna obrada"],
  ];
  const roomLabel = roomLabels[["kitchen", "wardrobe", "table"].indexOf(room)];
  const exportBrief = () => {
    saveText(
      "MOST-Hrast-projekt.txt",
      `MOST STUDIO — DEMO HRAST\n\n${roomLabel}\n${t(material.name)}\n${dimension} cm\n${extraOptions
        .filter(([id]) => extras.includes(id))
        .map(([, label]) => label)
        .join(
          "\n",
        )}\n\n${de ? "Konzept für ein Erstgespräch. Keine Bestellung oder verbindliche Planung." : "Koncept za prvi razgovor. Nije narudžba ni konačan izvedbeni plan."}`,
    );
    setSaved(true);
  };
  return (
    <section
      className={s.tool}
      aria-label={de ? "Möbelkonfigurator" : "Konfigurator namještaja"}
    >
      <ToolHeader
        locale={locale}
        number="01"
        title={
          de
            ? "Aus einer Idee wird Ihr Projekt."
            : "Od ideje do vašeg projekta."
        }
        lead={
          de
            ? "Raum, Oberfläche, Maß. Stellen Sie Ihren Wunsch zusammen und nehmen Sie die Zusammenfassung mit."
            : "Prostor, materijal, dimenzija. Sastavite ono što želite i preuzmite sažetak za prvi razgovor."
        }
      />
      <div className={s.toolGrid}>
        <div className={s.panel}>
          <fieldset>
            <legend className={s.legend}>
              {de ? "01 · Was planen Sie?" : "01 · Šta planirate?"}
            </legend>
            <div className={s.options}>
              {(["kitchen", "wardrobe", "table"] as Room[]).map((value, i) => (
                <button
                  type="button"
                  key={value}
                  aria-pressed={room === value}
                  className={`${s.choice} ${room === value ? s.selected : ""}`}
                  onClick={() => {
                    setRoom(value);
                    setDimension((current) => clampDimension(value, current));
                    setSaved(false);
                  }}
                >
                  {roomLabels[i]}
                </button>
              ))}
            </div>
          </fieldset>
          <FurniturePreview room={room} finish={finish} label={`${roomLabel} — ${t(material.name)}`} className={s.mobilePreview} />
          <fieldset>
            <legend className={s.legend}>
              {de ? "02 · Ihre Oberfläche" : "02 · Vaša završna obrada"}
            </legend>
            <div className={s.options}>
              {tradesContent.materials.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={finish === item.id}
                  className={`${s.choice} ${finish === item.id ? s.selected : ""}`}
                  onClick={() => {
                    setFinish(item.id);
                    setSaved(false);
                  }}
                >
                  <Photo
                    name={item.image}
                    locale={locale}
                    decorative
                    className={s.swatch}
                    sizes="38px"
                  />
                  {t(item.name)}
                </button>
              ))}
            </div>
            <div className={s.sample}>
              <Photo
                name={material.image}
                locale={locale}
                className={s.samplePhoto}
                sizes="82px"
              />
              <p>{t(material.note)}</p>
            </div>
          </fieldset>
          <fieldset>
            <legend className={s.legend}>
              {de ? "03 · Ungefähre Breite" : "03 · Okvirna širina"}{" "}
              <strong>{dimension} cm</strong>
            </legend>
            <label htmlFor={`${uid}-width`} className="sr-only">
              {de ? "Breite in Zentimetern" : "Širina u centimetrima"}
            </label>
            <input
              id={`${uid}-width`}
              className={s.range}
              type="range"
              min={min}
              max={max}
              step="10"
              value={dimension}
              onChange={(e) => {
                setDimension(Number(e.target.value));
                setSaved(false);
              }}
            />
            <div className={s.rangeLabels}>
              <span>{min} cm</span>
              <span>{max} cm</span>
            </div>
          </fieldset>
          <fieldset>
            <legend className={s.legend}>
              {de ? "04 · Was soll dazugehören?" : "04 · Šta uključujemo?"}
            </legend>
            <div className={s.checks}>
              {extraOptions.map(([id, label]) => (
                <label key={id}>
                  <input
                    type="checkbox"
                    checked={extras.includes(id)}
                    onChange={() => {
                      setExtras((current) =>
                        current.includes(id)
                          ? current.filter((x) => x !== id)
                          : [...current, id],
                      );
                      setSaved(false);
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <aside
          className={s.summary}
          aria-label={de ? "Projektübersicht" : "Sažetak projekta"}
        >
          <FurniturePreview room={room} finish={finish} label={`${roomLabel} — ${t(material.name)}`} className={s.desktopPreview} />
          <p className={s.eyebrow}>{de ? "IHRE AUSWAHL" : "VAŠ ODABIR"}</p>
          <h3>{roomLabel}</h3>
          <dl aria-live="polite">
            <div>
              <dt>{de ? "Material" : "Materijal"}</dt>
              <dd>{t(material.name)}</dd>
            </div>
            <div>
              <dt>{de ? "Breite" : "Širina"}</dt>
              <dd>{dimension} cm</dd>
            </div>
            <div>
              <dt>{de ? "Leistungen" : "Dodatne usluge"}</dt>
              <dd>{extras.length}</dd>
            </div>
          </dl>
          <p className={s.fine}>
            {de
              ? "Die Vorschau zeigt die gewählte Oberfläche illustrativ. Maße werden im Projekt gespeichert; die Bildproportionen bleiben unverändert."
              : "Prikaz ilustrira odabranu završnu obradu. Dimenzije se bilježe u projektu; proporcije fotografije ostaju iste."}
          </p>
          <div className={s.actions}>
            <button type="button" className={s.action} onClick={exportBrief}>
              {de ? "Projekt herunterladen" : "Preuzmi svoj projekt"}
              <ArrowRight />
            </button>
          </div>
          <p role="status" className={s.fine}>
            {saved
              ? de
                ? "Ihre Projektdatei wurde zum Download vorbereitet."
                : "Vaš sažetak je pripremljen za preuzimanje."
              : de
                ? "Die endgültigen Maße werden beim Aufmaß bestätigt."
                : "Konačne dimenzije potvrđuju se na mjerenju."}
          </p>
          <DemoNote locale={locale} />
        </aside>
      </div>
      <Faq
        items={
          de
            ? [
                [
                  "Brauche ich genaue Maße?",
                  "Nein. Für die erste Orientierung genügt eine ungefähre Breite. Die technische Planung beginnt erst nach einem Aufmaß.",
                ],
                [
                  "Ist das schon ein Angebot?",
                  "Nein. Die Zusammenfassung hält Ihre Auswahl fest. Materialbedarf, Preis und Machbarkeit werden separat geprüft.",
                ],
              ]
            : [
                [
                  "Moram li imati tačne mjere?",
                  "Za prvi razgovor dovoljna je približna širina. Tehnička priprema počinje nakon mjerenja prostora.",
                ],
                [
                  "Je li ovo već ponuda?",
                  "Ne. Sažetak bilježi vaš odabir. Potrošnja materijala, cijena i mogućnosti izvedbe provjeravaju se zasebno.",
                ],
              ]
        }
      />
    </section>
  );
}

const noSubscription = () => () => {};
const todaySnapshot = () => new Date().toISOString().slice(0, 10);
const serverDay = () => "2026-09-17";
export function AppointmentBooking({ locale }: { locale: Locale }) {
  const de = locale === "de";
  const uid = useId();
  const today = useSyncExternalStore(noSubscription, todaySnapshot, serverDay);
  const dates = bookingDays(today);
  const [step, setStep] = useState(0);
  const [service, setService] = useState(0);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState("");
  const [name, setName] = useState(de ? "Demo Gast" : "Demo korisnik");
  const [email, setEmail] = useState("demo@example.com");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  useEffect(() => {
    if (interacted.current) heading.current?.focus({ preventScroll: true });
  }, [step, done]);
  const services = de
    ? ["Erste Untersuchung", "Professionelle Reinigung", "Ästhetische Beratung"]
    : ["Prvi pregled", "Profesionalno čišćenje", "Estetsko savjetovanje"];
  const durations = [30, 45, 30];
  const labels = de
    ? ["Leistung", "Wunschtermin", "Übersicht"]
    : ["Usluga", "Termin", "Pregled"];
  const dateLabel = (iso: string) => bookingDateLabel(iso, locale);
  const changeStep = (next: number) => {
    interacted.current = true;
    setStep(next);
    setError("");
  };
  const confirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!demoTimeAvailable(day, service, slot)) {
      setError(de ? "Bitte wählen Sie einen Termin." : "Odaberite termin.");
      changeStep(1);
      return;
    }
    if (!name.trim()) {
      setError(
        de ? "Bitte geben Sie einen Namen ein." : "Unesite ime za probu.",
      );
      return;
    }
    interacted.current = true;
    setDone(true);
  };
  const reset = () => {
    interacted.current = true;
    setDone(false);
    setStep(0);
    setSlot("");
    setName(de ? "Demo Gast" : "Demo korisnik");
    setEmail("demo@example.com");
    setService(0);
    setDay(0);
    setError("");
  };
  return (
    <section
      className={`${s.tool} ${s.booking}`}
      aria-label={de ? "Demo Terminbuchung" : "Probno zakazivanje"}
    >
      <ToolHeader
        locale={locale}
        number="02"
        title={
          de
            ? "Ein Termin, der in Ihren Tag passt."
            : "Termin koji se uklapa u vaš dan."
        }
        lead={
          de
            ? "Testen Sie den vollständigen Ablauf. Alle freien Zeiten sind Beispieldaten; es wird kein echter Termin gebucht."
            : "Isprobajte cijeli postupak. Slobodni termini su pokazni podaci; stvarna rezervacija se ne kreira."
        }
      />
      <div className={s.toolGrid}>
        <div className={s.panel}>
          {!done ? (
            <>
              <ol className={s.progress}>
                {labels.map((label, i) => (
                  <li
                    className={i <= step ? s.current : ""}
                    aria-current={i === step ? "step" : undefined}
                    key={label}
                  >
                    0{i + 1} · {label}
                  </li>
                ))}
              </ol>
              <h3 ref={heading} tabIndex={-1} className={s.question}>
                {step === 0
                  ? de
                    ? "Wie können wir Ihnen helfen?"
                    : "Koju uslugu trebate?"
                  : step === 1
                    ? de
                      ? "Wann passt es Ihnen?"
                      : "Kada vam odgovara?"
                    : de
                      ? "Alles auf einen Blick."
                      : "Sve na jednom mjestu."}
              </h3>
              {step === 0 ? (
                <>
                  <div className={s.options}>
                    {services.map((label, i) => (
                      <button
                        className={`${s.choice} ${service === i ? s.selected : ""}`}
                        aria-pressed={service === i}
                        type="button"
                        key={label}
                        onClick={() => {
                          setService(i);
                          setSlot("");
                        }}
                      >
                        <strong>{label}</strong>
                        <span>{durations[i]} min</span>
                      </button>
                    ))}
                  </div>
                  <div className={s.actions}>
                    <button
                      className={s.action}
                      type="button"
                      onClick={() => changeStep(1)}
                    >
                      {de ? "Weiter zum Termin" : "Odaberite datum"}
                      <ArrowRight />
                    </button>
                  </div>
                </>
              ) : null}
              {step === 1 ? (
                <>
                  <p className={s.label}>
                    {de
                      ? "Demo-Kalender · nächste Werktage"
                      : "Demo kalendar · naredni radni dani"}
                  </p>
                  <div className={s.dates}>
                    {dates.map((iso, i) => (
                      <button
                        type="button"
                        className={`${s.choice} ${day === i ? s.selected : ""}`}
                        aria-pressed={day === i}
                        aria-label={dateLabel(iso)}
                        key={iso}
                        onClick={() => {
                          setDay(i);
                          setSlot("");
                        }}
                      >
                        <span>
                          {bookingDateLabel(iso, locale, true)}
                        </span>
                        <strong>{Number(iso.slice(-2))}</strong>
                        <span>{iso.slice(5, 7)}.</span>
                      </button>
                    ))}
                  </div>
                  <fieldset className="mt-7">
                    <legend className={s.legend}>
                      {de
                        ? "Verfügbare Beispielzeiten"
                        : "Dostupni probni termini"}
                    </legend>
                    <div className={`${s.options} ${s.slots}`}>
                      {demoTimes.map((time) => (
                        <button
                          type="button"
                          key={time}
                          disabled={!demoTimeAvailable(day, service, time)}
                          aria-pressed={slot === time}
                          className={`${s.choice} ${slot === time ? s.selected : ""}`}
                          onClick={() => setSlot(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className={s.actions}>
                    <button
                      type="button"
                      className={`${s.action} ${s.secondary}`}
                      onClick={() => changeStep(0)}
                    >
                      {de ? "Zurück" : "Nazad"}
                    </button>
                    <button
                      type="button"
                      disabled={!slot}
                      className={s.action}
                      style={{ opacity: slot ? 1 : 0.45 }}
                      onClick={() => changeStep(2)}
                    >
                      {de ? "Weiter zur Übersicht" : "Pregled odabira"}
                      <ArrowRight />
                    </button>
                  </div>
                </>
              ) : null}
              {step === 2 ? (
                <form onSubmit={confirm}>
                  <p className={s.fine}>
                    {de
                      ? "Sie können die vorausgefüllten Testdaten verwenden. Es wird nichts versendet."
                      : "Možete koristiti već upisane testne podatke. Ništa se ne šalje."}
                  </p>
                  <label className={`${s.label} mt-5`} htmlFor={`${uid}-name`}>
                    {de ? "Name für den Test" : "Ime za probu"}
                  </label>
                  <input
                    className={s.input}
                    id={`${uid}-name`}
                    value={name}
                    required
                    maxLength={80}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className={`${s.label} mt-5`} htmlFor={`${uid}-email`}>
                    {de ? "E-Mail für den Test" : "Email za probu"}
                  </label>
                  <input
                    className={s.input}
                    id={`${uid}-email`}
                    type="email"
                    required
                    value={email}
                    autoComplete="off"
                    maxLength={150}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error ? (
                    <p role="alert" className={s.error}>
                      {error}
                    </p>
                  ) : null}
                  <div className={s.actions}>
                    <button
                      type="button"
                      className={`${s.action} ${s.secondary}`}
                      onClick={() => changeStep(1)}
                    >
                      {de ? "Ändern" : "Izmijeni"}
                    </button>
                    <button type="submit" className={s.action}>
                      {de ? "Demo abschließen" : "Potvrdi probni termin"}
                    </button>
                  </div>
                </form>
              ) : null}
            </>
          ) : (
            <div className={s.confirmation}>
              <div className={s.confirmationIcon}>
                <CheckIcon />
              </div>
              <h3 ref={heading} tabIndex={-1}>
                {de
                  ? "So sieht die Bestätigung aus."
                  : "Ovako izgleda potvrda."}
              </h3>
              <p>
                {de
                  ? "Der Test ist abgeschlossen. Es wurde kein Termin reserviert und keine E-Mail versendet."
                  : "Proba je završena. Nije rezervisan stvarni termin i nije poslan email."}
              </p>
              <p className={s.fine}>
                {name} · {email}
              </p>
              <div className={s.actions}>
                <button type="button" className={s.action} onClick={reset}>
                  {de ? "Erneut ausprobieren" : "Isprobaj ponovo"}
                </button>
              </div>
            </div>
          )}
        </div>
        <aside className={s.summary} aria-live="polite">
          <p className={s.eyebrow}>{de ? "IHR BESUCH" : "VAŠA POSJETA"}</p>
          <h3>{services[service]}</h3>
          <dl>
            <div>
              <dt>{de ? "Dauer" : "Trajanje"}</dt>
              <dd>{durations[service]} min</dd>
            </div>
            <div>
              <dt>{de ? "Datum" : "Datum"}</dt>
              <dd>{dateLabel(dates[day])}</dd>
            </div>
            <div>
              <dt>{de ? "Uhrzeit" : "Vrijeme"}</dt>
              <dd>{slot || (de ? "Noch auswählen" : "Odaberite vrijeme")}</dd>
            </div>
            <div>
              <dt>{de ? "Status" : "Status"}</dt>
              <dd>
                {done
                  ? de
                    ? "Demo abgeschlossen"
                    : "Proba završena"
                  : de
                    ? "Ihre Auswahl"
                    : "Vaš odabir"}
              </dd>
            </div>
          </dl>
          <Photo
            name="lipa-recepcija"
            locale={locale}
            className="aspect-3/2 rounded-lg"
            sizes="(max-width:760px) 100vw, 35vw"
          />
          <DemoNote locale={locale} />
        </aside>
      </div>
      <Faq
        items={
          de
            ? [
                [
                  "Kann ich die Auswahl noch ändern?",
                  "Ja. Mit „Zurück“ oder „Ändern“ können Sie Leistung und Termin anpassen. Eine andere Leistung oder ein anderer Tag setzt die Uhrzeit zurück.",
                ],
                [
                  "Ist ein echter Kalender verbunden?",
                  "Dieses Portfolio-Demo verwendet lokale Beispieltermine. Für eine echte Praxis wird der Ablauf mit ihrem Buchungssystem verbunden.",
                ],
              ]
            : [
                [
                  "Mogu li promijeniti odabir?",
                  "Da. Dugmad „Nazad“ i „Izmijeni“ vraćaju vas na prethodni korak. Promjena usluge ili dana traži novi izbor vremena.",
                ],
                [
                  "Je li povezan stvarni kalendar?",
                  "Ovaj portfolio demo koristi lokalne pokazne termine. Za pravu ordinaciju tok se povezuje s njenim sistemom za zakazivanje.",
                ],
              ]
        }
      />
    </section>
  );
}

export function AdvisoryPlanner({ locale }: { locale: Locale }) {
  const de = locale === "de";
  const t = translator(locale);
  const questions = advisoryContent.orientation.questions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PlanArea[]>([]);
  const [done, setDone] = useState(false);
  const [cadence, setCadence] = useState("4");
  const [saved, setSaved] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  useEffect(() => {
    if (interacted.current) heading.current?.focus({ preventScroll: true });
  }, [step, done]);
  const selectedArea = choosePlan(answers);
  const area = advisoryContent.areas.items.find(
    (item) => item.id === selectedArea,
  );
  const question = questions[step];
  const setAnswer = (answer: PlanArea) => {
    setAnswers((current) => {
      const next = [...current];
      next[step] = answer;
      return next;
    });
    setSaved(false);
  };
  const next = () => {
    interacted.current = true;
    if (step === 2) setDone(true);
    else setStep((current) => current + 1);
  };
  const reset = () => {
    interacted.current = true;
    setStep(0);
    setAnswers([]);
    setDone(false);
    setCadence("4");
    setSaved(false);
  };
  const download = () => {
    if (!area) return;
    saveText(
      "MOST-Meridijan-plan.txt",
      `MOST STUDIO — MERIDIJAN DEMO\n\n${t(area.name)}\n\n${questions.map((q, i) => `${t(q.text)}\n${t(q.options.find((o) => o.area === answers[i])!.text)}`).join("\n\n")}\n\n${t(area.meeting).join("\n")}\n\n${cadence} ${de ? "Wochen — Beispielrhythmus, keine verbindliche Zusage." : `${cadence === "6" ? "sedmica" : "sedmice"} — pokazni raspored, nije obavezujuća ponuda.`}`,
    );
    setSaved(true);
  };
  return (
    <section
      className={`${s.tool} ${s.planner}`}
      aria-label={de ? "Plan für die Zusammenarbeit" : "Plan saradnje"}
    >
      <ToolHeader
        locale={locale}
        number="03"
        title={
          de
            ? "Ihr Fokus. Unser Ausgangspunkt."
            : "Vaš fokus. Naša polazna tačka."
        }
        lead={
          de
            ? "Drei Fragen ergeben eine Gesprächsagenda. Sie können die Antworten ändern, einen Beispielrhythmus wählen und Ihren Plan mitnehmen."
            : "Tri odgovora pretvaramo u dnevni red prvog razgovora. Odgovore možete izmijeniti, odabrati pokazni raspored i preuzeti plan."
        }
      />
      <div className={s.toolGrid}>
        <div className={s.panel}>
          {!done ? (
            <>
              <ol className={s.progress}>
                {questions.map((q, i) => (
                  <li
                    key={q.id}
                    className={i <= step ? s.current : ""}
                    aria-current={step === i ? "step" : undefined}
                  >
                    0{i + 1} ·{" "}
                    {
                      (de
                        ? ["Situation", "Fokus", "Alltag"]
                        : ["Situacija", "Prioritet", "Svakodnevnica"])[i]
                    }
                  </li>
                ))}
              </ol>
              <h3 ref={heading} tabIndex={-1} className={s.question}>
                {t(question.text)}
              </h3>
              <div className={s.options}>
                {question.options.map((option) => (
                  <button
                    type="button"
                    key={option.area}
                    aria-pressed={answers[step] === option.area}
                    className={`${s.choice} ${answers[step] === option.area ? s.selected : ""}`}
                    onClick={() => setAnswer(option.area)}
                  >
                    {t(option.text)}
                    {answers[step] === option.area ? (
                      <CheckIcon className="size-5 shrink-0" />
                    ) : null}
                  </button>
                ))}
              </div>
              <div className={s.actions}>
                {step > 0 ? (
                  <button
                    className={`${s.action} ${s.secondary}`}
                    type="button"
                    onClick={() => {
                      interacted.current = true;
                      setStep((current) => current - 1);
                    }}
                  >
                    {de ? "Zurück" : "Nazad"}
                  </button>
                ) : null}
                <button
                  type="button"
                  className={s.action}
                  disabled={!answers[step]}
                  style={{ opacity: answers[step] ? 1 : 0.45 }}
                  onClick={next}
                >
                  {step === 2
                    ? de
                      ? "Meinen Plan ansehen"
                      : "Pogledaj moj plan"
                    : de
                      ? "Weiter"
                      : "Dalje"}
                  <ArrowRight />
                </button>
              </div>
            </>
          ) : area ? (
            <>
              <p className={s.eyebrow}>
                {de ? "IHR GESPRÄCHSPLAN" : "VAŠ PLAN RAZGOVORA"}
              </p>
              <h3 ref={heading} tabIndex={-1} className={s.question}>
                {t(area.name)}
              </h3>
              <p className={s.toolLead}>{t(area.body)}</p>
              <ol className={s.planList}>
                {t(area.meeting).map((item, i) => (
                  <li key={item}>
                    <span>0{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <fieldset>
                <legend className={s.legend}>
                  {de
                    ? "Beispielrhythmus für die nächsten Schritte"
                    : "Pokazni raspored narednih koraka"}
                </legend>
                <div className={s.options} style={{ display: "flex" }}>
                  {["2", "4", "6"].map((value) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={cadence === value}
                      className={`${s.choice} ${cadence === value ? s.selected : ""}`}
                      onClick={() => {
                        setCadence(value);
                        setSaved(false);
                      }}
                    >
                      {value} {de ? "Wochen" : value === "6" ? "sedmica" : "sedmice"}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className={s.actions}>
                <button type="button" className={s.action} onClick={download}>
                  {de ? "Plan herunterladen" : "Preuzmi plan"}
                  <ArrowRight />
                </button>
                <button
                  type="button"
                  className={`${s.action} ${s.secondary}`}
                  onClick={() => {
                    interacted.current = true;
                    setDone(false);
                    setStep(0);
                  }}
                >
                  {de ? "Antworten ändern" : "Izmijeni odgovore"}
                </button>
              </div>
              <p role="status" className={s.fine}>
                {saved
                  ? de
                    ? "Die Datei ist zum Download vorbereitet."
                    : "Plan je pripremljen za preuzimanje."
                  : de
                    ? "Ein Ausgangspunkt für das Gespräch, keine Unternehmensbewertung."
                    : "Polazna tačka za razgovor, nije procjena poslovanja."}
              </p>
            </>
          ) : null}
        </div>
        <aside className={s.summary} aria-live="polite">
          <p className={s.eyebrow}>
            {de ? "SO WIRD ES KONKRET" : "OD RAZGOVORA DO PLANA"}
          </p>
          <h3>
            {de
              ? "Weniger Unklarheit. Mehr Richtung."
              : "Manje nejasnoća. Više smjera."}
          </h3>
          <dl>
            <div>
              <dt>{de ? "Fortschritt" : "Napredak"}</dt>
              <dd>{answers.filter(Boolean).length} / 3</dd>
            </div>
            <div>
              <dt>{de ? "Schwerpunkt" : "Fokus"}</dt>
              <dd>
                {area
                  ? t(area.name)
                  : de
                    ? "Ihre Antworten entscheiden"
                    : "Prema vašim odgovorima"}
              </dd>
            </div>
            {done ? (
              <div>
                <dt>{de ? "Beispielrhythmus" : "Pokazni raspored"}</dt>
                <dd>
                  {cadence} {de ? "Wochen" : cadence === "6" ? "sedmica" : "sedmice"}
                </dd>
              </div>
            ) : null}
          </dl>
          <ol className={s.planList}>
            {(de
              ? [
                  "Situation verstehen und Ausgangslage festhalten.",
                  "Einen Schwerpunkt und nächste Schritte vereinbaren.",
                  "Erkenntnisse in einen verständlichen Arbeitsplan übersetzen.",
                ]
              : [
                  "Razumjeti situaciju i zabilježiti polazno stanje.",
                  "Dogovoriti prioritet i naredne korake.",
                  "Pretvoriti zaključke u razumljiv plan rada.",
                ]
            ).map((label, i) => (
              <li key={label}>
                <span>0{i + 1}</span>
                {label}
              </li>
            ))}
          </ol>
          <DemoNote locale={locale} />
          {answers.length > 0 ? (
            <button
              type="button"
              className={`${s.action} ${s.secondary}`}
              onClick={reset}
            >
              {de ? "Neu starten" : "Počni ispočetka"}
            </button>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
