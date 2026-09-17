"use client";
import { useEffect, useRef } from "react";
import { DemoCover } from "@/components/demos/DemoCover";
import s from "@/components/demos/PremiumDemos.module.css";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import type { DemoKey } from "@/content/projects";
const kinds: Record<string, DemoKey> = {
  "stolarija-hrast": "trades",
  "ordinacija-lipa": "clinic",
  "meridijan-savjetovanje": "advisory",
};
/** A non-interactive rendering of the actual hero, never an outdated mockup. */
export function Shot({
  slug,
  locale,
  device,
  alt,
  className,
  priority = false,
  frame = true,
}: {
  slug: string;
  locale: Locale;
  device: "desktop" | "mobile";
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  frame?: boolean;
  crop?: "pano" | "card";
}) {
  const holder = useRef<HTMLDivElement>(null);
  const width = device === "mobile" ? 390 : 1100;
  useEffect(() => {
    const element = holder.current;
    if (!element) return;
    const fit = () =>
      element.style.setProperty(
        "--preview-scale",
        String(element.clientWidth / width),
      );
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    return () => observer.disconnect();
  }, [width]);
  const kind = kinds[slug];
  if (!kind) return null;
  return (
    <div
      className={cn(
        "overflow-hidden",
        frame &&
          (device === "mobile"
            ? "rounded-[1.5rem] border-[5px] border-[#35413b]"
            : "rounded-xl border border-current/15"),
        className,
      )}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      {frame && device === "desktop" ? (
        <div className="flex items-center justify-between bg-[#e8e7e0] px-4 py-2.5 text-[#566055]">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-current/40" />
            <span className="size-1.5 rounded-full bg-current/40" />
            <span className="size-1.5 rounded-full bg-current/40" />
          </div>
          <span className="text-[9px] tracking-[.12em] uppercase">
            {locale === "de"
              ? "Interaktives Website-Konzept"
              : "Interaktivni web koncept"}
          </span>
          <span className="w-6" />
        </div>
      ) : null}
      <div
        ref={holder}
        className={`${s.preview} ${device === "mobile" ? s.previewPhone : ""}`}
      >
        <div className={s.previewInner} inert aria-hidden="true">
          <DemoCover kind={kind} locale={locale} preview priority={priority} />
        </div>
      </div>
    </div>
  );
}
