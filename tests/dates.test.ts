import { describe, expect, it } from "vitest";
import { formatMonth, formatRange } from "@/lib/dates";

describe("formatMonth", () => {
  it("formats an ISO month per locale", () => {
    expect(formatMonth("2026-02", "en")).toBe("Feb 2026");
    expect(formatMonth("2026-02", "es").toLowerCase()).toContain("feb");
  });

  it("keeps bare years as years", () => {
    expect(formatMonth("2020", "en")).toBe("2020");
    expect(formatRange("2020", "2026", "es", "Actualidad")).toBe("2020 – 2026");
  });
});

describe("formatRange", () => {
  it("renders closed and open ranges", () => {
    expect(formatRange("2026-02", "2026-07", "en", "Present")).toBe(
      "Feb 2026 – Jul 2026",
    );
    expect(formatRange("2026-02", null, "en", "Present")).toBe("Feb 2026 – Present");
  });
});
