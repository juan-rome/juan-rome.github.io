import { PulsingDot } from "@/components/ui/pulsing-dot";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { NodeFlow } from "@/components/ui/node-flow";
import type { GadgetItem } from "@/content/gadgets";

/** A text + node-flow card for Gadgets: the tool's real pipeline as a small
 *  animated diagram in place of a screenshot, then the pitch below. Kept
 *  separate from AiLabSpotlightCard/AiLabCompactCard since Gadgets aren't
 *  AI tooling and want their own visual identity, not AI Lab's category
 *  pill language, though it shares the same tilt-and-glow treatment. */
export function GadgetSpotlightCard({ item }: { item: GadgetItem }) {
  return (
    <TiltCard
      glowColor="#60a5fa"
      className="rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-400/[0.06] to-transparent"
    >
      <div className="p-4">
        <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-blue-400 uppercase">
          <PulsingDot
            colorClassName="bg-blue-400"
            glowClassName="shadow-[0_0_8px_rgba(96,165,250,0.8)]"
          />
          {item.spotlightLabel}
        </p>
        <h5 className="mt-1.5 text-sm font-semibold">{item.title}</h5>
        <p className="text-muted mt-1.5 text-[0.79rem] text-pretty">{item.summary}</p>

        {item.nodeFlow ? <NodeFlow steps={item.nodeFlow} color="#60a5fa" /> : null}

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

        <div className="mt-3 flex gap-3">
          {item.githubUrl ? (
            <Button
              href={item.githubUrl}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-3 py-2 text-xs"
            >
              View source
            </Button>
          ) : null}
          {item.demoUrl ? (
            <Button
              href={item.demoUrl}
              variant="primary"
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-3 py-2 text-xs"
            >
              {item.demoLabel ?? "See it in action"}
            </Button>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
}

/** Sits below the real Gadgets so the list doesn't just trail off after one
 *  entry; swap this out (or add more real cards above it) as more gadgets
 *  ship. */
export function GadgetComingSoonCard() {
  return (
    <div className="border-border/60 flex flex-row items-center justify-center gap-3 rounded-xl border border-dashed p-6 text-center">
      <span className="border-border-strong text-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed text-base">
        +
      </span>
      <p className="text-muted text-sm">More gadgets coming soon</p>
    </div>
  );
}
