import type { CSSProperties } from "react";

export type NodeFlowIcon =
  | "github"
  | "group"
  | "draft"
  | "send"
  | "shield-check"
  | "score"
  | "graph"
  | "sort"
  | "file";

export type NodeFlowStep = {
  icon: NodeFlowIcon;
  label: string;
  sub: string;
  /** Marks the one step per flow that's the tool's real processing work
   *  (scoring, sorting, drafting), not just an input or output — gets a
   *  soft pulsing glow to draw the eye there. */
  analyzing?: boolean;
};

function StepIcon({ icon }: { icon: NodeFlowIcon }) {
  switch (icon) {
    case "github":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "group":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4h16v4H4zM4 10h10v4H4zM4 16h13v4H4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "draft":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6h16M4 12h16M4 18h10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "send":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M20.5 3.5 3 10.2l6.2 2.3M20.5 3.5 14 20.5l-4.8-8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shield-check":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12l2 2 4-4M12 3l8 4v5c0 4.5-3 8-8 9-5-1-8-4.5-8-9V7l8-4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "score":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 19h16M7 15l3-4 3 3 5-7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "graph":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 6h8M17 8v8" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "sort":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6h6M4 12h10M4 18h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "file":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 3h9l5 5v13H6z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9 13h6M9 17h6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

/** A small animated pipeline diagram: real steps for one tool, connected by
 *  a line with a traveling pulse, the one "processing" step marked with a
 *  soft breathing glow. Sits between a card's summary and its tags. */
export function NodeFlow({ steps, color }: { steps: NodeFlowStep[]; color: string }) {
  return (
    <div className="my-3.5 flex flex-col">
      {steps.map((step, index) => (
        <div key={step.label}>
          <div
            className="border-border-strong bg-background-elevated flex items-center gap-2.5 rounded-[0.6rem] border px-2.5 py-2"
            style={
              step.analyzing
                ? ({
                    ["--glow" as string]: `${color}59`,
                    animation: "node-breathe 2.4s ease-in-out infinite",
                  } as CSSProperties)
                : undefined
            }
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[0.4rem]"
              style={{ background: `${color}26`, color }}
            >
              <StepIcon icon={step.icon} />
            </span>
            <div>
              <p className="text-[0.82rem] font-semibold">{step.label}</p>
              <p className="text-muted mt-0.5 text-[0.72rem]">{step.sub}</p>
            </div>
          </div>
          {index < steps.length - 1 ? (
            <div
              className="relative ml-[1.15rem] h-[1.1rem] w-px"
              style={{ background: "var(--border-strong)" }}
            >
              <span
                className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                style={{
                  background: color,
                  animation: "node-pulse 2.6s ease-in-out infinite",
                  animationDelay: `${index * 0.6}s`,
                }}
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
