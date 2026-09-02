import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { expertiseGroups } from "@/content/expertise";

export function ExpertiseSection() {
  return (
    <Section id="expertise" className="bg-background-elevated/40">
      <SectionHeading
        eyebrow="Technical Expertise"
        title="Organized by what it builds, not what it's called"
        description="React is a tool. These are the capabilities it's been in service of."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {expertiseGroups.map((group, index) => (
          <FadeIn key={group.title} delay={index * 0.04}>
            <div className="border-border h-full rounded-2xl border p-6">
              <h3 className="font-semibold">{group.title}</h3>
              <p className="text-muted mt-2 text-sm text-pretty">{group.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-border-strong text-foreground/80 rounded-full border px-2.5 py-1 text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
