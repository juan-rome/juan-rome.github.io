"use client";

import { useState } from "react";
import { PulsingDot } from "@/components/ui/pulsing-dot";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { NodeFlow } from "@/components/ui/node-flow";
import type { GadgetItem } from "@/content/gadgets";

function CarouselIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DemoBack({ item }: { item: GadgetItem }) {
  const media = item.demoMedia;
  const [index, setIndex] = useState(0);

  if (!media) return null;

  if (media.type === "video") {
    return (
      <video
        src={media.src}
        className="h-full w-full flex-1 rounded-lg object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  const current = media.items[index];
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <img
        src={current.src}
        alt={`${current.label} character, working state`}
        className="w-full max-w-[220px] rounded-lg"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i - 1 + media.items.length) % media.items.length);
          }}
          aria-label="Previous character"
          className="text-muted hover:text-foreground cursor-pointer p-1"
        >
          <CarouselIcon direction="prev" />
        </button>
        <span className="text-muted w-16 text-center text-xs">{current.label}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i + 1) % media.items.length);
          }}
          aria-label="Next character"
          className="text-muted hover:text-foreground cursor-pointer p-1"
        >
          <CarouselIcon direction="next" />
        </button>
      </div>
    </div>
  );
}

/** A text + node-flow card for Gadgets: the tool's real pipeline as a small
 *  animated diagram in place of a screenshot, then the pitch below. A
 *  button flips the card to a real demo (a looping video, or a character
 *  carousel for Sidekick) instead of navigating away. Kept separate from
 *  AiLabSpotlightCard/AiLabCompactCard since Gadgets aren't AI tooling and
 *  want their own visual identity, not AI Lab's category pill language,
 *  though it shares the same tilt-and-glow treatment. */
export function GadgetSpotlightCard({
  item,
  flipped,
  onToggleFlip,
  frontRef,
  outerRef,
}: {
  item: GadgetItem;
  flipped: boolean;
  onToggleFlip: () => void;
  frontRef: (el: HTMLDivElement | null) => void;
  outerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={outerRef} className="relative w-full [perspective:1600px]">
      <TiltCard
        glowColor="#60a5fa"
        className="overflow-hidden rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-400/[0.06] to-transparent"
      >
        <div
          className="relative h-full transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d]"
          style={{ transform: flipped ? "rotateY(180deg)" : undefined }}
        >
          {/* Front */}
          <div
            ref={frontRef}
            className="absolute inset-0 flex flex-col rounded-xl p-4 [backface-visibility:hidden]"
          >
            <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-blue-400 uppercase">
              <PulsingDot
                colorClassName="bg-blue-400"
                glowClassName="shadow-[0_0_8px_rgba(96,165,250,0.8)]"
              />
              {item.spotlightLabel}
            </p>
            <h5 className="mt-1.5 text-sm font-semibold">{item.title}</h5>
            <p className="text-muted mt-1.5 text-[0.79rem] text-pretty">{item.summary}</p>

            {item.nodeFlow ? <NodeFlow steps={item.nodeFlow} color="#60a5fa" /> : null}

            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto flex gap-3 pt-3">
              {item.githubUrl ? (
                <Button
                  href={item.githubUrl}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-3 py-2 text-xs"
                >
                  View source
                </Button>
              ) : null}
              {item.demoUrl ? (
                <Button
                  href={item.demoUrl}
                  variant="primary"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-3 py-2 text-xs"
                >
                  {item.demoLabel ?? "See it in action"}
                </Button>
              ) : null}
            </div>
            {item.demoMedia ? (
              <Button
                type="button"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFlip();
                }}
                className="mt-2 w-full cursor-pointer justify-center px-3 py-2 text-xs"
              >
                Watch a live demo
              </Button>
            ) : null}
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col rounded-xl p-4 [backface-visibility:hidden]">
            <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-blue-400 uppercase">
              {item.title}
            </p>
            <DemoBack item={item} />
            <Button
              type="button"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFlip();
              }}
              className="mt-2 w-full cursor-pointer justify-center px-3 py-2 text-xs"
            >
              Back to overview
            </Button>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
