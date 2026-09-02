export type Principle = {
  title: string;
  description: string;
};

/**
 * Not generic engineering platitudes — each of these is tied to a specific
 * decision documented in the Experience/Projects sections.
 */
export const principles: Principle[] = [
  {
    title: "Infrastructure debt doesn't wait for the platform team",
    description:
      "When the shared nginx config couldn't run two Next.js apps, the fix didn't wait on Cloud team bandwidth — it got learned and shipped directly, then handed back as working infrastructure.",
  },
  {
    title: "An experiment is only as good as its tracking",
    description:
      "The Primer bandit experiment nearly shipped with an event-firing bug that would have quietly corrupted the results. Found it before it reached Data & Analytics, not after.",
  },
  {
    title: "Documentation is part of the deliverable",
    description:
      "Not a follow-up task. Clear write-ups and progress updates are what let cross-functional work — security fixes, bucketing audits, infra migrations — actually land without friction.",
  },
  {
    title: "Raise a process problem with a fix attached",
    description:
      "Incomplete ticket requirements were slowing the team down for sprints before it got named directly, with a concrete proposal — not just a complaint — for what to change.",
  },
  {
    title: "AI tooling multiplies judgment, it doesn't replace it",
    description:
      "An AI-assisted workflow built an entire program's UI from Figma files faster than a manual build — but every page still went through the same acceptance-criteria review as hand-written code.",
  },
];
