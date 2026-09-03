export type ExpertiseGroup = {
  title: string;
  description: string;
  items: string[];
};

/**
 * Technical expertise organized by capability rather than a flat tech list —
 * the story is what these tools were used to build, not the tools alone.
 */
export const expertiseGroups: ExpertiseGroup[] = [
  {
    title: "Product Engineering",
    description:
      "Shipping customer-facing product surfaces end to end, from architecture to launch.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Angular",
      "Storyblok CMS",
      "Design Systems",
      "Storybook",
      "Cypress",
    ],
  },
  {
    title: "Experimentation",
    description:
      "Building the infrastructure that lets a team run experiments quickly and trust the results.",
    items: [
      "Optimizely",
      "Feature Flags",
      "Multi-Armed Bandits",
      "Bucketing & Stickiness",
      "Segment",
      "Amplitude",
      "FullStory",
    ],
  },
  {
    title: "Performance Engineering",
    description: "Making funnels measurably faster, and proving it with data.",
    items: ["Core Web Vitals", "Lighthouse", "K6 Load Testing", "New Relic"],
  },
  {
    title: "Infrastructure",
    description:
      "Stepping outside typical front-end scope when a platform problem blocks the team.",
    items: [
      "nginx",
      "AWS",
      "CI/CD",
      "PagerDuty",
      "Environment Boundary Security",
      "Next.js Deployment",
    ],
  },
  {
    title: "AI-Assisted Engineering",
    description:
      "Using AI tooling as a force multiplier for production work, not a novelty.",
    items: [
      "Claude Code",
      "GitHub Copilot",
      "MCP (Figma & Jira)",
      "Prompt Engineering",
      "AI-generated Test Coverage",
    ],
  },
  {
    title: "Documentation & Leadership",
    description:
      "Writing down decisions and sharing them so work outlives the person who did it.",
    items: [
      "Technical Documentation",
      "Cross-functional Collaboration",
      "Mentorship & Onboarding",
      "Interviewing & Hiring",
    ],
  },
];
