import { path, type Locale, type RouteRef } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

/** Stable, language-neutral anchor ids so one href works in both languages. */
export const sectionIds = {
  showcase: "sta-mozemo",
  projects: "projekti",
  services: "usluge",
  process: "proces",
  studio: "studio",
  contact: "kontakt",
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Present when the link targets a real page (used for active state). */
  route?: RouteRef["key"];
};

export function mainNav(locale: Locale, dict: Dictionary): NavItem[] {
  const home = path("home", locale);
  const homeAnchor = (id: string) => `${home === "/" ? "" : home}/#${id}`;

  return [
    { label: dict.nav.projects, href: path("projects", locale), route: "projects" },
    { label: dict.nav.services, href: path("services", locale), route: "services" },
    { label: dict.nav.process, href: homeAnchor(sectionIds.process) },
    { label: dict.nav.studio, href: homeAnchor(sectionIds.studio) },
  ];
}
