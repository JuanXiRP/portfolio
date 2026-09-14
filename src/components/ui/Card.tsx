import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "div" | "article" | "li";
}

/** Bordered surface. Extra attributes (ids, aria-*) are forwarded to the element. */
export function Card({ children, className, as: Tag = "div", ...rest }: CardProps) {
  return (
    <Tag
      className={cn("border-border bg-card rounded-2xl border p-6 shadow-sm", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
