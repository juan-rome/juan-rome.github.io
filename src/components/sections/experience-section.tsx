import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { TimelineFlipCard } from "@/components/ui/timeline-flip-card";
import { experience } from "@/content/experience";

export function ExperienceSection() {
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
            <TimelineFlipCard entry={entry} isCurrent={index === 0} />
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
