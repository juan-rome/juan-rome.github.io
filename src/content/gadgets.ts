import type { AiLabItem } from "@/content/ai-lab";

/** What device/platform a gadget runs on, shown as the sub-heading grouping
 *  its cards, the way AI Lab groups by tool category. */
export type GadgetPlatform = "macOS";

export type GadgetItem = AiLabItem & {
  platform: GadgetPlatform;
};

/**
 * Personal tools that aren't about AI tooling at all, just things I needed
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
      "A macOS menu bar app that turns yesterday's GitHub activity into a standup draft, grouped by Jira ticket with live status, and posts it straight to Slack, all without leaving your menu bar.",
    stack: ["Electron", "GitHub API", "Slack API", "Jira API"],
    audiences: ["Devs"],
    githubUrl: "https://github.com/juan-rome/standup-drafter",
    demoUrl:
      "mailto:jjromee05@gmail.com?subject=Standup%20Drafter%20-%20Install%20Request&body=Hi%2C%20I%27d%20like%20to%20try%20the%20Standup%20Drafter%20app%20locally.",
    demoLabel: "Request the app",
    spotlightLabel: "Runs on your Mac",
    nodeFlow: [
      {
        icon: "github",
        label: "Yesterday's GitHub activity",
        sub: "PRs, reviews, and commits, pulled automatically",
      },
      {
        icon: "group",
        label: "Grouped by Jira ticket",
        sub: "Live status shown next to each one",
      },
      {
        icon: "draft",
        label: "Standup draft written",
        sub: "Reviewable in the menu bar popover",
        analyzing: true,
      },
      {
        icon: "send",
        label: "Posted to Slack",
        sub: "One click, once you've reviewed it",
      },
    ],
  },
];
