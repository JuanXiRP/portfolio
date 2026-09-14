"use client";

import { useEffect } from "react";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { withBasePath } from "@/lib/site";

/** Picks the first browser language we support, falling back to English. */
export function resolvePreferredLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.slice(0, 2).toLowerCase();
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function LocaleRedirect() {
  useEffect(() => {
    const locale = resolvePreferredLocale(navigator.languages ?? [navigator.language]);
    window.location.replace(withBasePath(`/${locale}/`));
  }, []);

  return null;
}
