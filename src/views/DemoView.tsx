import Link from "next/link";
import { notFound } from "next/navigation";

import { demoComponents } from "@/components/demos/registry";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowRight } from "@/components/ui/icons";
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

  const dict = getDictionary(locale);
  const Demo = demoComponents[project.key];

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
      <header data-most-chrome className="bg-ink text-paper on-dark">
        <div className="mx-auto flex w-full max-w-[110rem] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href={path("home", locale)} className="inline-flex min-h-11 items-center">
              <Wordmark compact />
              <span className="sr-only">{dict.demoChrome.backToMost}</span>
            </Link>
            <span className="rounded-full bg-lime px-3 py-1 text-[0.8125rem] font-bold tracking-[0.14em] text-ink uppercase sm:text-sm">
              {dict.demoChrome.bannerTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={path("project", locale, project.slug)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-mist hover:text-paper"
            >
              {dict.demoChrome.backToCase}
              <ArrowRight className="size-4" />
            </Link>
            <LanguageSwitcher
              locale={locale}
              route={{ key: "demo", slug }}
              dict={dict}
              tone="dark"
              className="hidden sm:flex"
            />
          </div>
        </div>
        <p className="mx-auto w-full max-w-[110rem] px-4 pb-3 text-[0.8125rem] leading-relaxed text-mist sm:px-6">
          {dict.demoChrome.bannerBody}
        </p>
      </header>

      <main id="demo" className="@container">
        <Demo locale={locale} dict={dict} />
      </main>
    </>
  );
}
