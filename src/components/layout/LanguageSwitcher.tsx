import Link from "next/link";

import { cn } from "@/lib/cn";
import { allPaths, localeLabel, localeName, locales, type Locale, type RouteRef } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

/**
 * Switches language without losing the page: both hrefs come from the same
 * route key, so /projekti/lipa maps to /de/projekte/lipa.
 */
export function LanguageSwitcher({
  locale,
  route,
  dict,
  tone = "light",
  className,
}: {
  locale: Locale;
  route: RouteRef;
  dict: Dictionary;
  tone?: "light" | "dark";
  className?: string;
}) {
  const hrefs = allPaths(route);

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border p-1",
        tone === "light" ? "border-forest/20" : "border-mist/30",
        className,
      )}
      role="group"
      aria-label={dict.common.language}
    >
      {locales.map((candidate) => {
        const isCurrent = candidate === locale;
        return (
          <Link
            key={candidate}
            href={hrefs[candidate]}
            hrefLang={candidate}
            lang={candidate}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={localeName[candidate]}
            className={cn(
              "flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-[0.8125rem] font-semibold tracking-[0.08em] transition-colors",
              isCurrent
                ? tone === "light"
                  ? "bg-forest text-paper"
                  : "bg-lime text-ink"
                : tone === "light"
                  ? "text-slate hover:text-forest"
                  : "text-mist hover:text-paper",
            )}
          >
            {localeLabel[candidate]}
          </Link>
        );
      })}
    </div>
  );
}
