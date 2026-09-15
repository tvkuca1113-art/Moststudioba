"use client";

import { useId, useState } from "react";

import { advisoryContent as c, type AdvisoryArea } from "@/content/demos/advisory";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { AdvisoryScene } from "./art";
import { AnnotationMarker, DemoSection } from "./shared";

type Answers = Record<string, AdvisoryArea | undefined>;

/**
 * Demo concept: a business advisory practice.
 *
 * Character: editorial. Narrow measure, hairline rules, display family at its
 * lightest weight with wide tracking — the same two families as MOST itself,
 * used in a completely different register. The orientation is deliberately not
 * a score: three answers point at one field of work and say what a first
 * meeting would cover.
 */
export function AdvisoryDemo({
  locale,
  dict,
  annotate = false,
}: {
  locale: Locale;
  dict: Dictionary;
  annotate?: boolean;
}) {
  const uid = useId().replace(/[:]/g, "");
  const t = translator(locale);
  const [answers, setAnswers] = useState<Answers>({});

  const given = c.orientation.questions.map((question) => answers[question.id]).filter(Boolean) as AdvisoryArea[];
  const complete = given.length === c.orientation.questions.length;

  let suggested: AdvisoryArea | null = null;
  if (complete) {
    const tally = new Map<AdvisoryArea, number>();
    for (const area of given) tally.set(area, (tally.get(area) ?? 0) + 1);
    // Ties resolve to the first answer given, which is the visitor's own lead.
    suggested = [...tally.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const top = Math.max(...tally.values());
    if ([...tally.values()].filter((count) => count === top).length > 1) suggested = given[0];
  }

  const area = c.areas.items.find((item) => item.id === suggested);

  return (
    <div className="bg-[#efece4] font-sans text-[#23211c]">
      <div className="flex items-center justify-between gap-4 border-b border-[#23211c]/15 px-5 py-5 @3xl:px-14">
        <span className="font-display text-sm font-medium tracking-[0.34em] uppercase">{c.brand}</span>
        <nav aria-label={c.brand} className="hidden items-center gap-8 text-[0.8125rem] @3xl:flex">
          <span className="text-[#23211c]/65">{t(c.nav.areas)}</span>
          <span className="text-[#23211c]/65">{t(c.nav.orientation)}</span>
          <span className="text-[#23211c]/65">{t(c.nav.contact)}</span>
        </nav>
        <span className="border-b border-[#23211c] pb-0.5 text-[0.8125rem] font-medium">{t(c.nav.cta)}</span>
      </div>

      {/* Hero — one column, generous measure, no cards */}
      <DemoSection className="@3xl:px-14">
        <div className="relative max-w-3xl">
          {annotate && (
            <AnnotationMarker id="offer" label={dict.showcase.annotationLabel} className="absolute -top-2 -left-9" />
          )}
          <p className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#7a6a52] uppercase">
            {t(c.hero.eyebrow)}
          </p>
          <h1 className="mt-6 font-display text-[2.1rem] leading-[1.08] font-normal tracking-[-0.015em] text-balance @2xl:text-5xl @3xl:text-[3.6rem]">
            {t(c.hero.title)}
          </h1>
          <hr className="mt-8 border-[#23211c]/20" />
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-[#23211c]/85 @3xl:text-lg">
            {t(c.hero.lead)}
          </p>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-[#23211c]/60">{t(c.hero.note)}</p>
          <span className="mt-7 inline-flex min-h-12 items-center border-b-2 border-[#7a6a52] pb-1 text-[0.9375rem] font-medium">
            {t(c.hero.cta)}
          </span>
        </div>
        <div className="mt-10 overflow-hidden border border-[#23211c]/12">
          <div className="aspect-[13/6]">
            <AdvisoryScene uid={`${uid}-advisory`} />
          </div>
        </div>
      </DemoSection>

      {/* Areas — editorial list, hairlines instead of cards */}
      <DemoSection className="border-t border-[#23211c]/15 @3xl:px-14">
        <div className="relative">
          {annotate && (
            <AnnotationMarker id="services" label={dict.showcase.annotationLabel} className="absolute -top-1 -left-9" />
          )}
          <h2 className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#7a6a52] uppercase">
            {t(c.areas.title)}
          </h2>
        </div>
        <div className="mt-8 divide-y divide-[#23211c]/15 border-y border-[#23211c]/15">
          {c.areas.items.map((item, index) => (
            <article key={item.id} className="grid gap-3 py-8 @3xl:grid-cols-[6rem_1fr] @3xl:gap-10">
              <span className="font-display text-sm tracking-[0.2em] text-[#23211c]/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl leading-snug font-normal tracking-[-0.01em] @3xl:text-3xl">
                  {t(item.name)}
                </h3>
                <p className="mt-3 text-[1.0625rem] leading-[1.75] text-[#23211c]/75">{t(item.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </DemoSection>

      {/* Orientation */}
      <DemoSection className="bg-[#23211c] text-[#efece4] @3xl:px-14">
        <div className="max-w-2xl">
          <p className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#c3b49a] uppercase">
            {t(c.orientation.eyebrow)}
          </p>
          <h2 className="mt-5 font-display text-3xl leading-[1.08] font-normal tracking-[-0.015em] @3xl:text-5xl">
            {t(c.orientation.title)}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-[#efece4]/75">{t(c.orientation.lead)}</p>
        </div>

        <div className="mt-10 grid gap-10 @3xl:grid-cols-[1fr_1fr] @3xl:gap-14">
          <div className="space-y-8">
            {c.orientation.questions.map((question, qIndex) => (
              <fieldset key={question.id}>
                <legend className="font-display text-lg leading-snug font-normal @3xl:text-xl">
                  <span className="mr-3 text-sm tracking-[0.2em] text-[#c3b49a]">
                    {String(qIndex + 1).padStart(2, "0")}
                  </span>
                  {t(question.text)}
                </legend>
                <div className="mt-4 space-y-2">
                  {question.options.map((option, oIndex) => {
                    const id = `${uid}-${question.id}-${oIndex}`;
                    const isActive = answers[question.id] === option.area;
                    return (
                      <div key={id}>
                        <input
                          type="radio"
                          id={id}
                          name={`${uid}-${question.id}`}
                          checked={isActive}
                          onChange={() =>
                            setAnswers((current) => ({ ...current, [question.id]: option.area }))
                          }
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={id}
                          className={cn(
                            "flex min-h-12 cursor-pointer items-center gap-3 border-b px-1 py-2 text-[0.9375rem] leading-relaxed transition-colors",
                            "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#c3b49a]",
                            isActive
                              ? "border-[#c3b49a] text-[#efece4]"
                              : "border-[#efece4]/20 text-[#efece4]/70 hover:border-[#efece4]/50",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "size-3 shrink-0 rounded-full border",
                              isActive ? "border-[#c3b49a] bg-[#c3b49a]" : "border-[#efece4]/40",
                            )}
                          />
                          {t(option.text)}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div>
            <div
              aria-live="polite"
              className="border border-[#efece4]/25 p-5 @3xl:sticky @3xl:top-6 @3xl:p-8"
            >
              {area ? (
                <>
                  <p className="font-display text-[0.8125rem] font-medium tracking-[0.28em] text-[#c3b49a] uppercase">
                    {t(c.orientation.resultLabel)}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-snug font-normal @3xl:text-3xl">
                    {t(area.name)}
                  </h3>
                  <p className="mt-5 font-display text-[0.8125rem] font-medium tracking-[0.28em] text-[#c3b49a] uppercase">
                    {t(c.orientation.meetingLabel)}
                  </p>
                  <ul className="mt-3 space-y-3">
                    {t(area.meeting).map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-[#efece4]/85">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#c3b49a]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <span className="inline-flex min-h-12 items-center bg-[#efece4] px-5 text-[0.9375rem] font-semibold text-[#23211c]">
                      {t(c.contact.cta)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAnswers({})}
                      className="min-h-12 border-b border-[#efece4]/50 text-[0.9375rem] text-[#efece4]/80 hover:border-[#efece4]"
                    >
                      {t(c.orientation.reset)}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-[0.9375rem] leading-relaxed text-[#efece4]/70">{t(c.orientation.emptyState)}</p>
              )}
              <p className="mt-6 border-t border-[#efece4]/20 pt-4 text-[0.8125rem] leading-relaxed text-[#efece4]/55">
                {t(c.orientation.disclaimer)}
              </p>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* Cooperation */}
      <DemoSection className="@3xl:px-14">
        <h2 className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#7a6a52] uppercase">
          {t(c.cooperation.title)}
        </h2>
        <ol className="mt-8 grid gap-8 @2xl:grid-cols-3 @2xl:gap-10">
          {c.cooperation.steps.map((step, index) => (
            <li key={t(step.title)} className="border-t border-[#23211c]/25 pt-4">
              <span className="font-display text-sm tracking-[0.2em] text-[#23211c]/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl leading-snug font-normal">{t(step.title)}</h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.7] text-[#23211c]/70">{t(step.body)}</p>
            </li>
          ))}
        </ol>
      </DemoSection>

      {/* Contact */}
      <DemoSection className="border-t border-[#23211c]/15 @3xl:px-14">
        <div className="relative max-w-2xl">
          {annotate && (
            <AnnotationMarker id="contact" label={dict.showcase.annotationLabel} className="absolute -top-1 -left-9" />
          )}
          <h2 className="font-display text-3xl leading-[1.08] font-normal tracking-[-0.015em] @3xl:text-4xl">
            {t(c.contact.title)}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.75] text-[#23211c]/75">{t(c.contact.lead)}</p>
          <span className="mt-6 inline-flex min-h-12 items-center bg-[#23211c] px-6 text-[0.9375rem] font-semibold text-[#efece4]">
            {t(c.contact.cta)}
          </span>
          <p className="mt-4 font-display text-[0.8125rem] font-medium tracking-[0.2em] text-[#23211c]/55 uppercase">
            {dict.demoChrome.formNote}
          </p>
        </div>
      </DemoSection>

      <footer className="border-t border-[#23211c]/15 px-5 py-6 text-[0.8125rem] text-[#23211c]/55 @3xl:px-14">
        {c.brand} — {dict.common.demoNotice}
      </footer>
    </div>
  );
}
