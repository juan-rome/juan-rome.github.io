"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CarouselProps = {
  children: ReactNode;
  ariaLabel: string;
};

/**
 * A horizontally scrollable row with prev/next buttons that only appear
 * when the content actually overflows — on a viewport wide enough to fit
 * everything, this renders as a plain row with no controls. Native touch
 * swipe and trackpad scroll always work regardless; the buttons and
 * focus-then-arrow-keys are the pointer/keyboard affordance on top of that.
 */
export function Carousel({ children, ariaLabel }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateScrollState = () => {
      const overflow = el.scrollWidth > el.clientWidth + 1;
      setHasOverflow(overflow);
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, []);

  function scrollByPage(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    // Direct scrollLeft assignment rather than el.scrollBy(...) — both are
    // spec-standard, but this form is honored by the container's CSS
    // scroll-behavior: smooth just the same, and is the more universally
    // reliable of the two across environments.
    el.scrollLeft += direction * el.clientWidth * 0.9;
  }

  return (
    <div className="relative">
      {hasOverflow && (
        <div className="absolute top-0 right-0 -mt-12 flex gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="border-border-strong text-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-opacity disabled:cursor-default disabled:opacity-30"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="border-border-strong text-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-opacity disabled:cursor-default disabled:opacity-30"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      )}
      <div
        ref={scrollRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "flex snap-x snap-proximity gap-6 overflow-x-auto scroll-smooth pb-1",
          "focus-visible:outline-2 focus-visible:outline-offset-4"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn("h-4 w-4", direction === "left" && "rotate-180")}
      aria-hidden="true"
    >
      <path
        d="M7.5 4.5L13 10l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
