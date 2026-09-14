import { describe, expect, it } from "vitest";
import en from "../messages/en.json";
import es from "../messages/es.json";
import { format, getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

/** Flattens a JSON tree into dot-paths so two locales can be diffed precisely. */
function paths(value: Json, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => paths(item, `${prefix}[${index}]`));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      paths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function leaves(value: Json, prefix = ""): Array<[string, Json]> {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leaves(item, `${prefix}[${index}]`));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      leaves(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [[prefix, value]];
}

describe("message catalogues", () => {
  it("have exactly the same keys in every locale", () => {
    expect(paths(es).sort()).toEqual(paths(en).sort());
  });

  it("never contain empty strings", () => {
    for (const locale of locales) {
      const dictionary = getDictionary(locale) as unknown as Json;
      const empty = leaves(dictionary).filter(([, value]) => value === "");
      expect(empty, `empty values in ${locale}`).toEqual([]);
    }
  });

  it("use the same placeholders in every locale", () => {
    const placeholders = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort();
    const enLeaves = new Map(leaves(en));
    for (const [path, value] of leaves(es)) {
      const source = enLeaves.get(path);
      if (typeof value === "string" && typeof source === "string") {
        expect(placeholders(value), path).toEqual(placeholders(source));
      }
    }
  });
});

describe("format", () => {
  it("interpolates known placeholders and leaves unknown ones untouched", () => {
    expect(format("{hours} hours, {missing}", { hours: 18 })).toBe("18 hours, {missing}");
  });
});

describe("isLocale", () => {
  it("accepts supported locales only", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
