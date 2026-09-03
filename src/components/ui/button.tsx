import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-foreground text-background hover:bg-foreground/90 px-5 py-2.5",
  secondary:
    "border border-border-strong text-foreground hover:border-foreground/40 px-5 py-2.5",
  ghost: "text-muted hover:text-foreground px-3 py-2",
} as const;

export type ButtonVariant = keyof typeof variants;

type ButtonAsButton = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  href?: undefined;
};

type ButtonAsLink = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Shared button/CTA styling for both real buttons and links. Renders link
 * variants as a plain <a> rather than next/link's Link — every current
 * href is a same-page hash anchor, mailto:, an external URL, or a static
 * file, none of which benefit from next/link's client-side route
 * transitions on this single-route site.
 */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const styles = cn(baseStyles, variants[variant], className);

  if (props.href !== undefined) {
    return <a {...(props as ButtonAsLink)} className={styles} />;
  }

  return <button {...(props as ButtonAsButton)} className={styles} />;
}
