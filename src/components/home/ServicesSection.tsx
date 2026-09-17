import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { positioning } from "@/content/positioning";
import { services } from "@/content/services";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { sectionIds } from "@/lib/nav";

/**
 * Three services, one row each.
 *
 * Rows rather than columns because the three are read in order — design, then
 * build, then redesign — and because a row lets the name sit at title size on
 * the left with its detail beside it, instead of three narrow columns whose
 * height is set by whichever text happens to be longest.
 *
 * The homepage shows the shape of each service, not its contract: the summary
 * and three items. The full scope lives on the services page, one click away.
 */
export function ServicesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = translator(locale);

  return (
    <Section id={sectionIds.services} tone="paperDim" labelledBy="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          lead={dict.services.lead}
          action={
            <ButtonLink href={path("services", locale)} variant="secondary">
              {dict.nav.services}
            </ButtonLink>
          }
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 80} className="border-t border-line-light pt-5">
              <span className="text-xs font-semibold tracking-[.15em] text-forest">{service.number}</span>
              <h3 className="mt-3 text-2xl">{t(service.title)}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate">{t(service.summary)}</p>
            </Reveal>
          ))}
        </div>
        <details className="mt-6 rounded-xl border border-line-light p-5 open:bg-paper">
          <summary className="cursor-pointer text-lg font-semibold">{positioning[locale].craftTitle}</summary>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {positioning[locale].craft.map(([title, body]) => <div key={title}><dt className="font-semibold">{title}</dt><dd className="mt-2 text-sm leading-relaxed text-slate">{body}</dd></div>)}
          </dl>
        </details>
      </Container>
    </Section>
  );
}
