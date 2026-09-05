export type Audience = "Devs" | "PMs" | "Designers";

/** What kind of Claude Code tool this is — shown as the card's colored badge.
 *  "Tool" is distinct from the rest: those are dev-facing, invoked by
 *  Claude on request; a "Tool" is a real product a site visitor uses
 *  directly, with its own live page on this site. */
export type ToolCategory = "Skill" | "Workflow" | "Agent" | "Tool" | "MCP Server";

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
  /** Overrides the demo link's default "See it in action" label, for tools
   *  where that link isn't literally an interactive demo (e.g. a request-it
   *  email link for a downloadable app with no in-browser demo). */
  demoLabel?: string;
  /** Overrides a spotlight ("Tool" category) card's default "Live in your
   *  browser" caption — that phrase is literally wrong for a native app
   *  that only runs after being downloaded, not in-browser. */
  spotlightLabel?: string;
};

/**
 * AI Engineering demos — real, working things only, added as they ship
 * (see docs/roadmap.md). Each one should have a public repo a visitor can
 * actually clone and run; that's what separates this section from the
 * Featured Engineering Work case studies, which are proprietary Earnest work.
 */
export const aiLabItems: AiLabItem[] = [
  {
    slug: "a11y-audit-skill",
    title: "Accessibility Audit",
    category: "Skill",
    status: "live",
    summary:
      "A Claude Code skill that runs a real axe-core scan and turns raw violations into a prioritized, fix-oriented report. Run against this very site, it found 3 real WCAG issues on the first pass, and those exact fixes shipped.",
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
      "A Claude Code workflow that fetches a Jira ticket, refuses to implement it without a real description, AC, and testing plan, then implements it and opens a PR with a real embedded screenshot. Run against a real Jira sandbox: one ticket passed the gate and shipped a real PR, one was correctly blocked.",
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
      "A coaching-style repackaging of the Jira → PR workflow's quality gate for PMs. Paste any ticket from Jira, Linear, Asana, or a doc, and it scores the description, AC, and testing plan, explaining why a thin section costs time downstream. Checked against the exact two real tickets from the Jira sandbox run, and it independently reproduces the same ready/blocked verdict.",
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
      "Pixel-level diffing between a design mockup and a live implementation. No Figma account required, just two same-size PNGs or a URL, captured automatically. Verified with real rendered fixtures: a pixel-identical page reports 0% mismatch, and a deliberately drifted button fails the tool's own default gate at 1.94%, with a diff image highlighting exactly that region.",
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
      "Analyzes a diff's added UI surface (element ids, attributes, event listeners, class toggles) and drafts a Cypress test skeleton. Real assertions where the diff proves them, explicit TODOs where business logic knowledge is required. Run against the real diff that added jira-pr-demo-target's character counter, it correctly resolves an event listener and a class toggle back to their selectors across separate lines, with zero unresolved TODOs.",
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
      "Checks a pull request's code changes using the four skills below (secret leaks, accessibility, design fidelity, and test coverage) as real inputs, then gives one clear verdict: block, approve, or flag concerns. A leaked secret always blocks the PR; anything it couldn't check is called out honestly rather than assumed fine.",
    stack: ["Claude Code Agent", "Node.js", "Git"],
    audiences: ["Devs"],
    githubUrl: "https://github.com/juan-rome/pr-readiness-agent",
    demoUrl: "https://github.com/juan-rome/pr-readiness-agent/blob/main/README.md",
  },
  {
    slug: "skill-quality-scorecard",
    title: "Skill Quality Scorecard",
    category: "Tool",
    status: "live",
    summary:
      "Paste any public GitHub repo and it's scored live, right here in your browser, against a real rubric: a SKILL.md, a substantial README, CI, real tests, a license, and dogfood evidence. Nothing is sent to a server; it calls GitHub's public API directly and runs entirely client-side. Scoring pr-readiness-agent this way surfaced two real gaps, which got fixed on the spot.",
    stack: ["GitHub API", "Node.js", "Client-side JS"],
    audiences: ["Devs", "PMs"],
    githubUrl: "https://github.com/juan-rome/skill-quality-scorecard",
    demoUrl: "/tools/scorecard/",
  },
  {
    slug: "skill-workflow-builder",
    title: "Skill Workflow Builder",
    category: "Tool",
    status: "live",
    summary:
      "Draw steps on a real node-based canvas, connect them, and export a real SKILL.md with a matching mermaid diagram, generated in actual dependency order (a real topological sort, not draw order) rather than hand-maintained. Recreating jira-to-pr-workflow's own real pipeline as a graph reproduces the exact same step order as that repo's hand-written SKILL.md.",
    stack: ["React Flow", "Mermaid", "Node.js"],
    audiences: ["Devs", "PMs"],
    githubUrl: "https://github.com/juan-rome/skill-workflow-builder",
    demoUrl: "/tools/workflow-builder/",
  },
  {
    slug: "jira-to-pr-workflow-mcp",
    title: "Jira → PR (MCP-native)",
    category: "Workflow",
    status: "live",
    summary:
      "The MCP-native sibling of Jira → PR, packaged as a real installable Claude Code plugin: two commands instead of a git clone and a remembered file path. Jira and GitHub access go through connected MCP servers instead of a personal token. Run against a real sandbox ticket, it correctly found an existing PR instead of duplicating it, surfacing two real integration bugs fixed on the spot.",
    stack: ["Claude Code Plugin", "Atlassian MCP Server", "GitHub MCP Server", "Node.js"],
    audiences: ["Devs", "PMs"],
    githubUrl: "https://github.com/juan-rome/jira-to-pr-workflow-mcp",
    demoUrl: "https://github.com/juan-rome/jira-to-pr-workflow-mcp#install",
  },
];
