import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn className={cn("max-w-2xl", className)}>
      {eyebrow ? <p className="text-accent-text text-sm font-medium">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="text-muted mt-4 text-pretty">{description}</p> : null}
    </FadeIn>
  );
}
