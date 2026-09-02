import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { principles } from "@/content/philosophy";

export function PhilosophySection() {
  return (
    <Section id="philosophy">
      <SectionHeading
        eyebrow="Engineering Philosophy"
        title="A few things I actually believe, with evidence"
        description="Every one of these ties back to a specific decision above, not a value statement in the abstract."
      />
      <div className="divide-border border-border mt-14 divide-y border-t">
        {principles.map((principle, index) => (
          <FadeIn key={principle.title} delay={index * 0.03}>
            <div className="grid gap-2 py-6 sm:grid-cols-[1fr_2fr] sm:gap-8">
              <h3 className="text-foreground font-medium">{principle.title}</h3>
              <p className="text-muted text-pretty">{principle.description}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
