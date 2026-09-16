import Link from "next/link";

import { Shot } from "@/components/media/Shot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight } from "@/components/ui/icons";
import { demoProjects, type DemoProject } from "@/content/projects";
import { cn } from "@/lib/cn";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";
import { sectionIds } from "@/lib/nav";

/**
 * The portfolio, and the only place the homepage shows the work.
 *
 * Each card is a capture of the implemented demo page, so what you see is what
 * opens. The homepage deliberately does not embed a running demo: three live
 * interfaces on one page cost a second <h1>, a lot of JavaScript and a scroll
 * trap inside a small frame. The running demo is one click away instead.
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

        <div className="mt-12 lg:mt-16">
          <Reveal>
            <ProjectCard project={lead} locale={locale} dict={dict} featured />
          </Reveal>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-10">
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

  return (
    <article className={cn(featured && "grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-12")}>
      <Link
        href={caseHref}
        tabIndex={-1}
        aria-hidden="true"
        className="group block overflow-hidden rounded-2xl"
      >
        <Shot
          slug={project.slug}
          locale={locale}
          device="desktop"
          alt=""
          sizes={featured ? "(max-width: 1024px) 100vw, 62vw" : "(max-width: 1024px) 100vw, 46vw"}
          className="transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
        />
      </Link>

      <div className={cn(!featured && "mt-6")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-forest/30 px-2.5 py-1 text-[0.8125rem] font-semibold tracking-[0.1em] text-forest uppercase">
            {dict.common.demoBadge}
          </span>
          <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-slate uppercase">
            {t(project.sector)}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 font-display leading-[0.98] font-extrabold tracking-[-0.03em]",
            featured ? "text-display" : "text-title",
          )}
        >
          <Link href={caseHref} className="hover:text-forest">
            {project.brand}
          </Link>
        </h3>

        <p className="mt-3 max-w-[46ch] text-[1.0625rem] leading-relaxed text-slate">{t(project.tagline)}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Link
            href={caseHref}
            className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
          >
            {dict.projects.cardCta}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:transform-none" />
          </Link>
          <Link
            href={demoHref}
            className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-slate underline decoration-slate/30 underline-offset-4 hover:text-forest"
          >
            {dict.projects.openDemo}
          </Link>
        </div>
      </div>
    </article>
  );
}
