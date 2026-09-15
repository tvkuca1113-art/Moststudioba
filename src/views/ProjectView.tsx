import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectPreviews } from "@/components/demos/ProjectPreviews";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRight, CheckIcon } from "@/components/ui/icons";
import { getProject, nextProject } from "@/content/projects";
import { path, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";

export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const t = translator(locale);
  const next = nextProject(slug);

  return (
    <SiteFrame locale={locale} route={{ key: "project", slug }}>
      {/* Case header */}
      <Section tone="paper" size="tight">
        <Container>
          <Link
            href={path("projects", locale)}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-slate hover:text-forest"
          >
            <ArrowRight className="size-4 rotate-180" />
            {dict.projects.backToProjects}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-lime px-3 py-1 text-[0.8125rem] font-bold tracking-[0.14em] text-ink uppercase">
              {dict.common.demoBadge}
            </span>
            <span className="text-[0.8125rem] font-semibold tracking-[0.14em] text-slate uppercase">{t(project.sector)}</span>
          </div>

          <h1 className="mt-6 text-display leading-[0.92]">{project.brand}</h1>
          <p className="mt-5 max-w-2xl text-lead leading-relaxed text-slate">{t(project.tagline)}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={path("demo", locale, project.slug)}>{dict.projects.tryDemo}</ButtonLink>
            <ButtonLink href={path("contact", locale)} variant="secondary">
              {dict.nav.cta}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid gap-8 border-t border-line-light pt-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <dt className="text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
                {dict.projects.forBusiness}
              </dt>
              <dd className="mt-3 text-[1.0625rem] leading-relaxed">{t(project.sector)}</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
                {dict.projects.goalPrefix}
              </dt>
              <dd className="mt-3 text-[1.0625rem] leading-relaxed">
                {dict.projects.goalPrefix} {t(project.goal)}
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      {/* Live views */}
      <Section tone="ink" size="tight" labelledBy="views-title">
        <Container>
          <h2 id="views-title" className="text-title leading-[1.05]">
            {dict.projects.views}
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-mist">
            {dict.projects.showPrefix} {t(project.shows)}
          </p>
          <div className="mt-10">
            <ProjectPreviews demoKey={project.key} brand={project.brand} locale={locale} dict={dict} />
          </div>
          <div className="mt-8">
            <ButtonLink href={path("demo", locale, project.slug)} tone="dark">
              {dict.projects.tryDemo}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* What the concept solves */}
      <Section tone="paperDim" size="tight" labelledBy="needs-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <h2 id="needs-title" className="text-title leading-[1.05]">
              {dict.projects.theChallenge}
            </h2>
            <ul className="space-y-5">
              {t(project.needs).map((need) => (
                <li key={need} className="border-t border-line-light pt-5 text-[1.0625rem] leading-relaxed">
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Design decisions */}
      <Section tone="paper" size="tight" labelledBy="decisions-title">
        <Container>
          <h2 id="decisions-title" className="text-title leading-[1.05]">
            {dict.projects.decisions}
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-line-light sm:grid-cols-2">
            {project.decisions.map((decision, index) => (
              <article key={t(decision.title)} className="bg-paper p-6 sm:p-8">
                <span className="font-display text-sm font-bold tracking-[0.2em] text-forest/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl leading-snug font-bold sm:text-2xl">{t(decision.title)}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate sm:text-base">{t(decision.body)}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* What is actually implemented */}
      <Section tone="forest" size="tight" labelledBy="implemented-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <h2 id="implemented-title" className="text-title leading-[1.05]">
                {dict.projects.implemented}
              </h2>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-mist">{dict.common.demoNotice}</p>
            </div>
            <ul className="space-y-4">
              {t(project.implemented).map((item) => (
                <li key={item} className="flex gap-4 text-[1.0625rem] leading-relaxed">
                  <CheckIcon className="mt-1.5 size-5 shrink-0 text-lime" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Next */}
      <Section tone="paper" size="tight">
        <Container>
          <Link
            href={path("project", locale, next.slug)}
            className="group flex flex-col gap-3 border-t border-line-light pt-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
                {dict.projects.nextProject}
              </p>
              <p className="mt-3 font-display text-3xl leading-none font-extrabold tracking-[-0.03em] sm:text-5xl">
                {next.brand}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
              {dict.projects.cardCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:transform-none" />
            </span>
          </Link>
        </Container>
      </Section>
    </SiteFrame>
  );
}
