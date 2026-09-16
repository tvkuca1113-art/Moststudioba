import { SiteFrame } from "@/components/layout/SiteFrame";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StudioSection } from "@/components/home/StudioSection";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { organizationJsonLd } from "@/lib/seo";

export function HomeView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <SiteFrame locale={locale} route={{ key: "home" }} tone="overlay">
      <script
        type="application/ld+json"
        // Only facts we can stand behind: name, site, description, Instagram.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(locale, dict.meta.home.description)),
        }}
      />
      <Hero locale={locale} dict={dict} />
      <ProjectsSection locale={locale} dict={dict} />
      <ServicesSection locale={locale} dict={dict} />
      <ProcessSection locale={locale} dict={dict} />
      <StudioSection locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} />
      <ContactSection locale={locale} dict={dict} />
    </SiteFrame>
  );
}
