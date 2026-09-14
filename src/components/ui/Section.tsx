import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  subheading?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A landmark section with a consistent rhythm. The heading id is derived from
 * the section id so `aria-labelledby` always points to something that exists.
 */
export function Section({
  id,
  title,
  eyebrow,
  subheading,
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 py-16 sm:py-24", className)}
    >
      <Container>
        <header className="mb-10 max-w-2xl">
          {eyebrow ? (
            <p className="text-accent mb-2 font-mono text-xs font-medium tracking-widest uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 id={headingId} className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subheading ? <p className="text-muted-foreground mt-3">{subheading}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
