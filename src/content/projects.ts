export type Project = {
  slug: string;
  title: string;
  company: string;
  summary: string;
  problem: string;
  architecture: string;
  tradeoffs: string;
  challenges: string;
  lessons: string;
  impact: string[];
  stack: string[];
  /** Proprietary employer work has no public repo or live demo — omit rather than fabricate. */
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "dual-nextjs-nginx",
    title: "Running two Next.js apps on one server",
    company: "Earnest",
    summary:
      "Unblocked a new applicant flow's deployment by re-architecting shared server routing that had only ever supported a single Next.js project.",
    problem:
      "Earnest's new Unified Application Flow (UAF) needed to deploy to the same staging and production servers already running the Nexstory-UI app. The existing nginx configuration assumed exactly one Next.js project per server, so pages, static assets, and API routes had nowhere unambiguous to route.",
    architecture:
      "Designed a routing scheme with dedicated proxy locations per project, disambiguating asset paths (including the `/_next/image` optimizer, which was silently resolving to the wrong app), API routes, and page traffic, so both applications could coexist on the same box without cross-talk.",
    tradeoffs:
      "Could have argued for a dedicated server per project instead, which is architecturally simpler but slower to provision and more expensive to run for a flow still in Phase 1. Chose to solve it at the routing layer to keep infrastructure lean while the new flow proved itself out.",
    challenges:
      "This was outside typical front-end scope: it meant learning nginx internals under time pressure, largely without dedicated platform-team bandwidth. When Cloud team follow-up work stalled, drove the remaining routing fixes and validation in staging directly rather than waiting.",
    lessons:
      "Now part of standing working knowledge: diagnosing deployment and environment issues without needing to route every problem through the platform team.",
    impact: [
      "Made the new frontend project deployable to staging and production at all",
      "Directly enabled Phase 1 launch of the new applicant flow",
      "Fixed a broken next/image optimizer bug caused by the same routing ambiguity",
    ],
    stack: ["Next.js", "nginx", "Vercel/Node deployment"],
  },
  {
    slug: "primer-mab-experiment",
    title: "A multi-armed bandit experiment, shipped end to end",
    company: "Earnest",
    summary:
      "Owned a full experimentation cycle (UI, feature flag, tracking, and a data-integrity bug fix) on a page with a documented ~22% funnel drop-off.",
    problem:
      "The Primer page in Earnest's rate-check funnel had a measured ~22% drop-off. An earlier attempt to simply remove the page produced a negative result, so the team needed a smarter redesign rather than a removal.",
    architecture:
      "Built the redesigned Primer UI behind an Optimizely feature-flag-driven multi-armed bandit, with dedicated event tracking so Data & Analytics could measure Rate Check Start conversion by variant in real time.",
    tradeoffs:
      "A multi-armed bandit auto-shifts traffic toward the winning variant faster than a fixed A/B split, at the cost of slightly messier statistical inference mid-experiment, an acceptable tradeoff for a funnel step the team wanted to stop bleeding conversion on quickly.",
    challenges:
      "Discovered a root-cause event-firing bug (the experiment was tracking on every render instead of de-duplicating) that would have quietly corrupted the results if it had shipped to full traffic undetected. Found and fixed it before the data reached Data & Analytics.",
    lessons:
      "Experiment infrastructure is only as trustworthy as its event tracking; verifying tracking behavior under real render conditions is not optional, especially before scaling traffic.",
    impact: [
      "V1 shipped to 100% of traffic with a measured +2.46% lift to Rate Check Start",
      "Full experiment cycle, launch to permanent rollout, completed in under 5 weeks",
      "Bucketing fix now protects every experiment reusing the same tracking pattern",
    ],
    stack: ["React", "Optimizely", "Segment"],
  },
  {
    slug: "experimentation-infrastructure",
    title: "Experimentation infrastructure the whole team relies on",
    company: "Earnest",
    summary:
      "Moved from running individual experiments to owning the shared infrastructure (bucketing, stickiness, and tooling) that every active experiment on the team now depends on.",
    problem:
      "As experiment volume grew, ad-hoc per-experiment bucketing logic and inconsistent session handling made results harder to trust and slower to ship. A reorder experiment needed reliable session stickiness that didn't exist yet.",
    architecture:
      "Built Redis-backed session stickiness for the reorder experiment, then generalized the pattern; refactored the team's shared `useExperiment` hook to centralize bucketing-ID logic and support a `track:false` mode for cases that shouldn't fire analytics events.",
    tradeoffs:
      "Centralizing bucketing logic into one hook creates a single point every experiment depends on: higher blast radius if it breaks, but far lower odds of the subtle per-experiment bugs that come from copy-pasted bucketing code.",
    challenges:
      "Delivered this largely solo (~95% ownership) while a teammate was out, coordinating with QA, Infra, and another team to keep the reorder experiment on track and ship it as the new permanent default.",
    lessons:
      "Infrastructure work that isn't attached to a single flashy feature is easy to deprioritize; it paid off specifically because it made every experiment after it faster and safer to ship.",
    impact: [
      "+3.95% lift to Rate Check Results Viewed from the reorder experiment itself",
      "Redis-backed stickiness now supports 100% of future AFS experiments",
      "useExperiment hook is the shared substrate for every active experiment on the team",
    ],
    stack: ["React", "Redis", "Optimizely", "TypeScript"],
  },
  {
    slug: "ai-assisted-med-res-program",
    title: "Building a program's UI with an AI-assisted workflow",
    company: "Earnest",
    summary:
      "Used Claude with Figma and Jira MCP integrations to take the Medical Residency loan program from design files to a fully tested UI, faster than a traditional build.",
    problem:
      "The Medical Residency program needed a complete funnel UI (start of application through review) built and tested from scratch, on a timeline that didn't allow for the usual page-by-page manual build cycle.",
    architecture:
      "Connected Claude to the team's Figma and Jira workflows via MCP, using it to generate page implementations, Storybook stories, and unit tests directly from design files, then validating every output against acceptance criteria before it shipped.",
    tradeoffs:
      "AI-generated first drafts trade a small amount of idiomatic-code polish for a large amount of speed, worth it only when paired with real review discipline, which is why every page still went through acceptance-criteria validation before merging.",
    challenges:
      'The workflow itself was new: there was no established pattern on the team for AI-assisted page generation at this scope, so establishing what "good" AI output looked like was part of the work.',
    lessons:
      "AI tooling is a genuine multiplier for well-specified, repetitive UI work (funnel pages from finalized designs), not a replacement for the judgment needed to validate what it produces.",
    impact: [
      "Full program UI built start-of-funnel through app review",
      "10+ end-to-end automation tests covering the whole funnel, wired into CI from day one",
      "Workflow pattern is now being adopted by others on the team",
    ],
    stack: ["Next.js", "Claude Code", "Figma MCP", "Jira MCP", "Playwright"],
  },
];
