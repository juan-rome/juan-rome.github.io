import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { aiLabItems, type AiLabItem, type ToolCategory } from "@/content/ai-lab";
import { cn } from "@/lib/utils";

const categoryBadgeClasses: Record<ToolCategory, string> = {
  Tool: "border-emerald-500/30 bg-emerald-500/15 text-emerald-400",
  Skill: "border-indigo-500/30 bg-indigo-500/15 text-indigo-400",
  Workflow: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  Agent: "border-sky-500/30 bg-sky-500/15 text-sky-400",
  "MCP Server": "border-fuchsia-500/30 bg-fuchsia-500/15 text-fuchsia-400",
};

/** Non-Tool categories fully shown before any Skill truncation kicks in. */
const VISIBLE_CATEGORY_ORDER: ToolCategory[] = [
  "Agent",
  "Workflow",
  "Skill",
  "MCP Server",
];

/** How many Skill entries show by default before "+N more skills" is needed.
 *  Skill is the most numerous category, so it's the one that grows unbounded
 *  as more skills ship; everything else stays fully visible. */
const VISIBLE_SKILL_COUNT = 1;

function formatAudiences(audiences: AiLabItem["audiences"]) {
  if (audiences.length <= 1) return audiences.join("");
  return `${audiences.slice(0, -1).join(", ")} & ${audiences[audiences.length - 1]}`;
}

function CardLinks({ item }: { item: AiLabItem }) {
  if (!item.githubUrl && !item.demoUrl) return null;
  return (
    <div className="mt-3 flex gap-4 text-sm">
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
          See it in action
        </a>
      ) : null}
    </div>
  );
}

function CardTags({ item }: { item: AiLabItem }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {item.stack.map((tech) => (
        <span
          key={tech}
          className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

/** The Tool category is the one a visitor can actually click and use
 *  themselves — a distinct card with a live-status indicator, kept close
 *  in scale to the compact cards below it rather than a much bigger hero
 *  treatment. */
function AiLabSpotlightCard({ item }: { item: AiLabItem }) {
  return (
    <div className="h-full rounded-xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.07] to-transparent p-4">
      <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-emerald-400 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        Live in your browser
      </p>
      <h4 className="mt-1.5 text-sm font-semibold">{item.title}</h4>
      <p className="text-accent-text mt-1 text-[0.64rem] font-medium tracking-wide uppercase">
        For {formatAudiences(item.audiences)}
      </p>
      <p className="text-muted mt-1.5 text-[0.79rem] text-pretty">{item.summary}</p>
      <CardTags item={item} />
      <CardLinks item={item} />
    </div>
  );
}

function AiLabCompactCard({ item }: { item: AiLabItem }) {
  return (
    <div className="border-border h-full rounded-xl border p-4">
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-sm font-semibold">{item.title}</h4>
        <div className="flex shrink-0 items-center gap-1.5">
          {item.status !== "live" ? (
            <span className="border-border-strong text-muted rounded-full border px-2 py-0.5 text-[0.6rem] font-medium capitalize">
              {item.status.replace("-", " ")}
            </span>
          ) : null}
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[0.62rem] font-medium",
              categoryBadgeClasses[item.category]
            )}
          >
            {item.category}
          </span>
        </div>
      </div>
      <p className="text-accent-text mt-1.5 text-[0.62rem] font-medium tracking-wide uppercase">
        For {formatAudiences(item.audiences)}
      </p>
      <p className="text-muted mt-1.5 text-[0.79rem] text-pretty">{item.summary}</p>
      <CardTags item={item} />
      <CardLinks item={item} />
    </div>
  );
}

export function AiLabSection() {
  const spotlightItems = aiLabItems.filter((item) => item.category === "Tool");

  const orderedOtherItems = VISIBLE_CATEGORY_ORDER.flatMap((category) =>
    aiLabItems.filter((item) => item.category === category)
  );
  const skillItems = orderedOtherItems.filter((item) => item.category === "Skill");
  const nonSkillItems = orderedOtherItems.filter((item) => item.category !== "Skill");
  const visibleSkillItems = skillItems.slice(0, VISIBLE_SKILL_COUNT);
  const hiddenSkillItems = skillItems.slice(VISIBLE_SKILL_COUNT);
  const visibleItems = [...nonSkillItems, ...visibleSkillItems];

  return (
    <Section id="ai-lab" className="bg-background-elevated/40">
      <SectionHeading
        eyebrow="AI Lab"
        title="AI-assisted workflows, in progress"
        description="Working demos of AI tooling built into real engineering workflows: plugins, integrations, and small products, added here as they ship."
      />

      {aiLabItems.length === 0 ? (
        <FadeIn>
          <div className="border-border mt-14 rounded-2xl border border-dashed p-10 text-center">
            <p className="text-muted">
              Nothing published here yet: this section fills in with real, working demos
              rather than placeholders.
            </p>
          </div>
        </FadeIn>
      ) : (
        <div className="mt-14 space-y-10">
          {spotlightItems.length > 0 ? (
            <div>
              <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
                Try it yourself
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {spotlightItems.map((item, index) => (
                  <FadeIn key={item.slug} delay={index * 0.04}>
                    <AiLabSpotlightCard item={item} />
                  </FadeIn>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
              Agents, workflows & skills
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {visibleItems.map((item, index) => (
                <FadeIn key={item.slug} delay={index * 0.04}>
                  <AiLabCompactCard item={item} />
                </FadeIn>
              ))}
            </div>

            {hiddenSkillItems.length > 0 ? (
              <details className="group mt-3">
                <summary className="border-border-strong text-muted hover:text-foreground hover:bg-background-elevated flex cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-dashed p-3 text-sm font-medium transition-colors [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">
                    +{hiddenSkillItems.length} more skills
                  </span>
                  <span className="hidden group-open:inline">Show fewer skills</span>
                  <svg
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform group-open:rotate-180"
                  >
                    <path
                      d="M1 1L5.5 5.5L10 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {hiddenSkillItems.map((item, index) => (
                    <FadeIn key={item.slug} delay={index * 0.04}>
                      <AiLabCompactCard item={item} />
                    </FadeIn>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </div>
      )}
    </Section>
  );
}
