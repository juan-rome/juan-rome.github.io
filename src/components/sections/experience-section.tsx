"use client";

import { useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCollapse } from "@/components/ui/animated-collapse";
import { Chevron, toggleButtonClass } from "@/components/ui/disclosure-button";
import { experience, type Experience } from "@/content/experience";
import { cn } from "@/lib/utils";

/** How many of the current role's highlights/tags show before disclosure —
 *  only the current role accumulates enough of either to need this; past
 *  roles are already collapsed behind their own "Show role details". */
const VISIBLE_HIGHLIGHT_COUNT = 5;
const VISIBLE_TAG_COUNT = 9;

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tech) => (
        <span
          key={tech}
          className="border-border text-muted rounded-full border px-2.5 py-1 text-xs"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function HighlightList({ highlights }: { highlights: string[] }) {
  return (
    <ul className="space-y-3">
      {highlights.map((highlight) => (
        <li
          key={highlight}
          className="text-muted-foreground flex gap-3 text-sm text-pretty"
        >
          <span className="bg-muted mt-2 h-1 w-1 shrink-0 rounded-full" />
          <span className="text-foreground/80">{highlight}</span>
        </li>
      ))}
    </ul>
  );
}

function CurrentRoleCard({ entry }: { entry: Experience }) {
  const [bulletsOpen, setBulletsOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const bulletsExpandRef = useRef<HTMLButtonElement>(null);

  const visibleHighlights = entry.highlights.slice(0, VISIBLE_HIGHLIGHT_COUNT);
  const hiddenHighlights = entry.highlights.slice(VISIBLE_HIGHLIGHT_COUNT);
  const visibleTags = entry.stack.slice(0, VISIBLE_TAG_COUNT);
  const hiddenTags = entry.stack.slice(VISIBLE_TAG_COUNT);

  return (
    <div className="border-border rounded-2xl border p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">
          {entry.company}
          <span className="ml-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 align-middle text-[0.65rem] font-bold tracking-wide text-emerald-400 uppercase">
            Current
          </span>
        </h3>
        <div className="text-muted-foreground text-left text-sm sm:text-right">
          {entry.titles.map((title) => (
            <div key={`${title.role}-${title.period}`}>
              {title.role} — {title.period}
            </div>
          ))}
        </div>
      </div>
      <p className="text-foreground/90 mt-4 text-pretty">{entry.summary}</p>

      <div className="mt-5">
        <HighlightList highlights={visibleHighlights} />
      </div>
      {hiddenHighlights.length > 0 ? (
        <>
          {!bulletsOpen ? (
            <button
              ref={bulletsExpandRef}
              type="button"
              onClick={() => setBulletsOpen(true)}
              aria-expanded={false}
              aria-controls="earnest-more-highlights"
              className={cn(toggleButtonClass, "mt-4")}
            >
              <span>+{hiddenHighlights.length} more highlights</span>
              <Chevron />
            </button>
          ) : null}
          <AnimatedCollapse
            open={bulletsOpen}
            id="earnest-more-highlights"
            className="mt-4"
          >
            <HighlightList highlights={hiddenHighlights} />
            <button
              type="button"
              onClick={() => {
                setBulletsOpen(false);
                requestAnimationFrame(() => bulletsExpandRef.current?.focus());
              }}
              aria-expanded={true}
              aria-controls="earnest-more-highlights"
              className={cn(toggleButtonClass, "mt-4")}
            >
              <span>Show fewer highlights</span>
              <Chevron flipped />
            </button>
          </AnimatedCollapse>
        </>
      ) : null}

      <div className="mt-5 flex flex-wrap items-start gap-2">
        <TagList tags={visibleTags} />
        {hiddenTags.length > 0 ? (
          <>
            <AnimatedCollapse open={tagsOpen} className="basis-full">
              <div className="pt-2">
                <TagList tags={hiddenTags} />
              </div>
            </AnimatedCollapse>
            <button
              type="button"
              onClick={() => setTagsOpen((open) => !open)}
              aria-expanded={tagsOpen}
              className="border-border-strong text-accent-text hover:bg-background-elevated hover:text-foreground cursor-pointer rounded-full border border-dashed px-2.5 py-1 text-xs font-medium transition-colors"
            >
              {tagsOpen ? "Show less" : `+${hiddenTags.length} more`}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

function PastRoleCard({ entry }: { entry: Experience }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const expandRef = useRef<HTMLButtonElement>(null);
  const detailId = `${entry.company}-detail`.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="border-border rounded-2xl border p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">{entry.company}</h3>
        <div className="text-muted-foreground text-left text-sm sm:text-right">
          {entry.titles.map((title) => (
            <div key={`${title.role}-${title.period}`}>
              {title.role} — {title.period}
            </div>
          ))}
        </div>
      </div>

      {!detailOpen ? (
        <button
          ref={expandRef}
          type="button"
          onClick={() => setDetailOpen(true)}
          aria-expanded={false}
          aria-controls={detailId}
          className={cn(toggleButtonClass, "mt-4")}
        >
          <span>Show role details</span>
          <Chevron />
        </button>
      ) : null}
      <AnimatedCollapse open={detailOpen} id={detailId} className="mt-4">
        <p className="text-foreground/90 text-pretty">{entry.summary}</p>
        <div className="mt-5">
          <HighlightList highlights={entry.highlights} />
        </div>
        <div className="mt-5">
          <TagList tags={entry.stack} />
        </div>
        <button
          type="button"
          onClick={() => {
            setDetailOpen(false);
            requestAnimationFrame(() => expandRef.current?.focus());
          }}
          aria-expanded={true}
          aria-controls={detailId}
          className={cn(toggleButtonClass, "mt-5")}
        >
          <span>Show less</span>
          <Chevron flipped />
        </button>
      </AnimatedCollapse>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Eight years, three companies, one thread"
        description="Full-stack generalist to front-end architect to the engineer who owns experimentation infrastructure: each role built directly on the last."
      />
      <div className="mt-14 space-y-4">
        {experience.map((entry, index) => (
          <FadeIn key={`${entry.company}-${entry.titles[0].period}`} delay={index * 0.05}>
            {index === 0 ? (
              <CurrentRoleCard entry={entry} />
            ) : (
              <PastRoleCard entry={entry} />
            )}
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
