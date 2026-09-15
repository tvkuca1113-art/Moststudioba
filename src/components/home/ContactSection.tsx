import { BriefBuilder } from "@/components/contact/BriefBuilder";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

export function ContactSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id={sectionIds.contact} tone="ink" labelledBy="contact-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-[0.8125rem] font-semibold tracking-[0.22em] text-lime uppercase sm:text-sm">
              {dict.contact.eyebrow}
            </p>
            <h2 id="contact-title" className="mt-5 text-display leading-[0.95]">
              <span className="block">{dict.contact.titleLine1}</span>
              <span className="block text-mist">{dict.contact.titleLine2}</span>
            </h2>
            <p className="mt-6 max-w-xl text-lead leading-relaxed text-mist">{dict.contact.lead}</p>
          </div>

          <div className="rounded-3xl border border-line-dark p-6 sm:p-8">
            <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-mist uppercase">
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
            <p className="mt-4 text-sm leading-relaxed text-mist">{dict.contact.primaryHint}</p>
            <p className="mt-2 text-sm leading-relaxed text-mist">{dict.contact.responseNote}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-line-dark pt-12 lg:mt-20 lg:pt-16">
          <p className="text-[0.8125rem] font-semibold tracking-[0.22em] text-lime uppercase sm:text-sm">
            {dict.brief.eyebrow}
          </p>
          <h3 className="mt-4 max-w-2xl text-title leading-[1.05]">{dict.brief.title}</h3>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-mist">{dict.brief.lead}</p>

          <div className="mt-10">
            <BriefBuilder locale={locale} dict={dict} tone="dark" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
