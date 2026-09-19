import { ProjectInquiry } from "@/components/contact/ProjectInquiry";
import { ContactSteps } from "@/components/contact/ContactSteps";
import { SocialContact } from "@/components/contact/SocialContact";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { positioning } from "@/content/positioning";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

export function ContactSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = positioning[locale];
  return <Section id={sectionIds.contact} tone="ink" labelledBy="contact-title">
    <Container>
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[.2em] text-lime uppercase">{dict.contact.eyebrow}</p>
          <h2 id="contact-title" className="mt-5 text-display leading-[1.05]">{c.contactTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-mist">{c.contactLead}</p>
          <div className="mt-7"><SocialContact locale={locale} dark cards /></div>
          <p className="mt-4 text-sm leading-relaxed text-mist">{dict.contact.primaryHint}</p>
        </div>
        <ProjectInquiry locale={locale} />
      </div>
      <ContactSteps locale={locale} dark />
    </Container>
  </Section>;
}
