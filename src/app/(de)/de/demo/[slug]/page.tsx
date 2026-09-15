import type { Metadata } from "next";

import { DemoView } from "@/views/DemoView";
import { demoProjects, getProject } from "@/content/projects";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "de" as const;

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
    route: { key: "demo", slug },
    title: `${project.brand} — ${dict.meta.demo.titleSuffix}`,
    description: `${dict.meta.demo.descriptionPrefix} ${project.tagline[locale]}`,
    // Functional demos stay out of search: they must never be found as if
    // they were the real practice or workshop they depict.
    noindex: true,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return <DemoView locale={locale} slug={slug} />;
}
