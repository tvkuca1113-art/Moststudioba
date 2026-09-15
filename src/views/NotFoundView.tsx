import { SiteFrame } from "@/components/layout/SiteFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { path, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export function NotFoundView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <SiteFrame locale={locale} route={{ key: "home" }}>
      <Section tone="paper">
        <Container width="narrow">
          <p className="font-display text-6xl font-extrabold text-forest/25">404</p>
          <h1 className="mt-6 text-display leading-[0.95]">{dict.notFound.title}</h1>
          <p className="mt-5 text-lead leading-relaxed text-slate">{dict.notFound.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={path("home", locale)}>{dict.notFound.home}</ButtonLink>
            <ButtonLink href={path("projects", locale)} variant="secondary">
              {dict.notFound.projects}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </SiteFrame>
  );
}
