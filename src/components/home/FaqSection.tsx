import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight, PlusIcon } from "@/components/ui/icons";
import { faqItems } from "@/content/faq";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";

/**
 * Native <details>: it opens with the keyboard, is announced correctly, is
 * findable by in-page search, and still works if JavaScript never runs.
 *
 * The homepage shows the four questions people actually arrive with and links
 * to the rest. The contact page carries the full list — it is the page someone
 * is on when the remaining questions occur to them.
 */
export function FaqSection({
  locale,
  dict,
  limit,
}: {
  locale: Locale;
  dict: Dictionary;
  /** Show only the first N, with a link to the full list. */
  limit?: number;
}) {
  const t = translator(locale);
  const priority = ["price", "prepare", "timeline", "after-launch"];
  const ordered = [...faqItems].sort((a, b) => (priority.includes(a.id) ? priority.indexOf(a.id) : priority.length) - (priority.includes(b.id) ? priority.indexOf(b.id) : priority.length));
  const items = limit ? ordered.slice(0, limit) : ordered;
  const truncated = items.length < faqItems.length;

  return (
    <Section id="faq" tone="paperDim" size="tight" labelledBy="faq-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading id="faq-title" eyebrow={dict.faq.eyebrow} title={dict.faq.title} lead={dict.faq.lead} />

          <div className="border-t border-line-light">
            {items.map((item) => (
              <details key={item.id} className="group border-b border-line-light">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg leading-snug font-semibold [&::-webkit-details-marker]:hidden">
                  {t(item.question)}
                  <PlusIcon className="mt-1 size-5 shrink-0 text-forest transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
                </summary>
                <div className="pb-6 text-body leading-relaxed text-slate">
                  {t(item.answer).map((paragraph) => (
                    <p key={paragraph} className="mt-2 first:mt-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}

            {truncated && (
              <Link
                href={`${path("contact", locale)}#faq`}
                className="group mt-5 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
              >
                {dict.faq.all}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:transform-none" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
