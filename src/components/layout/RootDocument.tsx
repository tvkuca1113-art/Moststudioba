import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

import { site } from "@/content/site";
import { fontClassName } from "@/lib/fonts";
import { htmlLang, type Locale } from "@/lib/i18n/config";

/**
 * Shared document shell for both root layouts (`/` is Bosnian, `/de` is
 * German). Two root layouts is what lets each language tree carry its own
 * `<html lang>` without a middleware redirect.
 */
export function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html lang={htmlLang[locale]} className={fontClassName}>
      <body className="bg-paper text-ink antialiased">
        {children}
        {/* One analytics integration; NEXT_PUBLIC_ANALYTICS_ENABLED=false
            disables both this script and the typed event wrapper. */}
        {site.analyticsEnabled && <Analytics />}
      </body>
    </html>
  );
}
