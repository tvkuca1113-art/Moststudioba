import Link from "next/link";

import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/icons";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/cn";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { sectionIds } from "@/lib/nav";

/**
 * How the work runs, in two depths.
 *
 * `compact` — the homepage — is the four names and one sentence each, read as
 * a single line: Razgovor → Smjer → Dizajn i izrada → Provjera i objava. That
 * is what someone deciding whether to write to us needs.
 *
 * `full` — the services page — adds what each side hands over at every step.
 * It is the same content, and the homepage links to it rather than repeating
 * it, because the two lists together ran longer than everything above them.
 */
export function ProcessSection({
  locale,
  dict,
  variant = "compact",
  withPhoto = true,
}: {
  locale: Locale;
  dict: Dictionary;
  variant?: "compact" | "full";
  /** Each MOST photograph appears once per page, never as a repeated backdrop. */
  withPhoto?: boolean;
}) {
  const t = translator(locale);
  const compact = variant === "compact";

  return (
    <Section id={sectionIds.process} tone="forest" labelledBy="process-title">
      <Container>
        <div
          className={cn(
            "grid items-center gap-8",
            withPhoto && "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16",
          )}
        >
          <SectionHeading
            id="process-title"
            tone="dark"
            eyebrow={dict.process.eyebrow}
            title={dict.process.title}
            lead={dict.process.lead}
          />

          {/* Beside the heading rather than below it. As a full-width band this
              one picture cost around 500px of page on its own. */}
          {withPhoto && (
            <Photo
              name="most-proces-dizajna"
              locale={locale}
              breakpoint="viewport"
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-16/9 rounded-2xl"
            />
          )}
        </div>

        {compact ? (
          <>
            <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-line-dark sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <Reveal key={step.number} as="li" delay={index * 70} className="bg-forest p-5 sm:p-6">
                  <span className="font-display text-sm font-bold tracking-[0.2em] text-lime">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-xl leading-tight font-extrabold sm:text-2xl">{t(step.label)}</h3>
                  <p className="mt-2.5 text-body leading-relaxed text-mist">{t(step.body)}</p>
                </Reveal>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-4 border-t border-line-dark pt-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              <p className="max-w-[64ch] text-body leading-relaxed text-mist">
                {dict.process.timingNote}
              </p>
              <Link
                href={`${path("services", locale)}#${sectionIds.process}`}
                className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-[0.9375rem] font-semibold text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
              >
                {dict.process.detail}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:transform-none" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <ol className="mt-12 lg:mt-14">
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
                    <p className="mt-3 max-w-[64ch] text-body leading-relaxed text-mist">{t(step.body)}</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                    <div>
                      <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-lime uppercase">
                        {dict.process.youGive}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {t(step.youGive).map((item) => (
                          <li key={item} className="text-body leading-relaxed text-mist">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-lime uppercase">
                        {dict.process.youGet}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {t(step.youGet).map((item) => (
                          <li key={item} className="text-body leading-relaxed text-mist">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <p className="mt-8 max-w-[64ch] border-t border-line-dark pt-6 text-body leading-relaxed text-mist">
              {dict.process.timingNote}
            </p>
          </>
        )}
      </Container>
    </Section>
  );
}
