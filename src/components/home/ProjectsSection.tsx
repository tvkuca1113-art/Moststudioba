import Link from "next/link";

import { ProjectCardSketch } from "@/components/home/ProjectCardSketch";
import { ButtonLink } from "@/components/ui/Button";
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

export function ProjectsSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id={sectionIds.projects} tone="paper" labelledBy="projects-title">
      <Container>
        <SectionHeading
          id="projects-title"
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          lead={dict.projects.lead}
          action={
            <ButtonLink href={path("projects", locale)} variant="secondary">
              {dict.projects.all}
            </ButtonLink>
          }
        />

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12">
          {demoProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 90}
              className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12"}
            >
              <ProjectCard project={project} locale={locale} dict={dict} wide={index === 2} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ProjectCard({
  project,
  locale,
  dict,
  wide = false,
}: {
  project: DemoProject;
  locale: Locale;
  dict: Dictionary;
  wide?: boolean;
}) {
  const t = translator(locale);

  return (
    <Link
      href={path("project", locale, project.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:transform-none"
      style={{ backgroundColor: project.swatch.bg, color: project.swatch.fg }}
    >
      <div
        className={cn(
          "flex flex-1 flex-col p-6 sm:p-8",
          wide && "lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10",
        )}
      >
        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-[0.8125rem] font-bold tracking-[0.14em] uppercase"
              style={{ backgroundColor: project.swatch.accent, color: project.swatch.bg }}
            >
              {dict.common.demoBadge}
            </span>
            <span className="text-[0.8125rem] font-semibold tracking-[0.14em] uppercase opacity-70">
              {t(project.sector)}
            </span>
          </div>

          <h3 className="mt-6 font-display text-3xl leading-[0.98] font-extrabold tracking-[-0.03em] sm:text-4xl">
            {project.brand}
          </h3>
          <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed opacity-80 sm:text-base">
            {t(project.tagline)}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold sm:mt-auto sm:pt-8">
            {dict.projects.cardCta}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:group-hover:transform-none" />
          </span>
        </div>

        <div className={cn("mt-7 h-44 sm:h-52", wide && "lg:mt-0 lg:h-64")}>
          <ProjectCardSketch
            variant={project.key}
            fg={project.swatch.fg}
            accent={project.swatch.accent}
            uid={project.slug}
          />
        </div>
      </div>
    </Link>
  );
}
