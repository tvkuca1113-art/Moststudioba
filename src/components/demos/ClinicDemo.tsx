"use client";

import { useId, useState } from "react";

import { clinicContent as c } from "@/content/demos/clinic";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { DemoActionButton } from "./DemoActionButton";
import { Photo } from "@/components/media/Photo";
import { DemoSection } from "./shared";

/**
 * Demo concept: a dental practice.
 *
 * Warm white, pale sage and deep petrol, taken from the photography itself.
 * The character is calm and precise — wide measure, hairline rules, one
 * accent, body text a step larger than the other two concepts. Photographs are
 * conceptual visuals, not documentation of a real practice; see docs/SLIKE.md.
 */
export function ClinicDemo({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const uid = useId().replace(/[:]/g, "");
  const t = translator(locale);
  const at = (name: string) => `${uid}-${name}`;
  const [selected, setSelected] = useState<string>(c.triage.options[0].id);
  const active = c.triage.options.find((option) => option.id === selected) ?? c.triage.options[0];

  return (
    <div className="bg-[#fbf9f5] font-sans text-[#123a42]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[#123a42]/10 px-5 py-4 @3xl:px-14 @3xl:py-5">
        <span className="text-[1.0625rem] font-semibold tracking-[-0.01em] @3xl:text-xl">{c.brand}</span>
        <nav aria-label={c.brand} className="hidden items-center gap-8 text-[0.9375rem] @3xl:flex [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
          <a href={`#${at("usluge")}`} className="text-[#123a42]/70 hover:text-[#123a42]">
            {t(c.nav.services)}
          </a>
          <a href={`#${at("dolazak")}`} className="text-[#123a42]/70 hover:text-[#123a42]">
            {t(c.nav.visit)}
          </a>
          <a href={`#${at("kontakt")}`} className="text-[#123a42]/70 hover:text-[#123a42]">
            {t(c.nav.contact)}
          </a>
        </nav>
        <a
          href={`#${at("kontakt")}`}
          className="inline-flex min-h-11 items-center rounded-full bg-[#123a42] px-5 text-[0.875rem] font-semibold text-[#fbf9f5] @3xl:text-[0.9375rem]"
        >
          {t(c.nav.book)}
        </a>
      </div>

      {/* Hero */}
      <DemoSection className="@3xl:px-14 @3xl:pt-20 @3xl:pb-16">
        <div className="grid items-center gap-10 @3xl:grid-cols-[1.08fr_0.92fr] @3xl:gap-16">
          <div className="relative">
            <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-[#7f9c8c] uppercase">
              {t(c.hero.eyebrow)}
            </p>
            <h1 className="mt-5 max-w-[14ch] font-sans text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.025em] text-balance @2xl:text-[2.8rem] @3xl:text-[3.5rem]">
              {t(c.hero.title)}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-[#123a42]/75 @3xl:text-[1.125rem]">
              {t(c.hero.lead)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`#${at("kontakt")}`}
                className="inline-flex min-h-12 items-center rounded-full bg-[#123a42] px-6 text-[0.9375rem] font-semibold text-[#fbf9f5]"
              >
                {t(c.hero.ctaPrimary)}
              </a>
              <a
                href={`#${at("usluge")}`}
                className="inline-flex min-h-12 items-center rounded-full border border-[#123a42]/25 px-6 text-[0.9375rem] font-semibold"
              >
                {t(c.hero.ctaSecondary)}
              </a>
            </div>
          </div>

          <div className="@3xl:-mr-14">
            <Photo
              name="lipa-hero"
              locale={locale}
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              className="aspect-4/3 rounded-[1.5rem] @3xl:aspect-3/2 @3xl:rounded-l-[1.75rem] @3xl:rounded-r-none"
            />
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 @3xl:mr-14">
              {c.hero.facts.map((fact) => (
                <div key={t(fact.label)} className="min-w-[8rem]">
                  <dt className="text-[0.8125rem] tracking-[0.14em] text-[#123a42]/50 uppercase">{t(fact.label)}</dt>
                  <dd className="mt-1 text-[1.0625rem] font-semibold">{t(fact.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </DemoSection>

      {/* Reason for visiting — navigation through the content, not a diagnosis */}
      <DemoSection id={at("razlog")} className="border-t border-[#123a42]/10 @3xl:px-14">
        <div className="max-w-[54ch]">
          <h2 className="text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.02em] @3xl:text-[2.1rem]">
            {t(c.triage.title)}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-[#123a42]/75">{t(c.triage.lead)}</p>
        </div>

        <fieldset className="mt-8">
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
                      "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#123a42]",
                      isActive
                        ? "border-[#123a42] bg-[#123a42] text-[#fbf9f5]"
                        : "border-[#123a42]/20 bg-white text-[#123a42] hover:border-[#123a42]/50",
                    )}
                  >
                    {t(option.chip)}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div aria-live="polite" className="mt-7 grid gap-7 rounded-[1.5rem] bg-[#eef3ec] p-6 @2xl:p-8 @3xl:grid-cols-[0.9fr_1.1fr] @3xl:gap-12">
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-[#123a42]/55 uppercase">
              {t(c.triage.resultLabel)}
            </p>
            <p className="mt-3 text-[1.35rem] leading-[1.25] font-semibold @3xl:text-[1.6rem]">{t(active.service)}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#fbf9f5] px-3.5 py-2 text-[0.9375rem]">
              <span className="text-[#123a42]/55">{t(c.triage.durationLabel)}</span>
              <span className="font-semibold">{t(active.duration)}</span>
            </p>
          </div>
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-[#123a42]/55 uppercase">
              {t(c.triage.includesLabel)}
            </p>
            <ul className="mt-4 space-y-3">
              {t(active.includes).map((item) => (
                <li key={item} className="flex gap-3.5 text-[1rem] leading-[1.6]">
                  <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#7f9c8c]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DemoSection>

      {/* Services */}
      <DemoSection id={at("usluge")} className="border-t border-[#123a42]/10 @3xl:px-14">
        <div className="relative max-w-[54ch]">
          <h2 className="text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.02em] @3xl:text-[2.1rem]">
            {t(c.services.title)}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.7] text-[#123a42]/75">{t(c.services.lead)}</p>
        </div>
        <ul className="mt-9 border-t border-[#123a42]/12">
          {c.services.items.map((item) => (
            <li
              key={t(item.name)}
              className="grid gap-2 border-b border-[#123a42]/12 py-6 @2xl:grid-cols-[1fr_auto] @2xl:items-baseline @2xl:gap-10"
            >
              <div>
                <h3 className="text-[1.2rem] font-semibold @3xl:text-[1.3rem]">{t(item.name)}</h3>
                <p className="mt-2 max-w-[58ch] text-[1rem] leading-[1.65] text-[#123a42]/75">{t(item.body)}</p>
              </div>
              <span className="justify-self-start text-[0.9375rem] font-semibold whitespace-nowrap text-[#7f9c8c] @2xl:justify-self-end">
                {t(item.duration)}
              </span>
            </li>
          ))}
        </ul>
      </DemoSection>

      {/* First visit — the reception photograph sets the tone beside the steps */}
      <DemoSection id={at("dolazak")} className="bg-[#123a42] text-[#fbf9f5] @3xl:px-14">
        <div className="grid gap-10 @3xl:grid-cols-[0.8fr_1.2fr] @3xl:items-start @3xl:gap-14">
          <Photo
            name="lipa-recepcija"
            locale={locale}
            sizes="(max-width: 900px) 100vw, 34vw"
            className="aspect-4/5 rounded-[1.5rem]"
          />
          <div>
            <h2 className="max-w-[24ch] text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.02em] @3xl:text-[2.1rem]">
              {t(c.visit.title)}
            </h2>
            <ol className="mt-9 space-y-8">
              {c.visit.steps.map((step, index) => (
                <li key={t(step.title)} className="border-t border-[#fbf9f5]/25 pt-5">
                  <span className="text-[0.9375rem] font-semibold text-[#a9c4b4]">0{index + 1}</span>
                  <h3 className="mt-2 text-[1.2rem] font-semibold">{t(step.title)}</h3>
                  <p className="mt-2.5 max-w-[56ch] text-[1rem] leading-[1.65] text-[#fbf9f5]/80">{t(step.body)}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </DemoSection>

      {/* Two quieter details: how we explain, and what happens at home */}
      <DemoSection className="border-t border-[#123a42]/10 @3xl:px-14">
        <div className="grid gap-12 @3xl:grid-cols-2 @3xl:gap-14">
          <article>
            <Photo
              name="lipa-tehnologija"
              locale={locale}
              sizes="(max-width: 900px) 100vw, 44vw"
              className="aspect-3/2 rounded-[1.25rem]"
            />
            <p className="mt-6 text-[0.8125rem] font-semibold tracking-[0.18em] text-[#7f9c8c] uppercase">
              {t(c.approach.eyebrow)}
            </p>
            <h2 className="mt-3 text-[1.35rem] leading-[1.2] font-semibold tracking-[-0.015em] @3xl:text-[1.7rem]">
              {t(c.approach.title)}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1rem] leading-[1.7] text-[#123a42]/75">{t(c.approach.body)}</p>
            <ul className="mt-5 space-y-2.5">
              {t(c.approach.points).map((point) => (
                <li key={point} className="flex gap-3.5 text-[1rem] leading-[1.6]">
                  <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#7f9c8c]" />
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article>
            <Photo
              name="lipa-prevencija"
              locale={locale}
              sizes="(max-width: 900px) 100vw, 44vw"
              className="aspect-3/2 rounded-[1.25rem]"
            />
            <p className="mt-6 text-[0.8125rem] font-semibold tracking-[0.18em] text-[#7f9c8c] uppercase">
              {t(c.prevention.eyebrow)}
            </p>
            <h2 className="mt-3 text-[1.35rem] leading-[1.2] font-semibold tracking-[-0.015em] @3xl:text-[1.7rem]">
              {t(c.prevention.title)}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[1rem] leading-[1.7] text-[#123a42]/75">{t(c.prevention.body)}</p>
          </article>
        </div>
      </DemoSection>

      {/* Contact */}
      <DemoSection id={at("kontakt")} className="@3xl:px-14">
        <div className="relative grid gap-9 @3xl:grid-cols-[1.05fr_0.95fr] @3xl:items-start @3xl:gap-14">
          <div className="relative">
            <h2 className="text-[1.6rem] leading-[1.15] font-semibold tracking-[-0.02em] @3xl:text-[2.1rem]">
              {t(c.contact.title)}
            </h2>
            <p className="mt-4 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-[#123a42]/75">{t(c.contact.lead)}</p>
            <div className="mt-7">
              <DemoActionButton
                id={at("notice")}
                label={t(c.contact.cta)}
                noticeTitle={dict.demoChrome.formNoticeTitle}
                noticeBody={dict.demoChrome.formNoticeBody}
                className="rounded-full bg-[#123a42] text-[#fbf9f5]"
                noticeClassName="rounded-2xl border-[#123a42]/20 bg-[#eef3ec]"
              />
            </div>
          </div>
          <dl className="grid gap-5 rounded-[1.5rem] bg-[#eef3ec] p-6 text-[1rem] @2xl:p-7">
            <div>
              <dt className="text-[0.8125rem] tracking-[0.14em] text-[#123a42]/55 uppercase">
                {t(c.contact.hoursLabel)}
              </dt>
              <dd className="mt-1.5 font-medium">{t(c.contact.hours)}</dd>
            </div>
            <div className="border-t border-[#123a42]/10 pt-5">
              <dt className="text-[0.8125rem] tracking-[0.14em] text-[#123a42]/55 uppercase">
                {t(c.contact.addressLabel)}
              </dt>
              <dd className="mt-1.5 font-medium">{t(c.contact.address)}</dd>
            </div>
          </dl>
        </div>
      </DemoSection>

      {/* Booking stays in reach on a narrow screen */}
      <div className="sticky bottom-0 z-10 border-t border-[#123a42]/10 bg-[#fbf9f5]/95 px-5 py-3 backdrop-blur @3xl:hidden">
        <a
          href={`#${at("kontakt")}`}
          className="flex min-h-12 items-center justify-center rounded-full bg-[#123a42] px-6 text-[0.9375rem] font-semibold text-[#fbf9f5]"
        >
          {t(c.nav.book)}
        </a>
      </div>

      <footer className="border-t border-[#123a42]/10 px-5 py-7 text-[0.8125rem] text-[#123a42]/60 @3xl:px-14">
        {c.brand} — {dict.common.demoNotice}
      </footer>
    </div>
  );
}
