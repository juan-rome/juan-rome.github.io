export type ToolCategoryRecommendation = "Agent" | "Workflow" | "Skill" | "MCP Server";

export type WizardAnswers = {
  /** Does it need to be usable by other AI tools/IDEs, not just Claude Code? */
  externalProtocol: boolean;
  /** Does it need to weigh several different, sometimes-conflicting signals into one verdict? */
  weighsSignals: boolean;
  /** Does it fetch from one system, decide something, then act on a different system in sequence? */
  chainedSystems: boolean;
};

export type Recommendation = {
  category: ToolCategoryRecommendation;
  reasoning: string;
  exampleName: string;
  exampleUrl: string;
  scaffold: string;
};

/**
 * A real decision tree, not a coin flip: each branch maps to the actual
 * distinguishing trait this project's own AI Lab tools were categorized
 * by. Priority order matters and is deliberate, not arbitrary:
 *
 * - externalProtocol wins first because it's about the *delivery
 *   interface* (can other tools call this at all), which is orthogonal
 *   to how smart the logic behind it is.
 * - weighsSignals beats chainedSystems because judgment-weighing is a
 *   higher-order capability that can *contain* a chained sequence as one
 *   of its inputs (pr-readiness-agent runs several checks in sequence
 *   internally, but what makes it an Agent is the judgment call at the
 *   end, not the sequencing).
 * - chainedSystems alone (no judgment call, no protocol requirement) is
 *   a Workflow: a fixed pipeline across systems.
 * - Everything else defaults to Skill: a single, well-defined operation
 *   invoked on request.
 */
export function recommendCategory(answers: WizardAnswers): ToolCategoryRecommendation {
  if (answers.externalProtocol) return "MCP Server";
  if (answers.weighsSignals) return "Agent";
  if (answers.chainedSystems) return "Workflow";
  return "Skill";
}

const REASONING: Record<ToolCategoryRecommendation, string> = {
  "MCP Server":
    "Needing to be usable by other AI tools or IDEs, not just Claude Code, is about the delivery interface itself, not how the underlying logic works. That's what an MCP server is for: exposing a real capability over a standard protocol so anything speaking MCP can call it.",
  Agent:
    "Weighing several different, sometimes-conflicting signals into one overall verdict is a genuinely different kind of work than following fixed steps. A rubric with real tradeoffs (hard blocks, weighted scores, honest handling of what couldn't be checked) is what earns the Agent label here, not just bundling other tools' output together.",
  Workflow:
    "Fetching from one system, deciding something, then acting on a different system in a fixed sequence is exactly what a Workflow is: a real multi-step pipeline across systems, where the judgment involved is about *how* to do each step, not about weighing conflicting signals into one verdict.",
  Skill:
    "A single, well-defined operation invoked on request, without chaining across systems or weighing conflicting signals, is the simplest and most common real shape: a Skill.",
};

const EXAMPLES: Record<ToolCategoryRecommendation, { name: string; url: string }> = {
  "MCP Server": {
    name: "none built yet on this site",
    url: "https://modelcontextprotocol.io/",
  },
  Agent: {
    name: "PR Readiness Agent",
    url: "https://github.com/juan-rome/pr-readiness-agent",
  },
  Workflow: {
    name: "Jira → PR",
    url: "https://github.com/juan-rome/jira-to-pr-workflow",
  },
  Skill: {
    name: "Secret Leak Scanner",
    url: "https://github.com/juan-rome/secret-leak-scanner",
  },
};

const SCAFFOLDS: Record<ToolCategoryRecommendation, string> = {
  "MCP Server": `// A minimal MCP server tool registration.
// npm install @modelcontextprotocol/sdk

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "my-tool", version: "1.0.0" });

server.registerTool(
  "my-tool_do-the-thing",
  {
    description: "TODO: describe exactly what this does and when to call it.",
    inputSchema: { input: z.string() },
  },
  async ({ input }) => {
    // TODO: the real logic goes here.
    return { content: [{ type: "text", text: \`Processed: \${input}\` }] };
  }
);

await server.connect(new StdioServerTransport());
`,
  Agent: `scripts/
  gather-signals.mjs   // pure: calls the real inputs, records ran:false
                        // (not "clean") for anything that couldn't run
  score-risk.mjs        // pure: hard-blocker check, then a weighted,
                        // capped, compounding score, every weight named
  judge.mjs              // pure: turns the score into one verdict with
                        // line-by-line reasoning
  review.mjs             // the CLI: gatherSignals -> judge -> report

// Start with score-risk.mjs's rubric on paper before writing code:
// what's a hard block? what's weighted? what's the block threshold?
// Write that down and defend it, the same way pr-readiness-agent's
// SKILL.md documents every weight's reasoning.
`,
  Workflow: `---
name: my-workflow
description: TODO: one sentence: fetch X, gate on Y, act on Z.
---

# My Workflow

## Steps

1. **Fetch**: pull the real input from System A.
2. **Gate**: refuse to continue if the input is unusable; say what's missing.
3. **Act**: do the real work against System B.
4. **Close the loop**: report back to System A, with explicit confirmation
   before anything visible to another person.

// Mirror jira-to-pr-workflow's structure: a quality gate BEFORE the
// expensive step, and a --dry-run on anything that posts somewhere real.
`,
  Skill: `---
name: my-skill
description: TODO: when should Claude reach for this? Be specific enough
  that the description alone triggers correctly.
---

# My Skill

scripts/
  do-the-thing.mjs   // the real, testable logic
  test-thing.mjs      // real assertions, not just a manual smoke test

// Keep this one focused: a single, well-defined check or transformation,
// invoked on request. If it starts chaining across systems or weighing
// conflicting signals, it's grown into a Workflow or an Agent.
`,
};

export function getRecommendation(answers: WizardAnswers): Recommendation {
  const category = recommendCategory(answers);
  const example = EXAMPLES[category];
  return {
    category,
    reasoning: REASONING[category],
    exampleName: example.name,
    exampleUrl: example.url,
    scaffold: SCAFFOLDS[category],
  };
}
