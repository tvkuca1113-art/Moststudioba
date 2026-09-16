"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";

import { Shot } from "@/components/media/Shot";
import { ArrowUpRight } from "@/components/ui/icons";
import type { DemoProject } from "@/content/projects";
import { event } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";

/**
 * The opening gallery: one wall, three works, visible controls.
 *
 * Three decisions worth knowing about.
 *
 * Every panel lives in the same grid cell and all three are always present,
 * so switching cross-fades in place — the section never changes height and
 * nothing below it moves. Panels that are not showing are `visibility:
 * hidden`, which takes them out of the tab order and out of the accessibility
 * tree without removing them from the layout that holds the height.
 *
 * These are screenshots, not three running demos. Three live interfaces on
 * the first screen would mean a second `<h1>` in the page, three sets of
 * scripts and a scroll trap inside a small frame. The running demo is one
 * click away instead.
 *
 * Nothing rotates on its own. A carousel that moves while you are reading it
 * takes the choice away from the visitor, so the only thing that changes a
 * panel is a click, a tap or an arrow key.
 */
export function HeroGallery({
  projects,
  locale,
  dict,
}: {
  projects: DemoProject[];
  locale: Locale;
  dict: Dictionary;
}) {
  const t = translator(locale);
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  /** Roving tabindex: one stop for the whole group, arrows move within it. */
  const onKeyDown = (indexEvent: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = projects.length - 1;
    const moves: Record<string, number | undefined> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = moves[indexEvent.key];
    if (next === undefined) return;
    indexEvent.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className="mt-8 sm:mt-9 lg:mt-10">
      <div
        role="tablist"
        aria-label={dict.hero.galleryLabel}
        className="flex flex-wrap items-center gap-2 sm:gap-3"
      >
        {projects.map((project, index) => {
          const selected = index === active;
          return (
            <button
              key={project.slug}
              ref={(node) => {
                tabsRef.current[index] = node;
              }}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(index)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] font-semibold transition-colors duration-200 sm:px-5",
                selected
                  ? "border-lime bg-lime text-ink"
                  : "border-mist/35 text-mist hover:border-mist/70 hover:text-paper",
              )}
            >
              {project.shortName}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[0.9375rem] text-mist sm:hidden">{dict.hero.galleryHint}</p>

      <div className="gallery-stack mt-4 grid sm:mt-5">
        {projects.map((project, index) => {
          const selected = index === active;
          return (
            <div
              key={project.slug}
              id={panelId(index)}
              role="tabpanel"
              aria-labelledby={tabId(index)}
              data-active={selected}
              className="gallery-panel"
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_11rem] lg:items-end lg:gap-10">
                <Shot
                  slug={project.slug}
                  locale={locale}
                  device="desktop"
                  crop="pano"
                  // Only the opening work is the LCP candidate; the other two
                  // are already in the DOM and load at normal priority.
                  priority={index === 0}
                  alt={`${dict.hero.figureLabel} — ${project.brand}`}
                  sizes="(max-width: 1024px) 100vw, 64vw"
                  className="shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)]"
                />

                {/* Kept short enough that the wide capture, not the phone,
                    decides how tall the panel is. */}
                <Shot
                  slug={project.slug}
                  locale={locale}
                  device="mobile"
                  crop="card"
                  priority={index === 0}
                  alt=""
                  sizes="(max-width: 1024px) 40vw, 180px"
                  className="mx-auto w-[8.5rem] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.95)] sm:w-[9.5rem] lg:mx-0 lg:w-full"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-line-dark pt-3">
                <span className="text-[0.8125rem] font-semibold tracking-[0.14em] text-mist/80 uppercase">
                  {dict.common.demoBadge}
                </span>
                <span className="font-display text-xl leading-tight font-extrabold">{project.brand}</span>
                <span className="text-[0.9375rem] text-mist">{t(project.sector)}</span>
                <Link
                  href={path("demo", locale, project.slug)}
                  onClick={() => event("open_demo", { project: project.slug, locale, from: "hero" })}
                  className="group ml-auto inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
                >
                  {dict.projects.tryDemo}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:transform-none" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
