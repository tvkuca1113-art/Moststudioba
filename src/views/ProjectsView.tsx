import { SiteFrame } from "@/components/layout/SiteFrame";
import { ProjectCard } from "@/components/home/ProjectsSection";
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

          <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12">
            {demoProjects.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={index * 90}
                className={index === 2 ? "lg:col-span-12" : index === 0 ? "lg:col-span-5" : "lg:col-span-7"}
              >
                <ProjectCard project={project} locale={locale} dict={dict} wide={index === 2} />
              </Reveal>
            ))}
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
