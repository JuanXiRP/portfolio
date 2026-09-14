import type { Locale } from "@/i18n/config";

const intlLocale: Record<Locale, string> = { en: "en-GB", es: "es-ES" };

/**
 * Formats an ISO month (`2026-02`) as `Feb 2026` / `feb 2026`. A bare year
 * (`2020`) stays a year: never invent precision the CV does not have.
 */
export function formatMonth(isoMonth: string, locale: Locale): string {
  const [year, month] = isoMonth.split("-").map(Number);
  if (!month) return String(year);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(intlLocale[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatRange(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  return `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : presentLabel}`;
}
