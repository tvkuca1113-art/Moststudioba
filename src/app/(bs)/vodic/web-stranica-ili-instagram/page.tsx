import type { Metadata } from "next";
import { ContentPageView } from "@/views/ContentPageView";
import { contentPages } from "@/content/service-pages";
import { buildMetadata } from "@/lib/seo";

const locale = "bs" as const;
const pageKey = "socialWebsite" as const;
const page = contentPages[locale][pageKey];

export const metadata: Metadata = buildMetadata({
  locale, route: { key: pageKey }, title: page.title, description: page.description,
});

export default function Page() {
  return <ContentPageView locale={locale} pageKey={pageKey} />;
}

