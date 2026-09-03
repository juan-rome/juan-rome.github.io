export type Audience = "Devs" | "PMs" | "Designers";

/** What kind of Claude Code tool this is — shown as the card's colored badge. */
export type ToolCategory = "Skill" | "Workflow" | "Agent" | "MCP Server";

export type AiLabItem = {
  slug: string;
  title: string;
  category: ToolCategory;
  status: "live" | "in-progress" | "planned";
  summary: string;
  stack: string[];
  /** Who this is actually useful for, beyond "engineers" — most of these
   *  tools started as a dev-facing gate but generalize to a cross-functional
   *  audience. Always include "Devs"; add others only when the tool
   *  genuinely stands on its own for that audience, not just in theory. */
  audiences: Audience[];
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
    title: "Accessibility Audit",
    category: "Skill",
    status: "live",
    summary:
      "A Claude Code skill that runs a real axe-core scan and turns raw violations into a prioritized, fix-oriented report. Run against this very site — it found 3 real WCAG issues on the first pass, and those exact fixes shipped.",
    stack: ["Claude Code Skill", "Playwright", "axe-core", "Node.js"],
    audiences: ["Devs", "Designers"],
    githubUrl: "https://github.com/juan-rome/a11y-audit-skill",
    demoUrl: "https://github.com/juan-rome/a11y-audit-skill/blob/main/examples/report.md",
  },
  {
    slug: "jira-to-pr-workflow",
    title: "Jira → PR",
    category: "Workflow",
    status: "live",
    summary:
      "A Claude Code workflow that fetches a Jira ticket, refuses to implement it without a real description/AC/testing plan, implements it, and opens a PR with a real embedded screenshot — then closes the loop with an @-mention comment back on the ticket. Also supports a readiness-only mode (no implementation) with its own trigger label, so a quick 'is this ready' check doesn't require running the full pipeline. Run against a real Jira sandbox: one ticket passed the gate and shipped a real PR, one was correctly blocked.",
    stack: ["Claude Code Skill", "Jira REST API", "Playwright", "GitHub CLI", "Node.js"],
    audiences: ["Devs", "PMs"],
    githubUrl: "https://github.com/juan-rome/jira-to-pr-workflow",
    demoUrl: "https://github.com/juan-rome/jira-to-pr-workflow/blob/main/RUNS.md",
  },
  {
    slug: "secret-leak-scanner",
    title: "Secret Leak Scanner",
    category: "Skill",
    status: "live",
    summary:
      "A local, offline Claude Code skill that scans a diff's added lines for AWS/GitHub/Slack tokens, private keys, and high-entropy literals before they're pushed. Scanned clean against a real 1,300+ line diff, and its own fixture regression test caught a false-positive bug (unquoted env references) before it ever shipped.",
    stack: ["Claude Code Skill", "Node.js", "Shannon Entropy", "Git"],
    audiences: ["Devs"],
    githubUrl: "https://github.com/juan-rome/secret-leak-scanner",
    demoUrl: "https://github.com/juan-rome/secret-leak-scanner/blob/main/README.md",
  },
  {
    slug: "pm-ticket-readiness-checker",
    title: "PM Ticket Readiness Checker",
    category: "Skill",
    status: "live",
    summary:
      "A coaching-style repackaging of the Jira → PR workflow's quality gate for PMs: paste any ticket — Jira, Linear, Asana, a doc — and it scores Description/AC/Testing Plan, explaining why a thin section costs time downstream instead of just failing silently. No API or account needed; live Jira automation on the same rubric lives in the Jira → PR workflow instead, to avoid two repos carrying the same Jira plumbing. Checked against the exact two real tickets from the Jira sandbox run — independently reproduces the same ready/blocked verdict.",
    stack: ["Claude Code Skill", "Node.js"],
    audiences: ["PMs", "Devs"],
    githubUrl: "https://github.com/juan-rome/pm-ticket-readiness-checker",
    demoUrl:
      "https://github.com/juan-rome/pm-ticket-readiness-checker/blob/main/README.md",
  },
  {
    slug: "design-fidelity-checker",
    title: "Design-to-Code Fidelity Checker",
    category: "Skill",
    status: "live",
    summary:
      "Pixel-level diffing between a design mockup and a live implementation — no Figma account required, just two same-size PNGs (or a URL, captured automatically). Verified with real rendered fixtures: a pixel-identical page reports 0% mismatch, and a deliberately drifted button (wrong color + padding) fails the tool's own default gate at 1.94%, with a diff image highlighting exactly that region.",
    stack: ["Claude Code Skill", "Playwright", "pixelmatch", "Node.js"],
    audiences: ["Designers", "Devs"],
    githubUrl: "https://github.com/juan-rome/design-fidelity-checker",
    demoUrl: "https://github.com/juan-rome/design-fidelity-checker/blob/main/README.md",
  },
  {
    slug: "cypress-test-generator",
    title: "Cypress Test Generator",
    category: "Skill",
    status: "live",
    summary:
      "Analyzes a diff's added UI surface (element ids, attributes, event listeners, class toggles) and drafts a Cypress test skeleton — real assertions where the diff proves them, explicit TODOs where business logic knowledge is required. Run against the exact real diff that added jira-pr-demo-target's character counter: correctly resolves an addEventListener and a classList.toggle back to their selectors across separate lines, with zero unresolved TODOs.",
    stack: ["Claude Code Skill", "Node.js", "Cypress"],
    audiences: ["Devs"],
    githubUrl: "https://github.com/juan-rome/cypress-test-generator",
    demoUrl: "https://github.com/juan-rome/cypress-test-generator/blob/main/README.md",
  },
  {
    slug: "pr-readiness-agent",
    title: "PR Readiness Agent",
    category: "Agent",
    status: "live",
    summary:
      "Reviews a PR's diff by gathering real signals from four sibling tools above — installed as actual git dependencies and imported directly, not reimplemented — then makes one holistic block/advisory/approve judgment call with reasoning, instead of printing a checklist. A high-confidence secret leak is a hard block nothing else can outweigh; everything else is a weighted, capped, compounding score with honest 'not evaluated' handling so an approval never overclaims. Verified against real diffs from this project's own repos, including a real bug the verification caught (a test-file detector that missed .mjs extensions) and fixed before shipping.",
    stack: ["Claude Code Agent", "Node.js", "Git"],
    audiences: ["Devs"],
    githubUrl: "https://github.com/juan-rome/pr-readiness-agent",
    demoUrl: "https://github.com/juan-rome/pr-readiness-agent/blob/main/README.md",
  },
];
