"use client";

import { useId } from "react";

import { advisoryContent as c } from "@/content/demos/advisory";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { Photo } from "@/components/media/Photo";
import { DemoCover } from "./DemoCover";
import { AdvisoryPlanner } from "./DemoTools";
import { DemoSection } from "./shared";

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
export function AdvisoryDemo({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const uid = useId().replace(/[:]/g, "");
  const t = translator(locale);
  // Ids are derived per instance: a case page renders this demo twice.
  const at = (name: string) => `${uid}-${name}`;
  return (
    <div className="bg-[#f4f1ea] font-sans text-[#1b2130]">
      <DemoCover
        kind="advisory"
        locale={locale}
        primary={`#${at("orijentacija")}`}
        secondary={`#${at("podrucja")}`}
        priority
      />

      {/* Areas — editorial list, hairlines instead of cards */}
      <DemoSection
        id={at("podrucja")}
        className="border-t border-[#1b2130]/15 @3xl:px-14"
      >
        <div className="relative">
          <h2 className="font-display text-[0.8125rem] font-medium tracking-[0.34em] text-[#6e6a4d] uppercase">
            {t(c.areas.title)}
          </h2>
        </div>
        <div className="mt-8 divide-y divide-[#1b2130]/15 border-y border-[#1b2130]/15">
          {c.areas.items.map((item, index) => (
            <article
              key={item.id}
              className="grid gap-6 py-10 @3xl:grid-cols-[6rem_1fr] @3xl:gap-10"
            >
              <span className="font-display text-[0.9375rem] tracking-[0.2em] text-[#1b2130]/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className={cn(
                  "grid gap-6",
                  item.image &&
                    "@3xl:grid-cols-[1.15fr_0.85fr] @3xl:items-start @3xl:gap-10",
                )}
              >
                <div className="max-w-[60ch]">
                  <h3 className="font-display text-[1.5rem] leading-snug font-normal tracking-[-0.01em] @3xl:text-[1.9rem]">
                    {t(item.name)}
                  </h3>
                  <p className="mt-4 text-[1.0625rem] leading-[1.75] text-[#1b2130]/75">
                    {t(item.body)}
                  </p>
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

      <div id={at("orijentacija")}>
        <AdvisoryPlanner locale={locale} />
      </div>

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
                <li
                  key={t(step.title)}
                  className="border-t border-[#1b2130]/25 pt-5"
                >
                  <span className="font-display text-[0.9375rem] tracking-[0.2em] text-[#1b2130]/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-[1.25rem] leading-snug font-normal">
                    {t(step.title)}
                  </h3>
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
      <DemoSection
        id={at("kontakt")}
        className="border-t border-[#1b2130]/15 @3xl:px-14"
      >
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.08] font-normal tracking-[-0.015em] @3xl:text-4xl">
            {t(c.contact.title)}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-[1.75] text-[#1b2130]/75">
            {t(c.contact.lead)}
          </p>
          <div className="mt-6">
            <a
              href={`#${at("orijentacija")}`}
              className="inline-flex min-h-12 items-center bg-[#1b2130] px-6 text-sm font-semibold text-[#f4f1ea]"
            >
              {locale === "de"
                ? "Plan zusammenstellen"
                : "Sastavite plan saradnje"}
            </a>
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
