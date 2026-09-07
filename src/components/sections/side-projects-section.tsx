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
      const target = Math.max(...heights, 0);

      outers.forEach((outer) => {
        if (outer) outer.style.height = `${target}px`;
      });
    }

    equalize();

    // Only re-run on an actual width change: mobile browsers fire resize
    // events as the address bar shows/hides during scroll (a height-only
    // change), and re-measuring on every one of those made the page jump
    // around mid-scroll on the Experience section's equivalent cards.
    let lastWidth = window.innerWidth;
    function handleResize() {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      equalize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
