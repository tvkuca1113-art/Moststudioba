"use client";

import { useCallback, useRef, useState } from "react";
import { Button, buttonClass } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/content/site";
import { event } from "@/lib/analytics";

const inputClass = "mt-2 block w-full rounded-xl border border-mist/40 bg-ink px-4 py-3 text-base text-paper placeholder:text-mist/80";

export function EnglishInquiry() {
  const [need, setNeed] = useState("Website redesign");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const preview = useRef<HTMLTextAreaElement>(null);
  const started = useRef(false);
  const focusReview = useCallback((node: HTMLDivElement | null) => { node?.focus({ preventScroll: true }); }, []);

  function start() {
    if (!started.current) {
      started.current = true;
      event("contact_start", { locale: "en" });
    }
  }

  function prepare(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCopyStatus("");
    setMessage([
      "Hi MOST Studio, I’d like to discuss a project.",
      `Interested in: ${need}`,
      company.trim() && `Business: ${company.trim()}`,
      website.trim() && `Current website: ${website.trim()}`,
      details.trim() && `What I have in mind: ${details.trim()}`,
      "Could you let me know the next steps and a suitable scope?",
    ].filter(Boolean).join("\n\n"));
  }

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message);
      setCopyStatus("Copied. Open Instagram, paste your message and send it when you’re ready.");
      event("copy_message", { locale: "en", need, goal: "project-inquiry", length: message.length > 400 ? "long" : "short" });
    } catch {
      preview.current?.focus();
      preview.current?.select();
      setCopyStatus("Select and copy the message below, then paste it into Instagram.");
    }
  }

  return (
    <div className="rounded-2xl border border-line-dark bg-forest/40 p-5 sm:p-7">
      <h3 className="text-2xl leading-tight">Prepare a short inquiry.</h3>
      <p className="mt-3 text-base leading-relaxed text-mist">Tell us what you need. You can review the message before sending it.</p>
      <form className="mt-6 space-y-6" onFocus={start} onSubmit={prepare}>
        <fieldset>
          <legend className="text-base font-semibold">What are you looking for?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {["Website redesign", "New website", "Development"].map(option => (
              <label key={option} className="relative cursor-pointer">
                <input className="peer sr-only" type="radio" name="need" value={option} checked={need === option} onChange={() => setNeed(option)} />
                <span className="flex min-h-12 items-center justify-center rounded-xl border border-mist/40 px-3 py-3 text-center text-sm font-semibold peer-checked:border-lime peer-checked:bg-lime peer-checked:text-ink peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-lime">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="en-company" className="block text-sm font-medium">Business name <span className="font-normal text-mist">(optional)</span><input className={inputClass} id="en-company" name="company" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} maxLength={120} placeholder="Your business" /></label>
          <label htmlFor="en-website" className="block text-sm font-medium">Current website <span className="font-normal text-mist">(optional)</span><input className={inputClass} id="en-website" name="website" inputMode="url" autoComplete="url" value={website} onChange={e => setWebsite(e.target.value)} maxLength={250} placeholder="yourwebsite.com" /></label>
        </div>
        <label htmlFor="en-details" className="block text-sm font-medium">What would you like to improve? <span className="font-normal text-mist">(optional)</span><textarea className={`${inputClass} min-h-28 resize-y`} id="en-details" name="details" rows={3} value={details} onChange={e => setDetails(e.target.value)} maxLength={2000} placeholder="A clearer offer, better mobile experience, a new look…" /></label>
        <Button type="submit" tone="dark" withArrow className="w-full sm:w-auto">Prepare my message</Button>
        <p className="text-sm leading-relaxed text-mist">This prepares a message for you to review and send. Nothing is submitted automatically.</p>
      </form>
      {message && (
        <div className="mt-7 border-t border-line-dark pt-6" role="region" aria-label="Your prepared project message" tabIndex={-1} ref={focusReview}>
          <h3 className="text-2xl">Ready when you are.</h3>
          <p className="mt-3 text-base leading-relaxed text-mist">Review your message, then copy it into Instagram or open an email draft.</p>
          <label htmlFor="en-message" className="mt-5 block text-sm font-semibold">Your message<textarea className={`${inputClass} min-h-60 resize-y font-normal`} ref={preview} id="en-message" rows={7} value={message} onChange={e => { setMessage(e.target.value); setCopyStatus(""); }} /></label>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" tone="dark" withArrow onClick={copy}>Copy message</Button>
            <a className={buttonClass("secondary", "dark")} href={site.instagramUrl} target="_blank" rel="noopener noreferrer" onClick={() => event("outbound_instagram", { locale: "en", from: "brief" })}>Open Instagram <ArrowUpRight className="size-4 shrink-0" /></a>
            <a className={buttonClass("quiet", "dark")} href={`mailto:${site.email}?subject=${encodeURIComponent("Website project inquiry")}&body=${encodeURIComponent(message)}`}>Open email draft <ArrowUpRight className="size-4 shrink-0" /></a>
          </div>
          <p role="status" className="mt-4 text-sm leading-relaxed text-mist">{copyStatus}</p>
        </div>
      )}
    </div>
  );
}
