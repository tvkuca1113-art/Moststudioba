import type { Metadata } from "next";

import { ProjectView } from "@/views/ProjectView";
import { ClientProjectView } from "@/views/ClientProjectView";
import { clientProjects, getClientProject } from "@/content/client-projects";
import { demoProjects, getProject, projectSearchCopy } from "@/content/projects";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "de" as const;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...clientProjects, ...demoProjects].map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const client = getClientProject(slug);
  if (client) return buildMetadata({
    locale,
    route: { key: "project", slug },
    title: client.title[locale],
    description: client.description[locale],
  });
  const project = getProject(slug);
  const dict = getDictionary(locale);
  if (!project) return { title: dict.meta.notFound.title, description: dict.meta.notFound.description };

  return buildMetadata({
    locale,
    route: { key: "project", slug },
    title: projectSearchCopy[project.key].title[locale],
    description: projectSearchCopy[project.key].description[locale],
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return getClientProject(slug)
    ? <ClientProjectView locale={locale} slug={slug} />
    : <ProjectView locale={locale} slug={slug} />;
}
