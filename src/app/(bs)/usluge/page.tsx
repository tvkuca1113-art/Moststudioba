import type { Metadata } from "next";

import { ServicesView } from "@/views/ServicesView";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "bs" as const;

export const metadata: Metadata = buildMetadata({
  locale,
  route: { key: "services" },
  title: getDictionary(locale).meta.services.title,
  description: getDictionary(locale).meta.services.description,
});

export default function Page() {
  return <ServicesView locale={locale} />;
}
