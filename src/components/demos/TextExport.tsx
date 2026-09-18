"use client";
import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import s from "./PremiumDemos.module.css";

export function saveText(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob(["\uFEFF" + text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.appendChild(link);
  link.click();
  // Safari can consume the URL after the click handler returns. Keep both the
  // URL and anchor available for a minute; this is bounded, not a permanent leak.
  window.setTimeout(() => { link.remove(); URL.revokeObjectURL(url); }, 60_000);
}

export function TextExport({ locale, text }: { locale: Locale; text: string }) {
  const field = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(locale === "bs" ? "Sažetak je kopiran." : "Zusammenfassung kopiert.");
    } catch {
      field.current?.focus(); field.current?.select();
      setStatus(locale === "bs" ? "Označite tekst i kopirajte ga ručno." : "Text markieren und manuell kopieren.");
    }
  }
  return <details className={s.exportFallback}>
    <summary>{locale === "bs" ? "Pregledaj ili kopiraj sažetak" : "Zusammenfassung ansehen oder kopieren"}</summary>
    <p className={s.fine}>{locale === "bs" ? "Ako se datoteka ne pojavi u preuzimanjima, kopirajte ovaj tekst u bilješke." : "Falls die Datei nicht in den Downloads erscheint, kopieren Sie den Text in Ihre Notizen."}</p>
    <label>
      <span className="sr-only">{locale === "bs" ? "Sažetak za kopiranje" : "Zusammenfassung zum Kopieren"}</span>
      <textarea ref={field} value={text} readOnly rows={8} />
    </label>
    <button type="button" className={`${s.action} ${s.secondary}`} onClick={copy}>{locale === "bs" ? "Kopiraj sažetak" : "Zusammenfassung kopieren"}</button>
    <p role="status" className={s.fine}>{status}</p>
  </details>;
}
