import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: { google: "eExoCdIgROmTlK9gPPFqpIQpTvrDImDbRYYXujw_kz4" },
};
export const viewport: Viewport = { themeColor: "#071f1a", colorScheme: "light" };
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
