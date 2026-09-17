"use client";


import { tradesContent as c } from "@/content/demos/trades";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { DemoCover } from "./DemoCover";
import { FurnitureConfigurator } from "./DemoTools";
import { DemoSection } from "./shared";
import { Photo } from "@/components/media/Photo";

/** Warm editorial first screen, material-led gallery and working brief builder.
 * Photography is conceptual, not evidence of delivered client commissions.
 */
export function TradesDemo({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = translator(locale);
  const at = (name: string) => `hrast-${name}`;
  const gallery = c.projects.items;

  return (
    <div className="bg-[#1b1a18] font-sans text-[#efeae0]">
      <DemoCover
        kind="trades"
        locale={locale}
        primary={`#${at("materijali")}`}
        secondary={`#${at("projekti")}`}
        priority
      />

      {/* Concept projects */}
      <DemoSection id={at("projekti")} className="@3xl:px-14">
        <div className="relative max-w-[56ch]">
          <p className="text-[0.8125rem] font-bold tracking-[0.24em] text-[#d9a473] uppercase">
            {t(c.projects.eyebrow)}
          </p>
          <h2 className="mt-4 font-display text-[1.9rem] leading-[0.98] font-black tracking-[-0.025em] uppercase @3xl:text-[3rem]">
            {t(c.projects.title)}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#efeae0]/70">
            {t(c.projects.lead)}
          </p>
        </div>

        <div className="mt-10 grid gap-10 @3xl:grid-cols-3 @3xl:gap-8">
          {gallery.map((item, index) => (
            <article key={item.id} className="flex flex-col">
              <Photo
                name={item.image}
                locale={locale}
                sizes={
                  index === 0
                    ? "(max-width: 900px) 100vw, 56vw"
                    : "(max-width: 900px) 100vw, 34vw"
                }
                className={"aspect-3/2"}
              />
              <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <h3 className="font-display text-[1.35rem] leading-tight font-black tracking-[-0.02em] uppercase">
                  {t(item.name)}
                </h3>
                <span className="text-[0.9375rem] text-[#efeae0]/60">
                  {t(item.kind)}
                </span>
              </div>
              <p className="mt-3 max-w-[54ch] text-[1rem] leading-[1.65] text-[#efeae0]/75">
                {t(item.body)}
              </p>
              <p className="mt-5 text-[0.8125rem] font-bold tracking-[0.16em] text-[#efeae0]/45 uppercase">
                {t(c.projects.includesLabel)}
              </p>
              <ul className="mt-3 space-y-2">
                {t(item.includes).map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 text-[0.9375rem] leading-[1.6] text-[#efeae0]/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3.5 shrink-0 bg-[#b07b4f]"
                    />
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
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-[#efeae0]/78">
              {t(c.detail.body)}
            </p>
          </div>
        </div>
      </section>

      <div id={at("materijali")}>
        <FurnitureConfigurator locale={locale} />
      </div>

      {/* Measuring */}
      <DemoSection
        id={at("mjerenje")}
        className="border-t border-[#efeae0]/12 @3xl:px-14"
      >
        <div className="max-w-[56ch]">
          <h2 className="font-display text-[1.9rem] leading-[0.98] font-black tracking-[-0.025em] uppercase @3xl:text-[2.6rem]">
            {t(c.measuring.title)}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#efeae0]/70">
            {t(c.measuring.lead)}
          </p>
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
              <span className="font-display text-[2.5rem] leading-none font-black text-[#b07b4f]">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-[1.15rem] font-bold">{t(step.title)}</h3>
              <p className="mt-3 text-[1rem] leading-[1.65] text-[#efeae0]/70">
                {t(step.body)}
              </p>
            </li>
          ))}
        </ol>
      </DemoSection>

      {/* Contact */}
      <DemoSection
        id={at("kontakt")}
        className="border-t border-[#efeae0]/12 bg-[#b07b4f] text-[#1b1a18] @3xl:px-14"
      >
        <div className="relative grid gap-9 @3xl:grid-cols-[1.05fr_0.95fr] @3xl:items-start @3xl:gap-14">
          <div className="relative">
            <h2 className="font-display text-[1.9rem] leading-[0.98] font-black tracking-[-0.025em] uppercase @3xl:text-[3rem]">
              {t(c.contact.title)}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-[#1b1a18]/80">
              {t(c.contact.lead)}
            </p>
            <div className="mt-7">
              <a
                href={`#${at("materijali")}`}
                className="inline-flex min-h-12 items-center bg-[#1b1a18] px-6 text-sm font-semibold text-[#efeae0]"
              >
                {locale === "de"
                  ? "Projekt zusammenstellen"
                  : "Sastavite svoj projekt"}
              </a>
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
