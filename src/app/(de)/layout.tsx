import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { siteUrl } from "@/lib/site-url";

/**
 * One of two root layouts. Bosnian lives at `/`, German at `/de`, and each
 * tree owns its own <html lang>. Next.js supports this as long as there is no
 * top-level app/layout.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: { google: "eExoCdIgROmTlK9gPPFqpIQpTvrDImDbRYYXujw_kz4" },
};

export const viewport: Viewport = {
  themeColor: "#103c35",
  colorScheme: "light",
};

export default function GermanRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="de">{children}</RootDocument>;
}
