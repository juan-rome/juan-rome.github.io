"use client";

import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { AiLabSubsection } from "@/components/sections/ai-lab-section";
import { GadgetSpotlightCard } from "@/components/sections/gadget-spotlight-card";
import { gadgetItems } from "@/content/gadgets";

export function SideProjectsSection() {
  return (
    <Section id="side-projects" className="bg-background-elevated/40">
      <SectionHeading
        eyebrow="Side Projects"
        title="What I build on my own time"
        description="Some of these explore AI-assisted engineering workflows; others just solve a problem I actually had."
      />

      <div className="mt-14 space-y-16">
        <AiLabSubsection />

        <div>
          <FadeIn className="max-w-2xl">
            <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-[1.75rem]">
              Gadgets
            </h3>
            <p className="text-muted mt-3 text-pretty">
              Things I&apos;ve built for people to actually use, starting with Burrow, my
              first product.
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-4">
            {gadgetItems.map((item, index) => (
              <FadeIn key={item.slug} delay={index * 0.04}>
                <GadgetSpotlightCard item={item} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
