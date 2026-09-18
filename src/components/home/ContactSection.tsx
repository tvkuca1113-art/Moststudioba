import { ProjectInquiry } from "@/components/contact/ProjectInquiry";
import { SocialContact } from "@/components/contact/SocialContact";
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
            <div className="mt-6"><SocialContact locale={locale} dark /></div>
            <p className="mt-3 text-sm text-mist">{locale === "bs" ? "Otvorite profil i odaberite Poruka. Obrazac nije potreban." : "Profil öffnen und Nachricht wählen. Kein Formular erforderlich."}</p>
            <h3 className="mt-8 text-lg">{c.nextTitle}</h3>
            <ol className="mt-4 space-y-3 text-base text-mist">{c.next.map((step, i) => <li key={step} className="flex gap-3"><span className="text-lime">0{i+1}</span>{step}</li>)}</ol>
            <div className="mt-7 border-t border-line-dark pt-5">
              <p className="mt-2 text-sm text-mist">{locale === "bs" ? "Ili emailom: " : "Oder per E-Mail: "}<TrackedAnchor href={`mailto:${site.email}`} track={["outbound_email", { locale, from: "contact" }]} className="inline-block min-h-11 break-all py-3 underline underline-offset-4">{site.email}</TrackedAnchor></p>
            </div>
          </div>
          <details className="rounded-2xl border border-line-dark p-5 sm:p-7">
            <summary className="cursor-pointer py-2 text-xl font-semibold">{c.inquiry} <span className="text-sm font-normal text-mist">({c.optional})</span></summary>
            <p className="mt-3 mb-5 text-sm leading-relaxed text-mist">{c.note}</p>
            <ProjectInquiry locale={locale} />
          </details>
        </div>
      </Container>
    </Section>
  );
}
