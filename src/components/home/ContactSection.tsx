import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

/**
 * The closing question, and the one channel that actually exists.
 *
 * Instagram is the only confirmed way to reach the studio, so it is the only
 * one offered here — no address, no phone number, no contact form that would
 * have nowhere to send anything. The brief builder is a link, not a second
 * copy of the form on the contact page.
 */
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
            <p className="mt-6 max-w-[62ch] text-lead leading-[1.55] text-mist">{dict.contact.lead}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={path("contact", locale)} tone="dark">
                {dict.brief.title}
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-3xl border border-line-dark p-6 sm:p-8">
            <p className="text-[0.8125rem] font-semibold tracking-[0.14em] text-mist uppercase">
              {dict.contact.primaryLabel}
            </p>
            <TrackedAnchor
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              track={["outbound_instagram", { locale, from: "contact" }]}
              className={buttonClass("primary", "dark", "mt-4 w-full gap-2.5")}
            >
              <InstagramIcon className="size-5" />
              {site.instagramHandle}
            </TrackedAnchor>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">{dict.contact.primaryHint}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{dict.contact.responseNote}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
