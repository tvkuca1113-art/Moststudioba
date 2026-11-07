"use client";
import { usStarterOffer } from "@/content/offer";
import { Arrow } from "./Arrow";
import { useRef } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { allPaths, type RouteRef } from "@/lib/i18n/config";

export function EnglishHeader({ route }: { route: RouteRef }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const paths = allPaths(route);
  const close = () => { if (menu.current) menu.current.open = false; };
  return <header className="en-header">
    <div className="en-wrap en-header-inner">
      <a href="/en#top" aria-label="MOST Studio home" className="en-brand"><Wordmark /></a>
      <nav className="en-desktop-nav" aria-label="Main navigation">
        <a href="/en#work">Work</a><a href="/en#services">Services</a><a href="/en#process">Process</a><a href="/en#pricing">Pricing</a>
      </nav>
      <div className="en-header-actions">
        <nav className="en-languages" aria-label="Website language">
          <a href={paths.bs} hrefLang="bs" lang="bs" aria-label="Bosanski">BS</a>
          <a href={paths.de} hrefLang="de" lang="de" aria-label="Deutsch">DE</a>
          <a href={paths.en ?? "/en"} hrefLang="en" lang="en" aria-current="true" aria-label="English">EN</a>
        </nav>
        <a href="/en#contact" className="en-nav-cta">Let’s talk <Arrow direction="up-right" /></a>
        <details className="en-menu" ref={menu} onKeyDown={e => { if(e.key === "Escape") { close(); menu.current?.querySelector("summary")?.focus(); } }}>
          <summary aria-label="Navigation menu"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 6h16M2 13h16" /></svg></summary>
          <nav aria-label="Mobile navigation" onClick={close}>
            <a href="/en#work">Selected work <Arrow direction="up-right" /></a>
            <a href="/en#services">What we do <Arrow direction="up-right" /></a>
            <a href="/en#process">How it works <Arrow direction="up-right" /></a>
            <a href="/en#pricing">Projects from {usStarterOffer.price} <Arrow direction="up-right" /></a>
            <a href="/en#contact">Start a project <Arrow direction="up-right" /></a>
          </nav>
        </details>
      </div>
    </div>
  </header>;
}
