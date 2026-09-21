"use client";
import { useId, useState } from "react";
import { Monitor, Smartphone, ExternalLink, Play, X } from "lucide-react";
import { Shot } from "@/components/media/Shot";
import { demoCapability } from "@/content/demo-capabilities";
import { path, type Locale } from "@/lib/i18n/config";

/** Load one real page only on request; resizing preserves the visitor's demo state. */
export function LiveDemoPreview({ slug, locale, brand }: { slug: string; locale: Locale; brand: string }) {
  const de = locale === "de";
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [running, setRunning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const uid = useId();
  const href = path("demo", locale, slug);
  const c = demoCapability(slug, locale);
  return <div className="mt-8">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-dark pb-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label={de ? "Vorschaugröße" : "Veličina pregleda"}>
        {(["desktop", "mobile"] as const).map(value => { const Icon = value === "desktop" ? Monitor : Smartphone; return <button key={value} type="button" aria-pressed={device === value} aria-controls={uid} onClick={() => setDevice(value)} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold ${device === value ? "border-lime bg-lime text-ink" : "border-mist/40 text-paper"}`}><Icon size={16} aria-hidden />{value === "desktop" ? "Desktop" : de ? "Mobil" : "Mobitel"}</button>; })}
      </div>
      <a href={href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 text-sm text-mist underline underline-offset-4">{de ? "In neuem Tab öffnen" : "Otvori u novom tabu"}<ExternalLink size={15} aria-hidden /></a>
    </div>
    <div id={uid} className="mt-5 rounded-2xl border border-line-dark bg-forest p-3 sm:p-5">
      {running ? <>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-mist">
          <p role="status">{loaded ? (de ? "Live-Demo · Scrollen und ausprobieren" : "Aktivni demo · skrolajte i isprobajte") : (de ? "Demo wird geladen …" : "Demo se učitava …")}</p>
          <button type="button" className="inline-flex min-h-11 items-center gap-2 text-sm text-paper" onClick={() => { setRunning(false); setLoaded(false); }}><X size={16} aria-hidden />{de ? "Vorschau schließen" : "Zatvori pregled"}</button>
        </div>
        <iframe id={`${uid}-frame`} title={`${brand} — ${de ? "interaktive Vorschau" : "interaktivni pregled"}`} src={href} onLoad={() => setLoaded(true)} className="mx-auto block h-[min(780px,78vh)] max-w-full rounded-lg border-0 bg-paper" style={{ width: device === "mobile" ? 390 : "100%" }} />
      </> : <div className="grid items-center gap-6 lg:grid-cols-[.65fr_1fr]">
        <div className="p-1 sm:p-3">
          <p className="text-xs font-semibold tracking-widest text-lime uppercase">{de ? "Selbst ausprobieren" : "Isprobajte sami"}</p>
          <h3 className="mt-3 text-2xl font-semibold">{c?.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-mist">{de ? "Öffnen Sie die echte Demo hier. Wechseln Sie zwischen breitem und mobilem Layout, ohne Ihre Auswahl zu verlieren." : "Pokrenite stvarni demo ovdje. Prebacujte se između širokog i mobilnog prikaza bez gubitka odabira."}</p>
          <button type="button" onClick={() => setRunning(true)} className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-lime px-6 font-semibold text-ink"><Play size={16} aria-hidden />{de ? "Live-Demo starten" : "Pokreni interaktivni pregled"}</button>
        </div>
        <Shot slug={slug} locale={locale} device={device} alt={`${brand} — ${de ? "Vorschau" : "pregled"}`} sizes="(max-width:1024px) 90vw, 48vw" className={device === "mobile" ? "mx-auto max-h-[440px] max-w-[220px]" : ""} />
      </div>}
    </div>
    <p className="mt-3 text-sm leading-relaxed text-mist">{de ? "Die mobile Vorschau hat eine Breite von bis zu 390 px. Für das Erlebnis auf Ihrem Gerät öffnen Sie die Demo direkt." : "Mobilni pregled koristi širinu do 390 px. Za iskustvo na svom uređaju otvorite demo direktno."}</p>
  </div>;
}
