import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";
import { HeroComposition } from "./HeroComposition";

/** Splits a line so the closing word can carry the accent colour. */
function withAccent(line: string) {
  const index = line.lastIndexOf(" ");
  if (index === -1) return { head: "", tail: line };
  return { head: line.slice(0, index), tail: line.slice(index + 1) };
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { head, tail } = withAccent(dict.hero.titleLine2);

  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-16 text-paper on-dark sm:pt-32 lg:pt-40 lg:pb-24">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.55] [--grid-color:#16332d] [--grid-size:96px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-forest/40 blur-[120px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-lime uppercase sm:text-sm sm:tracking-[0.24em]">
              {dict.hero.eyebrow}
            </p>

            <h1 className="mt-6 text-hero leading-[0.88] font-extrabold tracking-[-0.035em]">
              <span className="block">{dict.hero.titleLine1}</span>
              <span className="block">
                {head && <span>{head} </span>}
                <span className="text-lime">{tail}</span>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lead leading-relaxed text-mist">{dict.hero.lead}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href={path("contact", locale)} tone="dark">
                {dict.hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={`#${sectionIds.showcase}`} variant="secondary" tone="dark" withArrow={false}>
                {dict.hero.ctaSecondary}
              </ButtonLink>
            </div>

            <p className="mt-8 flex items-center gap-3 text-sm font-semibold tracking-[0.16em] text-mist uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-lime" />
              {dict.hero.support}
            </p>
          </div>

          <figure className="relative -mx-2 sm:mx-0">
            <HeroComposition dict={dict} />
            <figcaption className="sr-only">{dict.hero.figureLabel}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
