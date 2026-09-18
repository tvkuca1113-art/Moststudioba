/** Actual demo captures. Regenerate with scripts/capture-demos.mjs. Content hashes invalidate cached images. */
export type Shot = { src: string; width: number; height: number };
export const shots = {
  "stolarija-hrast-bs-desktop": { src: "/images/snimci/stolarija-hrast-bs-desktop-dff91a9d09.webp", width: 1100, height: 727 },
  "stolarija-hrast-de-desktop": { src: "/images/snimci/stolarija-hrast-de-desktop-3491fda595.webp", width: 1100, height: 727 },
  "ordinacija-lipa-bs-desktop": { src: "/images/snimci/ordinacija-lipa-bs-desktop-e49383bd3f.webp", width: 1100, height: 727 },
  "ordinacija-lipa-de-desktop": { src: "/images/snimci/ordinacija-lipa-de-desktop-0f4ce1f362.webp", width: 1100, height: 727 },
  "meridijan-savjetovanje-bs-desktop": { src: "/images/snimci/meridijan-savjetovanje-bs-desktop-d7cd2c85fd.webp", width: 1100, height: 727 },
  "meridijan-savjetovanje-de-desktop": { src: "/images/snimci/meridijan-savjetovanje-de-desktop-c303b444e6.webp", width: 1100, height: 765 },
  "stolarija-hrast-bs-mobile": { src: "/images/snimci/stolarija-hrast-bs-mobile-af62d42a03.webp", width: 390, height: 828 },
  "ordinacija-lipa-bs-mobile": { src: "/images/snimci/ordinacija-lipa-bs-mobile-426fa3f902.webp", width: 390, height: 852 },
  "meridijan-savjetovanje-bs-mobile": { src: "/images/snimci/meridijan-savjetovanje-bs-mobile-970ebd5844.webp", width: 390, height: 922 },
  "stolarija-hrast-de-mobile": { src: "/images/snimci/stolarija-hrast-de-mobile-ef3bbf5540.webp", width: 390, height: 854 },
  "ordinacija-lipa-de-mobile": { src: "/images/snimci/ordinacija-lipa-de-mobile-fbfed3c0a6.webp", width: 390, height: 878 },
  "meridijan-savjetovanje-de-mobile": { src: "/images/snimci/meridijan-savjetovanje-de-mobile-4e2d8e3b8b.webp", width: 390, height: 922 },
} as const satisfies Record<string, Shot>;
export type ShotKey = keyof typeof shots;
