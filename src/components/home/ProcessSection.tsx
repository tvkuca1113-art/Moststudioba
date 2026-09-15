import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/content/process";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { sectionIds } from "@/lib/nav";

export function ProcessSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = translator(locale);

  return (
    <Section id={sectionIds.process} tone="forest" labelledBy="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          tone="dark"
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          lead={dict.process.lead}
        />

        <ol className="mt-12 lg:mt-16">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              delay={index * 70}
              className="grid gap-6 border-t border-line-dark py-8 lg:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 lg:py-10"
            >
              <span className="font-display text-2xl font-extrabold text-lime">{step.number}</span>

              <div>
                <h3 className="text-title leading-[1.05]">{t(step.title)}</h3>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-mist sm:text-base">{t(step.body)}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                <div>
                  <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-lime uppercase">{dict.process.youGive}</p>
                  <ul className="mt-3 space-y-2">
                    {t(step.youGive).map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-mist">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-lime uppercase">{dict.process.youGet}</p>
                  <ul className="mt-3 space-y-2">
                    {t(step.youGet).map((item) => (
                      <li key={item} className="text-sm leading-relaxed text-mist">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 max-w-3xl border-t border-line-dark pt-6 text-sm leading-relaxed text-mist">
          {dict.process.timingNote}
        </p>
      </Container>
    </Section>
  );
}
