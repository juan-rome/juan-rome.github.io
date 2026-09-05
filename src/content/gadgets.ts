import type { AiLabItem } from "@/content/ai-lab";

/** What device/platform a gadget runs on — shown as the sub-heading grouping
 *  its cards, the way AI Lab groups by tool category. */
export type GadgetPlatform = "macOS";

export type GadgetItem = AiLabItem & { platform: GadgetPlatform };

/**
 * Personal tools that aren't about AI tooling at all — just things I needed
 * and built, unlike AI Lab's Claude Code skills/workflows/agents. Reuses
 * AiLabItem's shape (and its card components) since the fields already fit;
 * `category` stays "Tool" for type compatibility but isn't rendered here.
 */
export const gadgetItems: GadgetItem[] = [
  {
    slug: "standup-drafter",
    title: "Standup Drafter",
    platform: "macOS",
    category: "Tool",
    status: "live",
    summary:
      "A macOS menu bar app that drafts a standup from yesterday's GitHub activity, grouped by Jira ticket with live status, and posts it straight to Slack. Hit a real Atlassian API deprecation mid-build (GET /rest/api/3/search retired, 410 Gone); switched to /search/jql and verified against a real ticket, KAN-4, which now resolves its live status and a working browse link in the posted message.",
    stack: ["Electron", "GitHub API", "Slack API", "Jira API"],
    audiences: ["Devs"],
    githubUrl: "https://github.com/juan-rome/standup-drafter",
    demoUrl:
      "mailto:jjromee05@gmail.com?subject=Standup%20Drafter%20-%20Install%20Request&body=Hi%2C%20I%27d%20like%20to%20try%20the%20Standup%20Drafter%20app%20locally.",
    demoLabel: "Request the app",
    spotlightLabel: "Runs on your Mac",
  },
];
