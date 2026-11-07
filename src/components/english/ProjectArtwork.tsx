import { ClientScreenshot } from "@/components/projects/ClientScreenshot";
import type { EnglishProject } from "@/content/english-projects";

/** Uses the same screenshot presentation as the BS/DE client portfolio. */
export function ProjectArtwork({ project, priority = false, mobile = true }: {
  project: EnglishProject;
  priority?: boolean;
  mobile?: boolean;
}) {
  return (
    <div className={mobile ? "grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.65fr)]" : ""}>
      <ClientScreenshot
        shot={project.desktop}
        alt={`${project.brand} — actual desktop website screenshot`}
        caption={`Desktop view · ${project.kind === "client" ? "German client website" : "Bosnian demo concept"}.`}
        kind="desktop"
        sizes="(max-width: 1023px) calc(100vw - 40px), 65vw"
        preload={priority}
      />
      {mobile && (
        <ClientScreenshot
          shot={project.mobile}
          alt={`${project.brand} — actual mobile website screenshot`}
          caption="Mobile view · a separate capture of the original website."
          kind="mobile"
          sizes="(max-width: 1023px) 260px, 25vw"
          className="mx-auto w-full max-w-[260px]"
        />
      )}
    </div>
  );
}
