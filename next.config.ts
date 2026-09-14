import type { NextConfig } from "next";

/**
 * `NEXT_PUBLIC_BASE_PATH` lets the same code base deploy either at the root of
 * a domain (empty string) or under a sub-path such as `/portfolio` on GitHub
 * Pages, without touching any component.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimisation server; assets are pre-optimised.
    unoptimized: true,
  },
  reactStrictMode: true,
  // A stray lockfile above the repo would otherwise confuse Turbopack's root detection.
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  experimental: {
    // Lets `app/global-not-found.tsx` become the exported `404.html`.
    globalNotFound: true,
  },
};

export default nextConfig;
