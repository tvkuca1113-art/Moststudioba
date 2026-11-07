import type { Dictionary } from "./dictionary";

/** English uses the same document, navigation, hero and footer as BS/DE. */
export const enShell = {
  common: {
    skipToContent: "Skip to content", demoBadge: "Demo concept",
    demoNotice: "Demo concept — a design and functionality example.",
    openMenu: "Open menu", closeMenu: "Close menu", backToTop: "Back to top",
    language: "Website language", switchTo: "Choose a website language",
    loading: "Loading…", optional: "optional",
  },
  nav: {
    projects: "Projects", services: "Services", process: "How we work",
    studio: "Studio", contact: "Contact", cta: "Let’s talk", ariaLabel: "Main navigation",
  },
  hero: {
    eyebrow: "WEB DESIGN · BUILD · REDESIGN",
    titleLine1: "Websites and",
    titleLine2: "online stores.",
    lead: "Custom websites, online stores and redesigns with a clear offer and a simple path to an inquiry or order. From structure and design to development and launch, with direct communication in English.",
    ctaPrimary: "Request a quote", ctaSecondary: "Explore services",
    support: "Web design · Development · Redesign", markets: "Working remotely",
    galleryLabel: "Choose a demo concept", galleryHint: "Choose a concept to explore its design.",
    figureLabel: "Screenshot of a demo concept designed by MOST Studio.",
  },
  footer: {
    blurb: "Web design, website development and redesign. An independent studio working remotely with businesses in Bosnia and Herzegovina, Germany and the US.",
    navTitle: "Pages", contactTitle: "Contact", projectsTitle: "Projects",
    disclaimer: "Client projects are labeled as such. DAL Workshop and InnoSa Clean are live website examples. Demo concepts are independent explorations for invented businesses; they are not client commissions.",
    rights: "© {year} MOST Studio", credits: "Photography: Unsplash",
  },
} satisfies Pick<Dictionary, "common" | "nav" | "hero" | "footer">;
