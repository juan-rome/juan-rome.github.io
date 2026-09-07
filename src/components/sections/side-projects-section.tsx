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

  useEffect(() => {
    const outers = outerRefs.current;
    const fronts = frontRefs.current;

    function equalize() {
      // Release every card's height first: each front face is absolutely
      // positioned (inset-0) and inherits its outer element's current
      // height, so reading scrollHeight without releasing it first just
      // echoes back whatever was already applied instead of each card's
      // real, possibly-shrunk content height.
      outers.forEach((outer) => {
        if (outer) outer.style.height = "auto";
      });

      const heights = fronts.map((front) => front?.scrollHeight ?? 0);
      const target = Math.max(...heights, 0);

      outers.forEach((outer) => {
        if (outer) outer.style.height = `${target}px`;
      });
    }

    // Deferred one frame: running this synchronously during mount raced
    // with the FadeIn wrappers' own mount-time viewport check (both fire
    // from a useEffect around the same moment), and setting a height
    // here was enough to make that check land on the wrong side for one
    // card, leaving it stuck at its pre-reveal opacity/scale. Waiting a
    // frame lets that check settle first.
    const raf = requestAnimationFrame(equalize);

    // Re-check once more after everything (fonts, the NodeFlow icons)
    // has finished loading, in case that changed either card's natural
    // height. Deliberately not a ResizeObserver on the fronts: equalize()
    // itself changes a front's rendered size by setting the outer's
    // height, so observing the fronts turns into a self-triggering
    // resize loop, which is what was actually behind the cards going
    // out of sync (the loop starves the page's other mount-time work,
    // including the scroll-reveal animation on one of the cards).
    window.addEventListener("load", equalize);

    // Still guard against mobile's resize-on-scroll (address bar
    // show/hide is a height-only change) causing the same jump-while-
    // scrolling bug the Experience section's equivalent cards had.
    let lastWidth = window.innerWidth;
    function handleResize() {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      equalize();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", equalize);
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
