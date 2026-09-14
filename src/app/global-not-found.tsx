import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/data/profile";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { withBasePath } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `404 · ${profile.name}`,
  robots: { index: false, follow: false },
};

/**
 * Becomes `404.html`, which GitHub Pages serves for any unknown URL. It is
 * rendered outside every layout, so it cannot know the visitor's locale and
 * simply offers both languages.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh items-center justify-center p-6">
        <main className="flex max-w-md flex-col items-center gap-6 text-center">
          <p className="text-accent font-mono text-sm">404</p>
          {locales.map((locale) => {
            const { notFound } = getDictionary(locale);
            return (
              <section
                key={locale}
                lang={locale}
                className="flex flex-col items-center gap-2"
              >
                <h1 className="text-2xl font-bold tracking-tight">{notFound.title}</h1>
                <p className="text-muted-foreground">{notFound.text}</p>
                <a
                  href={withBasePath(`/${locale}/`)}
                  hrefLang={locale}
                  className="text-foreground font-medium underline underline-offset-4"
                >
                  {notFound.back}
                </a>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}
