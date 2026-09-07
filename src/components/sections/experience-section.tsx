"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { TimelineFlipCard } from "@/components/ui/timeline-flip-card";
import { experience } from "@/content/experience";

/** Matches the grid's lg:grid-cols-3 breakpoint below — only equalize card
 *  heights when the cards are actually side by side; the mobile stack sizes
 *  each card to its own content instead. */
const DESKTOP_QUERY = "(min-width: 1024px)";

export function ExperienceSection() {
  const frontRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>(() => experience.map(() => false));
  const [tagsExpanded, setTagsExpanded] = useState<boolean[]>(() =>
    experience.map(() => false)
  );

  useEffect(() => {
    function equalize() {
      const outers = outerRefs.current;
      const fronts = frontRefs.current;

      // Release every card's height first: each front face is absolutely
      // positioned (inset-0) and inherits its outer element's current
      // height, so reading scrollHeight without releasing it first just
      // echoes back whatever was already applied instead of each card's
      // real, possibly-shrunk content height.
      outers.forEach((outer) => {
        if (outer) outer.style.height = "auto";
      });

      const heights = fronts.map((front) => front?.scrollHeight ?? 0);
      const isDesktop = window.matchMedia(DESKTOP_QUERY).matches;
      const target = isDesktop ? Math.max(...heights, 0) : null;

      outers.forEach((outer, i) => {
        if (!outer) return;
        outer.style.height = `${target ?? heights[i]}px`;
      });
    }

    equalize();

    // Only re-run on an actual width change. Mobile browsers fire resize
    // events as the address bar shows/hides during scroll (a height-only
    // change); re-measuring on every one of those reset every card's
    // height to auto mid-scroll, which is what was causing the page to
    // visibly jump around while scrolling past this section.
    let lastWidth = window.innerWidth;
    function handleResize() {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      equalize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tagsExpanded]);

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Eight years, three companies, one thread"
        description="Full-stack generalist to front-end architect to the engineer who owns experimentation infrastructure: each role built directly on the last. Click a card to see its full highlights."
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:items-start lg:gap-7">
        {experience.map((entry, index) => (
          <FadeIn key={entry.company} delay={index * 0.05}>
            <TimelineFlipCard
              entry={entry}
              isCurrent={index === 0}
              flipped={flipped[index]}
              onToggleFlip={() =>
                setFlipped((prev) => prev.map((v, i) => (i === index ? !v : v)))
              }
              tagsExpanded={tagsExpanded[index]}
              onToggleTags={() =>
                setTagsExpanded((prev) => prev.map((v, i) => (i === index ? !v : v)))
              }
              frontRef={(el) => {
                frontRefs.current[index] = el;
              }}
              outerRef={(el) => {
                outerRefs.current[index] = el;
              }}
            />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
