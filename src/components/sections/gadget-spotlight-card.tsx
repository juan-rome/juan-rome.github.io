"use client";

import { useRef, useState } from "react";
import { PulsingDot } from "@/components/ui/pulsing-dot";
import { Button } from "@/components/ui/button";
import type { GadgetItem } from "@/content/gadgets";

function MenuBarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="5.3"
        y="3.8"
        width="13.4"
        height="16.8"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect x="9.6" y="1.2" width="4.8" height="3.6" rx="0.7" fill="currentColor" />
      <circle cx="9.1" cy="10.6" r="1" fill="currentColor" />
      <circle cx="14.9" cy="10.6" r="1" fill="currentColor" />
      <path
        d="M8.6 14.4 12 17.3 15.4 14.4"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A device-mockup + text card for Gadgets: a real screenshot of the app on
 *  top, centered rather than stretched full-width since it's a narrow,
 *  portrait popover mockup, with a toggle to flip to the actual Slack
 *  result, and the pitch below. Kept separate from
 *  AiLabSpotlightCard/AiLabCompactCard since Gadgets aren't AI tooling and
 *  want their own visual identity, not AI Lab's category pill language. */
export function GadgetSpotlightCard({ item }: { item: GadgetItem }) {
  const [showResult, setShowResult] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function toggle() {
    setShowResult((current) => {
      const next = !current;
      const video = videoRef.current;
      if (video) {
        if (next) {
          video.pause();
        } else {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }
      return next;
    });
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-400/[0.06] to-transparent p-4 sm:flex-row">
      <div className="mx-auto hidden w-80 shrink-0 sm:mx-0 sm:block">
        <div className="border-border bg-background-elevated relative overflow-hidden rounded-lg border">
          <video
            ref={videoRef}
            src={item.media.demoVideoSrc}
            poster={item.media.demoPoster.src}
            className={showResult ? "hidden" : "block w-full"}
            autoPlay
            muted
            loop
            playsInline
          />
          <img
            src={item.media.slackResult.src}
            alt={item.media.slackResult.alt}
            className={showResult ? "block w-full" : "hidden"}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={
              showResult ? "Back to the app demo" : "Show the resulting Slack message"
            }
            className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/65 text-base leading-none text-white opacity-80 transition-opacity hover:opacity-100"
          >
            {showResult ? "‹" : "›"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 sm:pl-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-400/15 text-blue-300">
              <MenuBarIcon />
            </span>
            <h5 className="text-sm font-semibold">{item.title}</h5>
          </div>
          <span className="rounded-full border border-blue-400/30 bg-blue-400/15 px-2 py-0.5 text-[0.62rem] font-medium text-blue-300">
            {item.platform}
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-blue-400 uppercase">
          <PulsingDot
            colorClassName="bg-blue-400"
            glowClassName="shadow-[0_0_8px_rgba(96,165,250,0.8)]"
          />
          {item.spotlightLabel}
        </p>

        <p className="text-muted text-[0.8rem] text-pretty">{item.summary}</p>

        <ul className="hidden flex-col gap-2 pt-1 sm:flex">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="text-muted flex items-start gap-2 text-[0.8rem]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 shrink-0 text-blue-400"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
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
        </div>
      </div>
    </div>
  );
}

/** Sits below the real Gadgets so the list doesn't just trail off after one
 *  entry; swap this out (or add more real cards above it) as more gadgets
 *  ship. */
export function GadgetComingSoonCard() {
  return (
    <div className="border-border/60 flex flex-row items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center">
      <span className="border-border-strong text-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed text-base">
        +
      </span>
      <p className="text-muted text-sm">More gadgets coming soon</p>
    </div>
  );
}
