import { Shot } from "@/components/media/Shot";
import { WebshopDemoCard } from "@/components/home/WebshopDemoCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ArrowUpRight } from "@/components/ui/icons";
import { demoProjects, type DemoProject } from "@/content/projects";
import { cn } from "@/lib/cn";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { sectionIds } from "@/lib/nav";

/**
 * The portfolio, hung like a small exhibition: the opening work takes the
 * wall, the other two share a frame beside each other.
 *
 * Each card is a capture of the implemented demo page, so what you see is
 * what opens.
 */
export function ProjectsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [lead, ...rest] = demoProjects;

  return (
    <Section id={sectionIds.projects} tone="paper" labelledBy="projects-title">
      <Container>
        <SectionHeading
          id="projects-title"
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          lead={dict.projects.lead}
        />

        <div className="mt-8 lg:mt-10">
          <div className="mb-12 lg:mb-16">
            <WebshopDemoCard locale={locale} />
          </div>
          <Reveal>
            <ProjectCard project={lead} locale={locale} dict={dict} featured />
          </Reveal>

          <div className="mt-8 grid gap-9 lg:mt-9 lg:grid-cols-2 lg:gap-8">
            {rest.map((project, index) => (
              <Reveal key={project.slug} delay={index * 90}>
                <ProjectCard project={project} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function ProjectCard({
  project,
  locale,
  dict,
  featured = false,
}: {
  project: DemoProject;
  locale: Locale;
  dict: Dictionary;
  featured?: boolean;
}) {
  const t = translator(locale);
  const caseHref = path("project", locale, project.slug);
  const demoHref = path("demo", locale, project.slug);
  const titleId = `project-${project.slug}`;
  const ctaId = `project-${project.slug}-cta`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group/card relative",
        featured && "grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-12",
      )}
    >
      {/* The picture is not a link. It used to be a second link to the same
          page with nothing to announce it; now the one link below is stretched
          across the whole card, so the picture is still clickable while the
          accessibility tree holds a single, named target. */}
      <div className="overflow-hidden rounded-2xl">
        <Shot
          slug={project.slug}
          locale={locale}
          device="desktop"
          crop="card"
          alt={`${dict.projects.shotAlt} — ${project.brand}`}
          sizes={featured ? "(max-width: 1024px) 100vw, 56vw" : "(max-width: 1024px) 100vw, 46vw"}
          className="transition-transform duration-500 group-hover/card:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover/card:transform-none"
        />
      </div>

      <div className={cn(!featured && "mt-5")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-forest/30 px-2.5 py-1 text-[0.8125rem] font-semibold tracking-[0.1em] text-forest uppercase">
            {dict.common.demoBadge}
          </span>
          <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-slate uppercase">
            {t(project.sector)}
          </span>
        </div>

        <h3
          id={titleId}
          className={cn(
            "mt-4 font-display leading-[0.98] font-extrabold tracking-[-0.03em]",
            featured ? "text-display" : "text-title",
          )}
        >
          {project.brand}
        </h3>

        <p className="mt-3.5 max-w-[62ch] text-body leading-relaxed text-slate">
          {t(project.visitorProblem)}
        </p>

        <p className="mt-4 max-w-[62ch] text-body leading-snug">
          <span className="text-[0.8125rem] font-semibold tracking-[0.14em] text-slate uppercase">
            {dict.projects.functionLabel}:
          </span>{" "}
          <span className="font-semibold text-forest">{t(project.tryIt.title)}</span>
        </p>

        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
          <TrackedLink
            href={caseHref}
            id={ctaId}
            // Announced as "Stolarija Hrast, Pogledajte projekt" — the card's
            // subject and its action, from one link rather than two.
            aria-labelledby={`${titleId} ${ctaId}`}
            track={["view_project", { project: project.slug, locale }]}
            className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-forest underline decoration-forest/30 underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:decoration-forest"
          >
            {dict.projects.cardCta}
            <ArrowUpRight className="size-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 motion-reduce:group-hover/card:transform-none" />
          </TrackedLink>
          <TrackedLink
            href={demoHref}
            track={["open_demo", { project: project.slug, locale, from: "portfolio" }]}
            className="relative inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-slate underline decoration-slate/30 underline-offset-4 hover:text-forest"
          >
            {dict.projects.tryDemo}
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}
