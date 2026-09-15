"use client";

import { useId, useState } from "react";

import { clinicContent as c } from "@/content/demos/clinic";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { cn } from "@/lib/cn";
import { ClinicScene } from "./art";
import { DemoActionButton } from "./DemoActionButton";
import { AnnotationMarker, DemoSection } from "./shared";

/**
 * Demo concept: a dental practice.
 *
 * Character: light, roomy, rounded, larger body text than the other two
 * concepts. Headings are set in the text family at normal tracking — calm,
 * not loud. Layout reacts to its *container*, so the same component renders
 * the desktop and the mobile arrangement inside the showcase frame.
 */
export function ClinicDemo({
  locale,
  dict,
  annotate = false,
}: {
  locale: Locale;
  dict: Dictionary;
  annotate?: boolean;
}) {
  const uid = useId().replace(/[:]/g, "");
  const [selected, setSelected] = useState<string>(c.triage.options[0].id);
  const active = c.triage.options.find((option) => option.id === selected) ?? c.triage.options[0];
  const t = translator(locale);
  // Ids are derived per instance: a case page renders this demo twice.
  const at = (name: string) => `${uid}-${name}`;

  return (
    <div className="bg-[#f7fafa] font-sans text-[#12303a] [--ring:#3f7f8c]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[#12303a]/10 bg-white/80 px-5 py-4 @3xl:px-12">
        <span className="text-[0.9375rem] font-bold tracking-tight @3xl:text-lg">{c.brand}</span>
        <nav aria-label={c.brand} className="hidden items-center gap-7 text-sm @3xl:flex">
          <a href={`#${at("usluge")}`} className="text-[#12303a]/70 hover:text-[#12303a]">
            {t(c.nav.services)}
          </a>
          <a href={`#${at("dolazak")}`} className="text-[#12303a]/70 hover:text-[#12303a]">
            {t(c.nav.visit)}
          </a>
          <a href={`#${at("kontakt")}`} className="text-[#12303a]/70 hover:text-[#12303a]">
            {t(c.nav.contact)}
          </a>
        </nav>
        <a
          href={`#${at("kontakt")}`}
          className="inline-flex min-h-11 items-center rounded-full bg-[#12303a] px-4 py-2 text-[0.8125rem] font-semibold text-white @3xl:text-sm"
        >
          {t(c.nav.book)}
        </a>
      </div>

      {/* Hero */}
      <DemoSection className="pb-8 @3xl:pb-14">
        <div className="grid items-center gap-8 @3xl:grid-cols-[1.05fr_0.95fr] @3xl:gap-12">
          <div className="relative">
            {annotate && (
              <AnnotationMarker
                id="offer"
                label={dict.showcase.annotationLabel}
                className="absolute -top-2 -left-9"
              />
            )}
            <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-[#3f7f8c] uppercase">
              {t(c.hero.eyebrow)}
            </p>
            <h1 className="mt-4 font-sans text-[1.9rem] leading-[1.1] font-bold tracking-[-0.02em] text-balance @2xl:text-4xl @3xl:text-[3.1rem]">
              {t(c.hero.title)}
            </h1>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-[#12303a]/80 @3xl:text-lg">
              {t(c.hero.lead)}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`#${at("kontakt")}`}
                className="inline-flex min-h-12 items-center rounded-full bg-[#12303a] px-6 text-[0.9375rem] font-semibold text-white"
              >
                {t(c.hero.ctaPrimary)}
              </a>
              <a
                href={`#${at("usluge")}`}
                className="inline-flex min-h-12 items-center rounded-full border border-[#12303a]/25 px-6 text-[0.9375rem] font-semibold"
              >
                {t(c.hero.ctaSecondary)}
              </a>
            </div>
            <dl className="mt-8 grid gap-4 border-t border-[#12303a]/10 pt-6 @lg:grid-cols-3">
              {c.hero.facts.map((fact) => (
                <div key={t(fact.label)}>
                  <dt className="text-[0.8125rem] tracking-[0.12em] text-[#12303a]/55 uppercase">{t(fact.label)}</dt>
                  <dd className="mt-1 text-[0.9375rem] font-semibold">{t(fact.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#12303a]/10 bg-white">
            <div className="aspect-4/3">
              <ClinicScene uid={`${uid}-clinic`} />
            </div>
            <p className="sr-only">{t(c.art.alt)}</p>
          </div>
        </div>
      </DemoSection>

      {/* Triage — pick what is wrong, get the matching service */}
      <DemoSection className="bg-white">
        <div className="max-w-2xl">
          <h2 className="text-2xl leading-tight font-bold tracking-tight @3xl:text-3xl">{t(c.triage.title)}</h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#12303a]/75">{t(c.triage.lead)}</p>
        </div>

        <fieldset className="mt-7">
          <legend className="sr-only">{t(c.triage.title)}</legend>
          <div className="flex flex-wrap gap-2.5">
            {c.triage.options.map((option) => {
              const id = `${uid}-${option.id}`;
              const isActive = option.id === selected;
              return (
                <div key={option.id}>
                  <input
                    type="radio"
                    id={id}
                    name={`${uid}-triage`}
                    value={option.id}
                    checked={isActive}
                    onChange={() => setSelected(option.id)}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={id}
                    className={cn(
                      "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-[0.9375rem] font-medium transition-colors",
                      "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#3f7f8c]",
                      isActive
                        ? "border-[#12303a] bg-[#12303a] text-white"
                        : "border-[#12303a]/20 bg-white text-[#12303a] hover:border-[#12303a]/50",
                    )}
                  >
                    {t(option.chip)}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div
          aria-live="polite"
          className="mt-6 grid gap-6 rounded-3xl bg-[#eef4f5] p-5 @2xl:p-7 @3xl:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <p className="text-[0.8125rem] tracking-[0.14em] text-[#12303a]/55 uppercase">{t(c.triage.resultLabel)}</p>
            <p className="mt-2 text-xl leading-snug font-bold @3xl:text-2xl">{t(active.service)}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium">
              <span className="text-[#12303a]/55">{t(c.triage.durationLabel)}:</span>
              {t(active.duration)}
            </p>
          </div>
          <div>
            <p className="text-[0.8125rem] tracking-[0.14em] text-[#12303a]/55 uppercase">{t(c.triage.includesLabel)}</p>
            <ul className="mt-3 space-y-2.5">
              {t(active.includes).map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#3f7f8c]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DemoSection>

      {/* Services */}
      <DemoSection id={at("usluge")}>
        <div className="relative max-w-2xl">
          {annotate && (
            <AnnotationMarker
              id="services"
              label={dict.showcase.annotationLabel}
              className="absolute -top-1 -left-9"
            />
          )}
          <h2 className="text-2xl leading-tight font-bold tracking-tight @3xl:text-3xl">{t(c.services.title)}</h2>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-[#12303a]/75">{t(c.services.lead)}</p>
        </div>
        <ul className="mt-8 divide-y divide-[#12303a]/10 border-y border-[#12303a]/10">
          {c.services.items.map((item) => (
            <li key={t(item.name)} className="grid gap-2 py-5 @2xl:grid-cols-[1fr_auto] @2xl:items-baseline @2xl:gap-8">
              <div>
                <h3 className="text-lg font-semibold @3xl:text-xl">{t(item.name)}</h3>
                <p className="mt-1.5 max-w-2xl text-[0.9375rem] leading-relaxed text-[#12303a]/75">{t(item.body)}</p>
              </div>
              <span className="justify-self-start rounded-full bg-[#eef4f5] px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap @2xl:justify-self-end">
                {t(item.duration)}
              </span>
            </li>
          ))}
        </ul>
      </DemoSection>

      {/* First visit */}
      <DemoSection id={at("dolazak")} className="bg-[#12303a] text-white">
        <h2 className="max-w-2xl text-2xl leading-tight font-bold tracking-tight @3xl:text-3xl">{t(c.visit.title)}</h2>
        <ol className="mt-8 grid gap-6 @2xl:grid-cols-3">
          {c.visit.steps.map((step, index) => (
            <li key={t(step.title)} className="border-t border-white/25 pt-4">
              <span className="text-sm font-semibold text-[#9fd0d9]">0{index + 1}</span>
              <h3 className="mt-2 text-lg font-semibold">{t(step.title)}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/80">{t(step.body)}</p>
            </li>
          ))}
        </ol>
      </DemoSection>

      {/* Contact */}
      <DemoSection id={at("kontakt")} className="bg-white">
        <div className="relative grid gap-8 @3xl:grid-cols-[1.1fr_0.9fr] @3xl:items-start">
          <div className="relative">
            {annotate && (
              <AnnotationMarker
                id="contact"
                label={dict.showcase.annotationLabel}
                className="absolute -top-1 -left-9"
              />
            )}
            <h2 className="text-2xl leading-tight font-bold tracking-tight @3xl:text-3xl">{t(c.contact.title)}</h2>
            <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-[#12303a]/75">{t(c.contact.lead)}</p>
            <div className="mt-6">
              <DemoActionButton
                id={at("notice")}
                label={t(c.contact.cta)}
                noticeTitle={dict.demoChrome.formNoticeTitle}
                noticeBody={dict.demoChrome.formNoticeBody}
                className="rounded-full bg-[#12303a] text-white"
                noticeClassName="rounded-2xl border-[#12303a]/20 bg-[#eef4f5]"
              />
            </div>
            <p className="mt-4 text-[0.8125rem] tracking-[0.12em] text-[#12303a]/55 uppercase">
              {dict.demoChrome.formNote}
            </p>
          </div>
          <dl className="grid gap-4 rounded-3xl bg-[#eef4f5] p-5 text-[0.9375rem] @2xl:p-6">
            <div>
              <dt className="text-[0.8125rem] tracking-[0.12em] text-[#12303a]/55 uppercase">{t(c.contact.hoursLabel)}</dt>
              <dd className="mt-1 font-medium">{t(c.contact.hours)}</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] tracking-[0.12em] text-[#12303a]/55 uppercase">{t(c.contact.addressLabel)}</dt>
              <dd className="mt-1 font-medium">{t(c.contact.address)}</dd>
            </div>
          </dl>
        </div>
      </DemoSection>

      {/* Mobile-only booking bar: the same call to action, kept in reach */}
      <div className="sticky bottom-0 z-10 border-t border-[#12303a]/10 bg-white/95 px-5 py-3 backdrop-blur @3xl:hidden">
        <a
          href={`#${at("kontakt")}`}
          className="flex min-h-12 items-center justify-center rounded-full bg-[#12303a] px-6 text-[0.9375rem] font-semibold text-white"
        >
          {t(c.nav.book)}
        </a>
      </div>

      <footer className="border-t border-[#12303a]/10 px-5 py-6 text-[0.8125rem] text-[#12303a]/60 @3xl:px-12">
        {c.brand} — {dict.common.demoNotice}
      </footer>
    </div>
  );
}
