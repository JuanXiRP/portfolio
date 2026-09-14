import type { ReactNode } from "react";
import "../globals.css";

/**
 * Second root layout, used only by the language-agnostic `/` entry point.
 * The real site lives under `/[locale]/` with its own root layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh items-center justify-center">{children}</body>
    </html>
  );
}
