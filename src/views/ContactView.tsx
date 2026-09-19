import { ProjectInquiry } from "@/components/contact/ProjectInquiry";
import { ContactSteps } from "@/components/contact/ContactSteps";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { FaqSection } from "@/components/home/FaqSection";
import { SocialContact } from "@/components/contact/SocialContact";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export function ContactView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return <SiteFrame locale={locale} route={{ key: "contact" }}>
    <Section tone="paper" labelledBy="contact-page-title">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[.2em] text-slate uppercase">{dict.contact.eyebrow} / MOST STUDIO</p>
            <h1 id="contact-page-title" className="mt-5 text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.04] tracking-[-.045em]">
              {locale === "bs" ? <>Dobar web počinje<br /><span className="text-forest">razgovorom.</span></> : <>Eine gute Website beginnt<br /><span className="text-forest">mit einem Gespräch.</span></>}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate">{dict.contact.pageLead}</p>
            <div className="mt-7 max-w-lg"><SocialContact locale={locale} cards /></div>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate">{dict.contact.primaryHint}</p>
            <p className="mt-5 text-xs font-semibold tracking-[.12em] text-slate uppercase">{locale === "bs" ? "Online saradnja · BiH i Njemačka" : "Online-Zusammenarbeit · BiH & Deutschland"}</p>
          </div>
          <ProjectInquiry locale={locale} headingLevel="h2" />
        </div>
        <ContactSteps locale={locale} />
      </Container>
    </Section>
    <FaqSection locale={locale} dict={dict} />
  </SiteFrame>;
}
