import { notFound } from "next/navigation";

import { demoComponents } from "@/components/demos/registry";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowRight } from "@/components/ui/icons";
import { demoCapability } from "@/content/demo-capabilities";
import { getProject } from "@/content/projects";
import { path, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

/**
 * A demo concept running on its own route.
 *
 * A slim MOST bar sits above it so nobody can mistake the page for a real
 * business, and the route is excluded from search — a demo dental practice
 * should never turn up in results as if it were a real one.
 */
export function DemoView({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const capability = demoCapability(slug, locale);
  const dict = getDictionary(locale);
  const Demo = demoComponents[project.key];
  const homeHref = `${path("home", locale)}#top`;
  const homeLabel = locale === "de" ? "Startseite" : "Početna";
  const returnLabel = locale === "de" ? "Zur MOST Studio Startseite" : "Na početnu stranicu MOST Studija";

  return (
    <>
      <a
        href="#demo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        {dict.common.skipToContent}
      </a>

      {/* data-most-chrome: the capture script hides this bar so a portfolio
          screenshot shows the demo site itself, not our wrapper around it. */}
      <header data-most-chrome className="sticky top-0 z-50 border-b border-mist/20 bg-ink text-paper on-dark">
        <div className="mx-auto flex min-h-16 w-full max-w-[110rem] items-center justify-between gap-2 px-3 py-2 sm:px-6">
          <a href={homeHref} aria-label={returnLabel} className="inline-flex min-h-11 items-center">
            <Wordmark />
          </a>
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} route={{ key: "demo", slug }} dict={dict} tone="dark" className="flex" />
            <a href={homeHref} aria-label={returnLabel} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-mist/40 px-4 text-sm font-semibold hover:bg-paper/10">
              <ArrowRight className="size-4 rotate-180" />
              <span className="hidden sm:inline">{homeLabel}</span>
            </a>
          </div>
        </div>
      </header>
      <div data-most-chrome className="bg-ink text-paper on-dark">
        <div className="mx-auto flex w-full max-w-[110rem] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-lime px-3 py-1 text-[0.8125rem] font-bold tracking-[0.14em] text-ink uppercase sm:text-sm">
              {dict.demoChrome.bannerTitle}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {capability && <a href={`#${capability.anchor}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-lime underline underline-offset-4">{capability.action}<ArrowRight className="size-4" /></a>}
            <a
              href={path("project", locale, project.slug)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-mist hover:text-paper"
            >
              {dict.demoChrome.backToCase}
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
        <p className="mx-auto w-full max-w-[110rem] px-4 pb-3 text-[0.8125rem] leading-relaxed text-mist sm:px-6">
          {dict.demoChrome.bannerBody}
        </p>
      </div>

      <main id="demo" className="@container">
        <Demo locale={locale} dict={dict} />
      </main>
    </>
  );
}
