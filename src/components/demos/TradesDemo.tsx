"use client";

import { useId, useRef, useState } from "react";

import { tradesContent as c } from "@/content/demos/trades";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { DemoActionButton } from "./DemoActionButton";
import { DemoSection } from "./shared";
import { Photo } from "@/components/media/Photo";
import type { WoodFinish } from "@/content/demos/trades";

/**
 * Demo concept: a joinery workshop.
 *
 * Walnut, charcoal, linen and muted copper, taken from the photography, with
 * the display family at its heaviest against a quiet text face. The concepts
 * and material samples are conceptual visuals, labelled as such — they are not
 * documentation of delivered commissions. See docs/SLIKE.md.
 */
export function TradesDemo({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const uid = useId().replace(/[:]/g, "");
  const t = translator(locale);
  const at = (name: string) => `${uid}-${name}`;
  const [finish, setFinish] = useState<WoodFinish>("oak");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeFinish = c.materials.items.find((item) => item.id === finish) ?? c.materials.items[0];
  const kitchen = c.projects.items[0];
  const gallery = c.projects.items.slice(1);

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const last = c.materials.items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setFinish(c.materials.items[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="bg-[#1b1a18] font-sans text-[#efeae0]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-[#efeae0]/12 px-5 py-4 @3xl:px-14 @3xl:py-5">
        <span className="font-display text-[0.9375rem] font-extrabold tracking-[0.14em] uppercase @3xl:text-base">
          {c.brand}
        </span>
        <nav aria-label={c.brand} className="hidden items-center gap-8 text-[0.8125rem] tracking-[0.14em] uppercase @3xl:flex [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center">
          <a href={`#${at("projekti")}`} className="text-[#efeae0]/60 hover:text-[#efeae0]">
            {t(c.nav.work)}
          </a>
          <a href={`#${at("materijali")}`} className="text-[#efeae0]/60 hover:text-[#efeae0]">
            {t(c.nav.materials)}
          </a>
          <a href={`#${at("mjerenje")}`} className="text-[#efeae0]/60 hover:text-[#efeae0]">
            {t(c.nav.measuring)}
          </a>
        </nav>
        <a
          href={`#${at("kontakt")}`}
          className="inline-flex min-h-11 items-center border border-[#b07b4f] px-4 text-[0.8125rem] font-bold tracking-[0.12em] text-[#d9a473] uppercase"
        >
          {t(c.nav.cta)}
        </a>
      </div>

      {/* Hero — the kitchen photograph carries the first screen */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Photo
            name="hrast-kuhinja"
            locale={locale}
            priority
            decorative
            sizes="100vw"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14120f]/92 via-[#14120f]/70 to-[#14120f]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14120f]/85 via-transparent to-[#14120f]/45" />
        </div>

        <div className="px-5 pt-16 pb-10 @2xl:px-8 @3xl:px-14 @3xl:pt-28 @3xl:pb-14">
          <div className="relative max-w-[62rem]">
            <p className="text-[0.8125rem] font-bold tracking-[0.24em] text-[#d9a473] uppercase">
              {t(c.hero.eyebrow)}
            </p>
            <h1 className="mt-6 font-display text-[2.4rem] leading-[0.94] font-black tracking-[-0.035em] uppercase @2xl:text-[3.6rem] @3xl:text-[5rem]">
              {t(c.hero.titleLines).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-[#efeae0]/85 @3xl:text-[1.125rem]">
              {t(c.hero.lead)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`#${at("kontakt")}`}
                className="inline-flex min-h-12 items-center bg-[#b07b4f] px-6 text-[0.9375rem] font-bold tracking-[0.04em] text-[#14120f] uppercase"
              >
                {t(c.hero.cta)}
              </a>
              <a
                href={`#${at("materijali")}`}
                className="inline-flex min-h-12 items-center border border-[#efeae0]/35 px-6 text-[0.9375rem] font-semibold"
              >
                {t(c.hero.secondary)}
              </a>
            </div>
          </div>
        </div>

        {/* The kitchen is the first concept; it is not shown large again below. */}
        <div className="border-t border-[#efeae0]/15 px-5 py-5 @3xl:px-14">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="text-[0.8125rem] font-bold tracking-[0.18em] text-[#d9a473] uppercase">
              {t(c.hero.conceptLabel)}
            </span>
            <span className="font-display text-[1.1rem] font-black tracking-[-0.01em] uppercase">
              {t(kitchen.name)}
            </span>
            <span className="text-[0.9375rem] text-[#efeae0]/65">{t(kitchen.kind)}</span>
          </div>
          <p className="mt-3 max-w-[58ch] text-[1rem] leading-[1.65] text-[#efeae0]/75">{t(kitchen.body)}</p>
        </div>
      </section>

      {/* Concept projects */}
      <DemoSection id={at("projekti")} className="@3xl:px-14">
        <div className="relative max-w-[56ch]">
          <p className="text-[0.8125rem] font-bold tracking-[0.24em] text-[#d9a473] uppercase">
            {t(c.projects.eyebrow)}
          </p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[0.98] font-black tracking-[-0.025em] uppercase @3xl:text-[3rem]">
            {t(c.projects.title)}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#efeae0]/70">{t(c.projects.lead)}</p>
        </div>

        <div className="mt-10 grid gap-10 @3xl:grid-cols-[1.25fr_0.75fr] @3xl:gap-8">
          {gallery.map((item, index) => (
            <article key={item.id} className="flex flex-col">
              <Photo
                name={item.image}
                locale={locale}
                sizes={index === 0 ? "(max-width: 900px) 100vw, 56vw" : "(max-width: 900px) 100vw, 34vw"}
                className={index === 0 ? "aspect-3/2" : "aspect-4/5"}
              />
              <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <h3 className="font-display text-[1.35rem] leading-tight font-black tracking-[-0.02em] uppercase">
                  {t(item.name)}
                </h3>
                <span className="text-[0.9375rem] text-[#efeae0]/60">{t(item.kind)}</span>
              </div>
              <p className="mt-3 max-w-[54ch] text-[1rem] leading-[1.65] text-[#efeae0]/75">{t(item.body)}</p>
              <p className="mt-5 text-[0.8125rem] font-bold tracking-[0.16em] text-[#efeae0]/45 uppercase">
                {t(c.projects.includesLabel)}
              </p>
              <ul className="mt-3 space-y-2">
                {t(item.includes).map((line) => (
                  <li key={line} className="flex gap-3 text-[0.9375rem] leading-[1.6] text-[#efeae0]/80">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3.5 shrink-0 bg-[#b07b4f]" />
                    {line}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </DemoSection>

      {/* The joint, close up — two sentences, nothing more */}
      <section className="border-t border-[#efeae0]/12 bg-[#14120f]">
        <div className="grid items-center gap-8 @3xl:grid-cols-[1.1fr_0.9fr] @3xl:gap-0">
          <Photo
            name="hrast-spoj-detalj"
            locale={locale}
            sizes="(max-width: 900px) 100vw, 55vw"
            className="aspect-3/2 @3xl:aspect-auto @3xl:h-full @3xl:min-h-[26rem]"
          />
          <div className="px-5 pb-12 @2xl:px-8 @3xl:px-14 @3xl:py-16">
            <p className="text-[0.8125rem] font-bold tracking-[0.24em] text-[#d9a473] uppercase">
              {t(c.detail.eyebrow)}
            </p>
            <h2 className="mt-4 font-display text-[1.7rem] leading-[1] font-black tracking-[-0.025em] uppercase @3xl:text-[2.4rem]">
              {t(c.detail.title)}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-[#efeae0]/78">{t(c.detail.body)}</p>
          </div>
        </div>
      </section>

      {/* Material study */}
      <DemoSection id={at("materijali")} className="border-t border-[#efeae0]/12 bg-[#141312] @3xl:px-14">
        <div className="max-w-[56ch]">
          <p className="text-[0.8125rem] font-bold tracking-[0.24em] text-[#d9a473] uppercase">
            {t(c.materials.eyebrow)}
          </p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[0.98] font-black tracking-[-0.025em] uppercase @3xl:text-[2.6rem]">
            {t(c.materials.title)}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#efeae0]/70">{t(c.materials.lead)}</p>
        </div>

        <div className="mt-9 grid gap-8 @3xl:grid-cols-[1.05fr_0.95fr] @3xl:gap-12">
          <figure className="min-w-0">
            <Photo
              name={activeFinish.image}
              locale={locale}
              fit="contain"
              sizes="(max-width: 900px) 100vw, 46vw"
              className="aspect-square bg-[#1b1a18]"
            />
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-3 text-[0.8125rem] tracking-[0.12em] uppercase">
              <span className="text-[#efeae0]/50">{t(c.materials.sampleLabel)}</span>
              <span className="font-semibold text-[#d9a473]">{t(activeFinish.name)}</span>
            </figcaption>
          </figure>

          <div>
            <div role="tablist" aria-label={t(c.materials.eyebrow)} className="flex flex-wrap gap-2">
              {c.materials.items.map((item, index) => {
                const isActive = item.id === finish;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={at(`tab-${item.id}`)}
                    aria-selected={isActive}
                    aria-controls={at("material-panel")}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setFinish(item.id)}
                    onKeyDown={(event) => onTabKey(event, index)}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2.5 border px-4 text-[0.9375rem] font-medium transition-colors",
                      isActive
                        ? "border-[#b07b4f] bg-[#b07b4f]/15 text-[#efeae0]"
                        : "border-[#efeae0]/20 text-[#efeae0]/65 hover:border-[#efeae0]/45",
                    )}
                  >
                    <Photo
                      name={item.image}
                      locale={locale}
                      decorative
                      sizes="24px"
                      className="size-5 shrink-0 rounded-full"
                    />
                    {t(item.name)}
                  </button>
                );
              })}
            </div>

            <div
              id={at("material-panel")}
              role="tabpanel"
              aria-labelledby={at(`tab-${finish}`)}
              tabIndex={0}
              className="mt-6 border-t border-[#efeae0]/12 pt-6"
            >
              <p className="max-w-[52ch] text-[1.0625rem] leading-[1.7] text-[#efeae0]/85">{t(activeFinish.note)}</p>
              <p className="mt-6 text-[0.8125rem] font-bold tracking-[0.16em] text-[#efeae0]/45 uppercase">
                {t(c.materials.useForLabel)}
              </p>
              <ul className="mt-3 space-y-2.5">
                {t(activeFinish.useFor).map((line) => (
                  <li key={line} className="flex gap-3.5 text-[1rem] leading-[1.6] text-[#efeae0]/80">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#b07b4f]" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* Measuring */}
      <DemoSection id={at("mjerenje")} className="border-t border-[#efeae0]/12 @3xl:px-14">
        <div className="max-w-[56ch]">
          <h2 className="font-display text-[1.9rem] leading-[0.98] font-black tracking-[-0.025em] uppercase @3xl:text-[2.6rem]">
            {t(c.measuring.title)}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#efeae0]/70">{t(c.measuring.lead)}</p>
        </div>
        <Photo
          name="hrast-radionica"
          locale={locale}
          sizes="(max-width: 900px) 100vw, 88vw"
          className="mt-9 aspect-3/2 @2xl:aspect-21/9"
        />
        <ol className="mt-8 grid gap-px bg-[#efeae0]/12 @2xl:grid-cols-3">
          {c.measuring.steps.map((step, index) => (
            <li key={t(step.title)} className="bg-[#1b1a18] p-6 @3xl:p-8">
              <span className="font-display text-[2.5rem] leading-none font-black text-[#b07b4f]">0{index + 1}</span>
              <h3 className="mt-4 text-[1.15rem] font-bold">{t(step.title)}</h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-[#efeae0]/70">{t(step.body)}</p>
            </li>
          ))}
        </ol>
      </DemoSection>

      {/* Contact */}
      <DemoSection id={at("kontakt")} className="border-t border-[#efeae0]/12 bg-[#b07b4f] text-[#1b1a18] @3xl:px-14">
        <div className="relative grid gap-9 @3xl:grid-cols-[1.05fr_0.95fr] @3xl:items-start @3xl:gap-14">
          <div className="relative">
            <h2 className="font-display text-[1.9rem] leading-[0.98] font-black tracking-[-0.025em] uppercase @3xl:text-[3rem]">
              {t(c.contact.title)}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-[#1b1a18]/80">{t(c.contact.lead)}</p>
            <div className="mt-7">
              <DemoActionButton
                id={at("notice")}
                label={t(c.contact.cta)}
                noticeTitle={dict.demoChrome.formNoticeTitle}
                noticeBody={dict.demoChrome.formNoticeBody}
                className="bg-[#1b1a18] font-bold tracking-[0.04em] text-[#efeae0] uppercase"
                noticeClassName="border-[#1b1a18]/30 bg-[#1b1a18]/5"
              />
            </div>
          </div>
          <dl className="grid gap-5 border border-[#1b1a18]/25 p-6 text-[1rem] @2xl:p-7">
            <div>
              <dt className="text-[0.8125rem] tracking-[0.14em] text-[#1b1a18]/60 uppercase">
                {t(c.contact.coverageLabel)}
              </dt>
              <dd className="mt-1.5 font-semibold">{t(c.contact.coverage)}</dd>
            </div>
            <div className="border-t border-[#1b1a18]/20 pt-5">
              <dt className="text-[0.8125rem] tracking-[0.14em] text-[#1b1a18]/60 uppercase">
                {t(c.contact.workshopLabel)}
              </dt>
              <dd className="mt-1.5 font-semibold">{t(c.contact.workshop)}</dd>
            </div>
          </dl>
        </div>
      </DemoSection>

      <footer className="border-t border-[#efeae0]/12 px-5 py-7 text-[0.8125rem] text-[#efeae0]/55 @3xl:px-14">
        {c.brand} — {dict.common.demoNotice}
      </footer>
    </div>
  );
}
