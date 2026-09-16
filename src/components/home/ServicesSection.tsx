import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
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

        <div className="mt-8 border-t border-line-light lg:mt-10">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={index * 80}
              className="grid gap-x-10 gap-y-4 border-b border-line-light py-6 lg:grid-cols-[3.5rem_minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-7"
            >
              <span className="font-display text-sm font-bold tracking-[0.2em] text-forest/45">
                {service.number}
              </span>

              <div>
                <h3 className="text-title leading-[1.05]">{t(service.title)}</h3>
                <p className="mt-3 max-w-[58ch] text-body leading-relaxed text-slate">{t(service.summary)}</p>
              </div>

              <ul className="grid gap-2.5 self-center sm:grid-cols-3 lg:gap-3">
                {t(service.highlights).map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.9375rem] leading-snug hyphens-auto">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-forest" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
