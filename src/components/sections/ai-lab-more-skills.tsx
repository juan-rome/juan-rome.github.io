"use client";

import { useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { AiLabCompactCard } from "@/components/sections/ai-lab-section";
import type { AiLabItem } from "@/content/ai-lab";
import { cn } from "@/lib/utils";

const toggleClass =
  "border-border-strong text-muted hover:text-foreground hover:bg-background-elevated mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-3 text-sm font-medium transition-colors";

function Chevron({ flipped }: { flipped?: boolean }) {
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

/**
 * A client component specifically because the collapse control needs to
 * render *after* the revealed cards, not before them — a native
 * <details>/<summary> always puts its trigger first in the DOM, which read
 * wrong once the extra cards were actually visible on the live site. Two
 * real buttons instead, each positioned where it's meant to be seen, wired
 * to the same boolean state, with focus returned to the expand button on
 * collapse so keyboard/screen-reader users aren't stranded on a button
 * that just disappeared.
 */
export function AiLabMoreSkills({ items }: { items: AiLabItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const expandButtonRef = useRef<HTMLButtonElement>(null);

  if (!expanded) {
    return (
      <button
        ref={expandButtonRef}
        type="button"
        onClick={() => setExpanded(true)}
        aria-expanded={false}
        aria-controls="ai-lab-more-skills"
        className={toggleClass}
      >
        <span>+{items.length} more skills</span>
        <Chevron />
      </button>
    );
  }

  return (
    <>
      <div
        id="ai-lab-more-skills"
        className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
      >
        {items.map((item, index) => (
          <FadeIn key={item.slug} delay={index * 0.04}>
            <AiLabCompactCard item={item} />
          </FadeIn>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setExpanded(false);
          requestAnimationFrame(() => expandButtonRef.current?.focus());
        }}
        aria-expanded={true}
        aria-controls="ai-lab-more-skills"
        className={toggleClass}
      >
        <span>Show fewer skills</span>
        <Chevron flipped />
      </button>
    </>
  );
}
