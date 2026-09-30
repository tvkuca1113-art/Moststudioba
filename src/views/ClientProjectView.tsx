import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { ClientScreenshot } from "@/components/projects/ClientScreenshot";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { ProjectVisit } from "@/components/ui/ProjectVisit";
import { Section } from "@/components/ui/Section";
import { getClientProject } from "@/content/client-projects";
import { mirjanaShots } from "@/content/client-shots";
import { path, type Locale } from "@/lib/i18n/config";
import { translator } from "@/lib/i18n/localized";

const copy = {
  bs: {
    back: "Svi projekti",
    badge: "Klijentski projekt",
    live: "Otvori objavljenu stranicu",
    liveLabel: "Otvori objavljenu stranicu — nova kartica",
    desktopAlt: "Mirjanina naslovna s ličnim predstavljanjem, mirnom zelenom paletom i pozivom za upit za termin.",
    desktopCaption: "Početna stranica na računaru · stvarni prikaz njemačkog originala.",
    brief: "ZADATAK I ISPORUKA",
    scopeTitle: "Od ponude do objavljene stranice.",
    roleLabel: "Naša uloga",
    processTitle: "Kako smo oblikovali stranicu",
    decisionsTitle: "Tri odluke koje povezuju sadržaj i kontakt.",
    servicesAlt: "Pregled masaža u odvojenim cjelinama s trajanjem i cijenom uz svaku opciju.",
    servicesCaption: "Sekcija usluga i cijena · stvarni prikaz objavljene stranice.",
    mobileEyebrow: "MOBILNI PRIKAZ",
    mobileTitle: "Ista ponuda, prilagođena malom ekranu.",
    mobileLead: "Lično predstavljanje, tretmani i kontakt zadržavaju isti redoslijed i na mobitelu. Raspored i veličina teksta prilagođeni su užem ekranu.",
    mobileContact: "Upit se nastavlja preko WhatsAppa ili telefona. Termin se dogovara i potvrđuje lično s Mirjanom.",
    mobileLanguage: "Klijentska stranica je na njemačkom. Ova prezentacija projekta dostupna je na bosanskom i njemačkom.",
    mobileAlt: "Mirjanina početna na mobitelu s naslovom, fotografijom i kontaktom složenim za uski ekran.",
    mobileCaption: "Početna stranica na mobitelu · zaseban snimak njemačkog originala.",
    ctaTitle: "Sličan zadatak za vaš posao?",
    ctaBody: "Pošaljite nam šta nudite, kome se obraćate i kako želite primati upite. Zajedno ćemo razjasniti sadržaj, obim i sljedeći korak.",
    cta: "Razgovarajmo o projektu",
    website: "Šta obuhvata izrada web stranice",
    pricing: "Cijena i planiranje budžeta",
  },
  de: {
    back: "Alle Projekte",
    badge: "Kundenprojekt",
    live: "Veröffentlichte Website öffnen",
    liveLabel: "Veröffentlichte Website öffnen — neuer Tab",
    desktopAlt: "Mirjanas Startseite mit persönlicher Vorstellung, ruhiger grüner Farbgestaltung und dem Weg zur Terminanfrage.",
    desktopCaption: "Startseite am Desktop · echte Aufnahme des deutschsprachigen Originals.",
    brief: "AUFGABE UND UMSETZUNG",
    scopeTitle: "Vom Angebot zur veröffentlichten Website.",
    roleLabel: "Unser Beitrag",
    processTitle: "So haben wir die Website gestaltet",
    decisionsTitle: "Drei Entscheidungen für Inhalte und Kontakt.",
    servicesAlt: "Massageangebote in einzelnen Bereichen mit Dauer und Preis bei jeder Variante.",
    servicesCaption: "Leistungen und Preise · echte Aufnahme der veröffentlichten Website.",
    mobileEyebrow: "MOBILE ANSICHT",
    mobileTitle: "Dasselbe Angebot, für kleine Bildschirme.",
    mobileLead: "Persönliche Vorstellung, Behandlungen und Kontakt behalten auch auf dem Smartphone ihre Reihenfolge. Layout und Schriftgrößen passen sich dem schmaleren Bildschirm an.",
    mobileContact: "Die Anfrage wird über WhatsApp oder Telefon fortgesetzt. Mirjana vereinbart und bestätigt den Termin persönlich.",
    mobileLanguage: "Die Kundenwebsite ist deutschsprachig. Diese Projektvorstellung ist auf Bosnisch und Deutsch verfügbar.",
    mobileAlt: "Mirjanas mobile Startseite mit Titel, Bild und Kontakt im Layout für einen schmalen Bildschirm.",
    mobileCaption: "Startseite am Smartphone · separate Aufnahme des deutschsprachigen Originals.",
    ctaTitle: "Eine ähnliche Aufgabe für Ihr Unternehmen?",
    ctaBody: "Schicken Sie uns Ihr Angebot, Ihre Zielgruppe und den gewünschten Kontaktweg. Gemeinsam klären wir Inhalte, Umfang und den nächsten Schritt.",
    cta: "Projekt besprechen",
    website: "Was die Website-Erstellung umfasst",
    pricing: "Kosten und Budgetplanung",
  },
};

export function ClientProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const project = getClientProject(slug);
  if (!project) notFound();

  const c = copy[locale];
  const t = translator(locale);

  return (
    <SiteFrame locale={locale} route={{ key: "project", slug }}>
      <ProjectVisit project={slug} locale={locale} />
      <div data-client-case={project.slug}>

      <Section tone="paper" size="tight" labelledBy="client-project-title">
        <Container>
          <Link href={path("projects", locale)} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate hover:text-forest">
            <ArrowRight className="size-4 rotate-180" />
            {c.back}
          </Link>
          <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-[0.8125rem] font-semibold text-forest">{c.badge}</span>
                <span className="text-sm text-slate">{t(project.sector)}</span>
              </div>
              <h1 id="client-project-title" className="mt-5 max-w-[20ch] text-display leading-[1.04] tracking-[-0.035em]">{project.brand}</h1>
              <p className="mt-5 max-w-[60ch] text-lead leading-relaxed text-slate">{t(project.tagline)}</p>
            </div>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={c.liveLabel} className={buttonClass("secondary", "light", "justify-self-start")}>
              {c.live}
              <ArrowUpRight className="size-4 shrink-0" />
            </a>
          </div>
          <ClientScreenshot
            shot={mirjanaShots.desktop}
            alt={c.desktopAlt}
            caption={c.desktopCaption}
            kind="desktop"
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1407px) calc(100vw - 96px), 1312px"
            preload
            className="mt-8 lg:mt-10"
          />
        </Container>
      </Section>

      <Section tone="paperDim" size="tight" labelledBy="client-scope-title">
        <Container>
          <p className="text-[0.8125rem] font-semibold tracking-[0.18em] text-slate">{c.brief}</p>
          <h2 id="client-scope-title" className="mt-4 max-w-[28ch] text-title leading-tight">{c.scopeTitle}</h2>
          <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="max-w-[62ch] text-body leading-relaxed text-slate">{t(project.goal)}</p>
              <ul className="mt-6 space-y-3 border-t border-line-light pt-6">
                {t(project.scope).map((item) => (
                  <li key={item} className="flex gap-3 text-body leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-forest" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-semibold text-slate">{c.roleLabel}</p>
              <dl className="mt-3 grid grid-cols-3 gap-4">
                {t(project.roles).map((role) => (
                  <div key={role} className="border-t border-forest/25 pt-3">
                    <dt className="text-sm font-semibold text-forest">{role}</dt>
                    <dd className="mt-1 text-sm text-slate">MOST Studio</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="text-xl leading-snug font-semibold">{c.processTitle}</h3>
              <ol className="mt-6 space-y-6">
                {t(project.process).map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-line-light pt-5">
                    <span aria-hidden="true" className="text-sm font-semibold text-forest">{String(index + 1).padStart(2, "0")}</span>
                    <p className="text-body leading-relaxed text-slate">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" size="tight" labelledBy="client-decisions-title">
        <Container>
          <h2 id="client-decisions-title" className="max-w-[32ch] text-title leading-tight">{c.decisionsTitle}</h2>
          <div className="mt-8 grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <div className="space-y-7">
              {project.decisions.map((decision, index) => (
                <article key={decision.id} className="border-t border-line-light pt-5">
                  <p aria-hidden="true" className="text-sm font-semibold text-forest">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl leading-snug font-semibold sm:text-2xl">{t(decision.title)}</h3>
                  <p className="mt-3 max-w-[58ch] text-body leading-relaxed text-slate">{t(decision.body)}</p>
                </article>
              ))}
            </div>
            <ClientScreenshot
              shot={mirjanaShots.services}
              alt={c.servicesAlt}
              caption={c.servicesCaption}
              kind="services"
              sizes="(max-width: 1023px) calc(100vw - 40px), 55vw"
            />
          </div>
        </Container>
      </Section>

      <Section tone="paperDim" size="tight" labelledBy="client-mobile-title">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-[0.8125rem] font-semibold tracking-[0.18em] text-slate">{c.mobileEyebrow}</p>
              <h2 id="client-mobile-title" className="mt-4 max-w-[28ch] text-title leading-tight">{c.mobileTitle}</h2>
              <p className="mt-5 max-w-[58ch] text-body leading-relaxed text-slate">{c.mobileLead}</p>
              <p className="mt-4 max-w-[58ch] text-body leading-relaxed text-slate">{c.mobileContact}</p>
              <p className="mt-6 max-w-[58ch] border-t border-line-light pt-5 text-sm leading-relaxed text-slate">{c.mobileLanguage}</p>
            </div>
            <ClientScreenshot
              shot={mirjanaShots.mobile}
              alt={c.mobileAlt}
              caption={c.mobileCaption}
              kind="mobile"
              sizes="(max-width: 391px) calc(100vw - 40px), 352px"
              className="mx-auto w-full max-w-[22rem]"
            />
          </div>
        </Container>
      </Section>

      <Section tone="forest" size="tight" labelledBy="client-next-title">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16">
            <div>
              <h2 id="client-next-title" className="max-w-[30ch] text-title leading-tight">{c.ctaTitle}</h2>
              <p className="mt-4 max-w-[60ch] text-body leading-relaxed text-mist">{c.ctaBody}</p>
            </div>
            <div className="lg:justify-self-end">
              <ButtonLink href={`${path("contact", locale)}#top`} tone="dark">{c.cta}</ButtonLink>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-line-dark pt-5 text-sm leading-relaxed text-mist">
            <Link href={path("website", locale)} className="underline underline-offset-4 hover:text-lime">{c.website}</Link>
            <Link href={path("pricing", locale)} className="underline underline-offset-4 hover:text-lime">{c.pricing}</Link>
          </div>
        </Container>
      </Section>
      </div>
    </SiteFrame>
  );
}
