"use client";

import { useId, useState } from "react";

import { advisoryContent as c, type AdvisoryArea } from "@/content/demos/advisory";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { Photo } from "@/components/media/Photo";
import { DemoActionButton } from "./DemoActionButton";
import { DemoSection } from "./shared";

type Answers = Record<string, AdvisoryArea | undefined>;

/**
 * Demo concept: a business advisory practice.
 *
 * Editorial: ivory, deep navy ink and muted olive, drawn from the photography.
 * Narrow measure, hairline rules, display family at its lightest weight with
 * wide tracking — the same two families as MOST itself in a different
 * register. The orientation is deliberately not a score: three answers point
 * at one field of work and say what a first meeting would cover. Photographs
 * are conceptual visuals; see docs/SLIKE.md.
 */
export function AdvisoryDemo({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const uid = useId().replace(/[:]/g, "");
  const t = translator(locale);
  // Ids are derived per instance: a case page renders this demo twice.
  const at = (name: string) => `${uid}-${name}`;
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
    <div className="bg-[#f4f1ea] font-sans text-[#1b2130]">
      <div className="flex items-center justify-between gap-4 border-b border-[#1b2130]/15 px-5 py-5 @3xl:px-14">
        <span className="font-display text-sm font-medium tracking-[0.34em] uppercase">{c.brand}</span>
        <nav aria-label={c.brand} className="hidden items-center gap-8 text-[0.8125rem] @3xl:flex">
          <a href={`#${at("podrucja")}`} className="text-[#1b2130]/65 hover:text-[#1b2130]">
            {t(c.nav.areas)}
          </a>
          <a href={`#${at("orijentacija")}`} className="text-[#1b2130]/65 hover:text-[#1b2130]">
            {t(c.nav.orientation)}
          </a>
          <a href={`#${at("kontakt")}`} className="text-[#1b2130]/65 hover:text-[#1b2130]">
            {t(c.nav.contact)}
          </a>
        </nav>
        <a
          href={`#${at("kontakt")}`}
          className="inline-flex min-h-11 items-center border-b border-[#1b2130] pb-0.5 text-[0.8125rem] font-medium"
        >
          {t(c.nav.cta)}
        </a>
      </div>

      {/* Hero — editorial measure on the left, quiet facts on the right */}
      <DemoSection className="@3xl:px-14">
        <div className="grid gap-10 @3xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.5fr)] @3xl:gap-16">
        <div className="relative max-w-3xl">
          <p className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#6e6a4d] uppercase">
            {t(c.hero.eyebrow)}
          </p>
          <h1 className="mt-6 font-display text-[2.1rem] leading-[1.08] font-normal tracking-[-0.015em] text-balance @2xl:text-5xl @3xl:text-[3.6rem]">
            {t(c.hero.title)}
          </h1>
          <hr className="mt-8 border-[#1b2130]/20" />
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-[#1b2130]/85 @3xl:text-lg">
            {t(c.hero.lead)}
          </p>
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-[1.75] text-[#1b2130]/60">{t(c.hero.note)}</p>
          <a
            href={`#${at("orijentacija")}`}
            className="mt-7 inline-flex min-h-12 items-center border-b-2 border-[#6e6a4d] pb-1 text-[0.9375rem] font-medium"
          >
            {t(c.hero.cta)}
          </a>
        </div>

        <dl className="flex flex-col gap-6 border-t border-[#1b2130]/20 pt-6 @3xl:border-t-0 @3xl:border-l @3xl:border-[#1b2130]/20 @3xl:pt-2 @3xl:pl-8">
          {c.hero.meta.map((item) => (
            <div key={t(item.label)}>
              <dt className="font-display text-[0.8125rem] font-medium tracking-[0.2em] text-[#6e6a4d] uppercase">
                {t(item.label)}
              </dt>
              <dd className="mt-2 text-[0.9375rem] leading-relaxed">{t(item.value)}</dd>
            </div>
          ))}
        </dl>
        </div>
        <Photo
          name="meridijan-hero"
          locale={locale}
          priority
          sizes="100vw"
          className="mt-12 aspect-4/3 @2xl:aspect-3/2 @3xl:aspect-21/9"
        />
      </DemoSection>

      {/* Areas — editorial list, hairlines instead of cards */}
      <DemoSection id={at("podrucja")} className="border-t border-[#1b2130]/15 @3xl:px-14">
        <div className="relative">
          <h2 className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#6e6a4d] uppercase">
            {t(c.areas.title)}
          </h2>
        </div>
        <div className="mt-8 divide-y divide-[#1b2130]/15 border-y border-[#1b2130]/15">
          {c.areas.items.map((item, index) => (
            <article key={item.id} className="grid gap-6 py-10 @3xl:grid-cols-[6rem_1fr] @3xl:gap-10">
              <span className="font-display text-[0.9375rem] tracking-[0.2em] text-[#1b2130]/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className={cn(
                  "grid gap-6",
                  item.image && "@3xl:grid-cols-[1.15fr_0.85fr] @3xl:items-start @3xl:gap-10",
                )}
              >
                <div className="max-w-[60ch]">
                  <h3 className="font-display text-[1.5rem] leading-snug font-normal tracking-[-0.01em] @3xl:text-[1.9rem]">
                    {t(item.name)}
                  </h3>
                  <p className="mt-4 text-[1.0625rem] leading-[1.75] text-[#1b2130]/75">{t(item.body)}</p>
                </div>
                {item.image && (
                  <Photo
                    name={item.image}
                    locale={locale}
                    sizes="(max-width: 900px) 100vw, 32vw"
                    className="aspect-3/2"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </DemoSection>

      {/* Orientation */}
      <DemoSection id={at("orijentacija")} className="bg-[#1b2130] text-[#f4f1ea] @3xl:px-14">
        <div className="max-w-2xl">
          <p className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#b9b48f] uppercase">
            {t(c.orientation.eyebrow)}
          </p>
          <h2 className="mt-5 font-display text-3xl leading-[1.08] font-normal tracking-[-0.015em] @3xl:text-5xl">
            {t(c.orientation.title)}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-[#f4f1ea]/75">{t(c.orientation.lead)}</p>
        </div>

        <div className="mt-10 grid gap-10 @3xl:grid-cols-[1.08fr_0.92fr] @3xl:items-start @3xl:gap-14">
          <div className="space-y-8">
            {c.orientation.questions.map((question, qIndex) => (
              <fieldset key={question.id}>
                <legend className="font-display text-lg leading-snug font-normal @3xl:text-xl">
                  <span className="mr-3 text-sm tracking-[0.2em] text-[#b9b48f]">
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
                            "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#b9b48f]",
                            isActive
                              ? "border-[#b9b48f] text-[#f4f1ea]"
                              : "border-[#f4f1ea]/20 text-[#f4f1ea]/70 hover:border-[#f4f1ea]/50",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "size-3 shrink-0 rounded-full border",
                              isActive ? "border-[#b9b48f] bg-[#b9b48f]" : "border-[#f4f1ea]/40",
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
              className="border border-[#f4f1ea]/25 p-5 @3xl:sticky @3xl:top-8 @3xl:p-7"
            >
              {area ? (
                <>
                  <p className="font-display text-[0.8125rem] font-medium tracking-[0.28em] text-[#b9b48f] uppercase">
                    {t(c.orientation.resultLabel)}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-snug font-normal @3xl:text-3xl">
                    {t(area.name)}
                  </h3>
                  <p className="mt-5 font-display text-[0.8125rem] font-medium tracking-[0.28em] text-[#b9b48f] uppercase">
                    {t(c.orientation.meetingLabel)}
                  </p>
                  <ul className="mt-3 space-y-3">
                    {t(area.meeting).map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-[#f4f1ea]/85">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#b9b48f]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <a
                      href={`#${at("kontakt")}`}
                      className="inline-flex min-h-12 items-center bg-[#f4f1ea] px-5 text-[0.9375rem] font-semibold text-[#1b2130]"
                    >
                      {t(c.contact.cta)}
                    </a>
                    <button
                      type="button"
                      onClick={() => setAnswers({})}
                      className="min-h-12 border-b border-[#f4f1ea]/50 text-[0.9375rem] text-[#f4f1ea]/80 hover:border-[#f4f1ea]"
                    >
                      {t(c.orientation.reset)}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-[0.9375rem] leading-relaxed text-[#f4f1ea]/70">{t(c.orientation.emptyState)}</p>
              )}
              <p className="mt-6 border-t border-[#f4f1ea]/20 pt-4 text-[0.8125rem] leading-relaxed text-[#f4f1ea]/55">
                {t(c.orientation.disclaimer)}
              </p>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* What remains after the conversation */}
      <DemoSection className="@3xl:px-14">
        <div className="grid gap-10 @3xl:grid-cols-[0.78fr_1.22fr] @3xl:items-start @3xl:gap-16">
          <Photo
            name="meridijan-plan"
            locale={locale}
            sizes="(max-width: 900px) 100vw, 32vw"
            className="aspect-4/5"
          />
          <div>
            <p className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#6e6a4d] uppercase">
              {t(c.cooperation.eyebrow)}
            </p>
            <h2 className="mt-5 max-w-[20ch] font-display text-[1.8rem] leading-[1.1] font-normal tracking-[-0.015em] @3xl:text-[2.4rem]">
              {t(c.cooperation.title)}
            </h2>
            <ol className="mt-9 space-y-8">
              {c.cooperation.steps.map((step, index) => (
                <li key={t(step.title)} className="border-t border-[#1b2130]/25 pt-5">
                  <span className="font-display text-[0.9375rem] tracking-[0.2em] text-[#1b2130]/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-[1.25rem] leading-snug font-normal">{t(step.title)}</h3>
                  <p className="mt-2.5 max-w-[54ch] text-[1.0625rem] leading-[1.7] text-[#1b2130]/70">
                    {t(step.body)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </DemoSection>

      {/* Contact */}
      <DemoSection id={at("kontakt")} className="border-t border-[#1b2130]/15 @3xl:px-14">
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.08] font-normal tracking-[-0.015em] @3xl:text-4xl">
            {t(c.contact.title)}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.75] text-[#1b2130]/75">{t(c.contact.lead)}</p>
          <div className="mt-6">
            <DemoActionButton
              id={at("notice")}
              label={t(c.contact.cta)}
              noticeTitle={dict.demoChrome.formNoticeTitle}
              noticeBody={dict.demoChrome.formNoticeBody}
              className="bg-[#1b2130] text-[#f4f1ea]"
              noticeClassName="border-[#1b2130]/25 bg-[#e6e1d6]"
            />
          </div>
          <p className="mt-4 font-display text-[0.8125rem] font-medium tracking-[0.2em] text-[#1b2130]/55 uppercase">
            {dict.demoChrome.formNote}
          </p>
        </div>
      </DemoSection>

      <footer className="border-t border-[#1b2130]/15 px-5 py-6 text-[0.8125rem] text-[#1b2130]/55 @3xl:px-14">
        {c.brand} — {dict.common.demoNotice}
      </footer>
    </div>
  );
}
