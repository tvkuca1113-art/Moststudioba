import Image from "next/image";

import { buttonClass } from "@/components/ui/Button";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { ArrowUpRight, CheckIcon } from "@/components/ui/icons";
import type { Locale } from "@/lib/i18n/config";

export const webshopDemoUrl = "/moststudiowebshop";
const webshopAssetsBase = "/webshop-assets";

const copy = {
  bs: {
    badge: "INTERAKTIVNI DEMO",
    sector: "Webshop · muška odjeća",
    title: "Od prvog pogleda do probne kupovine.",
    body: "Otvorite naš primjer webshopa s 50 artikala. Pronađite proizvod, odaberite veličinu i isprobajte cijeli put do narudžbe.",
    features: ["Pretraga i filteri", "Izbor veličine i korpa", "Probna narudžba bez naplate"],
    cta: "Isprobajte webshop",
    note: "Bez prijave i stvarnog plaćanja. Povratak na MOST Studio je uvijek dostupan.",
    collection: "Iz demo kolekcije",
    products: ["Tamnoplavo odijelo", "Bijela pamučna košulja", "Bež chino hlače", "Smeđi pleteni džemper"],
    disclosure: "Generisane fotografije i ilustrativne cijene. Primjer izrade MOST Studija.",
    quickLink: "Isprobajte webshop s 50 artikala",
  },
  de: {
    badge: "INTERAKTIVE DEMO",
    sector: "Onlineshop · Herrenmode",
    title: "Vom ersten Eindruck bis zur Testbestellung.",
    body: "Entdecken Sie unseren Beispielshop mit 50 Artikeln. Finden Sie ein Produkt, wählen Sie eine Größe und testen Sie den Weg bis zur Bestellung.",
    features: ["Suche und Filter", "Größenauswahl und Warenkorb", "Testbestellung ohne Zahlung"],
    cta: "Onlineshop ausprobieren",
    note: "Demo auf Bosnisch, ohne Anmeldung und echte Zahlung. Der Rückweg zu MOST Studio bleibt sichtbar.",
    collection: "Aus der Demo-Kollektion",
    products: ["Dunkelblauer Anzug", "Weißes Baumwollhemd", "Beige Chinohose", "Brauner Strickpullover"],
    disclosure: "Generierte Fotos und Beispielpreise. Ein Demoprojekt von MOST Studio.",
    quickLink: "Onlineshop mit 50 Artikeln testen",
  },
};

const selection = [
  { id: "suit-01", price: "329,00 KM" },
  { id: "shirt-01", price: "89,00 KM" },
  { id: "trouser-01", price: "119,00 KM" },
  { id: "knit-01", price: "99,00 KM" },
];

export function WebshopDemoLink({ locale }: { locale: Locale }) {
  return (
    <TrackedAnchor
      href={webshopDemoUrl}
      track={["open_demo", { project: "webshop", locale, from: "hero" }]}
      className="mt-4 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-lime underline decoration-lime/40 underline-offset-4 hover:text-paper"
    >
      {copy[locale].quickLink}
      <ArrowUpRight className="size-4 shrink-0" />

    </TrackedAnchor>
  );
}

export function WebshopDemoCard({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const c = copy[locale];

  return (
    <article id="webshop-demo" aria-labelledby="webshop-demo-title" className="grid overflow-hidden rounded-2xl border border-forest/15 bg-white lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-forest px-3 py-1.5 text-[0.8125rem] font-semibold tracking-[0.1em] text-paper">{c.badge}</span>
          <span className="text-sm font-medium text-slate">{c.sector}</span>
        </div>
        <h3 id="webshop-demo-title" className="mt-6 text-title leading-[1.05]">{c.title}</h3>
        <p className="mt-5 max-w-[48ch] text-body leading-relaxed text-slate">{c.body}</p>
        <ul className={compact ? "sr-only" : "mt-6 space-y-3"}>
          {c.features.map(feature => (
            <li key={feature} className="flex items-center gap-3 text-[1.0625rem]">
              <CheckIcon className="size-5 shrink-0 text-forest" />{feature}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <TrackedAnchor href={webshopDemoUrl} track={["open_demo", { project: "webshop", locale, from: "portfolio" }]} className={buttonClass()}>
            {c.cta}<ArrowUpRight className="size-4 shrink-0" />
          </TrackedAnchor>
          <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-slate">{c.note}</p>
        </div>
      </div>
      <div className="border-t border-forest/10 bg-[#f4f2ed] p-5 sm:p-8 lg:border-t-0 lg:border-l">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-forest/15 pb-4">
          <span className="font-display text-xl font-bold tracking-tight">VAŠ BREND</span>
          <span className="text-sm text-slate">{c.collection}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {(compact ? selection.slice(0, 2) : selection).map((p, i) => (
            <div key={p.id} className="min-w-0">
              <Image src={`${webshopAssetsBase}/products/${p.id}.webp`} alt={c.products[i]} width={396} height={396} unoptimized loading="lazy" className={compact ? "aspect-[3/4] max-h-36 sm:max-h-64 w-full bg-[#e8e4db] object-contain" : "aspect-square w-full bg-[#e8e4db] object-contain"} />
              <p className="mt-2 text-sm leading-snug font-medium text-ink">{c.products[i]}</p>
              <p className="mt-1 text-sm text-slate">{p.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 border-t border-forest/15 pt-4 text-sm leading-relaxed text-slate">{c.disclosure}</p>
      </div>
    </article>
  );
}
