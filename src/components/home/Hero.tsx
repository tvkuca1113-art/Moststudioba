import { Shot } from "@/components/media/Shot";
import { ArchMark } from "@/components/ui/ArchMark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

/**
 * The first screen: a short editorial statement, then the work.
 *
 * The statement is set as two columns rather than one centred block so the
 * title can run at full display size while the sentence that explains it sits
 * beside it at reading size — the visitor gets the claim and the substance in
 * one glance instead of scrolling between them.
 *
 * The arch is the studio's mark, drawn once on load and then still: the site
 * gets one animated moment, and this is it.
 */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-ink pt-26 pb-12 text-paper on-dark sm:pt-28 lg:pt-28 lg:pb-14">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-25 [--grid-color:#123d34] [--grid-size:104px]"
      />

      <Container className="relative">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.2em] text-lime uppercase sm:tracking-[0.24em]">
              <ArchMark draw className="w-9 shrink-0 text-lime/70" strokeWidth={4} />
              {dict.hero.eyebrow}
            </p>

            <h1 className="mt-6 text-hero leading-[0.88] font-extrabold tracking-[-0.035em] text-balance">
              <span className="block">{dict.hero.titleLine1}</span>
              <span className="block text-mist">{dict.hero.titleLine2}</span>
            </h1>
          </div>

          <div className="lg:pb-3">
            <p className="max-w-[62ch] text-lead leading-[1.55] text-mist">{dict.hero.lead}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href={`#${sectionIds.contact}`} tone="dark">
                {dict.hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={`#${sectionIds.projects}`} variant="secondary" tone="dark" withArrow={false}>
                {dict.hero.ctaSecondary}
              </ButtonLink>
            </div>

          </div>
        </div>

        <div className="mt-10 grid items-center gap-5 border-t border-line-dark pt-6 lg:grid-cols-[0.55fr_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-semibold tracking-[.18em] text-lime uppercase">{locale === "bs" ? "Dizajn koji možete isprobati" : "Design zum Ausprobieren"}</p>
            <p className="mt-3 hidden text-title leading-tight lg:block">{locale === "bs" ? "Lijep prvi dojam. Jasan sljedeći korak." : "Ein guter erster Eindruck. Ein klarer nächster Schritt."}</p>
            <p className="mt-3 hidden text-sm text-mist lg:block">{locale === "bs" ? "Hrast · naš demo koncept stolarije" : "Hrast · unser Tischlerei-Demokonzept"}</p>
          </div>
          <div className="max-h-64 overflow-hidden rounded-xl sm:max-h-80">
            <Shot slug="stolarija-hrast" locale={locale} device="desktop" alt={dict.hero.figureLabel} sizes="(max-width: 1024px) 100vw, 60vw" priority />
          </div>
        </div>
      </Container>
    </section>
  );
}
