export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  highlights: string[];
};

/**
 * Career history, expanded from resume bullets into outcomes + engineering
 * decisions. Sourced from Earnest performance reviews (2024 year-end, 2025
 * year-end, 2026 mid-year) and prior role context — not invented.
 */
export const experience: Experience[] = [
  {
    company: "Earnest",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    summary:
      "Own the front-end architecture and experimentation infrastructure behind Earnest's student loan rate-check and application funnels, spanning product delivery, platform infrastructure, and developer experience.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Optimizely",
      "Segment",
      "New Relic",
      "nginx",
      "K6",
    ],
    highlights: [
      "Led the front-end migration of Earnest's Unified Application Flow (Amount, Citizenship, Address, Primer pages) from a legacy service into a single unified codebase — the critical path that unblocked Phase 1 launch of the new applicant flow.",
      "Designed and implemented an nginx routing architecture to run two Next.js applications on the same staging/production server, introducing per-project proxy rules for assets, API routes, and pages where only a single-project setup existed before.",
      "Owned the Primer page multi-armed-bandit experiment end to end — UI, feature-flag setup, event tracking, and a bucketing bug fix — shipping the winning variant to 100% of traffic with a measured +2.46% lift in Rate Check Start conversion.",
      "Took end-to-end ownership (~95%) of a reorder experiment that lifted Rate Check Results Viewed by +3.95%, while building Redis-backed session stickiness that now underpins every experiment run on the platform.",
      "Led a first-of-kind cross-service integration (AFS ↔ Nexstory) for Earnest's Verified product, cutting the loan application flow from 7 steps to 4 and driving a +9.3% lift in Rate Check Results Viewed.",
      "Refactored the team's shared `useExperiment` hook to centralize bucketing-ID logic — now the common experimentation substrate every active test on the team builds on.",
      "Built the Medical Residency program's UI from scratch using an AI-assisted workflow (Claude with Figma and Jira MCPs), pairing rapid page generation with a 10+ page end-to-end automation suite wired into CI from day one.",
      "Partnered with Security to close an environment-variable boundary risk surfaced by an incident, and led a cross-surface Optimizely bucketing audit that resolved a data-consistency question blocking Data & Analytics.",
      "Shipped 9+ Optimizely experiments in 2025 alone, including wins of +4.41% (button copy), +18% and +23% (App Submission messaging experiments) — plus additional experiments across 2026.",
      "Hosted a Storybook workshop that drove component-driven development adoption across teams, and regularly mentors junior engineers and new hires through pairing and onboarding.",
    ],
  },
  {
    company: "Capital One",
    role: "Software Engineer II",
    period: "2021 — 2023",
    summary:
      "Worked on Auto Navigator, Capital One's car-selection and loan-application experience, focused on turning one-off UI into a reusable design system.",
    stack: ["React", "TypeScript", "Design Systems", "A/B Testing"],
    highlights: [
      "Refactored feature-specific UI into reusable components contributed back to Capital One's core engineering design system, reducing duplication for teams building on Auto Navigator.",
      "Got first hands-on exposure to structured A/B testing, building the foundation for the experimentation-heavy work that followed at Earnest.",
    ],
  },
  {
    company: "H-E-B",
    role: "Full Stack Engineer",
    period: "2018 — 2021",
    summary:
      "Built a modern replacement for Assortment, a legacy internal tool for managing in-store product placement and modeling how shelf position affects sales.",
    stack: ["Angular", "Java", "Spring", "PostgreSQL"],
    highlights: [
      "Rebuilt a legacy internal application that let merchandising teams manage product placement and model how eye-level shelf position affected sales and category performance.",
      "Worked across the full stack — Angular front end, Java/Spring services, and a PostgreSQL data layer — on a tool used directly by merchandising teams to make placement decisions.",
    ],
  },
];
