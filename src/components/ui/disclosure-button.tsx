import { cn } from "@/lib/utils";

export const toggleButtonClass =
  "border-border-strong text-muted hover:text-foreground hover:bg-background-elevated flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-3 text-sm font-medium transition-colors";

export function Chevron({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      aria-hidden="true"
      className={cn(
        "text-muted-foreground transition-transform",
        flipped && "rotate-180"
      )}
    >
      <path
        d="M1 1L5.5 5.5L10 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
