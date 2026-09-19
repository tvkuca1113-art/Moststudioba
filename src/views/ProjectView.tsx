import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectVisit } from "@/components/ui/ProjectVisit";
import { Photo } from "@/components/media/Photo";
import { Shot } from "@/components/media/Shot";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ArrowRight, CheckIcon } from "@/components/ui/icons";
import { getProject, nextProject } from "@/content/projects";
import { path, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";

/**
 * A concept page leads with the work.
 *
 * The heading block is deliberately short so the screenshot is in the first
 * screen. The desktop and mobile views are captures of the implemented page,
 * not two live copies of the whole demo mounted into this document.
 */
export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const t = translator(locale);
  const next = nextProject(slug);
  const demoHref = path("demo", locale, project.slug);
  const decisions = project.decisions.slice(0, 3);

  return (
    <SiteFrame locale={locale} route={{ key: "project", slug }}>
      <ProjectVisit project={slug} locale={locale} />
      {/* Short header, then the work */}
      <Section tone="paper" size="tight">
        <Container>
          <Link
            href={path("projects", locale)}
            className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-slate hover:text-forest"
          >
            <ArrowRight className="size-4 rotate-180" />
            {dict.projects.backToProjects}
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded-full bg-lime px-2.5 py-1 text-[0.8125rem] font-bold tracking-[0.1em] text-ink uppercase">
                  {dict.common.demoBadge}
                </span>
                <span className="text-[0.8125rem] font-semibold tracking-[0.12em] text-slate uppercase">
                  {t(project.sector)}
                </span>
              </div>
              <h1 className="mt-5 text-display leading-[0.92]">{project.brand}</h1>
              <p className="mt-4 max-w-[62ch] text-lead leading-[1.5] text-slate">
                {dict.projects.goalPrefix} {t(project.goal)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedLink
                href={demoHref}
                track={["open_demo", { project: project.slug, locale, from: "project" }]}
                className={buttonClass()}
              >
                {dict.projects.tryDemo}
              </TrackedLink>
            </div>
          </div>

          {/* Not a link: the button above already goes to the demo, and a
              second link over the picture had nothing to announce it. */}
          <div className="mt-8 lg:mt-10">
            <Shot
              slug={project.slug}
              locale={locale}
              device="desktop"
              alt={`${dict.projects.shotAlt} — ${project.brand}`}
              priority
              sizes="(max-width: 1024px) 100vw, 88vw"
            />
          </div>
        </Container>
      </Section>

      {/* Design decisions, each beside a detail from the demo */}
      <Section tone="paperDim" size="tight" labelledBy="decisions-title">
        <Container>
          <h2 id="decisions-title" className="text-title leading-[1.05]">
            {dict.projects.decisions}
          </h2>

          <div className="mt-10 space-y-12 lg:mt-12 lg:space-y-16">
            {decisions.map((decision, index) => {
              const image = project.decisionImages[index];
              return (
                <article
                  key={t(decision.title)}
                  className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                    <span className="font-display text-[0.9375rem] font-bold tracking-[0.2em] text-forest/45">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[1.5rem] leading-snug font-bold sm:text-[1.8rem]">
                      {t(decision.title)}
                    </h3>
                    <p className="mt-4 max-w-[62ch] text-body leading-relaxed text-slate">
                      {t(decision.body)}
                    </p>
                  </div>
                  {image && (
                    <Photo
                      name={image}
                      locale={locale}
                      breakpoint="viewport"
                      sizes="(max-width: 1024px) 100vw, 44vw"
                      className={`aspect-3/2 rounded-2xl ${index % 2 === 1 ? "lg:order-1" : ""}`}
                    />
                  )}
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Desktop and mobile, captured from the implemented page */}
      <Section tone="ink" size="tight" labelledBy="views-title">
        <Container>
          <h2 id="views-title" className="text-title leading-[1.05]">
            {dict.projects.views}
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
            <figure>
              <Shot
                slug={project.slug}
                locale={locale}
                device="desktop"
                alt={`${dict.projects.shotAlt} — ${project.brand}`}
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <figcaption className="mt-3 text-[0.9375rem] text-mist">{dict.projects.shotDesktop}</figcaption>
            </figure>
            <figure>
              <Shot
                slug={project.slug}
                locale={locale}
                device="mobile"
                alt={`${dict.projects.shotAlt} — ${project.brand}`}
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="mx-auto max-w-[17rem]"
              />
              <figcaption className="mt-3 text-center text-[0.9375rem] text-mist lg:text-left">
                {dict.projects.shotMobile}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* One thing to operate, and what it makes easier */}
      <Section tone="paper" size="tight" labelledBy="try-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
                {dict.projects.tryItLabel}
              </p>
              <h2 id="try-title" className="mt-4 text-title leading-[1.05]">
                {t(project.tryIt.title)}
              </h2>
              <p className="mt-4 max-w-[62ch] text-body leading-relaxed text-slate">
                {t(project.tryIt.body)}
              </p>
              <TrackedLink
                href={demoHref}
                track={["open_demo", { project: project.slug, locale, from: "project" }]}
                className={buttonClass("primary", "light", "mt-7")}
              >
                {dict.projects.tryDemo}
              </TrackedLink>
            </div>

            <div>
              <h3 className="text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
                {dict.projects.easierLabel}
              </h3>
              <ul className="mt-5 space-y-5 border-t border-line-light pt-5">
                {project.annotations.map((annotation) => (
                  <li key={annotation.id} className="flex gap-4">
                    <CheckIcon className="mt-1.5 size-5 shrink-0 text-forest" />
                    <div>
                      <p className="text-body font-semibold">{t(annotation.title)}</p>
                      <p className="mt-1.5 max-w-[62ch] text-body leading-relaxed text-slate">
                        {t(annotation.body)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Want this approach? */}
      <Section tone="forest" size="tight">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-title leading-[1.05]">{dict.projects.wantThis}</h2>
              <p className="mt-4 max-w-[62ch] text-body leading-relaxed text-mist">
                {dict.projects.wantThisBody}
              </p>
              <ButtonLink href={`${path("contact", locale)}#top`} tone="dark" className="mt-7">
                {dict.nav.cta}
              </ButtonLink>
            </div>
            <Link
              href={path("project", locale, next.slug)}
              className="group border-t border-line-dark pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
            >
              <p className="text-[0.8125rem] font-semibold tracking-[0.16em] text-mist uppercase">
                {dict.projects.nextProject}
              </p>
              <p className="mt-3 font-display text-[2rem] leading-none font-extrabold tracking-[-0.03em] sm:text-[2.6rem]">
                {next.brand}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-lime">
                {dict.projects.cardCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:transform-none" />
              </span>
            </Link>
          </div>
        </Container>
      </Section>
    </SiteFrame>
  );
}
