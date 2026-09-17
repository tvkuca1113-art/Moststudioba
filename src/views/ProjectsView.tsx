import { SiteFrame } from "@/components/layout/SiteFrame";
import { ProjectCard } from "@/components/home/ProjectsSection";
import { WebshopDemoCard } from "@/components/home/WebshopDemoCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { demoProjects } from "@/content/projects";
import { path, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export function ProjectsView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <SiteFrame locale={locale} route={{ key: "projects" }}>
      <Section tone="paper" size="tight">
        <Container>
          <p className="text-[0.8125rem] font-semibold tracking-[0.22em] text-slate uppercase sm:text-sm">
            {dict.projects.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-display leading-[0.95]">{dict.projects.overviewTitle}</h1>
          <p className="mt-6 max-w-2xl text-lead leading-relaxed text-slate">{dict.projects.overviewLead}</p>

          <div className="mt-12 lg:mt-16">
            {demoProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={index * 80}
                className={index > 0 ? "mt-14 border-t border-line-light pt-14 lg:mt-16 lg:pt-16" : undefined}
              >
                <ProjectCard project={project} locale={locale} dict={dict} featured />
              </Reveal>
            ))}
            <div className="mt-14 border-t border-line-light pt-14">
              <WebshopDemoCard locale={locale} />
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-t border-line-light pt-8">
            <ButtonLink href={path("contact", locale)}>{dict.services.cta}</ButtonLink>
            <ButtonLink href={path("services", locale)} variant="secondary">
              {dict.nav.services}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </SiteFrame>
  );
}
