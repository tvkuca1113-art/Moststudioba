import { ClientScreenshot } from "@/components/projects/ClientScreenshot";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";
import { clientProjects, type ClientProject } from "@/content/client-projects";
import { mirjanaShots } from "@/content/client-shots";
import { cn } from "@/lib/cn";
import { path, type Locale } from "@/lib/i18n/config";
import { translator } from "@/lib/i18n/localized";

export function ClientProjectCard({
  locale,
  project: suppliedProject,
  featured = false,
  headingLevel = 3,
}: {
  locale: Locale;
  project?: ClientProject;
  featured?: boolean;
  headingLevel?: 2 | 3;
}) {
  const project = suppliedProject ?? clientProjects[0];
  if (!project) return null;

  const Heading = headingLevel === 2 ? "h2" : "h3";
  const titleId = `client-project-${project.slug}`;
  const t = translator(locale);
  const c = locale === "bs"
    ? {
        badge: "Klijentski projekt",
        caseLink: "Pogledajte projekt",
        liveLink: "Otvori stranicu",
        liveLabel: "Otvori stranicu — nova kartica",
        caption: "Objavljena klijentska stranica · njemački jezik.",
        alt: "Naslovna s Mirjaninim predstavljanjem i linkovima za pregled tretmana i upit za termin.",
      }
    : {
        badge: "Kundenprojekt",
        caseLink: "Projekt ansehen",
        liveLink: "Website öffnen",
        liveLabel: "Website öffnen — neuer Tab",
        caption: "Veröffentlichte Kundenwebsite · deutschsprachiges Original.",
        alt: "Startseite mit Mirjanas Vorstellung und Links zu Behandlungen und Terminanfrage.",
      };

  return (
    <article
      aria-labelledby={titleId}
      data-project-kind="client"
      data-client-project={project.slug}
      className={cn(
        "grid gap-6",
        featured
          ? "border-t border-line-light pt-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12"
          : "border-t border-line-light pt-6",
      )}
    >
      <ClientScreenshot
        shot={mirjanaShots.desktop}
        alt={c.alt}
        caption={c.caption}
        kind="desktop"
        sizes={featured
          ? "(max-width: 1023px) calc(100vw - 40px), (max-width: 1440px) 60vw, 800px"
          : "(max-width: 767px) calc(100vw - 40px), 50vw"}
      />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-[0.8125rem] font-semibold text-forest">{c.badge}</span>
          <span className="text-sm text-slate">{t(project.sector)}</span>
        </div>
        <Heading id={titleId} className={cn("mt-4 leading-tight tracking-[-0.025em]", featured ? "text-title" : "text-2xl")}>{project.brand}</Heading>
        <p className="mt-4 max-w-[52ch] text-body leading-relaxed text-slate">{t(project.tagline)}</p>
        <p className="mt-5 text-sm font-semibold text-forest">{t(project.roles).join(" · ")}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href={path("project", locale, project.slug)}>{c.caseLink}</ButtonLink>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.liveLabel}
            className={buttonClass("secondary")}
          >
            {c.liveLink}
            <ArrowUpRight className="size-4 shrink-0" />
          </a>
        </div>
      </div>
    </article>
  );
}
