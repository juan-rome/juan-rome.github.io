export type Title = { role: string; period: string };

export type Experience = {
  company: string;
  logo: string;
  /** Solid backdrop behind the logo image, for a logo with transparency or
   *  dark ink that needs a light card to read against (Capital One's mark
   *  is dark-on-transparent). Omitted when the badge's own accent color is
   *  backdrop enough. */
  logoBackground?: string;
  logoFit?: "cover" | "contain";
  /** Company-tinted accent for the card's border and background wash,
   *  matching the AI Lab spotlight/agent cards' treatment. Unrelated to the
   *  current/past dot color, which is always emerald for "current" and
   *  neutral for past roles regardless of this. */
  accent: "emerald" | "blue" | "rose";
  /** Usually one title. More than one means an internal promotion at the
   *  same company — shown stacked under one company heading, sharing a
   *  single summary/stack/highlights rather than splitting bullets by title. */
  titles: Title[];
  summary: string;
  stack: string[];
  /** How many of `stack` show up front before the rest fold behind a
   *  "+N more" toggle. Ordered so the most representative tags for the
   *  role lead the list. */
  visibleTagCount: number;
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
    logo: "/logos/earnest.png",
    logoFit: "cover",
    accent: "emerald",
    titles: [
      { role: "Senior Software Engineer", period: "Oct 2025 - Present" },
      { role: "Software Engineer II", period: "Apr 2024 - Oct 2025" },
    ],
    summary:
      "Leading full-stack architecture behind Earnest's student loan rate-check and application funnels, from backend integrations and infrastructure to the experimentation platform. Now shaping and building AI-assisted engineering workflows and Claude Code skills.",
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "New Relic",
      "Claude Code",
      "nginx",
      "GitHub Actions",
      "PagerDuty",
      "Optimizely",
      "K6",
      "Cypress",
      "Storybook",
      "Storyblok CMS",
      "Segment",
      "Amplitude",
      "FullStory",
      "GitHub",
      "Jira",
      "Figma",
      "Figma MCP",
      "Jira MCP",
    ],
    visibleTagCount: 5,
    highlights: [
      "Led frontend development and experimentation efforts across Earnest's Rate Check funnel using React, TypeScript, and Next.js, contributing to measurable increases in conversion and application submissions.",
      "Designed and implemented nginx proxy architecture enabling multiple Next.js applications to run concurrently on shared staging and production servers, unblocking platform deployment beyond typical front-end scope.",
      "Designed the auth and integration layer for Application Service's GraphQL API, including short-lived token authentication and a unified mutation-dispatch proxy, and built a typed PII tokenization client to eliminate raw SSN/phone storage across the application.",
      "Enforced strict no-cache policies across all service clients handling financial and PII data, closing a class of caching vulnerabilities at the CDN and framework layer.",
      "Cut redundant Optimizely API calls by introducing edge caching for experiment configuration, reducing latency on every page load.",
      "Architected and delivered the front-end build-out of two major cross-team programs, the Unified Application Flow (UAF) funnel migration and the Medical Residency application flow, using AI-assisted workflows (Claude + Figma/Jira MCPs) to accelerate design-to-production delivery.",
      "Drove multiple high-impact A/B and multi-armed bandit experiments via Optimizely that improved funnel engagement and conversion, including +4.41% lift in Rate Check Results Viewed, +3.95% to 9.3% lifts through funnel reordering and step-reduction experiments, +18% lift in Application Submission through messaging updates, and +23% lift through ticker experience enhancements.",
      "Led integration of Verified's phone-based identity verification platform into the refinance rate check funnel, partnering cross-functionally with internal and external engineering teams to deliver a secure, scalable onboarding experience that increased conversion rates by 17% from rate check start to submission.",
      "Built and scaled shared experimentation infrastructure, including a centralized `useExperiment` hook (bucketing ID logic, Redis-backed sticky bucketing), an Optimizely SDK wrapper, and K6 performance test suites, establishing reusable foundations now relied on by every active experiment across the team.",
      "Redesigned refinance calculator experiences with a strong focus on accessibility and usability, increasing accessibility scores to 85%+ while reducing customer drop-off and ensuring WCAG 2.1 AA compliance.",
      "Partnered cross-functionally with Security and Data & Analytics teams, tightening environment variable boundary risk following a production incident and auditing Optimizely bucketing consistency across lending surfaces, strengthening platform reliability and experiment data integrity.",
      "Leveraged Claude Code and agentic coding workflows to accelerate feature development, test coverage, and debugging, cutting routine implementation time by an estimated 30% while maintaining code quality standards.",
    ],
  },
  {
    company: "Capital One",
    logo: "/logos/capital-one.webp",
    logoBackground: "#ffffff",
    logoFit: "contain",
    accent: "blue",
    titles: [{ role: "Senior Software Engineer", period: "May 2022 - Oct 2023" }],
    summary:
      "Led frontend redesigns for Capital One's Auto Navigator, a Lit-based micro-frontend embedded directly into dealership partners' own sites. Consolidated a legacy codebase's repeated components into a shared component library, introduced Storybook, and set new engineering standards along the way.",
    stack: [
      "TypeScript",
      "Lit",
      "Micro-Frontends",
      "Cypress",
      "New Relic",
      "GitHub",
      "Jira",
      "Figma",
    ],
    visibleTagCount: 5,
    highlights: [
      "Led development of three major integrations and frontend redesigns using Lit web components, improving user adoption by +35% and overall user experience metrics by +65%.",
      "Partnered cross-functionally with Engineering, QA, and Operations to resolve complex production issues, reducing application errors by 30% and improving platform reliability.",
      "Architected and delivered solutions for 15+ new and existing features across micro-frontend applications, improving host compatibility and customer experience.",
    ],
  },
  {
    company: "H-E-B",
    logo: "/logos/heb.png",
    logoFit: "cover",
    accent: "rose",
    titles: [
      { role: "Full Stack Software Engineer II", period: "Apr 2020 - May 2022" },
      { role: "Full Stack Software Engineer", period: "Jun 2018 - Apr 2020" },
    ],
    summary:
      "Built customer-facing features and automated batch-processing systems for H-E-B's grocery-retail platform. Owned the assortment application: a decision-tree tool that let internal teams and vendor partners model shelf changes (adding, removing, or recategorizing products) and project the sales impact using real product metrics.",
    stack: [
      "Angular",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Cypress",
      "PostgreSQL",
      "RxJS",
      "Spring Batch",
      "MySQL",
      "New Relic",
      "GitHub",
      "Jira",
      "Figma",
    ],
    visibleTagCount: 5,
    highlights: [
      "Diagnosed and resolved production issues, sustaining 99% uptime and reducing incident resolution time by 40% through proactive monitoring and alerting.",
      "Collaborated with designers, stakeholders, and engineers to deliver customer-facing features using Angular, RxJS, TypeScript, HTML, and CSS.",
      "Streamlined onboarding for junior engineers by creating training materials and running workshops that cut ramp-up time by 50%.",
      "Implemented new application features and resolved complex technical issues, improving user satisfaction and reducing customer-reported defects.",
      "Developed automated batch processing jobs using Spring Boot, Spring Batch, Java, MySQL, JDBC, and JPA, cutting data processing time by 40%.",
    ],
  },
];

/** The pill above each card spans every title's dates: oldest title's
 *  start through the newest title's end (often "Present"), rather than
 *  just the current title's own range. */
export function getOverallPeriod(titles: Title[]): string {
  const start = titles[titles.length - 1].period.split(" - ")[0];
  const end = titles[0].period.split(" - ")[1];
  return `${start} - ${end}`;
}
