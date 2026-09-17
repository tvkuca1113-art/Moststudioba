import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { positioning } from "@/content/positioning";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";

export function StudioSection({ locale }: { locale: Locale; dict: Dictionary }) {
  const c = positioning[locale];
  return (
    <Section id={sectionIds.studio} tone="forest" size="tight" labelledBy="studio-title">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeading id="studio-title" tone="dark" eyebrow={c.whyEyebrow} title={c.whyTitle} lead={c.whyLead} />
          <ol className="divide-y divide-line-dark">
            {c.reasons.map(([title, body], index) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-3 py-4 first:pt-0 last:pb-0">
                <span className="pt-1 text-sm text-lime">0{index + 1}</span>
                <div><h3 className="text-xl">{title}</h3><p className="mt-2 text-base leading-relaxed text-mist">{body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
