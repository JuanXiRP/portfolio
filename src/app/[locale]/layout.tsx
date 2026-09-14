import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { profile } from "@/data/profile";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl, siteUrl, withBasePath } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const openGraphLocale: Record<Locale, string> = { en: "en_GB", es: "es_ES" };

/** Every locale becomes a fully static page at build time; nothing else is served. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { meta } = getDictionary(locale);
  const languages = Object.fromEntries(locales.map((l) => [l, absoluteUrl(`/${l}/`)]));

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    authors: [{ name: profile.name, url: profile.links.github }],
    creator: profile.name,
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
      languages: { ...languages, "x-default": absoluteUrl("/en/") },
    },
    openGraph: {
      type: "profile",
      locale: openGraphLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => openGraphLocale[l]),
      url: absoluteUrl(`/${locale}/`),
      siteName: profile.name,
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: absoluteUrl(profile.assets.ogImage),
          width: 1200,
          height: 630,
          alt: meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [absoluteUrl(profile.assets.ogImage)],
    },
    icons: {
      icon: [
        { url: withBasePath("/icon.svg"), type: "image/svg+xml" },
        { url: withBasePath("/favicon.ico"), sizes: "any" },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    // `suppressHydrationWarning` is required by next-themes, which sets the
    // theme class on <html> before React hydrates.
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <SkipLink label={dictionary.a11y.skipToContent} />
          <Header
            locale={locale}
            name={profile.name}
            nav={dictionary.nav}
            a11y={dictionary.a11y}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer footer={dictionary.footer} a11y={dictionary.a11y} />
        </ThemeProvider>
      </body>
    </html>
  );
}
