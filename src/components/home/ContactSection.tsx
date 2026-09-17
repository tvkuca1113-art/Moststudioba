import { ProjectInquiry } from "@/components/contact/ProjectInquiry";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { positioning } from "@/content/positioning";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

export function ContactSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = positioning[locale];
  return (
    <Section id={sectionIds.contact} tone="ink" labelledBy="contact-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          <div>
            <p className="text-xs font-semibold tracking-[.2em] text-lime uppercase">{dict.contact.eyebrow}</p>
            <h2 id="contact-title" className="mt-5 text-display leading-[1.05]">{c.contactTitle}</h2>
            <p className="mt-5 text-lead leading-relaxed text-mist">{c.contactLead}</p>
            <h3 className="mt-8 text-lg">{c.nextTitle}</h3>
            <ol className="mt-4 space-y-3 text-base text-mist">{c.next.map((step, i) => <li key={step} className="flex gap-3"><span className="text-lime">0{i+1}</span>{step}</li>)}</ol>
            <div className="mt-7 border-t border-line-dark pt-5">
              <p className="text-sm text-mist">{c.direct}</p>
              <TrackedAnchor href={site.instagramUrl} target="_blank" rel="noopener noreferrer" track={["outbound_instagram", { locale, from: "contact" }]} className="inline-flex min-h-11 items-center text-lime underline underline-offset-4">{site.instagramHandle} ↗</TrackedAnchor>
            </div>
          </div>
          <ProjectInquiry locale={locale} />
        </div>
      </Container>
    </Section>
  );
}
