import { afterEach, describe, expect, it, vi } from "vitest";

/** `site.ts` reads the environment at import time, so each case re-imports it. */
async function loadSite(basePath: string | undefined, siteUrl?: string) {
  vi.resetModules();
  if (basePath === undefined) {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
  } else {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", basePath);
  }
  if (siteUrl !== undefined) vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);
  return import("@/lib/site");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("withBasePath", () => {
  it("returns the path unchanged when no base path is configured", async () => {
    const { withBasePath } = await loadSite("");
    expect(withBasePath("/cv.pdf")).toBe("/cv.pdf");
  });

  it("prefixes the GitHub Pages sub-path", async () => {
    const { withBasePath } = await loadSite("/portfolio");
    expect(withBasePath("/cv.pdf")).toBe("/portfolio/cv.pdf");
    expect(withBasePath("cv.pdf")).toBe("/portfolio/cv.pdf");
  });
});

describe("absoluteUrl", () => {
  it("combines origin, base path and path without double slashes", async () => {
    const { absoluteUrl } = await loadSite("/portfolio", "https://juanxirp.github.io/");
    expect(absoluteUrl("/en/")).toBe("https://juanxirp.github.io/portfolio/en/");
    expect(absoluteUrl()).toBe("https://juanxirp.github.io/portfolio/");
  });
});
