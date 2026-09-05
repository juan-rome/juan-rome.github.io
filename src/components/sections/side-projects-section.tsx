import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import {
  AiLabSubsection,
  AiLabSpotlightCard,
} from "@/components/sections/ai-lab-section";
import { gadgetItems } from "@/content/gadgets";

export function SideProjectsSection() {
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
              Small, everyday tools that aren&apos;t about AI tooling at all — just things
              I needed and built.
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gadgetItems.map((item, index) => (
              <FadeIn key={item.slug} delay={index * 0.04}>
                <AiLabSpotlightCard item={item} badge={item.platform} />
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
