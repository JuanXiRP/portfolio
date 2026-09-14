import { describe, expect, it } from "vitest";
import { resolvePreferredLocale } from "@/app/(root)/LocaleRedirect";

describe("resolvePreferredLocale", () => {
  it("matches region-qualified browser languages", () => {
    expect(resolvePreferredLocale(["es-ES", "en-GB"])).toBe("es");
    expect(resolvePreferredLocale(["nl-NL", "en-US"])).toBe("en");
  });

  it("falls back to English when nothing matches", () => {
    expect(resolvePreferredLocale(["nl", "de"])).toBe("en");
    expect(resolvePreferredLocale([])).toBe("en");
  });
});
