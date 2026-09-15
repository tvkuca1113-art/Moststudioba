import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { site } from "@/content/site";

/**
 * One of two root layouts. Bosnian lives at `/`, German at `/de`, and each
 * tree owns its own <html lang>. Next.js supports this as long as there is no
 * top-level app/layout.tsx.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
};

export const viewport: Viewport = {
  themeColor: "#103c35",
  colorScheme: "light",
};

export default function BosnianRootLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="bs">{children}</RootDocument>;
}
