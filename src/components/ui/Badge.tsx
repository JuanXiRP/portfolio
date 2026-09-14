import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "neutral" | "accent" | "success";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  /** Renders a small status dot before the label (used for "available"). */
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border-border bg-muted text-muted-foreground",
  accent: "border-transparent bg-accent-soft text-accent",
  success: "border-transparent bg-success-soft text-success",
};

export function Badge({
  children,
  variant = "neutral",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
    >
      {dot ? (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      ) : null}
      {children}
    </span>
  );
}
