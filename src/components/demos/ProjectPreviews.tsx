"use client";

import { DemoViewport } from "./DemoViewport";
import { demoComponents } from "./registry";
import type { DemoKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

/**
 * Desktop and mobile views on a case page, rendered from the live demo rather
 * than from screenshots — so what you see here and what opens in the demo can
 * never drift apart.
 */
export function ProjectPreviews({
  demoKey,
  brand,
  locale,
  dict,
}: {
  demoKey: DemoKey;
  brand: string;
  locale: Locale;
  dict: Dictionary;
}) {
  const Demo = demoComponents[demoKey];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-8">
      <figure className="min-w-0">
        <div className="overflow-hidden rounded-2xl border border-line-dark bg-[#0d1d1a]">
          <div className="flex items-center gap-3 border-b border-line-dark px-4 py-3">
            <span aria-hidden="true" className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-mist/40" />
              <span className="size-2.5 rounded-full bg-mist/40" />
              <span className="size-2.5 rounded-full bg-mist/40" />
            </span>
            <span className="truncate rounded-full bg-black/30 px-3 py-1 text-[0.8125rem] text-mist">{brand}</span>
          </div>
          <DemoViewport device="desktop" label={dict.projects.viewDesktop} className="h-[22rem] bg-white sm:h-[30rem]">
            <Demo locale={locale} dict={dict} />
          </DemoViewport>
        </div>
        <figcaption className="mt-3 text-sm text-mist">{dict.projects.viewDesktop}</figcaption>
      </figure>

      <figure className="min-w-0">
        <div className="mx-auto max-w-[19rem] overflow-hidden rounded-[2rem] border border-line-dark bg-[#0d1d1a] p-2">
          <div className="flex justify-center py-1.5" aria-hidden="true">
            <span className="h-1.5 w-14 rounded-full bg-mist/30" />
          </div>
          <DemoViewport
            device="mobile"
            label={dict.projects.viewMobile}
            className="h-[22rem] rounded-[1.4rem] bg-white sm:h-[30rem]"
          >
            <Demo locale={locale} dict={dict} />
          </DemoViewport>
        </div>
        <figcaption className="mt-3 text-center text-sm text-mist lg:text-left">{dict.projects.viewMobile}</figcaption>
      </figure>
    </div>
  );
}
