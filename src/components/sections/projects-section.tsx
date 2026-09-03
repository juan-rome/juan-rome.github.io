import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { projects } from "@/content/projects";

function ProjectDetail({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="text-muted text-xs font-semibold tracking-wide uppercase">
        {label}
      </h4>
      <p className="text-foreground/80 mt-2 text-sm text-pretty">{text}</p>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Projects"
        title="A few problems worth explaining properly"
        description="These are internal Earnest products, so there's no public repo or live demo to link — the write-up is the case study."
      />
      <div className="mt-14 space-y-16">
        {projects.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.04}>
            <article
              id={project.slug}
              className="border-border scroll-mt-24 rounded-2xl border p-6 sm:p-10"
            >
              <p className="text-accent-text text-xs font-medium">{project.company}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="text-muted mt-3 max-w-2xl text-pretty">{project.summary}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <ProjectDetail label="Problem" text={project.problem} />
                <ProjectDetail label="Architecture" text={project.architecture} />
                <ProjectDetail label="Tradeoffs" text={project.tradeoffs} />
                <ProjectDetail label="Challenges" text={project.challenges} />
                <ProjectDetail label="Lessons" text={project.lessons} />
                <div>
                  <h4 className="text-muted text-xs font-semibold tracking-wide uppercase">
                    Impact
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="text-foreground/80 flex gap-2 text-sm text-pretty"
                      >
                        <span className="bg-accent mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-border mt-8 flex flex-wrap gap-2 border-t pt-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-border-strong text-muted rounded-full border px-2.5 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
