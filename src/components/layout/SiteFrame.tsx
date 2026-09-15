import type { ReactNode } from "react";

import type { Locale, RouteRef } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { Footer } from "./Footer";
import { Header, type HeaderTone } from "./Header";

/** Header + main + footer, shared by every page in both language trees. */
export function SiteFrame({
  locale,
  route,
  tone = "solid",
  children,
}: {
  locale: Locale;
  route: RouteRef;
  tone?: HeaderTone;
  children: ReactNode;
}) {
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        {dict.common.skipToContent}
      </a>
      <Header locale={locale} route={route} dict={dict} tone={tone} />
      <main id="main" className={tone === "solid" ? "pt-16 sm:pt-20" : undefined}>
        {children}
      </main>
      <Footer locale={locale} route={route} dict={dict} />
    </>
  );
}
