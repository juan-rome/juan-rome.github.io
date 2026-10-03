import type { AiLabItem } from "@/content/ai-lab";

/** What device/platform a gadget runs on, shown as the sub-heading grouping
 *  its cards, the way AI Lab groups by tool category. */
export type GadgetPlatform = "macOS";

export type GadgetItem = AiLabItem & {
  platform: GadgetPlatform;
  /** A logo image used as the card's title in place of plain text; the
   *  title text stays as its alt. */
  titleLogo?: string;
  /** Small print under the stack tags, for what a visitor needs to run it. */
  requirements?: string;
  /** Character stickers: tucked into the top-right corner beside the title
   *  on narrow screens, standing next to the CTA on wide ones. `height` is
   *  each one's size relative to the others (the characters aren't drawn
   *  at the same scale), in px at the wide layout's size. */
  stickers?: { src: string; height: number }[];
};

/**
 * Personal tools that aren't about AI tooling at all, just things I needed
 * and built, unlike AI Lab's Claude Code skills/workflows/agents. Reuses
 * AiLabItem's shape (and its card components) since the fields already fit;
 * `category` stays "Tool" for type compatibility but isn't rendered here.
 */
export const gadgetItems: GadgetItem[] = [
  {
    slug: "burrow",
    title: "Burrow",
    titleLogo: "/gadgets/burrow/burrow-wordmark.svg",
    platform: "macOS",
    category: "Tool",
    status: "in-progress",
    summary:
      "A tiny buddy that lives at the top of your MacBook's screen and watches Claude Code for you. It works while Claude works and taps you when it's done.",
    stack: ["Swift", "SwiftUI", "SceneKit", "AppKit"],
    audiences: ["Devs"],
    demoUrl: "https://meetburrow.com",
    demoLabel: "Visit Burrow",
    spotlightLabel: "Free to try on Oct 13",
    requirements: "Works on any MacBook, notch or not. macOS 14 or later.",
    stickers: [
      { src: "/gadgets/burrow/burrow-wave.png", height: 132 },
      { src: "/gadgets/burrow/pixel-wave.png", height: 110 },
    ],
    nodeFlow: [
      {
        icon: "bolt",
        label: "Claude Code starts working",
        sub: "Burrow hears it through Claude Code's own hooks",
      },
      {
        icon: "sparkle",
        label: "Your buddy gets to work",
        sub: "Goggles down, an experiment starts bubbling in the notch",
        analyzing: true,
      },
      {
        icon: "cursor",
        label: "Claude needs you, Burrow asks",
        sub: "Allow or deny a request right from the notch",
      },
      {
        icon: "burst",
        label: "Done? You get a tap",
        sub: "A little cheer in the notch when Claude finishes",
      },
    ],
  },
];
