import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PlusIcon } from "@/components/ui/icons";
import { faqItems } from "@/content/faq";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";

/**
 * Native <details>: it opens with the keyboard, is announced correctly, is
 * findable by in-page search, and still works if JavaScript never runs.
 */
export function FaqSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = translator(locale);

  return (
    <Section id="faq" tone="paperDim" size="tight" labelledBy="faq-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading id="faq-title" eyebrow={dict.faq.eyebrow} title={dict.faq.title} lead={dict.faq.lead} />

          <div className="border-t border-line-light">
            {faqItems.map((item) => (
              <details key={item.id} className="group border-b border-line-light">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg leading-snug font-semibold [&::-webkit-details-marker]:hidden">
                  {t(item.question)}
                  <PlusIcon className="mt-1 size-5 shrink-0 text-forest transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
                </summary>
                <div className="pb-6 text-[0.9375rem] leading-relaxed text-slate sm:text-base">
                  {t(item.answer).map((paragraph) => (
                    <p key={paragraph} className="mt-2 first:mt-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
