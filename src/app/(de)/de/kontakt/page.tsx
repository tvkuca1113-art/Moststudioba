import type { Metadata } from "next";

import { ContactView } from "@/views/ContactView";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo";

const locale = "de" as const;

export const metadata: Metadata = buildMetadata({
  locale,
  route: { key: "contact" },
  title: getDictionary(locale).meta.contact.title,
  description: getDictionary(locale).meta.contact.description,
});

export default function Page() {
  return <ContactView locale={locale} />;
}
