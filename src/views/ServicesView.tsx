import { SiteFrame } from "@/components/layout/SiteFrame";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServiceLinks } from "@/components/home/ServiceLinks";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CheckIcon } from "@/components/ui/icons";
import { services } from "@/content/services";
import { path, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { translator } from "@/lib/i18n/localized";

export function ServicesView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = translator(locale);

  return (
    <SiteFrame locale={locale} route={{ key: "services" }}>
      <Section tone="paper" size="tight">
        <Container>
          <p className="text-[0.8125rem] font-semibold tracking-[0.22em] text-slate uppercase sm:text-sm">
            {dict.services.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-display leading-[0.95]">{locale === "bs" ? "Web dizajn, izrada i redizajn." : "Webdesign, Entwicklung und Relaunch."}</h1>
          <p className="mt-6 max-w-2xl text-lead leading-relaxed text-slate">{dict.services.pageLead}</p>
          <div className="mt-8"><ServiceLinks locale={locale} /></div>
        </Container>
      </Section>

      {services.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          tone={index % 2 === 0 ? "paperDim" : "paper"}
          size="tight"
          labelledBy={`${service.id}-title`}
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <span className="font-display text-sm font-bold tracking-[0.2em] text-forest/45">{service.number}</span>
                <h2 id={`${service.id}-title`} className="mt-4 text-display leading-[0.98]">
                  {t(service.title)}
                </h2>
                <p className="mt-5 max-w-xl text-lead leading-relaxed text-slate">{t(service.summary)}</p>
                <p className="mt-8 rounded-2xl bg-forest px-5 py-4 text-body leading-relaxed font-medium text-paper">
                  <span className="block text-[0.8125rem] font-semibold tracking-[0.14em] text-lime uppercase">
                    {dict.services.outcome}
                  </span>
                  <span className="mt-2 block">{t(service.outcome)}</span>
                </p>
              </div>

              <div>
                <h3 className="text-[0.8125rem] font-semibold tracking-[0.16em] text-slate uppercase">
                  {dict.services.includes}
                </h3>
                <ul className="mt-5 space-y-4 border-t border-line-light pt-5">
                  {t(service.includes).map((item) => (
                    <li key={item} className="flex gap-4 text-[1.0625rem] leading-relaxed">
                      <CheckIcon className="mt-1.5 size-5 shrink-0 text-forest" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <ProcessSection locale={locale} dict={dict} variant="full" withPhoto={false} />

      <Section tone="paper" size="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="text-title leading-[1.05]">{dict.services.notOffered}</h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-slate">{dict.services.notOfferedLead}</p>
            </div>
            <div>
              <ul className="space-y-4 border-t border-line-light pt-5">
                {dict.services.notOfferedItems.map((item) => (
                  <li key={item} className="flex gap-4 text-[1.0625rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-3.5 h-px w-5 shrink-0 bg-slate" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 rounded-2xl bg-paper-dim px-5 py-4 text-body leading-relaxed text-slate">
                {dict.services.scopeNote}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={path("contact", locale)}>{dict.services.cta}</ButtonLink>
                <ButtonLink href={path("projects", locale)} variant="secondary">
                  {dict.projects.all}
                </ButtonLink>
                <ButtonLink href={path("pricing", locale)} variant="quiet">{locale === "bs" ? "Vodič o cijeni" : "Kostenratgeber"}</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </SiteFrame>
  );
}
