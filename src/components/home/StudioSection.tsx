import { Photo } from "@/components/media/Photo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

export function StudioSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id={sectionIds.studio} tone="paper" labelledBy="studio-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="studio-title" eyebrow={dict.studio.eyebrow} title={dict.studio.title} />
            <p className="mt-6 text-lead leading-relaxed">{dict.studio.paragraph1}</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate">{dict.studio.paragraph2}</p>

            <dl className="mt-10 grid gap-6 border-t border-line-light pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.14em] text-slate uppercase">
                  {dict.footer.contactTitle}
                </dt>
                <dd className="mt-2">
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest"
                  >
                    {site.instagramHandle}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.14em] text-slate uppercase">{dict.studio.marketsLabel}</dt>
                <dd className="mt-2 font-semibold">{site.markets.join(" · ")}</dd>
              </div>
            </dl>
          </div>

          <div>
            <Photo
              name="most-most-skulptura"
              locale={locale}
              breakpoint="viewport"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="aspect-3/2 rounded-2xl"
            />
            <h3 className="mt-10 text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
              {dict.studio.proofTitle}
            </h3>
            <div className="mt-5 grid gap-px overflow-hidden rounded-3xl bg-line-light">
              {dict.studio.proof.map((item, index) => (
                <Reveal key={item.title} delay={index * 70} className="bg-paper p-6">
                  <h4 className="text-lg leading-snug font-bold">{item.title}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
