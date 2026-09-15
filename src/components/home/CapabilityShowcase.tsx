"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";

import { DemoViewport, type Device } from "@/components/demos/DemoViewport";
import { demoComponents } from "@/components/demos/registry";
import { annotationNumber } from "@/components/demos/shared";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight, MonitorIcon, PhoneIcon } from "@/components/ui/icons";
import { demoProjects } from "@/content/projects";
import { cn } from "@/lib/cn";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { format } from "@/lib/i18n/format";
import { translator } from "@/lib/i18n/localized";
import { track } from "@/lib/analytics";

/**
 * "Pogledajte šta možemo napraviti" — the section that has to carry the most
 * weight on the page: a real, running concept the visitor can drive.
 */
export function CapabilityShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const uid = useId().replace(/[:]/g, "");
  const t = translator(locale);
  const [activeSlug, setActiveSlug] = useState(demoProjects[0].slug);
  const [device, setDevice] = useState<Device>("desktop");
  const [reasons, setReasons] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const project = demoProjects.find((item) => item.slug === activeSlug) ?? demoProjects[0];
  const Demo = demoComponents[project.key];

  const selectProject = (slug: string) => {
    setActiveSlug(slug);
    track("demo_interaction", { concept: slug, control: "concept" });
  };

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const last = demoProjects.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    selectProject(demoProjects[next].slug);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="sta-mozemo" tone="ink" labelledBy={`${uid}-title`}>
      <Container>
        <SectionHeading
          id={`${uid}-title`}
          tone="dark"
          eyebrow={dict.showcase.eyebrow}
          title={dict.showcase.title}
          lead={dict.showcase.lead}
        />

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-5 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p id={`${uid}-conceptlabel`} className="text-[0.8125rem] font-semibold tracking-[0.16em] text-mist uppercase">
              {dict.showcase.conceptLabel}
            </p>
            <div role="tablist" aria-labelledby={`${uid}-conceptlabel`} className="mt-3 flex flex-wrap gap-2">
              {demoProjects.map((item, index) => {
                const isActive = item.slug === activeSlug;
                return (
                  <button
                    key={item.slug}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${item.slug}`}
                    aria-selected={isActive}
                    aria-controls={`${uid}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectProject(item.slug)}
                    onKeyDown={(event) => onTabKey(event, index)}
                    className={cn(
                      "min-h-12 rounded-full px-5 text-sm font-semibold transition-colors sm:text-[0.9375rem]",
                      isActive
                        ? "bg-lime text-ink"
                        : "border border-mist/35 text-mist hover:border-paper hover:text-paper",
                    )}
                  >
                    {t(item.sector)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <p id={`${uid}-devicelabel`} className="text-[0.8125rem] font-semibold tracking-[0.16em] text-mist uppercase">
                {dict.showcase.deviceLabel}
              </p>
              <div
                role="group"
                aria-labelledby={`${uid}-devicelabel`}
                className="mt-3 inline-flex rounded-full border border-mist/35 p-1"
              >
                {(
                  [
                    ["desktop", dict.showcase.device.desktop, MonitorIcon],
                    ["mobile", dict.showcase.device.mobile, PhoneIcon],
                  ] as const
                ).map(([value, label, Icon]) => {
                  const isActive = device === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setDevice(value);
                        track("demo_interaction", { concept: project.slug, control: `device:${value}` });
                      }}
                      className={cn(
                        "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors",
                        isActive ? "bg-paper text-ink" : "text-mist hover:text-paper",
                      )}
                    >
                      <Icon className="size-4" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              aria-expanded={reasons}
              aria-controls={`${uid}-reasons`}
              onClick={() => {
                setReasons((open) => !open);
                track("demo_interaction", { concept: project.slug, control: "reasons" });
              }}
              className={cn(
                "inline-flex min-h-12 items-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors",
                reasons ? "border-lime bg-lime/10 text-lime" : "border-mist/35 text-mist hover:border-paper hover:text-paper",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex size-5 items-center justify-center rounded-full text-[0.8125rem] font-bold",
                  reasons ? "bg-lime text-ink" : "border border-current",
                )}
              >
                ?
              </span>
              {reasons ? dict.showcase.reasonsToggleHide : dict.showcase.reasonsToggle}
            </button>
          </div>
        </div>

        {/* Frame + explanations */}
        <div className={cn("mt-8 grid gap-6", reasons && "lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10")}>
          <div
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${activeSlug}`}
            className="min-w-0"
          >
            <div
              className={cn(
                "mx-auto overflow-hidden border border-line-dark bg-[#0d1d1a] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]",
                device === "desktop" ? "rounded-2xl" : "max-w-[21rem] rounded-[2.25rem] p-2",
              )}
            >
              {device === "desktop" ? (
                <div className="flex items-center gap-3 border-b border-line-dark px-4 py-3">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-mist/40" />
                    <span className="size-2.5 rounded-full bg-mist/40" />
                    <span className="size-2.5 rounded-full bg-mist/40" />
                  </span>
                  <span className="truncate rounded-full bg-black/30 px-3 py-1 text-[0.8125rem] text-mist">
                    demo · {project.slug}
                  </span>
                </div>
              ) : (
                <div className="flex justify-center py-2" aria-hidden="true">
                  <span className="h-1.5 w-16 rounded-full bg-mist/30" />
                </div>
              )}

              <DemoViewport
                device={device}
                label={format(dict.showcase.previewLabel, { name: project.brand })}
                className={cn(
                  "bg-white",
                  device === "desktop"
                    ? "h-[26rem] sm:h-[32rem] lg:h-[38rem]"
                    : "h-[30rem] rounded-[1.5rem] sm:h-[34rem]",
                )}
              >
                <Demo locale={locale} dict={dict} annotate={reasons} />
              </DemoViewport>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-3 py-1.5 text-[0.8125rem] font-semibold tracking-[0.1em] text-lime uppercase">
                {dict.common.demoNotice}
              </p>
              <Link
                href={path("demo", locale, project.slug)}
                onClick={() => track("project_open", { concept: project.slug, from: "showcase" })}
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-paper underline decoration-lime/50 underline-offset-4 hover:decoration-lime"
              >
                {dict.showcase.openDemo}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:transform-none" />
              </Link>
              <Link
                href={path("project", locale, project.slug)}
                className="inline-flex min-h-11 items-center text-sm font-medium text-mist underline decoration-mist/40 underline-offset-4 hover:text-paper"
              >
                {dict.showcase.openCase}
              </Link>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-mist">{dict.showcase.liveNote}</p>
          </div>

          <div id={`${uid}-reasons`} hidden={!reasons} className="min-w-0">
            <h3 className="text-sm font-semibold tracking-[0.14em] text-lime uppercase">
              {dict.showcase.reasonsHeading}
            </h3>
            <p className="mt-2 text-sm text-mist">{dict.showcase.reasonsHint}</p>
            <ol className="mt-5 space-y-5">
              {project.annotations.map((annotation) => (
                <li key={annotation.id} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-[0.8125rem] font-bold text-ink"
                  >
                    {annotationNumber(annotation.id)}
                  </span>
                  <div>
                    <p className="font-semibold text-paper">{t(annotation.title)}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">{t(annotation.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
