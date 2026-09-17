import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["terminal.local"],
  async rewrites() {
    return [{ source: "/moststudiowebshop", destination: "/webshop-assets/index.html" }];
  },
  images: {
    /**
     * AVIF first, WebP behind it. Both are generated from the same files in
     * `public/images` — browsers that accept AVIF get the smaller one, the
     * rest get WebP, and nothing has to be stored twice.
     */
    formats: ["image/avif", "image/webp"],
    /**
     * A year, because the sources are content-addressed: a new photograph or a
     * fresh capture is written by `scripts/prepare-images.mjs` or
     * `scripts/capture-demos.mjs` under a name that changes with it.
     */
    minimumCacheTTL: 31_536_000,
  },
};

export default nextConfig;
