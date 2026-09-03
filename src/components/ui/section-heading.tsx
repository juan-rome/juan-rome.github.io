import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  /** Every homepage section sits under the Hero's own <h1>, so this
   *  defaults to <h2>. A standalone page with no other heading above it
   *  (e.g. a tool page under /tools) needs level={1} instead, since a
   *  page must have exactly one real level-one heading. */
  level?: 1 | 2;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <FadeIn className={cn("max-w-2xl", className)}>
      {eyebrow ? <p className="text-accent-text text-sm font-medium">{eyebrow}</p> : null}
      <Heading className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </Heading>
      {description ? <p className="text-muted mt-4 text-pretty">{description}</p> : null}
    </FadeIn>
  );
}
