import { Archivo, Inter } from "next/font/google";

/**
 * Two families, both with the `latin-ext` subset so č ć ž š đ and ä ö ü ß
 * render from the real font rather than a fallback.
 */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const fontClassName = `${archivo.variable} ${inter.variable}`;
