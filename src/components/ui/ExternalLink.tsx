import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel"
> {
  href: string;
  children: ReactNode;
  /** Screen-reader hint appended to the link text, e.g. "opens in a new tab". */
  newTabLabel: string;
}

/**
 * Every outbound link goes through here so `rel="noopener noreferrer"` and the
 * new-tab announcement can never be forgotten.
 */
export function ExternalLink({
  href,
  children,
  newTabLabel,
  ...rest
}: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
