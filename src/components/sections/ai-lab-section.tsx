import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { Carousel } from "@/components/ui/carousel";
import { aiLabItems, type AiLabItem, type ToolCategory } from "@/content/ai-lab";
import { cn } from "@/lib/utils";

const categoryBadgeClasses: Record<ToolCategory, string> = {
  Skill: "border-indigo-500/30 bg-indigo-500/15 text-indigo-400",
  Workflow: "border-amber-500/30 bg-amber-500/15 text-amber-400",
  Agent: "border-sky-500/30 bg-sky-500/15 text-sky-400",
  "MCP Server": "border-fuchsia-500/30 bg-fuchsia-500/15 text-fuchsia-400",
};

/** Most complex/newest categories lead; Skill (the most numerous) reads last. */
const CATEGORY_ORDER: ToolCategory[] = ["Agent", "Workflow", "Skill", "MCP Server"];

function formatAudiences(audiences: AiLabItem["audiences"]) {
  if (audiences.length <= 1) return audiences.join("");
  return `${audiences.slice(0, -1).join(", ")} & ${audiences[audiences.length - 1]}`;
}

function AiLabCard({ item }: { item: AiLabItem }) {
  return (
    <div className="border-border h-full w-[85vw] max-w-sm shrink-0 snap-start rounded-2xl border p-6 sm:w-80">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{item.title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          {item.status !== "live" ? (
            <span className="border-border-strong text-muted rounded-full border px-2 py-0.5 text-xs font-medium capitalize">
              {item.status.replace("-", " ")}
            </span>
          ) : null}
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-xs font-medium",
              categoryBadgeClasses[item.category]
            )}
          >
            {item.category}
          </span>
        </div>
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
              See it in action
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}

function CategoryRow({
  category,
  items,
}: {
  category: ToolCategory;
  items: AiLabItem[];
}) {
  return (
    <div>
      <h3 className="text-muted text-sm font-semibold tracking-wide uppercase">
        {category}
        <span className="text-muted ml-2 font-normal normal-case">
          {items.length} {items.length === 1 ? "tool" : "tools"}
        </span>
      </h3>
      <div className="mt-4">
        <Carousel ariaLabel={`${category} tools`}>
          {items.map((item, index) => (
            <FadeIn key={item.slug} delay={index * 0.04} className="shrink-0">
              <AiLabCard item={item} />
            </FadeIn>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export function AiLabSection() {
  const groupedByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    items: aiLabItems.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <Section id="ai-lab" className="bg-background-elevated/40">
      <SectionHeading
        eyebrow="AI Lab"
        title="AI-assisted workflows, in progress"
        description="Working demos of AI tooling built into real engineering workflows — plugins, integrations, and small products — added here as they ship."
      />
      <div className="mt-14 space-y-12">
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
          groupedByCategory.map(({ category, items }) => (
            <CategoryRow key={category} category={category} items={items} />
          ))
        )}
      </div>
    </Section>
  );
}
