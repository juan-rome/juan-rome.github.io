import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { aiLabItems, type AiLabItem } from "@/content/ai-lab";
import { cn } from "@/lib/utils";

const statusBadgeClasses: Record<AiLabItem["status"], string> = {
  live: "border-green-500/30 bg-green-500/15 text-green-400",
  "in-progress": "border-border-strong text-muted",
  planned: "border-border-strong text-muted",
};

function formatAudiences(audiences: AiLabItem["audiences"]) {
  if (audiences.length <= 1) return audiences.join("");
  return `${audiences.slice(0, -1).join(", ")} & ${audiences[audiences.length - 1]}`;
}

export function AiLabSection() {
  return (
    <Section id="ai-lab" className="bg-background-elevated/40">
      <SectionHeading
        eyebrow="AI Lab"
        title="AI-assisted workflows, in progress"
        description="Working demos of AI tooling built into real engineering workflows — plugins, integrations, and small products — added here as they ship."
      />
      <div className="mt-14">
        {aiLabItems.length === 0 ? (
          <FadeIn>
            <div className="border-border rounded-2xl border border-dashed p-10 text-center">
              <p className="text-muted">
                Nothing published here yet — this section fills in with real, working
                demos rather than placeholders.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {aiLabItems.map((item, index) => (
              <FadeIn key={item.slug} delay={index * 0.04}>
                <div className="border-border h-full rounded-2xl border p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{item.title}</h3>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                        statusBadgeClasses[item.status]
                      )}
                    >
                      {item.status.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-accent-text mt-2 text-xs font-medium tracking-wide uppercase">
                    For {formatAudiences(item.audiences)}
                  </p>
                  <p className="text-muted mt-2 text-sm text-pretty">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border-border text-muted rounded-full border px-2.5 py-1 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {(item.githubUrl || item.demoUrl) && (
                    <div className="mt-5 flex gap-4 text-sm">
                      {item.githubUrl ? (
                        <a
                          href={item.githubUrl}
                          className="text-accent-text hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      ) : null}
                      {item.demoUrl ? (
                        <a
                          href={item.demoUrl}
                          className="text-accent-text hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live demo
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
