"use client";

import { useId, useRef, useState } from "react";

import { tradesContent as c } from "@/content/demos/trades";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { JoineryScene, type RoomVariant, type WoodFinish } from "./art";
import { AnnotationMarker, DemoSection } from "./shared";

/**
 * Demo concept: a joinery workshop.
 *
 * Character: dark, heavy, material-led. Headings use the display family at its
 * heaviest weight in uppercase — the opposite end of the type system from the
 * clinic concept. The configurator replaces a photo gallery: picking a room
 * and a finish repaints an SVG elevation and swaps the scope list with it.
 */
export function TradesDemo({
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
  const [room, setRoom] = useState<RoomVariant>("kitchen");
  const [finish, setFinish] = useState<WoodFinish>("oak");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeRoom = c.configurator.rooms.find((item) => item.id === room) ?? c.configurator.rooms[0];
  const activeFinish = c.configurator.finishes.find((item) => item.id === finish) ?? c.configurator.finishes[0];

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const last = c.configurator.rooms.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setRoom(c.configurator.rooms[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="bg-[#141312] font-sans text-[#f2ece2]">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 @3xl:px-12">
        <span className="font-display text-[0.9375rem] font-extrabold tracking-[0.1em] uppercase @3xl:text-base">
          {c.brand}
        </span>
        <nav aria-label={c.brand} className="hidden items-center gap-7 text-[0.8125rem] tracking-[0.14em] uppercase @3xl:flex">
          <span className="text-white/60">{t(c.nav.work)}</span>
          <span className="text-white/60">{t(c.nav.materials)}</span>
          <span className="text-white/60">{t(c.nav.measuring)}</span>
        </nav>
        <span className="rounded-none border border-[#c8864a] px-4 py-2 text-[0.8125rem] font-bold tracking-[0.12em] text-[#c8864a] uppercase @3xl:text-[0.8125rem]">
          {t(c.nav.cta)}
        </span>
      </div>

      {/* Hero */}
      <DemoSection>
        <div className="relative grid gap-10 @3xl:grid-cols-[1.15fr_0.85fr] @3xl:items-end">
          <div className="relative">
            {annotate && (
              <AnnotationMarker id="offer" label={dict.showcase.annotationLabel} className="absolute -top-2 -left-9" />
            )}
            <p className="text-[0.8125rem] font-bold tracking-[0.22em] text-[#c8864a] uppercase">
              {t(c.hero.eyebrow)}
            </p>
            <h1 className="mt-5 font-display text-[2.4rem] leading-[0.92] font-black tracking-[-0.03em] uppercase @2xl:text-6xl @3xl:text-[5.2rem]">
              {t(c.hero.titleLines).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div>
            <p className="max-w-md text-[1.0625rem] leading-relaxed text-white/75">{t(c.hero.lead)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex min-h-12 items-center bg-[#c8864a] px-6 text-[0.9375rem] font-bold tracking-[0.04em] text-[#141312] uppercase">
                {t(c.hero.cta)}
              </span>
              <span className="inline-flex min-h-12 items-center border border-white/25 px-6 text-[0.9375rem] font-semibold">
                {t(c.hero.secondary)}
              </span>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* Configurator */}
      <DemoSection className="border-t border-white/10 bg-[#1b1a18]">
        <div className="relative max-w-2xl">
          {annotate && (
            <AnnotationMarker id="services" label={dict.showcase.annotationLabel} className="absolute -top-1 -left-9" />
          )}
          <p className="text-[0.8125rem] font-bold tracking-[0.22em] text-[#c8864a] uppercase">
            {t(c.configurator.eyebrow)}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[0.95] font-black tracking-[-0.02em] uppercase @3xl:text-5xl">
            {t(c.configurator.title)}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">{t(c.configurator.lead)}</p>
        </div>

        {/* Room tabs */}
        <div className="mt-8">
          <p id={`${uid}-roomlabel`} className="text-[0.8125rem] font-bold tracking-[0.16em] text-white/50 uppercase">
            {t(c.configurator.roomLabel)}
          </p>
          <div role="tablist" aria-labelledby={`${uid}-roomlabel`} className="mt-3 flex flex-wrap gap-2">
            {c.configurator.rooms.map((item, index) => {
              const isActive = item.id === room;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`${uid}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setRoom(item.id)}
                  onKeyDown={(event) => onTabKey(event, index)}
                  className={cn(
                    "min-h-11 px-5 text-sm font-bold tracking-[0.08em] uppercase transition-colors",
                    isActive
                      ? "bg-[#f2ece2] text-[#141312]"
                      : "border border-white/20 text-white/70 hover:border-white/50 hover:text-white",
                  )}
                >
                  {t(item.name)}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${room}`}
          tabIndex={0}
          className="mt-6 grid gap-6 @3xl:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="overflow-hidden border border-white/10 bg-[#141312]">
            <div className="aspect-8/5">
              <JoineryScene uid={`${uid}-scene`} variant={room} finish={finish} />
            </div>
            <div className="border-t border-white/10 px-4 py-3 text-[0.8125rem] tracking-[0.1em] text-white/50 uppercase">
              {t(activeRoom.name)} · {t(activeFinish.name)}
            </div>
          </div>

          <div>
            <p className="text-[1.0625rem] leading-relaxed text-white/80">{t(activeRoom.body)}</p>

            <fieldset className="mt-6">
              <legend className="text-[0.8125rem] font-bold tracking-[0.16em] text-white/50 uppercase">
                {t(c.configurator.finishLabel)}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.configurator.finishes.map((item) => {
                  const id = `${uid}-finish-${item.id}`;
                  const isActive = item.id === finish;
                  return (
                    <div key={item.id}>
                      <input
                        type="radio"
                        id={id}
                        name={`${uid}-finish`}
                        checked={isActive}
                        onChange={() => setFinish(item.id)}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={id}
                        className={cn(
                          "flex min-h-11 cursor-pointer items-center gap-2.5 border px-3.5 text-sm font-medium transition-colors",
                          "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-[#c8864a]",
                          isActive ? "border-[#c8864a] text-white" : "border-white/20 text-white/65 hover:border-white/45",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="size-5 rounded-full border border-black/30"
                          style={{
                            background:
                              item.id === "oak"
                                ? "linear-gradient(135deg,#c99a63,#a97c48)"
                                : item.id === "walnut"
                                  ? "linear-gradient(135deg,#6f4630,#3d2318)"
                                  : "linear-gradient(135deg,#e9e6df,#cfcbc2)",
                          }}
                        />
                        {t(item.name)}
                      </label>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[0.8125rem] text-white/45">{t(c.configurator.finishNote)}</p>
            </fieldset>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-[0.8125rem] font-bold tracking-[0.16em] text-white/50 uppercase">
                {t(c.configurator.includesLabel)}
              </p>
              <ul aria-live="polite" className="mt-3 space-y-2.5">
                {t(activeRoom.includes).map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-white/80">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#c8864a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* Measuring */}
      <DemoSection className="border-t border-white/10">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[0.95] font-black tracking-[-0.02em] uppercase @3xl:text-4xl">
            {t(c.measuring.title)}
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">{t(c.measuring.lead)}</p>
        </div>
        <ol className="mt-8 grid gap-px bg-white/10 @2xl:grid-cols-3">
          {c.measuring.steps.map((step, index) => (
            <li key={t(step.title)} className="bg-[#141312] p-5 @3xl:p-7">
              <span className="font-display text-4xl font-black text-[#c8864a]">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-bold">{t(step.title)}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{t(step.body)}</p>
            </li>
          ))}
        </ol>
      </DemoSection>

      {/* Contact */}
      <DemoSection className="border-t border-white/10 bg-[#c8864a] text-[#141312]">
        <div className="relative grid gap-8 @3xl:grid-cols-[1.1fr_0.9fr] @3xl:items-start">
          <div className="relative">
            {annotate && (
              <AnnotationMarker id="contact" label={dict.showcase.annotationLabel} className="absolute -top-1 -left-9" />
            )}
            <h2 className="font-display text-3xl leading-[0.95] font-black tracking-[-0.02em] uppercase @3xl:text-5xl">
              {t(c.contact.title)}
            </h2>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-[#141312]/80">{t(c.contact.lead)}</p>
            <span className="mt-6 inline-flex min-h-12 items-center bg-[#141312] px-6 text-[0.9375rem] font-bold tracking-[0.04em] text-[#f2ece2] uppercase">
              {t(c.contact.cta)}
            </span>
            <p className="mt-4 text-[0.8125rem] font-semibold tracking-[0.12em] text-[#141312]/70 uppercase">
              {dict.demoChrome.formNote}
            </p>
          </div>
          <dl className="grid gap-4 border border-[#141312]/25 p-5 text-[0.9375rem] @2xl:p-6">
            <div>
              <dt className="text-[0.8125rem] tracking-[0.12em] text-[#141312]/60 uppercase">{t(c.contact.coverageLabel)}</dt>
              <dd className="mt-1 font-semibold">{t(c.contact.coverage)}</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] tracking-[0.12em] text-[#141312]/60 uppercase">{t(c.contact.workshopLabel)}</dt>
              <dd className="mt-1 font-semibold">{t(c.contact.workshop)}</dd>
            </div>
          </dl>
        </div>
      </DemoSection>

      <footer className="border-t border-white/10 px-5 py-6 text-[0.8125rem] text-white/50 @3xl:px-12">
        {c.brand} — {dict.common.demoNotice}
      </footer>
    </div>
  );
}
