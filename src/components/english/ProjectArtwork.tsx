import { Arrow } from "./Arrow";
import Image from "next/image";
import type { EnglishProject } from "@/content/english-projects";

/** Actual website captures, presented in lightweight device frames. */
export function ProjectArtwork({ project, priority = false, mobile = true }: { project: EnglishProject; priority?: boolean; mobile?: boolean }) {
  return <div className={`en-artwork en-artwork-${project.color}`}>
    <div className="en-artwork-label" aria-hidden="true"><span>MOST / {project.kind === "concept" ? "EXPLORATION" : "SELECTED WORK"}</span><span>DESIGN + DEVELOPMENT</span></div>
    <div className="en-browser-frame"><div className="en-browser-toolbar" aria-hidden="true"><span>● ● ●</span><span>{project.liveUrl ? new URL(project.liveUrl).hostname : `${project.brand} / design concept`}</span><Arrow /></div>
      <Image src={project.desktop.src} width={project.desktop.width} height={project.desktop.height} alt={`${project.brand} — actual desktop website screenshot`} unoptimized preload={priority} loading={priority ? undefined : "lazy"} sizes="(max-width: 800px) 90vw, 65vw" />
    </div>
    {mobile && <div className="en-phone-frame"><span className="en-phone-camera" aria-hidden="true" /><Image src={project.mobile.src} width={project.mobile.width} height={project.mobile.height} alt={`${project.brand} — actual mobile website screenshot`} unoptimized loading="lazy" sizes="(max-width: 800px) 22vw, 16vw" /></div>}
  </div>;
}
