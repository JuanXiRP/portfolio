import en from "../../messages/en.json";
import es from "../../messages/es.json";
import type { Locale } from "./config";

/**
 * English is the source of truth for the message shape. Every other locale
 * must satisfy this type, so a missing key fails `tsc`, not production.
 */
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Minimal `{placeholder}` interpolation for the handful of messages that need
 * it. Keeps the site dependency-free while staying explicit about what a
 * message expects.
 */
export function format(message: string, values: Record<string, string | number>): string {
  return message.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
