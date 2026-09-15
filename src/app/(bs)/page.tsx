import type { Metadata } from "next";

import { HomeView } from "@/views/HomeView";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "bs" as const;

export const metadata: Metadata = buildMetadata({
  locale,
  route: { key: "home" },
  title: getDictionary(locale).meta.home.title,
  description: getDictionary(locale).meta.home.description,
});

export default function Page() {
  return <HomeView locale={locale} />;
}
