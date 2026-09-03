export type AiLabItem = {
  slug: string;
  title: string;
  status: "live" | "in-progress" | "planned";
  summary: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
};

/**
 * AI Engineering demos — real, working things only, added as they ship
 * (see docs/roadmap.md). Each one should have a public repo a visitor can
 * actually clone and run; that's what separates this section from the
 * Featured Projects case studies, which are proprietary Earnest work.
 */
export const aiLabItems: AiLabItem[] = [
  {
    slug: "a11y-audit-skill",
    title: "Accessibility Audit Skill",
    status: "live",
    summary:
      "A Claude Code skill that runs a real axe-core scan and turns raw violations into a prioritized, fix-oriented report. Dogfooded against this site — it found 3 real WCAG issues on the first run, and those exact fixes shipped.",
    stack: ["Claude Code Skill", "Playwright", "axe-core", "Node.js"],
    githubUrl: "https://github.com/juan-rome/a11y-audit-skill",
    demoUrl: "https://github.com/juan-rome/a11y-audit-skill/blob/main/examples/report.md",
  },
];
