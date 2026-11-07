"use client";
import { Arrow } from "./Arrow";
import { useCallback, useRef, useState } from "react";
import { site } from "@/content/site";
import { event } from "@/lib/analytics";

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
  function start() { if(!started.current) { started.current = true; event("contact_start", {locale:"en"}); } }
  async function copy() {
    try {
      if(!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message);
      setCopyStatus("Copied. Open Instagram, paste your message and send it when you’re ready.");
      event("copy_message", {locale:"en",need,goal:"project-inquiry",length:message.length > 400 ? "long" : "short"});
    } catch { preview.current?.focus(); preview.current?.select(); setCopyStatus("Select and copy the message below, then paste it into Instagram."); }
  }
  return <div className="en-inquiry">
    <form onFocus={start} onSubmit={e => { e.preventDefault(); setCopyStatus(""); setMessage(["Hi MOST Studio, I’d like to discuss a project.", `Interested in: ${need}`, company.trim() && `Business: ${company.trim()}`, website.trim() && `Current website: ${website.trim()}`, details.trim() && `What I have in mind: ${details.trim()}`, "Could you let me know the next steps and a suitable scope?"].filter(Boolean).join("\n\n")); }}>
      <fieldset><legend>What are you looking for?</legend><div className="en-need-options">{["Website redesign", "New website", "Development"].map(option => <label key={option}><input type="radio" name="need" value={option} checked={need === option} onChange={() => setNeed(option)} /><span>{option}</span></label>)}</div></fieldset>
      <div className="en-input-row"><label htmlFor="en-company">Business name <span>(optional)</span><input id="en-company" name="company" autoComplete="organization" value={company} onChange={e=>setCompany(e.target.value)} maxLength={120} placeholder="Your business" /></label><label htmlFor="en-website">Current website <span>(optional)</span><input id="en-website" name="website" inputMode="url" autoComplete="url" value={website} onChange={e=>setWebsite(e.target.value)} maxLength={250} placeholder="yourwebsite.com" /></label></div>
      <label htmlFor="en-details">What would you like to improve? <span>(optional)</span><textarea id="en-details" name="details" rows={3} value={details} onChange={e=>setDetails(e.target.value)} maxLength={2000} placeholder="A clearer offer, better mobile experience, a new look…" /></label>
      <button className="en-button en-button-lime" type="submit">Prepare my message <Arrow direction="up-right" /></button>
      <p className="en-form-note">This prepares a message for you to review and send. Nothing is submitted automatically.</p>
    </form>
    {message && <div className="en-message-review" role="region" aria-label="Your prepared project message" tabIndex={-1} ref={focusReview}>
      <h3>Ready when you are.</h3><p>Review your message, then copy it into Instagram or open an email draft.</p>
      <label htmlFor="en-message">Your message<textarea ref={preview} id="en-message" rows={7} value={message} onChange={e=>{setMessage(e.target.value);setCopyStatus("");}} /></label>
      <div className="en-review-actions"><button type="button" className="en-button en-button-lime" onClick={copy}>Copy message <Arrow direction="up-right" /></button><a className="en-text-link" href={site.instagramUrl} target="_blank" rel="noopener noreferrer" onClick={()=>event("outbound_instagram",{locale:"en",from:"brief"})}>Open Instagram <Arrow direction="up-right" /></a><a className="en-text-link" href={`mailto:${site.email}?subject=${encodeURIComponent("Website project inquiry")}&body=${encodeURIComponent(message)}`}>Open email draft <Arrow direction="up-right" /></a></div>
      <p role="status" className="en-form-note">{copyStatus}</p>
    </div>}
  </div>;
}
