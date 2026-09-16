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
        {/* Vercel Web Analytics is wired up but stays off until the studio
            decides to turn it on, like every other measurement on this site.
            Set NEXT_PUBLIC_ANALYTICS_ENABLED=true to start collecting. */}
        {site.analyticsEnabled && <Analytics />}
      </body>
    </html>
  );
}
