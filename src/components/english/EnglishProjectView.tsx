import Link from "next/link";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import type { EnglishProject } from "@/content/english-projects";
import { englishProjects } from "@/content/english-projects";
import { absoluteUrl } from "@/lib/seo";
import { EnglishFrame } from "./EnglishFrame";
import { ProjectArtwork } from "./ProjectArtwork";

export function EnglishProjectView({ project }: { project: EnglishProject }) {
  const next = englishProjects[(englishProjects.findIndex(p => p.slug === project.slug) + 1) % englishProjects.length];
  const url = absoluteUrl(`/en/projects/${project.slug}`);
  const schema = { "@context": "https://schema.org", "@type": "WebPage", url, name: `${project.brand} — ${project.kind === "client" ? "Client Website" : "Design Concept"} | MOST Studio`, description: project.summary, inLanguage: "en", isPartOf: { "@id": `${absoluteUrl("/")}/#website` } };

  return (
    <EnglishFrame route={{ key: "project", slug: project.slug }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Section tone="paper" size="tight" labelledBy="case-title">
        <Container>
          <Link href="/en#work" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate hover:text-forest"><ArrowRight className="size-4 rotate-180" /> Back to selected work</Link>
          <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div><div className="flex flex-wrap items-center gap-x-3 gap-y-2"><span className="rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-[0.8125rem] font-semibold text-forest">{project.kind === "client" ? "Client project" : "Independent demo concept"}</span><span className="text-sm text-slate">{project.category}</span></div><h1 id="case-title" className="mt-5 max-w-[20ch] text-display leading-[1.04] tracking-[-0.035em]">{project.brand}</h1><p className="mt-5 max-w-[60ch] text-lead leading-relaxed text-slate">{project.summary}</p></div>
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "light", "justify-self-start")}>Visit live website <ArrowUpRight className="size-4 shrink-0" /></a>}
          </div>
          {project.kind === "concept" && <p className="mt-6 max-w-3xl rounded-xl border border-line-light bg-paper-dim p-4 text-sm leading-relaxed text-slate">Independent design exploration for an invented business. Not a client commission. No real orders, appointments or business results are represented.</p>}
          <div className="mt-8 lg:mt-10"><ProjectArtwork project={project} priority /></div>
        </Container>
      </Section>
      <Section tone="paperDim" labelledBy="brief-title"><Container><div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div><SectionHeading id="brief-title" eyebrow="THE BRIEF" title={project.title} lead={project.brief} /></div>
        <div><h3 className="text-xl">{project.kind === "client" ? "Project scope" : "What the concept explores"}</h3><ul className="mt-5 divide-y divide-line-light border-y border-line-light">{project.scope.map(item => <li key={item} className="py-3 text-base leading-relaxed text-slate">{item}</li>)}</ul>
          {project.demoUrl && <a href={project.demoUrl} className={buttonClass("primary", "light", "mt-6")}>Try the interactive demo <ArrowUpRight className="size-4 shrink-0" /></a>}
          <p className="mt-4 text-sm leading-relaxed text-slate">{project.liveUrl ? "The original client website is in German and opens in a new tab." : "The interactive demo is in Bosnian. It does not create a real booking or order."}</p>
        </div>
      </div></Container></Section>
      <Section tone="forest" labelledBy="decisions-title"><Container><SectionHeading id="decisions-title" tone="dark" eyebrow="BEHIND THE DESIGN" title="Every choice has a purpose." />
        <div className="mt-10">{project.decisions.map((decision, i) => <article key={decision.title} className="grid gap-5 border-t border-line-dark py-7 lg:grid-cols-[4rem_1fr_1.2fr] lg:gap-10"><span className="font-display text-xl font-bold text-lime">0{i + 1}</span><h3 className="text-title leading-tight">{decision.title}</h3><p className="text-body leading-relaxed text-mist">{decision.body}</p></article>)}</div>
      </Container></Section>
      <Section tone="paper" labelledBy="case-contact-title"><Container><div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div><SectionHeading id="case-contact-title" eyebrow="YOUR PROJECT" title="A similar challenge for your business?" lead="Tell us what you offer, who you want to reach and how you want people to get in touch." /><ButtonLink href="/en#contact" className="mt-6">Start a conversation</ButtonLink></div>
        <Link href={`/en/projects/${next.slug}`} className="group flex flex-col justify-center rounded-2xl border border-line-light bg-paper-dim p-6 sm:p-8"><span className="text-sm font-semibold text-slate">Next / {next.kind === "client" ? "Client project" : "Demo concept"}</span><h3 className="mt-4 text-title">{next.brand}</h3><ArrowUpRight className="mt-6 size-6 text-forest" /></Link>
      </div></Container></Section>
    </EnglishFrame>
  );
}
