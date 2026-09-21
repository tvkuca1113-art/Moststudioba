"use client";

import { useState } from "react";
import { Shot } from "@/components/media/Shot";
import { ArrowUpRight } from "@/components/ui/icons";
import { demoCapabilities, type DemoSlug } from "@/content/demo-capabilities";
import { path, type Locale } from "@/lib/i18n/config";

const slugs = Object.keys(demoCapabilities) as DemoSlug[];
export function CapabilityShowcase({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<DemoSlug>(slugs[0]);
  const c = demoCapabilities[active][locale];
  return <div className="mt-10 border-t border-line-dark pt-6">
    <div className="grid items-center gap-7 lg:grid-cols-[.55fr_1fr] lg:gap-12">
      <div>
        <p className="text-xs font-semibold tracking-[.18em] text-lime uppercase">{locale === "bs" ? "Dizajn koji možete isprobati" : "Design zum Ausprobieren"}</p>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={locale === "bs" ? "Odaberite demo" : "Demo auswählen"}>
          {slugs.map(slug => <button key={slug} type="button" aria-pressed={active === slug} aria-controls="capability-preview" onClick={() => setActive(slug)} className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${active === slug ? "border-lime bg-lime text-ink" : "border-mist/40 text-mist hover:border-paper"}`}>{demoCapabilities[slug][locale].name}</button>)}
        </div>
        <h2 className="mt-5 text-[1.7rem] leading-tight font-semibold tracking-tight sm:text-[2.1rem]">{c.title}</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-mist">{c.body}</p>
        <a href={`${path("demo", locale, active)}#${demoCapabilities[active].anchor}`} className="mt-4 inline-flex min-h-11 items-center gap-3 font-semibold text-lime underline underline-offset-4">{c.action}<ArrowUpRight className="size-4" /></a>
        <p className="mt-2 text-xs text-mist">{locale === "bs" ? "Naši demo koncepti · bez prijave" : "Unsere Demokonzepte · ohne Anmeldung"}</p>
      </div>
      <div id="capability-preview" className="min-w-0" aria-live="polite">
        <Shot slug={active} locale={locale} device="desktop" alt={`${c.name} — ${locale === "bs" ? "prikaz demo stranice" : "Demo-Vorschau"}`} sizes="(max-width: 1024px) 100vw, 60vw" priority={active === slugs[0]} />
      </div>
    </div>
  </div>;
}
