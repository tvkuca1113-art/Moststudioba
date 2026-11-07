import { usStarterOffer } from "@/content/offer";
import { Arrow } from "./Arrow";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import type { RouteRef } from "@/lib/i18n/config";
import { EnglishHeader } from "./EnglishHeader";
import { Wordmark } from "@/components/ui/Wordmark";
import "./english.css";

export function EnglishFrame({ children, route }: { children: ReactNode; route: RouteRef }) {
  return <div className="en-site" id="top">
    <a href="#main" className="en-skip">Skip to content</a>
    <EnglishHeader route={route} />
    <main id="main">{children}</main>
    <footer className="en-footer en-wrap">
      <div className="en-footer-top"><a href="/en" aria-label="MOST Studio home"><Wordmark /></a><p>Considered design.<br />Carefully built.</p><a href="#top" className="en-text-link">Back to top <Arrow direction="up" /></a></div>
      <div className="en-footer-bottom"><p>© {new Date().getFullYear()} MOST Studio</p><p>Independent studio · Working remotely</p><a href={`mailto:${site.email}`}>{site.email}</a><a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram <Arrow direction="up-right" /></a></div>
    </footer>
    <div className="en-mobile-cta"><span>Websites from <strong>{usStarterOffer.price} USD</strong></span><a href="/en#contact">Start a project <Arrow direction="up-right" /></a></div>
  </div>;
}
