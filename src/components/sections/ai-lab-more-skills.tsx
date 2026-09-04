"use client";

import { useRef, useState } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCollapse } from "@/components/ui/animated-collapse";
import { Chevron, toggleButtonClass } from "@/components/ui/disclosure-button";
import { AiLabCompactCard } from "@/components/sections/ai-lab-section";
import type { AiLabItem } from "@/content/ai-lab";
import { cn } from "@/lib/utils";

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

  return (
    <>
      {!expanded ? (
        <button
          ref={expandButtonRef}
          type="button"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          aria-controls="ai-lab-more-skills"
          className={cn(toggleButtonClass, "mt-3")}
        >
          <span>+{items.length} more skills</span>
          <Chevron />
        </button>
      ) : null}
      <AnimatedCollapse open={expanded} id="ai-lab-more-skills" className="mt-3">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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
          className={cn(toggleButtonClass, "mt-3")}
        >
          <span>Show fewer skills</span>
          <Chevron flipped />
        </button>
      </AnimatedCollapse>
    </>
  );
}
