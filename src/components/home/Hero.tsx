import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Shot } from "@/components/media/Shot";
import { demoProjects } from "@/content/projects";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

/** The concept the first screen leads with. */
const FEATURED = "ordinacija-lipa";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = demoProjects.find((project) => project.slug === FEATURED) ?? demoProjects[0];

  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-16 text-paper on-dark sm:pt-32 lg:pt-36 lg:pb-24">
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-30 [--grid-color:#16332d] [--grid-size:104px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-lime uppercase sm:tracking-[0.24em]">
              {dict.hero.eyebrow}
            </p>

            <h1 className="mt-6 text-hero leading-[0.9] font-extrabold tracking-[-0.035em] text-balance">
              {dict.hero.titleLine1} {dict.hero.titleLine2}
            </h1>

            <p className="mt-7 max-w-[46ch] text-lead leading-relaxed text-mist">{dict.hero.lead}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href={path("contact", locale)} tone="dark">
                {dict.hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink href={`#${sectionIds.projects}`} variant="secondary" tone="dark" withArrow={false}>
                {dict.hero.ctaSecondary}
              </ButtonLink>
            </div>

            <p className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] font-semibold tracking-[0.16em] text-mist uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-lime" />
              {dict.hero.support}
              <span aria-hidden="true" className="text-mist/50">
                /
              </span>
              {dict.hero.markets}
            </p>
          </div>

          {/* The real thing: a capture of an implemented demo page. On a phone
              the mobile capture reads far better than a shrunken desktop one. */}
          <figure className="relative">
            <Shot
              slug={featured.slug}
              locale={locale}
              device="mobile"
              priority
              alt={`${dict.projects.shotAlt} — ${featured.brand}`}
              sizes="(max-width: 640px) 78vw, 1px"
              className="mx-auto max-w-[17rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.95)] sm:hidden"
            />

            <div className="hidden sm:block">
              <Shot
                slug={featured.slug}
                locale={locale}
                device="desktop"
                priority
                alt={`${dict.projects.shotAlt} — ${featured.brand}`}
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="shadow-[0_40px_90px_-45px_rgba(0,0,0,0.95)]"
              />
              <Shot
                slug={featured.slug}
                locale={locale}
                device="mobile"
                alt=""
                sizes="160px"
                // Kept clear of the window so the demo's own CTA stays legible.
                className="absolute -bottom-12 left-2 h-[15.5rem] w-[8.9rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.95)] lg:left-0"
              />
            </div>
            <figcaption className="sr-only">{dict.hero.figureLabel}</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
