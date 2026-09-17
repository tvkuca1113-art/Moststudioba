"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { positioning } from "@/content/positioning";
import { site } from "@/content/site";
import { event as analytics } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n/config";

/** Honest two-step handoff. No submission endpoint exists until a real inbox is connected. */
export function ProjectInquiry({ locale }: { locale: Locale }) {
  const c = positioning[locale];
  const id = useId();
  const [values, setValues] = useState({ name: "", company: "", website: "", reply: "", need: "", details: "" });
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (preview) headingRef.current?.focus({ preventScroll: true }); }, [preview]);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const started = useRef(false);
  const field = "mt-2 w-full rounded-xl border border-line-light bg-white px-4 py-3 text-base text-ink placeholder:text-slate/70 focus:border-forest";
  const update = (key: keyof typeof values, value: string) => {
    setValues(current => ({ ...current, [key]: value }));
    if (!started.current) { analytics("contact_start", { locale }); started.current = true; }
  };
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    for (const key of ["name", "company", "details"] as const) {
      const input = event.currentTarget.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
      if (!values[key].trim()) {
        input.setCustomValidity(locale === "bs" ? "Popunite ovo polje." : "Bitte füllen Sie dieses Feld aus.");
        input.reportValidity();
        return;
      }
    }
    setMessage([
      locale === "bs" ? "Pozdrav MOST Studio," : "Hallo MOST Studio,",
      `${c.name}: ${values.name.trim()}`,
      `${c.company}: ${values.company.trim()}`,
      `${c.need} ${values.need}`,
      values.website.trim() && `${c.website}: ${values.website.trim()}`,
      values.reply.trim() && `${c.reply}: ${values.reply.trim()}`,
      "", values.details.trim(),
    ].filter(Boolean).join("\n"));
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
    <div className="rounded-2xl bg-paper p-5 text-ink sm:p-7 [&_:focus-visible]:outline-forest">
      <h3 ref={headingRef} tabIndex={-1} className="text-2xl">{preview ? c.preview : c.inquiry}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate">{c.note}</p>
      {!preview ? (
        <form onSubmit={prepare} onInput={e => { const input = e.target as HTMLInputElement; input.setCustomValidity?.(""); }} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {([['name', c.name, 'name'], ['company', c.company, 'organization']] as const).map(([key, label, autocomplete]) => (
              <label key={key} htmlFor={`${id}-${key}`} className="block text-sm font-semibold">{label}
                <input id={`${id}-${key}`} name={key} required maxLength={120} autoComplete={autocomplete} value={values[key]} onChange={e => update(key, e.target.value)} className={field} />
              </label>
            ))}
          </div>
          <label htmlFor={`${id}-need`} className="block text-sm font-semibold">{c.need}
            <select id={`${id}-need`} name="need" required value={values.need} onChange={e => update('need', e.target.value)} className={field}>
              <option value="" disabled>{locale === "bs" ? "Odaberite" : "Bitte wählen"}</option>
              {c.needs.map(need => <option key={need}>{need}</option>)}
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor={`${id}-website`} className="block text-sm font-semibold">{c.website} <span className="font-normal">({c.optional})</span>
              <input id={`${id}-website`} name="website" inputMode="url" autoComplete="url" maxLength={250} placeholder={locale === "bs" ? "www.primjer.ba" : "www.beispiel.de"} value={values.website} onChange={e => update('website', e.target.value)} className={field} />
            </label>
            <label htmlFor={`${id}-reply`} className="block text-sm font-semibold">{c.reply} <span className="font-normal">({c.optional})</span>
              <input id={`${id}-reply`} name="reply" maxLength={160} value={values.reply} onChange={e => update('reply', e.target.value)} className={field} />
            </label>
          </div>
          <label htmlFor={`${id}-details`} className="block text-sm font-semibold">{c.details}
            <textarea id={`${id}-details`} name="details" rows={3} required maxLength={3000} placeholder={c.placeholder} value={values.details} onChange={e => update('details', e.target.value)} className={field} />
          </label>
          <Button type="submit" withArrow className="w-full sm:w-auto">{c.prepare}</Button>
          <p className="text-xs leading-relaxed text-slate">{c.privacy}</p>
        </form>
      ) : (
        <div className="mt-5">
          <p role="status" className="text-sm leading-relaxed text-slate">{c.ready}</p>
          <label htmlFor={`${id}-message`} className="sr-only">{c.preview}</label>
          <textarea ref={messageRef} id={`${id}-message`} rows={10} value={message} onChange={e => { setMessage(e.target.value); setCopied(false); }} className={field} />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={copy} disabled={!message.trim()}>{copied ? c.copied : c.copy}</Button>
            <ButtonAnchor href={site.instagramUrl} target="_blank" rel="noopener noreferrer" variant="secondary" onClick={() => analytics("outbound_instagram", { locale, from: "brief" })}>{c.instagram}</ButtonAnchor>
          </div>
          <p aria-live="polite" className="mt-3 text-sm text-slate">{failed ? c.failed : copied ? c.copied : ""}</p>
          <Button variant="quiet" onClick={() => setPreview(false)} className="mt-2 px-0">{c.edit}</Button>
        </div>
      )}
    </div>
  );
}
