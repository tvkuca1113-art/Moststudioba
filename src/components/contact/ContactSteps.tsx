import { positioning } from "@/content/positioning";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/cn";

export function ContactSteps({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const c = positioning[locale];
  return <div className={cn("mt-10 border-t pt-7", dark ? "border-line-dark" : "border-line-light")}>
    <h3 className="text-lg">{c.nextTitle}</h3>
    <ol className="mt-5 grid gap-5 sm:grid-cols-3">
      {c.next.map((step, index) => <li key={step} className="flex items-start gap-3">
        <span className={cn("pt-0.5 font-mono text-xs", dark ? "text-lime" : "text-forest")}>0{index + 1}</span>
        <span className={cn("text-sm leading-relaxed", dark ? "text-mist" : "text-slate")}>{step}</span>
      </li>)}
    </ol>
  </div>;
}
