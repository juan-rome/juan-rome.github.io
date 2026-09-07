"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getOverallPeriod, type Experience } from "@/content/experience";

function hexToRgb(hex: string) {
  const value = parseInt(hex.replace("#", ""), 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

function CycleIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M4 4v5h5M20 20v-5h-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TagList({
  entry,
  expanded,
  onToggle,
}: {
  entry: Experience;
  expanded: boolean;
  onToggle: () => void;
}) {
  const visible = entry.stack.slice(0, entry.visibleTagCount);
  const hidden = entry.stack.slice(entry.visibleTagCount);
  return (
    <div className="mt-4 flex flex-wrap gap-2 pt-0">
      {visible.map((tag) => (
        <span
          key={tag}
          className="border-border-strong text-muted rounded-full border px-2.5 py-1 text-xs"
        >
          {tag}
        </span>
      ))}
      {expanded
        ? hidden.map((tag) => (
            <span
              key={tag}
              className="border-border-strong text-muted rounded-full border px-2.5 py-1 text-xs"
            >
              {tag}
            </span>
          ))
        : null}
      {hidden.length > 0 ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="border-border-strong text-accent-text hover:bg-background hover:text-foreground cursor-pointer rounded-full border border-dashed px-2.5 py-1 text-xs font-medium transition-colors"
        >
          {expanded ? "Show less" : `+${hidden.length} more`}
        </button>
      ) : null}
    </div>
  );
}

/**
 * A company card that flips in place: the front shows the badge, titles,
 * summary, and a truncated tag list; a click flips it to the full
 * highlights list (word for word what's in the resume-derived data),
 * which scrolls internally rather than stretching the card to match. Also
 * tilts toward the pointer and carries a company-tinted corner sheen —
 * both skipped under reduced motion.
 */
export function TimelineFlipCard({
  entry,
  isCurrent,
}: {
  entry: Experience;
  isCurrent: boolean;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const rgb = hexToRgb(entry.accent);
  const borderColor = `rgba(${rgb}, 0.35)`;

  useEffect(() => {
    const outer = outerRef.current;
    const front = frontRef.current;
    if (!outer || !front) return;

    function measure() {
      // The front face is absolutely positioned (inset-0) and inherits the
      // outer element's current height, so reading scrollHeight without
      // releasing that height first just echoes back whatever was already
      // applied instead of the content's real, possibly-shrunk size.
      outer!.style.height = "auto";
      outer!.style.height = `${front!.scrollHeight}px`;
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [tagsExpanded]);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer || shouldReduceMotion) return;

    function handleMove(e: PointerEvent) {
      const rect = outer!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * 6;
      const rotX = (0.5 - py) * 6;
      outer!.style.transform = `perspective(1400px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
    }
    function handleLeave() {
      outer!.style.transform = "";
    }
    outer.addEventListener("pointermove", handleMove);
    outer.addEventListener("pointerleave", handleLeave);
    return () => {
      outer.removeEventListener("pointermove", handleMove);
      outer.removeEventListener("pointerleave", handleLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="flex flex-col items-center">
      <div className="border-border-strong bg-background-elevated text-muted rounded-full border px-4 py-1.5 text-sm">
        {getOverallPeriod(entry.titles)}
      </div>
      <div className="bg-border-strong my-0.5 h-8 w-px" />
      <div
        className={cn(
          "mb-2 h-2.5 w-2.5 shrink-0 rounded-full",
          isCurrent ? "relative bg-emerald-400" : "bg-border-strong"
        )}
        style={isCurrent ? { boxShadow: "0 0 0 4px rgba(52,211,153,0.18)" } : undefined}
      >
        {isCurrent ? (
          <span className="absolute -inset-[5px] animate-[pulse-ring_2.2s_ease-out_infinite] rounded-full border border-emerald-400" />
        ) : null}
      </div>
      <div
        ref={outerRef}
        data-flipped={flipped}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          setFlipped((f) => !f);
        }}
        className="relative w-full cursor-pointer transition-transform duration-500 ease-out will-change-transform [perspective:1600px]"
      >
        <div
          className="relative h-full transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
        >
          {/* Front */}
          <div
            ref={frontRef}
            className="bg-background-elevated timeline-flip-face absolute inset-0 flex flex-col rounded-2xl border p-6"
            style={{ borderColor, ["--tilt-color" as string]: entry.accent }}
          >
            <div className="flex items-start gap-3">
              <div
                className="h-11 w-11 shrink-0 overflow-hidden rounded-xl"
                style={{ background: entry.logoBackground }}
              >
                <img
                  src={entry.logo}
                  alt={`${entry.company} logo`}
                  className="h-full w-full"
                  style={{ objectFit: entry.logoFit ?? "cover" }}
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {entry.company}
                  {isCurrent ? (
                    <span className="ml-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 align-text-top text-[0.62rem] font-bold tracking-wide text-emerald-400 uppercase">
                      Current
                    </span>
                  ) : null}
                </h3>
                <div className="mt-0.5 grid gap-0.5">
                  {entry.titles.map((title) => (
                    <p key={title.role} className="text-muted text-sm leading-tight">
                      {title.role}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-muted mt-4 text-sm text-pretty">{entry.summary}</p>
            <p className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs">
              <CycleIcon />
              Click to see all {entry.highlights.length} highlights
            </p>
            <TagList
              entry={entry}
              expanded={tagsExpanded}
              onToggle={() => setTagsExpanded((v) => !v)}
            />
          </div>

          {/* Back */}
          <div
            className="bg-background-elevated timeline-flip-face timeline-flip-face--back absolute inset-0 flex flex-col rounded-2xl border p-6"
            style={{ borderColor, ["--tilt-color" as string]: entry.accent }}
          >
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-accent-text text-[0.68rem] font-bold tracking-wide uppercase">
                Highlights
              </h4>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <CycleIcon />
                Back to summary
              </p>
            </div>
            <ul className="highlights-scroll mt-4 grid list-none gap-2.5 p-0">
              {entry.highlights.map((highlight) => (
                <li key={highlight} className="text-muted relative pl-4 text-[0.83rem]">
                  <span className="bg-accent-text absolute top-[0.5em] left-0 h-1 w-1 rounded-full" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
