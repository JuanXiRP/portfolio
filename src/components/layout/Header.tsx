"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  locale: Locale;
  name: string;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
}

const sectionIds = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
] as const;

export function Header({ locale, name, nav, a11y }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const links = sectionIds.map((id) => (
    <li key={id}>
      <a
        href={`#${id}`}
        onClick={() => setOpen(false)}
        className="text-muted-foreground hover:bg-muted hover:text-foreground block rounded-md px-3 py-2 text-sm font-medium transition-colors"
      >
        {nav[id]}
      </a>
    </li>
  ));

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-semibold tracking-tight">
          {name}
        </a>

        <nav aria-label={a11y.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-1">{links}</ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher current={locale} label={a11y.switchLocale} />
          <ThemeToggle
            labels={{
              toggle: a11y.themeToggle,
              toLight: a11y.themeLight,
              toDark: a11y.themeDark,
            }}
          />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            className="border-border bg-card inline-flex size-9 items-center justify-center rounded-lg border md:hidden"
          >
            {open ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label={a11y.mainNav}
        className={cn("border-border border-t md:hidden", open ? "block" : "hidden")}
      >
        <Container className="py-2">
          <ul className="flex flex-col">{links}</ul>
        </Container>
      </nav>
    </header>
  );
}
