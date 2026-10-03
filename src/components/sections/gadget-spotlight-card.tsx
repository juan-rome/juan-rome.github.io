import { PulsingDot } from "@/components/ui/pulsing-dot";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt-card";
import { NodeFlow } from "@/components/ui/node-flow";
import { cn } from "@/lib/utils";
import type { GadgetItem } from "@/content/gadgets";

function Stickers({
  item,
  scale,
  className,
}: {
  item: GadgetItem;
  scale: number;
  className: string;
}) {
  if (!item.stickers) return null;
  return (
    <div aria-hidden="true" className={cn("pointer-events-none items-end", className)}>
      {item.stickers.map((sticker, i) => (
        <img
          key={sticker.src}
          src={sticker.src}
          alt=""
          style={{ height: sticker.height * scale, marginLeft: i > 0 ? -12 * scale : 0 }}
        />
      ))}
    </div>
  );
}

function Cta({ item, className }: { item: GadgetItem; className: string }) {
  if (!item.demoUrl) return null;
  return (
    <Button
      href={item.demoUrl}
      variant="primary"
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {item.demoLabel ?? "See it in action"}
    </Button>
  );
}

function StackAndRequirements({ item }: { item: GadgetItem }) {
  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {item.stack.map((tech) => (
          <span
            key={tech}
            className="border-border text-muted rounded-full border px-2.5 py-0.5 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      {item.requirements ? (
        <p className="text-muted mt-2.5 text-[0.72rem]">{item.requirements}</p>
      ) : null}
    </>
  );
}

/** A full-width text + node-flow card for Gadgets: the pitch on the left
 *  and the tool's real pipeline as a small animated diagram on the right,
 *  stacking to one column on narrow screens. Kept separate from
 *  AiLabSpotlightCard/AiLabCompactCard since Gadgets aren't AI tooling and
 *  want their own visual identity, not AI Lab's category pill language,
 *  though it shares the same tilt-and-glow treatment. */
export function GadgetSpotlightCard({ item }: { item: GadgetItem }) {
  return (
    <TiltCard
      glowColor="#60a5fa"
      className="overflow-hidden rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-400/[0.06] to-transparent"
    >
      <div className="relative grid gap-x-12 p-4 pb-6 lg:grid-cols-2 lg:p-8">
        {/* Narrow screens: stickers tucked beside the title */}
        <Stickers
          item={item}
          scale={0.46}
          className="absolute top-3 right-3 flex lg:hidden"
        />

        <div className="flex flex-col">
          <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-wide text-blue-400 uppercase">
            <PulsingDot
              colorClassName="bg-blue-400"
              glowClassName="shadow-[0_0_8px_rgba(96,165,250,0.8)]"
            />
            {item.spotlightLabel}
          </p>
          <h5
            className={cn(
              "mt-1.5 text-sm font-semibold",
              item.stickers && "pr-20 lg:pr-0"
            )}
          >
            {item.titleLogo ? (
              <img
                src={item.titleLogo}
                alt={item.title}
                className="mt-1 h-7 w-auto lg:h-11"
              />
            ) : (
              item.title
            )}
          </h5>
          <p className="text-muted mt-1.5 text-[0.79rem] text-pretty lg:mt-3 lg:max-w-[42ch] lg:text-[0.95rem]">
            {item.summary}
          </p>

          {/* Wide screens only: on narrow ones these sit below the flow */}
          <div className="mt-5 hidden lg:block">
            <StackAndRequirements item={item} />
          </div>

          {/* Wide screens: CTA with the stickers standing beside it */}
          <div className="mt-auto hidden items-end justify-between gap-4 pt-6 lg:flex">
            <Cta item={item} className="px-6 py-2.5 text-sm" />
            <Stickers item={item} scale={1} className="flex" />
          </div>
        </div>

        <div className="lg:self-center">
          {item.nodeFlow ? <NodeFlow steps={item.nodeFlow} color="#60a5fa" /> : null}

          <div className="lg:hidden">
            <div className="mt-3">
              <StackAndRequirements item={item} />
            </div>
            <div className="flex pt-3">
              <Cta item={item} className="flex-1 px-3 py-2 text-xs" />
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
