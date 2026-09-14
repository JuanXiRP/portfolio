import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { localeNames, locales } from "@/i18n/config";
import { withBasePath } from "@/lib/site";
import { LocaleRedirect } from "./LocaleRedirect";

export const metadata: Metadata = {
  title: profile.name,
  // The locale pages carry the canonical content; this one only redirects.
  robots: { index: false, follow: true },
};

/**
 * GitHub Pages cannot run server-side redirects, so `/` is a tiny static page
 * that picks the visitor's language in the browser and offers plain links as
 * a no-JavaScript fallback.
 */
export default function RootPage() {
  return (
    <main className="flex flex-col items-center gap-4 p-6 text-center">
      <LocaleRedirect />
      <h1 className="text-xl font-semibold">{profile.name}</h1>
      <ul className="flex gap-4">
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={withBasePath(`/${locale}/`)}
              hrefLang={locale}
              lang={locale}
              className="underline underline-offset-4"
            >
              {localeNames[locale]}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
