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

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-line-light lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 90} className="flex flex-col bg-paper p-6 sm:p-8">
              <span className="font-display text-sm font-bold tracking-[0.2em] text-forest/45">{service.number}</span>
              <h3 className="mt-4 text-title leading-[1.05]">{t(service.title)}</h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate sm:text-base">{t(service.summary)}</p>

              <p className="mt-7 text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
                {dict.services.includes}
              </p>
              <ul className="mt-3 space-y-2.5">
                {t(service.includes)
                  .slice(0, 2)
                  .map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                      <CheckIcon className="mt-1 size-4 shrink-0 text-forest" />
                      {item}
                    </li>
                  ))}
              </ul>

              <p className="mt-auto pt-7 text-[0.9375rem] leading-relaxed font-medium text-forest">
                {t(service.outcome)}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
