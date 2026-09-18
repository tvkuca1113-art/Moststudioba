"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { SocialContact } from "@/components/contact/SocialContact";
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
  const panelRef = useRef<HTMLDivElement>(null);

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
    const rootOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    const background = [...document.querySelectorAll<HTMLElement>("main, footer")];
    const previousInert = background.map((node) => node.inert);
    background.forEach((node) => { node.inert = true; });
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
      if (event.key === "Tab") {
        const links = [...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])];
        const first = toggleRef.current;
        const last = links.at(-1);
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault();
          first?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          links[0]?.focus({ preventScroll: true });
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus({ preventScroll: true });
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      desktop.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = rootOverflow;
      document.body.style.overflow = bodyOverflow;
      background.forEach((node, index) => { node.inert = previousInert[index]; });
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const dark = tone === "overlay";
  const barClass =
    tone === "overlay"
      ? scrolled
        ? "bg-ink/95 text-paper on-dark backdrop-blur-md"
        : "bg-transparent text-paper on-dark"
      : scrolled
        ? "bg-paper/95 text-ink backdrop-blur-md border-b border-line-light"
        : "bg-paper text-ink";

  return (
    <>
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", barClass)}>
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <a
            href={`${path("home", locale)}#top`}
            className="inline-flex min-h-11 shrink-0 items-center"
            aria-label={`${site.name} — ${dict.nav.ariaLabel}`}
          >
            <Wordmark />
          </a>

          <nav aria-label={dict.nav.ariaLabel} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative inline-flex min-h-11 items-center text-sm font-medium transition-opacity hover:opacity-100",
                      dark ? "text-paper/85" : "text-ink/75",
                    )}
                  >
                    {item.label}
                  </a>
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
            {/* Wrapped: a `hidden` utility on the button itself would compete
                with the button's own `inline-flex` and lose. */}
            <span className="hidden sm:block">
              <ButtonLink href={contactHref} tone={dark ? "dark" : "light"} className="px-5 py-2.5 text-sm">
                {dict.nav.cta}
              </ButtonLink>
            </span>
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
    </header>

      <div
        ref={panelRef}
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 top-16 z-40 overflow-y-auto overscroll-contain bg-ink text-paper on-dark sm:top-20 lg:hidden"
      >
        <Container className="flex min-h-full flex-col gap-10 py-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <nav aria-label={dict.nav.ariaLabel}>
            <ul className="flex flex-col">
              {[...items, { label: dict.nav.contact, href: contactHref }].map((item) => (
                <li key={item.href} className="border-b border-line-dark">
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-16 items-center font-display text-3xl font-bold tracking-tight"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6">
            <LanguageSwitcher locale={locale} route={route} dict={dict} tone="dark" className="self-start" />
            <SocialContact locale={locale} from="header" dark />
          </div>
        </Container>
      </div>
    </>
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
