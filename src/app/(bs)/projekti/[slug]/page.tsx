import type { Metadata } from "next";

import { ProjectView } from "@/views/ProjectView";
import { demoProjects, getProject } from "@/content/projects";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "bs" as const;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demoProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const dict = getDictionary(locale);
  if (!project) return { title: dict.meta.notFound.title, description: dict.meta.notFound.description };

  return buildMetadata({
    locale,
    route: { key: "project", slug },
    title: `${project.brand} — ${project.sector[locale]} | ${dict.common.demoBadge}`,
    description: project.tagline[locale],
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return <ProjectView locale={locale} slug={slug} />;
}
