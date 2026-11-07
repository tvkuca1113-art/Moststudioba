import { notFound } from "next/navigation";
import { englishProjects, getEnglishProject } from "@/content/english-projects";
import { EnglishProjectView } from "@/components/english/EnglishProjectView";
import { englishMetadata } from "@/lib/english-seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return englishProjects.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getEnglishProject(slug);
  if (!project) notFound();
  return englishMetadata({ key: "project", slug }, `${project.brand} — ${project.kind === "client" ? "Client Website" : "Design Concept"} | MOST Studio`, project.summary);
}
export default async function Page({ params }: Props) {
  const project = getEnglishProject((await params).slug);
  if (!project) notFound();
  return <EnglishProjectView project={project} />;
}
