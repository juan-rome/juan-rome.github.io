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
        {experience.map((entry, index) => (
          <FadeIn key={`${entry.company}-${entry.titles[0].period}`} delay={index * 0.05}>
            <div className="border-border grid gap-6 border-t pt-8 sm:grid-cols-[14rem_1fr]">
              <div>
                <h3 className="text-lg font-semibold">{entry.company}</h3>
                <div className="mt-3 space-y-3">
                  {entry.titles.map((title) => (
                    <div key={`${title.role}-${title.period}`}>
                      <p className="text-muted text-sm">{title.role}</p>
                      <p className="text-muted-foreground text-sm">{title.period}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-foreground/90 text-pretty">{entry.summary}</p>
                <ul className="mt-5 space-y-3">
                  {entry.highlights.map((highlight) => (
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
                  {entry.stack.map((tech) => (
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
