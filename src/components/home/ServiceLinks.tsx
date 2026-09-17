import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/icons";
import { pageLabels } from "@/content/service-pages";
import { path, type Locale } from "@/lib/i18n/config";

export function ServiceLinks({ locale }: { locale: Locale }) {
  const descriptions = locale === "bs"
    ? ["Predstavite usluge i olakšajte prvi upit.", "Katalog, izbor proizvoda i tok narudžbe.", "Bolji sadržaj, mobilni UX i plan migracije."]
    : ["Leistungen vorstellen und Anfragen erleichtern.", "Katalog, Produktauswahl und Bestellablauf.", "Bessere Inhalte, mobile Nutzung und Migration."];
  return (
    <nav aria-label={locale === "bs" ? "Detalji usluga" : "Leistungen im Detail"} className="grid gap-3 md:grid-cols-3">
      {(["website", "webshop", "redesign"] as const).map((key, i) => <Link key={key} href={path(key, locale)} className="group flex flex-col rounded-xl border border-line-light bg-paper p-5 transition-colors hover:border-forest">
        <span className="flex items-start justify-between gap-4 text-lg font-semibold">{pageLabels[locale][key]}<ArrowUpRight className="mt-1 size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        <span className="mt-3 text-sm leading-relaxed text-slate">{descriptions[i]}</span>
      </Link>)}
    </nav>
  );
}
