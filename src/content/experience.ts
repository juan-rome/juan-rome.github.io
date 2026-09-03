export type Title = { role: string; period: string };

export type Experience = {
  company: string;
  /** Usually one title. More than one means an internal promotion at the
   *  same company — shown stacked under one company heading, sharing a
   *  single summary/stack/highlights rather than splitting bullets by title. */
  titles: Title[];
  summary: string;
  stack: string[];
  highlights: string[];
};

/**
 * Career history, expanded from resume bullets into outcomes + engineering
 * decisions. Sourced from the 09/2026 resume and Earnest performance
 * reviews (2024 year-end, 2025 year-end, 2026 mid-year) — not invented.
 */
export const experience: Experience[] = [
  {
    company: "Earnest",
    titles: [
      { role: "Senior Software Engineer", period: "Oct 2025 — Present" },
      { role: "Software Engineer II", period: "Apr 2024 — Oct 2025" },
    ],
    summary:
      "Own the front-end architecture and experimentation infrastructure behind Earnest's student loan rate-check and application funnels, spanning product delivery, platform infrastructure, and developer experience. Promoted to Senior in October 2025.",
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
      "Led integration of Verified's phone-based identity verification platform into the refinance rate-check funnel, partnering across internal and external engineering teams to deliver a secure, scalable onboarding experience that increased conversion from rate check start to submission by +17%.",
      "Designed and implemented an nginx routing architecture to run two Next.js applications on the same staging/production server, introducing per-project proxy rules for assets, API routes, and pages where only a single-project setup existed before.",
      "Owned the Primer page multi-armed-bandit experiment end to end — UI, feature-flag setup, event tracking, and a bucketing bug fix — shipping the winning variant to 100% of traffic with a measured +2.46% lift in Rate Check Start conversion.",
      "Took end-to-end ownership (~95%) of a reorder experiment that lifted Rate Check Results Viewed by +3.95%, while building Redis-backed session stickiness that now underpins every experiment run on the platform.",
      "Built and scaled shared experimentation infrastructure — a centralized `useExperiment` hook (bucketing-ID logic, Redis-backed sticky bucketing), an Optimizely SDK wrapper, and K6 performance test suites — now relied on by every active experiment across the team.",
      "Built the Medical Residency program's UI from scratch using an AI-assisted workflow (Claude with Figma and Jira MCPs), pairing rapid page generation with a 10+ page end-to-end automation suite wired into CI from day one; AI-assisted workflows have cut routine implementation time by an estimated 30% without compromising code quality.",
      "Partnered with Security to close an environment-variable boundary risk surfaced by an incident, and led a cross-surface Optimizely bucketing audit that resolved a data-consistency question blocking Data & Analytics.",
      "Redesigned refinance calculator experiences for accessibility and usability, raising accessibility scores to 85%+, reducing customer drop-off, and ensuring WCAG 2.1 AA compliance.",
      "Optimized New Relic and PagerDuty alerting by refining thresholds and consolidating redundant monitoring — reducing alert noise by 80–90% and improving mean-time-to-acknowledge.",
      "Shipped 9+ Optimizely experiments in 2025 alone, including wins of +4.41% (button copy), +18% and +23% (App Submission messaging experiments).",
    ],
  },
  {
    company: "Capital One",
    titles: [{ role: "Senior Software Engineer", period: "May 2022 — Oct 2023" }],
    summary:
      "Led frontend redesigns and integrations across Capital One's micro-frontend applications, working in Lit web components.",
    stack: ["Lit", "TypeScript", "Micro-Frontends"],
    highlights: [
      "Led development of three major integrations and frontend redesigns using Lit web components, improving user adoption by +35% and overall user experience metrics by +65%.",
      "Partnered cross-functionally with Engineering, QA, and Operations to resolve complex production issues, reducing application errors by 30% and improving platform reliability.",
      "Architected and delivered solutions for 15+ new and existing features across micro-frontend applications, improving host compatibility and customer experience.",
    ],
  },
  {
    company: "H-E-B",
    titles: [{ role: "Full Stack Software Engineer II", period: "Apr 2020 — May 2022" }],
    summary:
      "Promoted within H-E-B's engineering team; built customer-facing features and owned production reliability for a grocery-retail platform.",
    stack: ["Angular", "RxJS", "TypeScript"],
    highlights: [
      "Diagnosed and resolved production issues, sustaining 99% uptime and reducing incident resolution time by 40% through proactive monitoring and alerting.",
      "Collaborated with designers, stakeholders, and engineers to deliver customer-facing features using Angular, RxJS, TypeScript, HTML, and CSS.",
      "Streamlined onboarding for junior engineers by creating training materials and running workshops that cut ramp-up time by 50%.",
    ],
  },
  {
    company: "H-E-B",
    titles: [{ role: "Full Stack Software Engineer", period: "Jun 2018 — Apr 2020" }],
    summary:
      "Started full-stack, working across customer-facing features and backend batch processing before promotion to Software Engineer II.",
    stack: ["Spring Boot", "Spring Batch", "Java", "MySQL"],
    highlights: [
      "Implemented new application features and resolved complex technical issues, improving user satisfaction and reducing customer-reported defects.",
      "Developed automated batch processing jobs using Spring Boot, Spring Batch, Java, MySQL, JDBC, and JPA, cutting data processing time by 40%.",
    ],
  },
];
