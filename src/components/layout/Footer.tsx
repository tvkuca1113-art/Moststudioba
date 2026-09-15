import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { InstagramIcon } from "@/components/ui/icons";
import { demoProjects } from "@/content/projects";
import { site } from "@/content/site";
import { path, type Locale, type RouteRef } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { format } from "@/lib/i18n/format";
import { translator } from "@/lib/i18n/localized";
import { sectionIds } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({
  locale,
  route,
  dict,
}: {
  locale: Locale;
  route: RouteRef;
  dict: Dictionary;
}) {
  const t = translator(locale);
  const home = path("home", locale);
  const homeAnchor = (id: string) => `${home === "/" ? "" : home}/#${id}`;

  const pages = [
    { label: dict.nav.projects, href: path("projects", locale) },
    { label: dict.nav.services, href: path("services", locale) },
    { label: dict.nav.process, href: homeAnchor(sectionIds.process) },
    { label: dict.nav.studio, href: homeAnchor(sectionIds.studio) },
    { label: dict.nav.contact, href: path("contact", locale) },
  ];

  return (
    <footer className="bg-ink text-paper on-dark">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href={home} className="inline-block py-1">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-mist">{dict.footer.blurb}</p>
          </div>

          <nav aria-label={dict.footer.navTitle}>
            <h2 className="text-[0.8125rem] font-semibold tracking-[0.16em] text-lime uppercase">{dict.footer.navTitle}</h2>
            <ul className="mt-4 space-y-1">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-[0.9375rem] text-mist hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.demoTitle}>
            <h2 className="text-[0.8125rem] font-semibold tracking-[0.16em] text-lime uppercase">{dict.footer.demoTitle}</h2>
            <ul className="mt-4 space-y-1">
              {demoProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={path("project", locale, project.slug)}
                    className="inline-flex min-h-10 items-center text-[0.9375rem] text-mist hover:text-paper"
                  >
                    {project.brand}
                    <span className="sr-only"> — {t(project.sector)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.8125rem] font-semibold tracking-[0.16em] text-lime uppercase">{dict.footer.contactTitle}</h2>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-mist hover:text-paper"
            >
              <InstagramIcon className="size-5" />
              {site.instagramHandle}
            </a>
            <div className="mt-5">
              <LanguageSwitcher locale={locale} route={route} dict={dict} tone="dark" className="w-fit" />
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-3xl border-t border-line-dark pt-6 text-sm leading-relaxed text-mist">
          {dict.footer.disclaimer}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-mist">
          <p>{format(dict.footer.rights, { year: new Date().getFullYear() })}</p>
          <p>{site.markets.join(" + ")}</p>
        </div>
      </Container>
    </footer>
  );
}
