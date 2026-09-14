/**
 * Deployment-specific values. Both come from the environment so the same code
 * base serves a root domain or a GitHub Pages sub-path unchanged.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://juanxirp.github.io"
).replace(/\/$/, "");

/** Prefixes a `public/` asset path with the configured base path. */
export function withBasePath(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL for a site path, used in metadata, sitemap and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${withBasePath(path)}`;
}
