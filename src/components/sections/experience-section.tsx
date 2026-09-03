import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { experience } from "@/content/experience";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Eight years, three companies, one thread"
        description="Full-stack generalist to front-end architect to the engineer who owns experimentation infrastructure — each role built directly on the last."
      />
      <div className="mt-14 space-y-14">
        {experience.map((role, index) => (
          <FadeIn key={`${role.company}-${role.period}`} delay={index * 0.05}>
            <div className="border-border grid gap-6 border-t pt-8 sm:grid-cols-[14rem_1fr]">
              <div>
                <h3 className="text-lg font-semibold">{role.company}</h3>
                <p className="text-muted mt-1 text-sm">{role.role}</p>
                <p className="text-muted-foreground mt-1 text-sm">{role.period}</p>
              </div>
              <div>
                <p className="text-foreground/90 text-pretty">{role.summary}</p>
                <ul className="mt-5 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-muted-foreground flex gap-3 text-sm text-pretty"
                    >
                      <span className="bg-muted mt-2 h-1 w-1 shrink-0 rounded-full" />
                      <span className="text-foreground/80">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border-border text-muted rounded-full border px-2.5 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
