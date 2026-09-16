import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrackedAnchor } from "@/components/ui/TrackedLink";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

/**
 * Who this is, in two paragraphs and one photograph.
 *
 * The arch sculpture is the studio's own object and the source of the mark in
 * the header, so it appears here once at size. The three "how it looks in
 * practice" cards that used to sit beside it made the same claims the work
 * above already demonstrates, so the work makes them instead.
 */
export function StudioSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id={sectionIds.studio} tone="paper" size="tight" labelledBy="studio-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading id="studio-title" eyebrow={dict.studio.eyebrow} title={dict.studio.title} />
            <p className="mt-6 max-w-[64ch] text-lead leading-[1.55]">{dict.studio.paragraph1}</p>
            <p className="mt-4 max-w-[64ch] text-body leading-relaxed text-slate">{dict.studio.paragraph2}</p>

            <dl className="mt-8 grid gap-6 border-t border-line-light pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.14em] text-slate uppercase">
                  {dict.footer.contactTitle}
                </dt>
                <dd className="mt-2">
                  <TrackedAnchor
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    track={["outbound_instagram", { locale, from: "contact" }]}
                    className="inline-flex min-h-11 items-center font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
                  >
                    {site.instagramHandle}
                  </TrackedAnchor>
                </dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.14em] text-slate uppercase">
                  {dict.studio.marketsLabel}
                </dt>
                <dd className="mt-2 font-semibold">{site.markets.join(" · ")}</dd>
              </div>
            </dl>
          </div>

          <Photo
            name="most-most-skulptura"
            locale={locale}
            breakpoint="viewport"
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="aspect-16/10 rounded-2xl"
          />
        </div>
      </Container>
    </Section>
  );
}
