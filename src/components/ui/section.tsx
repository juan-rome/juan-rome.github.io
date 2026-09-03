import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  containerClassName?: string;
};

/** Consistent vertical rhythm + container wrapper for top-level page sections. */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("scroll-mt-20 py-20 sm:py-28", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
