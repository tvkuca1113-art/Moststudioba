import Link from "next/link";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { SocialContact } from "@/components/contact/SocialContact";
import { ProjectInquiry } from "@/components/contact/ProjectInquiry";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight, CheckIcon } from "@/components/ui/icons";
import { contentPages, contentPageKeys, pageLabels, type ContentPageKey } from "@/content/service-pages";
import { path, type Locale } from "@/lib/i18n/config";
import { contentPageJsonLd } from "@/lib/seo";

/** All editorial content is server-rendered. Only the inquiry form hydrates. */
export function ContentPageView({ pageKey, locale }: { pageKey: ContentPageKey; locale: Locale }) {
  const page = contentPages[locale][pageKey];
  const bs = locale === "bs";
  const isService = ["website", "webshop", "redesign"].includes(pageKey);
  return (
    <SiteFrame locale={locale} route={{ key: pageKey }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contentPageJsonLd(pageKey, locale)).replace(/</g, "\\u003c") }} />
      <Section tone="paper" size="tight">
        <Container>
          <nav aria-label={bs ? "Putanja stranice" : "Brotkrümelnavigation"} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate">
            <Link href={path("home", locale)} className="py-2 underline underline-offset-4">{bs ? "Početna" : "Startseite"}</Link>
            {isService && <><span aria-hidden="true">/</span><Link href={path("services", locale)} className="py-2 underline underline-offset-4">{bs ? "Usluge" : "Leistungen"}</Link></>}
            <span aria-hidden="true">/</span><span aria-current="page">{pageLabels[locale][pageKey]}</span>
          </nav>
          <div className="mt-8 grid gap-9 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-[.18em] text-forest uppercase">{page.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-display leading-[1.02]">{page.heading}</h1>
              {page.publishedOn && <p className="mt-5 flex flex-wrap gap-x-2 text-sm text-slate"><Link href={`${path("home", locale)}#studio`} className="underline underline-offset-4">MOST Studio</Link><span aria-hidden="true">·</span><span>{bs ? "Objavljeno" : "Veröffentlicht"} <time dateTime={page.publishedOn}>{new Intl.DateTimeFormat(bs ? "bs-BA" : "de-DE", { dateStyle: "long", timeZone: "UTC" }).format(new Date(page.publishedOn))}</time></span></p>}
              <p className="mt-6 max-w-[65ch] text-lead leading-relaxed text-slate">{page.lead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="#projektni-upit">{bs ? "Zatražite procjenu projekta" : "Projekt anfragen"}</ButtonLink>
                <ButtonLink href={path("projects", locale)} variant="quiet">{bs ? "Pogledajte radove" : "Arbeiten ansehen"}</ButtonLink>
              </div>
            </div>
            <aside className="rounded-2xl bg-forest p-6 text-paper on-dark sm:p-8">
              <p className="text-xs font-semibold tracking-[.2em] text-lime">MOST STUDIO</p>
              <h2 className="mt-4 text-2xl leading-tight">{page.summaryTitle}</h2>
              <ul className="mt-6 space-y-4">{page.summary.map(item => <li key={item} className="flex gap-3 border-t border-line-dark pt-4 text-sm leading-relaxed"><CheckIcon className="mt-0.5 size-4 shrink-0 text-lime" />{item}</li>)}</ul>
              <p className="mt-6 text-xs leading-relaxed text-mist">{bs ? "Online saradnja · Bosanski i njemački" : "Online-Zusammenarbeit · Bosnisch und Deutsch"}</p>
            </aside>
          </div>
        </Container>
      </Section>
      <Section tone="paperDim" size="tight">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
            <nav aria-label={bs ? "Sadržaj ove stranice" : "Auf dieser Seite"} className="self-start lg:sticky lg:top-28">
              <p className="text-xs font-semibold tracking-[.16em] text-slate uppercase">{bs ? "Na ovoj stranici" : "Auf dieser Seite"}</p>
              <ol className="mt-4 border-t border-line-light">{page.sections.map((section, index) => <li key={section.id} className="border-b border-line-light"><a href={`#${section.id}`} className="flex min-h-12 gap-4 py-3 text-sm leading-relaxed hover:text-forest"><span className="text-slate">0{index + 1}</span>{section.title}</a></li>)}</ol>
            </nav>
            <div className="min-w-0 space-y-12">
              {page.sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`} className="text-title leading-[1.1]">{section.title}</h2>
                {section.paragraphs.map(paragraph => <p key={paragraph} className="mt-4 max-w-[68ch] text-base leading-[1.85] text-slate sm:text-lg">{paragraph}</p>)}
                {section.table && <table className="mt-6 w-full table-fixed border-collapse text-left text-sm leading-relaxed sm:text-base">
                  <caption className="pb-3 text-left text-sm font-semibold text-forest">{section.table.caption}</caption>
                  <thead className="bg-forest text-paper"><tr>{section.table.columns.map((column, i) => <th key={column} scope="col" className={`p-3 align-top font-semibold sm:p-4 ${i === 0 ? "w-2/5" : "w-3/5"}`}>{column}</th>)}</tr></thead>
                  <tbody>{section.table.rows.map(([label, value]) => <tr key={label} className="border-b border-line-light odd:bg-paper"><th scope="row" className="p-3 align-top font-semibold [overflow-wrap:anywhere] sm:p-4">{label}</th><td className="p-3 align-top text-slate [overflow-wrap:anywhere] sm:p-4">{value}</td></tr>)}</tbody>
                </table>}
                {section.links && <ul className="mt-5 space-y-2">{section.links.map(link => <li key={link.label}><Link href={path(link.route.key, locale, link.route.slug)} className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-semibold text-forest underline underline-offset-4">{link.label}<ArrowUpRight className="size-4 shrink-0" /></Link></li>)}</ul>}
                {section.points && <ul className="mt-5 space-y-3">{section.points.map(point => <li key={point} className="flex gap-3 text-base leading-relaxed"><CheckIcon className="mt-1 size-4 shrink-0 text-forest" />{point}</li>)}</ul>}
              </section>)}
              {page.sources && <aside className="border-t border-line-light pt-6" aria-label={bs ? "Izvori vodiča" : "Quellen des Ratgebers"}><h2 className="text-lg font-semibold">{bs ? "Izvori i dodatna provjera" : "Quellen zum Weiterlesen"}</h2><p className="mt-2 text-sm leading-relaxed text-slate">{bs ? "Googleova dokumentacija za provjere opisane u ovom vodiču:" : "Google-Dokumentation zu den beschriebenen Prüfungen:"}</p><ul className="mt-3 space-y-1">{page.sources.map(source => <li key={source.href}><a href={source.href} className="inline-flex min-h-11 items-center py-2 text-sm text-forest underline underline-offset-4">{source.label}</a></li>)}</ul></aside>}
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="forest" size="tight">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div><p className="text-xs font-semibold tracking-[.2em] text-lime">{bs ? "FUNKCIONALNI DEMO KONCEPT" : "FUNKTIONIERENDES DEMOKONZEPT"}</p><h2 className="mt-4 text-title leading-tight">{page.proof.title}</h2></div>
            <div><p className="text-base leading-relaxed text-mist sm:text-lg">{page.proof.text}</p><div className="mt-6 flex flex-wrap gap-3">
              {page.proof.shop ? <ButtonLink href="/moststudiowebshop" tone="dark">{bs ? "Isprobajte webshop" : "Shop-Demo testen"}</ButtonLink> : <>
                <ButtonLink href={path("project", locale, page.proof.project)} tone="dark">{bs ? "Pogledajte projekt" : "Projekt ansehen"}</ButtonLink>
                <ButtonLink href={path("demo", locale, page.proof.project)} tone="dark" variant="secondary">{bs ? "Isprobajte demo" : "Demo testen"}</ButtonLink>
              </>}
            </div></div>
          </div>
        </Container>
      </Section>
      <Section tone="paper" size="tight" labelledBy="page-faq-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
            <h2 id="page-faq-title" className="text-title leading-tight">{bs ? "Još nekoliko korisnih odgovora." : "Weitere hilfreiche Antworten."}</h2>
            <div className="divide-y divide-line-light border-y border-line-light">{page.faq.map(item => <details key={item.question} className="group py-5"><summary className="cursor-pointer text-lg font-semibold marker:text-forest">{item.question}</summary><p className="mt-4 text-base leading-relaxed text-slate">{item.answer}</p></details>)}</div>
          </div>
          <nav aria-label={bs ? "Povezane usluge i vodiči" : "Weitere Leistungen und Ratgeber"} className="mt-10 flex flex-wrap gap-3">
            {contentPageKeys.filter(key => key !== pageKey).map(key => <Link key={key} href={path(key, locale)} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-line-light px-5 py-3 text-sm font-semibold hover:border-forest">{pageLabels[locale][key]}<ArrowUpRight className="size-4 shrink-0" /></Link>)}
          </nav>
        </Container>
      </Section>
      <Section id="projektni-upit" tone="ink" labelledBy="inquiry-title">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div><p className="text-xs font-semibold tracking-[.2em] text-lime">{bs ? "VAŠ SLJEDEĆI KORAK" : "IHR NÄCHSTER SCHRITT"}</p><h2 id="inquiry-title" className="mt-5 text-display leading-tight">{bs ? "Opišite zadatak. Dogovorimo rješenje." : "Aufgabe beschreiben. Lösung abstimmen."}</h2><p className="mt-5 text-lead leading-relaxed text-mist">{bs ? "Pošaljite djelatnost, cilj i potrebne funkcije. Zajedno razjasnimo obim, cijenu i rok prije početka." : "Senden Sie Tätigkeit, Ziel und benötigte Funktionen. Umfang, Preis und Termin klären wir vor dem Start."}</p></div>
            <div><SocialContact locale={locale} dark /><details className="mt-6 rounded-2xl border border-line-dark p-4"><summary className="cursor-pointer py-3 font-semibold">{bs ? "Pripremite detalje upita (opcionalno)" : "Anfragedetails vorbereiten (optional)"}</summary><ProjectInquiry locale={locale} /></details></div>
          </div>
        </Container>
      </Section>
    </SiteFrame>
  );
}
