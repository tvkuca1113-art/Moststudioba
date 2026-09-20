import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { starterOffer } from "@/content/offer";
import { path, type Locale } from "@/lib/i18n/config";

/** Scope and exclusions stay visible: the starting price must stand on its own. */
export function PricingOffer({ locale, contactHref, showGuide = true }: { locale: Locale; contactHref?: string; showGuide?: boolean }) {
  const c = starterOffer[locale];
  return (
    <section id="budzet" aria-labelledby="offer-title" className="scroll-mt-28 overflow-hidden rounded-2xl border border-line-light bg-paper">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-forest p-6 text-paper on-dark sm:p-8">
          <p className="text-xs font-semibold tracking-[.18em] text-lime">{c.eyebrow}</p>
          <h2 id="offer-title" className="mt-4 max-w-sm text-3xl leading-tight tracking-[-.03em] sm:text-4xl">{c.title}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mist">{c.intro}</p>
          <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1"><span className="text-lg text-mist">{c.from}</span><strong className="text-4xl tracking-[-.04em] sm:text-5xl">{c.price}</strong></p>
          <p className="mt-2 text-sm text-mist">{c.billing}</p>
          <p className="mt-6 border-t border-mist/25 pt-4 text-sm font-semibold text-lime">{c.scope}</p>
          <ButtonAnchor href={contactHref ?? `${path("contact", locale)}#top`} tone="dark" className="mt-6 w-full sm:w-auto">{c.cta}</ButtonAnchor>
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-lg font-semibold">{c.includedTitle}</h3>
          <ul className="mt-5 space-y-4">
            {c.included.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate"><span aria-hidden="true" className="mt-0.5 text-forest">✓</span><span>{item}</span></li>)}
          </ul>
          <div className="mt-6 border-t border-line-light pt-5">
            <h3 className="text-sm font-semibold">{c.separateTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{c.separate}</p>
          </div>
          <p className="mt-5 text-sm leading-relaxed font-medium">{c.reassurance}</p>
          {showGuide && <ButtonLink href={path("pricing", locale)} variant="quiet" className="mt-3 px-0 text-sm">{c.details}</ButtonLink>}
        </div>
      </div>
    </section>
  );
}
