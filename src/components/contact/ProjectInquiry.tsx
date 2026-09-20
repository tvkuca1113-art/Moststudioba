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

export function ProjectInquiry({ locale, headingLevel = "h3" }: { locale: Locale; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const c = positioning[locale];
  const offer = inquiryFields[locale];
  const id = useId();
  const [values, setValues] = useState({ name: "", company: "", website: "", need: "", details: "", budget: "", timing: "" });
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
    if (!started.current) { analytics("contact_start", { locale }); started.current = true; }
  };
  useEffect(() => { if (started.current) headingRef.current?.focus({ preventScroll: true }); }, [preview]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    for (const key of ["details"] as const) {
      const input = event.currentTarget.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
      if (!values[key].trim()) {
        input.setCustomValidity(locale === "bs" ? "Popunite ovo polje." : "Bitte füllen Sie dieses Feld aus.");
        input.reportValidity();
        return;
      }
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
      <Heading ref={headingRef} tabIndex={-1} className="text-2xl tracking-[-.025em] sm:text-3xl">{preview ? c.preview : c.inquiry}</Heading>
      <p className="mt-3 text-sm leading-relaxed text-slate">{preview ? c.ready : c.note}</p>
      {!preview ? (
        <form onSubmit={prepare} onInput={e => { const input = e.target as HTMLInputElement; input.setCustomValidity?.(""); }} className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-sm font-semibold">{c.need}</legend>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {c.needs.map((need, index) => {
                const Icon = needIcons[index];
                return <label key={need} className="relative cursor-pointer">
                  <input type="radio" name="need" required value={need} checked={values.need === need} onChange={e => update('need', e.target.value)} className="peer sr-only" />
                  <span className="flex min-h-24 flex-col gap-3 rounded-xl border border-line-light bg-paper/30 p-3.5 text-sm font-medium transition-colors hover:border-forest/50 peer-checked:border-forest peer-checked:bg-forest peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-forest motion-reduce:transition-none sm:p-4">
                    <Icon className="size-5" aria-hidden="true" />{need}
                  </span>
                </label>;
              })}
            </div>
          </fieldset>
          <label htmlFor={`${id}-details`} className="block text-sm font-semibold">{c.details}
            <textarea id={`${id}-details`} name="details" rows={3} required maxLength={3000} placeholder={c.placeholder} value={values.details} onChange={e => update('details', e.target.value)} className={field} />
          </label>
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
