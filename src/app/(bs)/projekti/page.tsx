import type { Metadata } from "next";

import { ProjectsView } from "@/views/ProjectsView";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "bs" as const;

export const metadata: Metadata = buildMetadata({
  locale,
  route: { key: "projects" },
  title: getDictionary(locale).meta.projects.title,
  description: getDictionary(locale).meta.projects.description,
});

export default function Page() {
  return <ProjectsView locale={locale} />;
}
