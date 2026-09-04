import { cn } from "@/lib/utils";

/** A small "live" indicator: a solid dot with an expanding, fading ring
 *  around it. The ring's size is independent of the dot so the pulse can
 *  reach further without growing the dot itself. It's decorative motion
 *  only, so it's hidden under reduced motion rather than left animating. */
export function PulsingDot({
  className,
  colorClassName = "bg-emerald-400",
  glowClassName = "shadow-[0_0_8px_rgba(52,211,153,0.8)]",
  ringSizeClassName = "h-full w-full",
}: {
  className?: string;
  colorClassName?: string;
  glowClassName?: string;
  ringSizeClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex h-1.5 w-1.5", className)}
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-75 motion-reduce:hidden",
          colorClassName,
          ringSizeClassName
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-1.5 w-1.5 rounded-full",
          colorClassName,
          glowClassName
        )}
      />
    </span>
  );
}
