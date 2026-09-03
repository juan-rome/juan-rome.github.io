import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScorecardTool } from "@/components/tools/scorecard-tool";

export const metadata: Metadata = {
  title: "Skill Quality Scorecard",
  description:
    "Score any public GitHub repo against the same real-tests/CI/docs/dogfood rigor bar used across this site's AI Lab tools.",
};

export default function ScorecardPage() {
  return (
    <Section>
      <SectionHeading
        level={1}
        eyebrow="AI Lab: live tool"
        title="Skill Quality Scorecard"
        description="Paste any public GitHub repo and it's scored live, in your browser, against a real rubric: a SKILL.md, a substantial README, CI, real tests, a license, and dogfood evidence. Nothing is sent to a server; this calls GitHub's public API directly from your browser using the exact same open-source scoring logic as the CLI."
      />
      <div className="mt-10 max-w-3xl">
        <ScorecardTool />
      </div>
      <p className="text-muted mt-10 max-w-3xl text-sm">
        This runs the real{" "}
        <a
          href="https://github.com/juan-rome/skill-quality-scorecard"
          target="_blank"
          rel="noreferrer"
          className="text-accent-text underline underline-offset-2"
        >
          skill-quality-scorecard
        </a>{" "}
        package, installed as an actual dependency of this site rather than reimplemented
        for the page. GitHub&rsquo;s unauthenticated API is capped at 60 requests/hour per
        IP, shared by every visitor scoring a repo from your network; each score costs 2-4
        requests.
      </p>
    </Section>
  );
}
