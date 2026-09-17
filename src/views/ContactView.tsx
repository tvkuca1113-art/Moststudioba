import { ProjectInquiry } from "@/components/contact/ProjectInquiry";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { FaqSection } from "@/components/home/FaqSection";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { InstagramIcon } from "@/components/ui/icons";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export function ContactView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <SiteFrame locale={locale} route={{ key: "contact" }}>
      <Section tone="paper" size="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-[0.8125rem] font-semibold tracking-[0.22em] text-slate uppercase sm:text-sm">
                {dict.contact.eyebrow}
              </p>
              <h1 className="mt-5 text-display leading-[0.95]">
                <span className="block">{dict.contact.titleLine1}</span>
                <span className="block text-slate">{dict.contact.titleLine2}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lead leading-relaxed text-slate">{dict.contact.pageLead}</p>
            </div>

            <div className="rounded-3xl bg-forest p-6 text-paper on-dark sm:p-8">
              <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-lime uppercase">
                {dict.contact.primaryLabel}
              </p>
              <ButtonAnchor
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                tone="dark"
                withArrow={false}
                className="mt-4 w-full gap-2.5"
              >
                <InstagramIcon className="size-5" />
                {site.instagramHandle}
              </ButtonAnchor>
              {site.facebookUrl && <ButtonAnchor href={site.facebookUrl} target="_blank" rel="noopener noreferrer" tone="dark" variant="secondary" className="mt-3 w-full">Facebook</ButtonAnchor>}
              <p className="mt-4 text-sm leading-relaxed text-mist">{dict.contact.primaryHint}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{dict.contact.responseNote}</p>
              <div className="mt-6 border-t border-line-dark pt-4 text-sm text-mist">
                <p>{locale === "bs" ? "Ako vam više odgovara email:" : "Wenn Sie lieber per E-Mail schreiben:"}</p>
                <TrackedAnchor href={`mailto:${site.email}`} track={["outbound_email", { locale, from: "contact" }]} className="inline-block min-h-11 break-all py-3 underline underline-offset-4">{site.email}</TrackedAnchor>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paperDim" size="tight" labelledBy="brief-title">
        <Container>
          <h2 id="brief-title" className="sr-only">{dict.brief.eyebrow}</h2>
          <div className="max-w-3xl">
            <ProjectInquiry locale={locale} />
          </div>
        </Container>
      </Section>

      <FaqSection locale={locale} dict={dict} />
    </SiteFrame>
  );
}
