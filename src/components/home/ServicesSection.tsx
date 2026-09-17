import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { positioning } from "@/content/positioning";
import { path, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { sectionIds } from "@/lib/nav";
import { ServiceLinks } from "./ServiceLinks";

/** One concise choice per service; detailed scope has its own crawlable page. */
export function ServicesSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {

  return (
    <Section id={sectionIds.services} tone="paperDim" labelledBy="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          lead={dict.services.lead}
          action={
            <ButtonLink href={path("services", locale)} variant="secondary">
              {dict.nav.services}
            </ButtonLink>
          }
        />

        <div className="mt-8"><ServiceLinks locale={locale} /></div>
        <details className="mt-6 rounded-xl border border-line-light p-5 open:bg-paper">
          <summary className="cursor-pointer text-lg font-semibold">{positioning[locale].craftTitle}</summary>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {positioning[locale].craft.map(([title, body]) => <div key={title}><dt className="font-semibold">{title}</dt><dd className="mt-2 text-sm leading-relaxed text-slate">{body}</dd></div>)}
          </dl>
        </details>
        <div className="mt-6 flex flex-col justify-between gap-5 border-t border-line-light pt-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-base leading-relaxed text-slate">{locale === "bs" ? "Online radimo s firmama iz Mostara, Sarajeva, Banje Luke, Tuzle i ostatka BiH. Obim, materijale i rok dogovaramo prije početka." : "Wir arbeiten online mit Unternehmen aus Mostar, Sarajevo, Banja Luka, Tuzla und ganz BiH. Umfang, Materialien und Termin klären wir vor dem Start."}</p>
          <div className="flex shrink-0 flex-col items-start">
            <ButtonLink className="px-0 text-sm" href={path("coverage", locale)} variant="quiet">{locale === "bs" ? "Kako sarađujemo online" : "So arbeiten wir online"}</ButtonLink>
            <ButtonLink className="px-0 text-sm" href={path("pricing", locale)} variant="quiet">{locale === "bs" ? "Šta određuje cijenu weba" : "Was den Website-Preis bestimmt"}</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
