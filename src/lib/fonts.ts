import { Archivo, Public_Sans } from "next/font/google";

/**
 * Two families, both carrying the `latin-ext` subset so č ć ž š đ and
 * ä ö ü ß come from the real font rather than a fallback.
 *
 * No `weight` is passed on purpose: that pulls the variable font, so one file
 * per subset covers every weight the site uses instead of one file per weight.
 * Public Sans rather than Inter for body text — same job, 44 kB instead of
 * 130 kB for the two subsets.
 */
export const display = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

export const body = Public_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const fontClassName = `${display.variable} ${body.variable}`;
