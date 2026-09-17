
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
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
  const homeAnchor = (id: string) => `${home}#${id}`;

  const pages = [
    { label: dict.nav.projects, href: path("projects", locale) },
    { label: dict.nav.services, href: path("services", locale) },
    { label: dict.nav.process, href: homeAnchor(sectionIds.process) },
    { label: dict.nav.studio, href: homeAnchor(sectionIds.studio) },
    { label: dict.nav.contact, href: path("contact", locale) },
    { label: locale === "bs" ? "Online saradnja u BiH" : "Online-Zusammenarbeit in BiH", href: path("coverage", locale) },
    { label: locale === "bs" ? "Vodič o cijeni" : "Kostenratgeber", href: path("pricing", locale) },
  ];

  return (
    <footer className="bg-ink text-paper on-dark">
      <Container className="py-11 sm:py-12">
        <div className="grid gap-9 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <a href={`${home}#top`} className="inline-flex min-h-11 items-center">
              <Wordmark />
            </a>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-mist">{dict.footer.blurb}</p>
          </div>

          <nav aria-label={dict.footer.navTitle}>
            <h2 className="text-[0.8125rem] font-semibold tracking-[0.16em] text-lime uppercase">{dict.footer.navTitle}</h2>
            <ul className="mt-4 space-y-1">
              {pages.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-mist hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.demoTitle}>
            <h2 className="text-[0.8125rem] font-semibold tracking-[0.16em] text-lime uppercase">{dict.footer.demoTitle}</h2>
            <ul className="mt-4 space-y-1">
              {demoProjects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={path("project", locale, project.slug)}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-mist hover:text-paper"
                  >
                    {project.brand}
                    <span className="sr-only"> — {t(project.sector)}</span>
                  </a>
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
            {site.facebookUrl && <TrackedAnchor href={site.facebookUrl} target="_blank" rel="noopener noreferrer" track={["outbound_facebook", { locale, from: "footer" }]} className="flex min-h-11 items-center text-[0.9375rem] text-mist hover:text-paper">Facebook ↗</TrackedAnchor>}
            <TrackedAnchor href={`mailto:${site.email}`} track={["outbound_email", { locale, from: "footer" }]} className="block min-h-11 break-all py-3 text-sm text-mist underline underline-offset-4 hover:text-paper">{site.email}</TrackedAnchor>
            <div className="mt-5">
              <LanguageSwitcher locale={locale} route={route} dict={dict} tone="dark" className="w-fit" />
            </div>
          </div>
        </div>

        <p className="mt-10 max-w-[72ch] border-t border-line-dark pt-6 text-[0.9375rem] leading-relaxed text-mist">
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
