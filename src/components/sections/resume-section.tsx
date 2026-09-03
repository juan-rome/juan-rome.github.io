import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { achievements } from "@/content/achievements";
import { experience } from "@/content/experience";
import { site } from "@/content/site";

export function ResumeSection() {
  return (
    <Section id="resume" className="bg-background-elevated/40">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Resume" title="The short version, with numbers" />
        <FadeIn>
          <Button href={site.resumeHref}>Download PDF</Button>
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((item, index) => (
          <FadeIn key={item.label} delay={index * 0.03}>
            <div className="border-border h-full rounded-2xl border p-6">
              <p className="text-accent text-3xl font-semibold tracking-tight">
                {item.stat}
              </p>
              <p className="text-muted mt-2 text-sm text-pretty">{item.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <ol className="border-border mt-16 space-y-6 border-l pl-6">
        {experience.flatMap((entry) =>
          entry.titles.map((title, index) => (
            <FadeIn
              key={`${entry.company}-${title.role}-${title.period}`}
              delay={index * 0.03}
            >
              <li className="relative">
                <span className="bg-accent absolute top-1.5 -left-[1.6rem] h-2 w-2 rounded-full" />
                <p className="text-muted-foreground text-sm">{title.period}</p>
                <p className="text-foreground font-medium">
                  {title.role} · {entry.company}
                </p>
              </li>
            </FadeIn>
          ))
        )}
      </ol>
    </Section>
  );
}
