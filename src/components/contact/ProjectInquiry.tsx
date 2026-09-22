"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { FileText, RefreshCw, ShoppingBag, MessageCircle, Check, Copy, ArrowLeft } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { positioning } from "@/content/positioning";
import { site } from "@/content/site";
import { inquiryFields } from "@/content/offer";
import { event as analytics } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n/config";

/** Prepare locally, review, then explicitly hand off to the chosen social channel. */
const needIcons = [FileText, RefreshCw, ShoppingBag, MessageCircle];
const needKeys = ["website", "redesign", "webshop", "advice"] as const;
export type InquiryNeed = typeof needKeys[number];
const prompts = {
  bs: {
    website: "Koje usluge nudite i šta posjetilac treba uraditi: poslati upit, nazvati ili pogledati radove?",
    redesign: "Dodajte adresu postojećeg weba i opišite šta želite promijeniti. Npr. ponudu, mobilni prikaz ili put do kontakta.",
    webshop: "Šta prodajete, koliko približno artikala imate i gdje dostavljate? Navedite potrebne načine plaćanja, ako ih već znate.",
    advice: "Opišite svoj posao i cilj. Zajedno možemo razjasniti treba li vam nova stranica, webshop ili dorada postojeće.",
  },
  de: {
    website: "Welche Leistungen bieten Sie an? Sollen Besucher anfragen, anrufen oder Ihre Arbeiten ansehen?",
    redesign: "Nennen Sie die bestehende Webadresse und was sich ändern soll: etwa Angebot, mobile Ansicht oder Kontaktweg.",
    webshop: "Was verkaufen Sie, wie viele Artikel haben Sie ungefähr und wohin liefern Sie? Nennen Sie gewünschte Zahlungsarten, soweit bekannt.",
    advice: "Beschreiben Sie Ihr Unternehmen und Ihr Ziel. Gemeinsam klären wir, ob eine neue Website, ein Shop oder eine Überarbeitung sinnvoll ist.",
  },
};

export function ProjectInquiry({ locale, headingLevel = "h3", initialNeed }: { locale: Locale; headingLevel?: "h2" | "h3"; initialNeed?: InquiryNeed }) {
  const Heading = headingLevel;
  const c = positioning[locale];
  const offer = inquiryFields[locale];
  const id = useId();
  const [values, setValues] = useState({ name: "", company: "", website: "", need: initialNeed ? c.needs[needKeys.indexOf(initialNeed)] : "", details: "", budget: "", timing: "" });
  const [errors, setErrors] = useState<Partial<Record<"need" | "details", string>>>({});
  const selectedNeed = needKeys[c.needs.indexOf(values.need)];
  const hint = selectedNeed ? prompts[locale][selectedNeed] : c.placeholder;
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");
  const preparedValues = useRef("");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const started = useRef(false);
  const field = "mt-2 w-full rounded-xl border border-line-light bg-paper/40 px-4 py-3 text-base text-ink placeholder:text-slate/70 focus:border-forest focus:bg-white";
  const update = (key: keyof typeof values, value: string) => {
    setValues(current => ({ ...current, [key]: value }));
    if (key === "need" || key === "details") setErrors(current => ({ ...current, [key]: undefined }));
    if (!started.current) { analytics("contact_start", { locale }); started.current = true; }
  };
  useEffect(() => {
    if (!started.current) return;
    const heading = headingRef.current;
    heading?.focus({ preventScroll: true });
    const bounds = heading?.getBoundingClientRect();
    // A shorter second step can leave the visitor below the new content.
    if (bounds && (bounds.top < 96 || bounds.bottom > window.innerHeight)) heading?.scrollIntoView?.({ block: "start", behavior: "instant" });
  }, [preview]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!values.need) nextErrors.need = locale === "bs" ? "Odaberite uslugu. Ako niste sigurni, odaberite Trebam savjet." : "Wählen Sie eine Leistung. Wenn Sie unsicher sind, wählen Sie Beratung.";
    if (!values.details.trim()) nextErrors.details = locale === "bs" ? "Ukratko opišite svoj posao i šta želite postići." : "Beschreiben Sie kurz Ihr Unternehmen und Ihr Ziel.";
    setErrors(nextErrors);
    if (nextErrors.need || nextErrors.details) {
      event.currentTarget.querySelector<HTMLElement>(nextErrors.need ? 'input[name="need"]' : 'textarea[name="details"]')?.focus();
      return;
    }
    const signature = JSON.stringify(values);
    // Going back without changing the fields must retain the visitor's edits.
    if (signature !== preparedValues.current) setMessage([
      locale === "bs" ? "Pozdrav MOST Studio," : "Hallo MOST Studio,",
      values.name.trim() && `${c.name}: ${values.name.trim()}`,
      values.company.trim() && `${c.company}: ${values.company.trim()}`,
      `${c.need} ${values.need}`,
      values.website.trim() && `${c.website}: ${values.website.trim()}`,
      values.budget.trim() && `${offer.budget}: ${values.budget.trim()}`,
      values.timing.trim() && `${offer.timing}: ${values.timing.trim()}`,
      "", values.details.trim(),
    ].filter(Boolean).join("\n"));
    preparedValues.current = signature;
    setCopied(false); setFailed(false); setPreview(true);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true); setFailed(false);
      analytics("copy_message", { locale, need: "project_inquiry", goal: "project", length: message.length > 400 ? "long" : "short" });
    } catch {
      setCopied(false); setFailed(true);
      messageRef.current?.focus({ preventScroll: true });
      messageRef.current?.select();
    }
  }
  return (
    <div className="min-w-0 rounded-3xl border border-line-light bg-white p-5 text-ink shadow-[0_16px_50px_-32px_rgba(5,35,29,.3)] sm:p-8 [&_:focus-visible]:outline-forest">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-line-light pb-4">
        <span className="text-[.7rem] font-semibold tracking-[.16em] text-slate uppercase">{locale === "bs" ? "Vaš sljedeći korak" : "Ihr nächster Schritt"}</span>
        <span className="font-mono text-xs text-forest" aria-label={locale === "bs" ? `Korak ${preview ? 2 : 1} od 2` : `Schritt ${preview ? 2 : 1} von 2`}>{preview ? "02" : "01"} / 02</span>
      </div>
      <Heading ref={headingRef} tabIndex={-1} className="scroll-mt-28 text-2xl tracking-[-.025em] sm:text-3xl">{preview ? c.preview : c.inquiry}</Heading>
      <p className="mt-3 text-sm leading-relaxed text-slate">{preview ? c.ready : c.note}</p>
      {!preview ? (
        <form noValidate onSubmit={prepare} className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-sm font-semibold">{c.need} <span className="font-normal text-slate">({locale === "bs" ? "obavezno" : "erforderlich"})</span></legend>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {c.needs.map((need, index) => {
                const Icon = needIcons[index];
                return <label key={need} className="relative cursor-pointer">
                  <input type="radio" name="need" required aria-describedby={errors.need ? `${id}-need-error` : undefined} value={need} checked={values.need === need} onChange={e => update('need', e.target.value)} className="peer sr-only" />
                  <span className="flex min-h-24 flex-col gap-3 rounded-xl border border-line-light bg-paper/30 p-3.5 text-sm font-medium transition-colors hover:border-forest/50 peer-checked:border-forest peer-checked:bg-forest peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-forest motion-reduce:transition-none sm:p-4">
                    <Icon className="size-5" aria-hidden="true" />{need}
                  </span>
                </label>;
              })}
            </div>
            {errors.need && <p id={`${id}-need-error`} role="alert" className="mt-3 text-sm font-semibold text-red-800">{errors.need}</p>}
          </fieldset>
          <div>
            <label htmlFor={`${id}-details`} className="block text-sm font-semibold">{c.details}</label>
            <p id={`${id}-details-hint`} className="mt-2 text-sm leading-relaxed text-slate">{hint} <span>({locale === "bs" ? "Obavezno polje." : "Pflichtfeld."})</span></p>
            <textarea id={`${id}-details`} name="details" rows={3} required maxLength={3000} aria-invalid={Boolean(errors.details)} aria-describedby={`${id}-details-hint${errors.details ? ` ${id}-details-error` : ""}`} value={values.details} onChange={e => update('details', e.target.value)} className={`${field}${errors.details ? " border-red-800" : ""}`} />
            {errors.details && <p id={`${id}-details-error`} role="alert" className="mt-2 text-sm font-semibold text-red-800">{errors.details}</p>}
          </div>
          <details className="rounded-xl border border-line-light px-4">
            <summary className="cursor-pointer py-4 text-sm font-medium">{locale === "bs" ? "Firma, postojeći web, budžet i rok" : "Unternehmen, Website, Budget und Termin"} <span className="font-normal text-slate">({c.optional})</span></summary>
            <div className="space-y-4 pb-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {([['name', c.name, 'name'], ['company', c.company, 'organization']] as const).map(([key, label, autocomplete]) => (
                  <label key={key} htmlFor={`${id}-${key}`} className="block text-sm font-semibold">{label} <span className="font-normal">({c.optional})</span>
                    <input id={`${id}-${key}`} name={key} maxLength={120} autoComplete={autocomplete} value={values[key]} onChange={e => update(key, e.target.value)} className={field} />
                  </label>
                ))}
              </div>
              <label htmlFor={`${id}-website`} className="block text-sm font-semibold">{c.website} <span className="font-normal">({c.optional})</span>
                <input id={`${id}-website`} name="website" inputMode="url" autoComplete="url" maxLength={250} placeholder={locale === "bs" ? "www.primjer.ba" : "www.beispiel.de"} value={values.website} onChange={e => update('website', e.target.value)} className={field} />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                {([['budget', offer.budget, offer.budgetPlaceholder], ['timing', offer.timing, offer.timingPlaceholder]] as const).map(([key, label, placeholder]) => (
                  <label key={key} htmlFor={`${id}-${key}`} className="block text-sm font-semibold">{label} <span className="font-normal">({c.optional})</span>
                    <input id={`${id}-${key}`} name={key} maxLength={120} placeholder={placeholder} value={values[key]} onChange={e => update(key, e.target.value)} className={field} />
                  </label>
                ))}
              </div>
            </div>
          </details>
          <div>
            <Button type="submit" withArrow className="w-full">{c.prepare}</Button>
            <p className="mt-3 text-xs leading-relaxed text-slate">{c.privacy}</p>
          </div>
        </form>
      ) : (
        <div className="mt-5">
          <p className="rounded-xl bg-paper px-4 py-3 text-sm font-medium text-forest">{locale === "bs" ? "Poruka je spremna za pregled. Još nije poslana." : "Die Nachricht ist zur Prüfung bereit. Sie wurde noch nicht gesendet."}</p>
          <label htmlFor={`${id}-message`} className="sr-only">{c.preview}</label>
          <textarea ref={messageRef} id={`${id}-message`} rows={7} value={message} onChange={e => { setMessage(e.target.value); setCopied(false); setFailed(false); }} className={field} />
          <Button onClick={copy} disabled={!message.trim()} className="mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50">{copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}{copied ? c.copied : c.copy}</Button>
          <p role="status" className="mt-3 text-sm leading-relaxed text-slate">{failed ? c.failed : copied ? (locale === "bs" ? "Sada otvorite razgovor, zalijepite poruku i pošaljite je." : "Öffnen Sie jetzt den Chat, fügen Sie die Nachricht ein und senden Sie sie ab.") : ""}</p>
          <p className="mt-5 text-sm font-semibold">{locale === "bs" ? "2. Odaberite gdje nastavljamo" : "2. Wählen Sie Ihren Kontaktweg"}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <ButtonAnchor href={site.instagramUrl} target="_blank" rel="noopener noreferrer" variant="secondary" withArrow={false} onClick={() => analytics("outbound_instagram", { locale, from: "brief" })}><InstagramIcon className="size-5" />Instagram</ButtonAnchor>
            <ButtonAnchor href={site.facebookUrl} target="_blank" rel="noopener noreferrer" variant="secondary" withArrow={false} onClick={() => analytics("outbound_facebook", { locale, from: "brief" })}><FacebookIcon className="size-5" />Facebook</ButtonAnchor>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate">{locale === "bs" ? "Na profilu odaberite Poruka. Instagram ili Facebook mogu zatražiti prijavu." : "Wählen Sie im Profil Nachricht. Instagram oder Facebook können eine Anmeldung verlangen."}</p>
          <Button variant="quiet" onClick={() => setPreview(false)} className="mt-4 px-0"><ArrowLeft className="size-4" aria-hidden="true" />{c.edit}</Button>
        </div>
      )}
    </div>
  );
}
