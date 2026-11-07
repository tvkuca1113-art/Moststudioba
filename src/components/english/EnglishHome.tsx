import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ProjectSelector } from "@/components/home/ProjectSelector";
import { SocialContact } from "@/components/contact/SocialContact";
import { PricingOffer } from "@/components/services/PricingOffer";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowUpRight, PlusIcon } from "@/components/ui/icons";
import { englishProjects, websiteExamples } from "@/content/english-projects";
import { usStarterOffer } from "@/content/offer";
import { englishJsonLd } from "@/lib/english-seo";
import { enShell } from "@/lib/i18n/en-shell";
import { EnglishFrame } from "./EnglishFrame";
import { ProjectArtwork } from "./ProjectArtwork";
import { EnglishInquiry } from "./EnglishInquiry";

const services = [
  { title: "Web design", body: "Make your offer easy to understand and your business easy to contact. Structure, content, visual design and a layout that works on mobile.", detail: "Design around your business" },
  { title: "Website redesign", body: "Bring your existing website in line with your business. Review the structure, clarify the offer and plan how to preserve important URLs.", detail: "Keep the character. Improve the experience." },
  { title: "Development & online stores", body: "Turn an approved design into a working website or online store, with the pages, product options and integrations your project needs.", detail: "From approved design to launch" },
];
const reasons = [
  ["Design and development together", "One considered direction, from your first brief to the finished website. Content, layout and functionality are planned as a whole."],
  ["A clear scope before work starts", "You know what is included, what needs a separate estimate and which decisions are yours to review."],
  ["Direct, remote collaboration", "We work online, communicate in English and agree on feedback, calls and timing around your project."],
];
const process = [
  ["Understand", "We clarify your offer, audience, content and the main job your website needs to do."],
  ["Design", "You review the structure and visual direction before we move into development."],
  ["Build", "We develop the approved design for desktop and mobile, including the agreed functionality."],
  ["Check & launch", "We check layouts, links and the contact flow, then prepare your website for launch."],
];
const faqs = [
  { q: "Can we work together if my business is in the US?", a: "Yes. We collaborate remotely and communicate in English. We agree on the scope, feedback process, timeline and any calls before starting. The portfolio includes a German client project, live website examples from Bosnia and Germany, and independent demo concepts." },
  { q: `What does the ${usStarterOffer.price} starting price cover?`, a: `A one-page website with up to five sections, one language, your supplied content and one consolidated revision round. ${usStarterOffer.separate} ${usStarterOffer.reassurance}` },
  { q: "Can you improve my existing website?", a: "Yes. Send your current link and tell us what feels wrong or what has changed in your business. We can discuss a focused refresh or a wider redesign, then agree on the work and price before development begins." },
  { q: "Are the concepts real client projects?", a: "No. Hrast, Lipa and Meridijan are independent concepts for invented businesses. They are labeled as demos throughout. Massage und Wellness Mirjana is a confirmed client project. DAL Workshop and InnoSa Clean are shown separately as live website examples." },
];

export function EnglishHome() {
  const featured = englishProjects[0];
  const concepts = englishProjects.filter(project => project.kind === "concept");

  return (
    <EnglishFrame route={{ key: "home" }} tone="overlay">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(englishJsonLd()).replace(/</g, "\\u003c") }} />
      <Hero locale="en" dict={enShell} />

      <Section id="services" tone="paperDim" labelledBy="services-title">
        <Container>
          <SectionHeading id="services-title" eyebrow="SERVICES" title="A website, online store or redesign?" lead="Choose the service that fits your next step. We connect content, design and development around your business." />
          <nav aria-label="Services in detail" className="mt-8 grid gap-3 md:grid-cols-3">
            {services.map(service => (
              <a key={service.title} href="#contact" className="group flex flex-col rounded-xl border border-line-light bg-paper p-5 transition-colors hover:border-forest">
                <span className="flex items-start justify-between gap-4 text-lg font-semibold">{service.title}<ArrowUpRight className="mt-1 size-5 shrink-0" /></span>
                <span className="mt-3 text-sm leading-relaxed text-slate">{service.body}</span>
                <span className="mt-5 text-sm font-semibold text-forest">{service.detail}</span>
              </a>
            ))}
          </nav>
          <details className="mt-6 rounded-xl border border-line-light p-5 open:bg-paper">
            <summary className="cursor-pointer text-lg font-semibold">What goes into a carefully built website?</summary>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[["A clear structure", "The offer, useful details and the next step belong where your visitor expects to find them."], ["A considered mobile layout", "Readable type, useful spacing and controls that are comfortable to use on a small screen."], ["A careful handover", "The agreed scope includes layout and link checks, technical SEO setup and launch preparation."]].map(([title, body]) => <div key={title}><dt className="font-semibold">{title}</dt><dd className="mt-2 text-sm leading-relaxed text-slate">{body}</dd></div>)}
            </dl>
          </details>
          <div className="mt-6 flex flex-col justify-between gap-5 border-t border-line-light pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-base leading-relaxed text-slate">We work online. Scope, content, price and timeline are agreed before we start.</p>
            <ButtonLink href="#pricing" variant="quiet" className="shrink-0 px-0 text-sm">Projects from {usStarterOffer.price} USD</ButtonLink>
          </div>
        </Container>
      </Section>

      <Section id="work" tone="paper" size="tight" labelledBy="projects-title">
        <Container>
          <SectionHeading id="projects-title" eyebrow="PROJECTS" title="Different businesses. Considered solutions." lead="A confirmed client project, live website examples and independent concepts show how we connect content, design and development." />
          <article data-project-kind="client" className="mt-10 grid gap-6 border-t border-line-light pt-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12">
            <ProjectArtwork project={featured} mobile={false} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2"><span className="rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-[0.8125rem] font-semibold text-forest">Client project</span><span className="text-sm text-slate">{featured.category}</span></div>
              <h3 className="mt-4 text-title leading-tight tracking-[-0.025em]">{featured.brand}</h3>
              <p className="mt-4 max-w-[52ch] text-body leading-relaxed text-slate">{featured.summary}</p>
              <p className="mt-5 text-sm font-semibold text-forest">Design · Content · Development</p>
              <div className="mt-6 flex flex-wrap items-center gap-3"><ButtonLink href={`/en/projects/${featured.slug}`}>Explore the project</ButtonLink><a href={featured.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>Visit website <ArrowUpRight className="size-4 shrink-0" /></a></div>
            </div>
          </article>

          <div id="website-examples" className="mt-12 scroll-mt-28 border-t border-line-light pt-8 lg:mt-16">
            <h3 className="text-xl font-semibold text-forest">More websites to explore</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate">Live website examples. Open them to see the full experience.</p>
            <div className="en-examples mt-7 grid gap-8 md:grid-cols-2">
              {websiteExamples.map(project => (
                <article key={project.brand} className="min-w-0">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.brand} website (${project.language}, opens in a new tab)`} className="block overflow-hidden rounded-xl border border-line-light bg-paper-dim">
                    <Image src={project.image} width={1200} height={824} alt={`${project.brand} — actual screenshot of the live website`} unoptimized loading="lazy" sizes="(max-width: 767px) calc(100vw - 40px), 45vw" className="h-auto w-full" />
                  </a>
                  <span className="mt-5 inline-flex rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-[0.8125rem] font-semibold text-forest">Website example</span>
                  <h3 className="mt-3 text-2xl">{project.brand}</h3><p className="mt-3 text-base leading-relaxed text-slate">{project.description}</p>
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className={buttonClass("quiet", "light", "mt-3 px-0")}>Visit website ({project.language}) <ArrowUpRight className="size-4 shrink-0" /></a>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-line-light pt-8 lg:mt-16">
            <h3 className="text-xl font-semibold text-forest">Demo concepts for different businesses</h3>
            <p className="mt-2 mb-7 max-w-2xl text-base leading-relaxed text-slate">Independent design and functionality examples. These are not client commissions.</p>
            <div className="en-concepts">
              <ProjectSelector labels={concepts.map(project => project.brand)} locale="en">
                {concepts.map(project => (
                  <article key={project.slug} className="h-full rounded-2xl border border-line-light bg-paper p-4 sm:p-5">
                    <Link href={`/en/projects/${project.slug}`} aria-label={`Explore ${project.brand} independent design concept`}><ProjectArtwork project={project} mobile={false} /></Link>
                    <span className="mt-5 inline-flex rounded-full border border-forest/20 px-3 py-1 text-xs font-semibold text-forest">Demo concept</span>
                    <h3 className="mt-4 text-2xl leading-tight">{project.category}</h3><p className="mt-3 text-base leading-relaxed text-slate">{project.summary}</p>
                    <ButtonLink href={`/en/projects/${project.slug}`} variant="quiet" className="mt-4 px-0">See the concept</ButtonLink>
                  </article>
                ))}
              </ProjectSelector>
            </div>
          </div>
          <p className="mt-7 max-w-4xl border-t border-line-light pt-4 text-sm leading-relaxed text-slate">Mirjana is a confirmed client project. DAL Workshop and InnoSa Clean are live website examples. The three demo businesses are invented for design exploration.</p>
        </Container>
      </Section>

      <Section id="studio" tone="forest" size="tight" labelledBy="studio-title">
        <Container><div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <SectionHeading id="studio-title" tone="dark" eyebrow="STUDIO" title="Design and development in one place." lead="We start with your business: what you offer, who you want to reach and what a visitor should do next." />
          <ol className="divide-y divide-line-dark">{reasons.map(([title, body], i) => <li key={title} className="grid grid-cols-[2rem_1fr] gap-3 py-4 first:pt-0 last:pb-0"><span className="pt-1 text-sm text-lime">0{i + 1}</span><div><h3 className="text-xl">{title}</h3><p className="mt-2 text-base leading-relaxed text-mist">{body}</p></div></li>)}</ol>
        </div></Container>
      </Section>

      <Section id="pricing" tone="paper" size="tight"><Container><PricingOffer locale="en" contactHref="#contact" showGuide={false} /></Container></Section>

      <Section id="process" tone="forest" size="tight" labelledBy="process-title">
        <Container><SectionHeading id="process-title" tone="dark" eyebrow="PROCESS" title="You know what comes next." lead="Four clear stages, with room for feedback before the next decision." />
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-line-dark sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">{process.map(([title, body], i) => <li key={title} className="grid grid-cols-[1.75rem_1fr] gap-x-3 bg-forest p-4 sm:block sm:p-6"><span className="font-display text-sm font-bold tracking-[0.2em] text-lime">0{i + 1}</span><h3 className="text-xl leading-tight font-extrabold sm:mt-3 sm:text-2xl">{title}</h3><p className="col-start-2 mt-2.5 text-base leading-relaxed text-mist">{body}</p></li>)}</ol>
          <p className="mt-8 max-w-[64ch] border-t border-line-dark pt-6 text-body leading-relaxed text-mist">Your written scope, total price and timeline are agreed before work starts.</p>
        </Container>
      </Section>

      <Section id="faq" tone="paperDim" size="tight" labelledBy="faq-title"><Container><div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHeading id="faq-title" eyebrow="COMMON QUESTIONS" title="A few things you might be wondering." lead="Have another question? Message us on Instagram or Facebook." />
        <div className="border-t border-line-light">{faqs.map(faq => <details key={faq.q} className="group border-b border-line-light"><summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg leading-snug font-semibold [&::-webkit-details-marker]:hidden">{faq.q}<PlusIcon className="mt-1 size-5 shrink-0 text-forest transition-transform group-open:rotate-45" /></summary><p className="pb-6 text-body leading-relaxed text-slate">{faq.a}</p></details>)}</div>
      </div></Container></Section>

      <Section id="contact" tone="ink" labelledBy="contact-title"><Container><div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div><p className="text-xs font-semibold tracking-[.2em] text-lime uppercase">CONTACT</p><h2 id="contact-title" className="mt-5 text-display leading-[1.05]">What should your website do better?</h2><p className="mt-5 text-lg leading-relaxed text-mist">A new website, an online store or a better version of your current site? Tell us about your business and what you have in mind.</p><div className="mt-7"><SocialContact locale="en" dark cards /></div><p className="mt-4 text-sm leading-relaxed text-mist">Start a conversation directly, or prepare a short message here. We communicate in English.</p></div>
        <EnglishInquiry />
      </div></Container></Section>
    </EnglishFrame>
  );
}
