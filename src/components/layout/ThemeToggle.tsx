"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

interface ThemeToggleProps {
  labels: {
    toggle: string;
    toLight: string;
    toDark: string;
  };
}

const subscribeNoop = () => () => {};

/**
 * `true` once React has hydrated on the client, `false` during SSR and the
 * hydration pass. Lets the icon depend on the resolved theme without a
 * server/client mismatch and without setting state inside an effect.
 */
function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const isDark = hydrated && resolvedTheme === "dark";
  const label = !hydrated ? labels.toggle : isDark ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="border-border bg-card text-foreground hover:bg-muted inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
    >
      {hydrated ? (
        isDark ? (
          <Sun className="size-4" aria-hidden="true" />
        ) : (
          <Moon className="size-4" aria-hidden="true" />
        )
      ) : (
        <span className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
