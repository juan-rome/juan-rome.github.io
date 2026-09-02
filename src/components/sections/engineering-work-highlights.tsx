import { Section } from "@/components/ui/section";
import { FadeIn } from "@/components/ui/fade-in";
import { projects } from "@/content/projects";

/**
 * Scannable highlight strip right after the hero — three concrete outcomes,
 * each linking down to its full case study in the Featured Projects section.
 */
export function EngineeringWorkHighlights() {
  const highlights = projects.slice(0, 3);

  return (
    <Section id="work" className="pt-0 sm:pt-0">
      <div className="border-border grid gap-4 border-t pt-14 sm:grid-cols-3">
        {highlights.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.04}>
            <a
              href={`#${project.slug}`}
              className="group border-border hover:border-foreground/30 block h-full rounded-2xl border p-6 transition-colors"
            >
              <p className="text-accent text-xs font-medium">{project.company}</p>
              <h3 className="text-foreground mt-2 font-semibold">{project.title}</h3>
              <p className="text-muted mt-2 text-sm text-pretty">{project.impact[0]}</p>
              <span className="text-muted-foreground group-hover:text-foreground mt-4 inline-block text-sm">
                Read the case study →
              </span>
            </a>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
