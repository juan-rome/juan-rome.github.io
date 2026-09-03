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
  {
    slug: "jira-to-pr-workflow",
    title: "Jira → PR Workflow",
    status: "live",
    summary:
      "A Claude Code workflow that fetches a Jira ticket, refuses to implement it without a real description/AC/testing plan, implements it, and opens a PR with a real embedded screenshot — then closes the loop with an @-mention comment back on the ticket. Run against a real Jira sandbox: one ticket passed the gate and shipped a real PR, one was correctly blocked.",
    stack: ["Claude Code Skill", "Jira REST API", "Playwright", "GitHub CLI", "Node.js"],
    githubUrl: "https://github.com/juan-rome/jira-to-pr-workflow",
    demoUrl: "https://github.com/juan-rome/jira-to-pr-workflow/blob/main/RUNS.md",
  },
];
