"use client";
import { useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";

/** Keep all cases side by side on desktop and make mobile selection explicit. */
export function ProjectSelector({ children, labels, locale }: { children: ReactNode[]; labels: string[]; locale: Locale }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-8">
      <div role="group" aria-label={locale === "bs" ? "Odaberite projekt" : "Projekt auswählen"} className="mb-6 grid grid-cols-3 gap-2 lg:hidden">
        {labels.map((label, i) => <button key={label} type="button" aria-pressed={active === i} aria-controls={`selected-work-${i}`} onClick={() => setActive(i)} className={`min-h-12 rounded-full border px-2 text-sm font-semibold transition-colors ${active === i ? "border-forest bg-forest text-paper" : "border-line-light text-forest hover:border-forest"}`}>{label}</button>)}
      </div>
      <div className="grid gap-7 lg:grid-cols-3">
        {children.map((child, i) => <div key={labels[i]} id={`selected-work-${i}`} className={active === i ? "block" : "hidden lg:block"}>{child}</div>)}
      </div>
    </div>
  );
}
