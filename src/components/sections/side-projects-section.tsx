"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { AiLabSubsection } from "@/components/sections/ai-lab-section";
import { GadgetSpotlightCard } from "@/components/sections/gadget-spotlight-card";
import { gadgetItems } from "@/content/gadgets";

export function SideProjectsSection() {
  const frontRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>(() => gadgetItems.map(() => false));
  const flippedRef = useRef(flipped);
  const applyHeightsRef = useRef<() => void>(() => {});

  // Re-run the sizing whenever a card flips, but only the cheap re-apply
  // below, never the full measure-from-scratch pass: measuring requires
  // releasing every outer's height first (see measure()'s own comment),
  // and doing that while the corner button you just clicked still has
  // focus made the browser think the focused button had jumped off
  // screen mid-collapse, so it force-scrolled the page to pull it back
  // into view the moment the height was restored, landing on whatever
  // section happened to be at the top of the viewport at that height.
  useEffect(() => {
    flippedRef.current = flipped;
    applyHeightsRef.current();
  }, [flipped]);

  useEffect(() => {
    const outers = outerRefs.current;
    const fronts = frontRefs.current;
    let lastHeights: number[] = [];

    // Applies the last-measured heights plus the current flip state,
    // without touching any outer's height beforehand. Safe to call from
    // anywhere (including while a card's own corner button has focus)
    // since it never collapses a card on the way to resizing it.
    function applyHeights() {
      const target = Math.max(...lastHeights, 0) + 8;
      // A flipped card shows its demo (a looping video, or a character
      // carousel) instead of the summary text, and that demo reads
      // better with some breathing room below it than stretched flush
      // to the card's own edge, so give whichever card is currently
      // flipped extra height on top of what the two cards would
      // otherwise share equally. Desktop only (matches the grid's own
      // sm breakpoint, where the cards sit side by side): growing the
      // page's total height on flip is exactly the kind of change that
      // can make a mobile browser resize its own toolbar mid-interaction
      // and jump the scroll position to compensate, which is what the
      // extra height on a flipped card, on a narrow viewport, looked like.
      const isTwoColumn = window.innerWidth >= 640;
      outers.forEach((outer, i) => {
        if (!outer) return;
        const extra = isTwoColumn && flippedRef.current[i] ? 56 : 0;
        outer.style.height = `${target + extra}px`;
      });
    }

    applyHeightsRef.current = applyHeights;

    function measure() {
      // Release every card's height first: each front face is absolutely
      // positioned (inset-0) and inherits its outer element's current
      // height, so reading scrollHeight without releasing it first just
      // echoes back whatever was already applied instead of each card's
      // real, possibly-shrunk content height.
      outers.forEach((outer) => {
        if (outer) outer.style.height = "auto";
      });

      // scrollHeight is measured on the front face while it's absolutely
      // positioned inside a momentarily height:auto ancestor, and that
      // read comes out a couple of pixels short of what the same content
      // actually needs once laid out normally, so the tallest card's own
      // CTA row was clipped by the card's rounded corner with zero slack
      // to round out. A small fixed buffer (in applyHeights) absorbs
      // that gap for whichever card ends up tallest, on top of the real
      // slack shorter cards get.
      lastHeights = fronts.map((front) => front?.scrollHeight ?? 0);
      applyHeights();
    }

    // Deferred one frame: running this synchronously during mount raced
    // with the FadeIn wrappers' own mount-time viewport check (both fire
    // from a useEffect around the same moment), and setting a height
    // here was enough to make that check land on the wrong side for one
    // card, leaving it stuck at its pre-reveal opacity/scale. Waiting a
    // frame lets that check settle first.
    const raf = requestAnimationFrame(measure);

    // Re-check once more after everything (fonts, the NodeFlow icons)
    // has finished loading, in case that changed either card's natural
    // height. Deliberately not a ResizeObserver on the fronts: measure()
    // itself changes a front's rendered size by setting the outer's
    // height, so observing the fronts turns into a self-triggering
    // resize loop, which is what was actually behind the cards going
    // out of sync (the loop starves the page's other mount-time work,
    // including the scroll-reveal animation on one of the cards).
    window.addEventListener("load", measure);

    // Still guard against mobile's resize-on-scroll (address bar
    // show/hide is a height-only change) causing the same jump-while-
    // scrolling bug the Experience section's equivalent cards had.
    let lastWidth = window.innerWidth;
    function handleResize() {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      measure();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Section id="side-projects" className="bg-background-elevated/40">
      <SectionHeading
        eyebrow="Side Projects"
        title="What I build on my own time"
        description="Some of these explore AI-assisted engineering workflows; others just solve a problem I actually had. All of them ship with a public repo you can run yourself."
      />

      <div className="mt-14 space-y-16">
        <AiLabSubsection />

        <div>
          <FadeIn className="max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-[1.75rem]">
              Gadgets
            </h3>
            <p className="text-muted mt-3 text-pretty">
              Small, everyday tools that aren&apos;t about AI tooling at all, just things
              that came from ideas and curiosity and got built.
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gadgetItems.map((item, index) => (
              <FadeIn key={item.slug} delay={index * 0.04}>
                <GadgetSpotlightCard
                  item={item}
                  flipped={flipped[index]}
                  onToggleFlip={() =>
                    setFlipped((prev) => prev.map((v, i) => (i === index ? !v : v)))
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
        </div>
      </div>
    </Section>
  );
}
