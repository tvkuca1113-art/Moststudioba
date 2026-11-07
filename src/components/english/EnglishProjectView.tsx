import { Arrow } from "./Arrow";
import Link from "next/link";
import type { EnglishProject } from "@/content/english-projects";
import { englishProjects } from "@/content/english-projects";
import { absoluteUrl } from "@/lib/seo";
import { EnglishFrame } from "./EnglishFrame";
import { ProjectArtwork } from "./ProjectArtwork";

export function EnglishProjectView({ project }: { project: EnglishProject }) {
  const next = englishProjects[(englishProjects.findIndex(p=>p.slug===project.slug)+1)%englishProjects.length];
  const url = absoluteUrl(`/en/projects/${project.slug}`);
  const schema = {"@context":"https://schema.org","@type":"WebPage",url,name:`${project.brand} — ${project.kind === "client" ? "Client Website" : "Design Concept"} | MOST Studio`,description:project.summary,inLanguage:"en",isPartOf:{"@id":`${absoluteUrl("/")}/#website`}};
  return <EnglishFrame route={{key:"project",slug:project.slug}}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />
    <section className="en-case-intro en-wrap"><Link href="/en#work" className="en-text-link"><Arrow direction="left" /> Back to selected work</Link><div className="en-case-heading"><div><p className="en-kicker">{project.kind === "client" ? "Client project" : "Independent demo concept"} / {project.brand}</p><h1>{project.title}</h1></div><div><p>{project.summary}</p><p className="en-case-sector">{project.category}</p></div></div>{project.kind === "concept" && <p className="en-concept-note">Independent design exploration for an invented business. Not a client commission. No real orders, appointments or business results are represented.</p>}<ProjectArtwork project={project} priority /><p className="en-capture-note">Actual desktop and mobile website captures. The original website content is in {project.kind==="client" ? "German" : "Bosnian"}.</p></section>
    <section className="en-case-brief en-section en-wrap"><div><p className="en-kicker">The brief</p><h2 className="en-section-title">{project.kind === "client" ? "A clear job for the website." : "An idea worth exploring."}</h2><p>{project.brief}</p></div><div><h3>{project.kind === "client" ? "Project scope" : "What the concept explores"}</h3><ul>{project.scope.map(item=><li key={item}>{item}</li>)}</ul>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="en-button">Visit live website <Arrow direction="up-right" /></a>}{project.demoUrl && <a href={project.demoUrl} className="en-button">Try the interactive demo <Arrow direction="up-right" /></a>}<p className="en-capture-note">{project.liveUrl ? "Opens the original German website in a new tab." : "The interactive demo is in Bosnian. It does not create a real booking or order."}</p></div></section>
    <section className="en-case-decisions en-section on-dark"><div className="en-wrap"><p className="en-kicker">Behind the design</p><h2 className="en-section-title">Every choice<br />has a purpose.</h2><div className="en-decision-list">{project.decisions.map((decision,i)=><article key={decision.title}><span>0{i+1}</span><h3>{decision.title}</h3><p>{decision.body}</p></article>)}</div></div></section>
    <section className="en-case-close en-section en-wrap"><div><p className="en-kicker">Have a project in mind?</p><h2 className="en-section-title">Your business.<br />Your own direction.</h2><p>Let’s talk about what your website should do for you.</p><a href="/en#contact" className="en-button">Start a conversation <Arrow direction="up-right" /></a></div><Link className="en-next-project" href={`/en/projects/${next.slug}`}><span>Next / {next.kind === "client" ? "Client project" : "Demo concept"}</span><h3>{next.brand}</h3><Arrow direction="up-right" /></Link></section>
  </EnglishFrame>;
}
