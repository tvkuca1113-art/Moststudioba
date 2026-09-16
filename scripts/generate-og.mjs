/**
 * Renders the Open Graph images from an SVG source.
 *
 * Run with `npm run og` after changing the wording; the PNGs are committed so
 * the build never depends on network access or a font being installed.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const variants = [
  {
    file: "og-bs.png",
    eyebrow: "WEB DIZAJN I IZRADA · BiH + NJEMAČKA",
    line1: "Web stranice",
    line2: "s vašim",
    accent: "potpisom.",
    foot: "@moststudioba",
  },
  {
    file: "og-de.png",
    eyebrow: "WEBDESIGN UND ENTWICKLUNG · BOSNIEN + DEUTSCHLAND",
    line1: "Websites",
    line2: "mit Ihrer",
    accent: "Handschrift.",
    foot: "@moststudioba",
  },
];

const esc = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ eyebrow, line1, line2, accent, foot }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="96" height="96" patternUnits="userSpaceOnUse">
      <path d="M96 0H0V96" fill="none" stroke="#16332d" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#091C18"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#D9F56B"/>

  <g font-family="Archivo SemiBold, Archivo, DejaVu Sans, sans-serif">
    <text x="72" y="104" fill="#F3F2E9" font-size="28" font-weight="800" letter-spacing="6">MOST STUDIO</text>
    <rect x="72" y="116" width="196" height="3" rx="1.5" fill="#D9F56B"/>

    <text x="72" y="182" fill="#A9BDB4" font-size="19" font-weight="500" letter-spacing="4.5">${esc(eyebrow)}</text>

    <text x="72" y="320" fill="#F3F2E9" font-size="104" font-weight="800" letter-spacing="-3">${esc(line1)}</text>
    <text x="72" y="424" fill="#F3F2E9" font-size="104" font-weight="800" letter-spacing="-3">${esc(line2)} <tspan fill="#D9F56B">${esc(accent)}</tspan></text>

    <rect x="72" y="486" width="1056" height="1" fill="#24463F"/>
    <text x="72" y="546" fill="#A9BDB4" font-size="24" font-weight="500">${esc(foot)}</text>
    <text x="1128" y="546" fill="#A9BDB4" font-size="24" font-weight="500" text-anchor="end">Dizajn · Izrada · Redizajn</text>
  </g>
</svg>`;
}

const outDir = path.join(process.cwd(), "public", "og");
await mkdir(outDir, { recursive: true });

for (const variant of variants) {
  // Flat colour and type: a 32-colour palette is visually identical here and
  // roughly halves the file.
  const png = await sharp(Buffer.from(svg(variant)))
    .png({ palette: true, colors: 32, compressionLevel: 9, effort: 10 })
    .toBuffer();
  await writeFile(path.join(outDir, variant.file), png);
  console.log(`${variant.file} — ${(png.length / 1024).toFixed(0)} kB`);
}
