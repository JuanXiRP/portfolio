import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ExternalLink } from "./ExternalLink";

type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  secondary: "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cn(base, variantClasses[variant], className);
}

interface ButtonLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel"
> {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** Set to the "opens in a new tab" label to render as an outbound link. */
  external?: string;
}

/** Links styled as buttons: CTAs on a static site are navigations, not actions. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);

  if (external) {
    return (
      <ExternalLink href={href} newTabLabel={external} className={classes} {...rest}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
