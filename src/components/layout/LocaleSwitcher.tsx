import { type Locale, localeNames, locales } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/site";

interface LocaleSwitcherProps {
  current: Locale;
  label: string;
}

/**
 * Plain anchors, not `next/link`: switching language is a rare, whole-page
 * change, and a full load avoids client-side payload fetches that a static
 * host cannot serve. No client state is needed either way.
 */
export function LocaleSwitcher({ current, label }: LocaleSwitcherProps) {
  return (
    <nav aria-label={label}>
      <ul className="border-border bg-card flex overflow-hidden rounded-lg border text-xs font-semibold">
        {locales.map((locale) => {
          const isCurrent = locale === current;
          return (
            <li key={locale}>
              <a
                href={withBasePath(`/${locale}/`)}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={localeNames[locale]}
                className={cn(
                  "block px-2.5 py-2 uppercase transition-colors",
                  isCurrent
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {locale}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
