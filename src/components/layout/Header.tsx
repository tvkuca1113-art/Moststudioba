"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { path, type Locale, type RouteRef } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { mainNav } from "@/lib/nav";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type HeaderTone = "overlay" | "solid";

export function Header({
  locale,
  route,
  dict,
  tone = "solid",
}: {
  locale: Locale;
  route: RouteRef;
  dict: Dictionary;
  tone?: HeaderTone;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const items = mainNav(locale, dict);
  const contactHref = path("contact", locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the panel whenever the route changes. Adjusting state during
  // render is the documented pattern for deriving state from a prop-like
  // value; an effect here would cause a second render pass.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const dark = tone === "overlay" && !scrolled ? true : tone === "overlay";
  const barClass =
    tone === "overlay"
      ? scrolled
        ? "bg-ink/95 text-paper on-dark backdrop-blur-md"
        : "bg-transparent text-paper on-dark"
      : scrolled
        ? "bg-paper/95 text-ink backdrop-blur-md border-b border-line-light"
        : "bg-paper text-ink";

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", barClass)}>
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <Link
            href={path("home", locale)}
            className="shrink-0 py-2"
            aria-label={`${site.name} — ${dict.nav.ariaLabel}`}
          >
            <Wordmark />
          </Link>

          <nav aria-label={dict.nav.ariaLabel} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex min-h-11 items-center text-sm font-medium transition-opacity hover:opacity-100",
                      dark ? "text-paper/85" : "text-ink/75",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher
              locale={locale}
              route={route}
              dict={dict}
              tone={dark ? "dark" : "light"}
              className="hidden sm:flex"
            />
            <ButtonLink
              href={contactHref}
              tone={dark ? "dark" : "light"}
              className="hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              {dict.nav.cta}
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border lg:hidden",
                dark ? "border-mist/40 text-paper" : "border-forest/25 text-forest",
              )}
            >
              <span className="sr-only">{menuOpen ? dict.common.closeMenu : dict.common.openMenu}</span>
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 top-16 z-40 overflow-y-auto bg-ink text-paper on-dark sm:top-20 lg:hidden"
      >
        <Container className="flex min-h-full flex-col gap-10 py-10">
          <nav aria-label={dict.nav.ariaLabel}>
            <ul className="flex flex-col">
              {[...items, { label: dict.nav.contact, href: contactHref }].map((item) => (
                <li key={item.href} className="border-b border-line-dark">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-16 items-center font-display text-3xl font-bold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6">
            <LanguageSwitcher locale={locale} route={route} dict={dict} tone="dark" className="self-start" />
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mist"
            >
              <InstagramIcon className="size-5" />
              {site.instagramHandle}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true" focusable="false">
      <path
        d={open ? "M5 5l10 10" : "M3 6.5h14"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d={open ? "M15 5L5 15" : "M3 13.5h14"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
