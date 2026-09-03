import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillWizardTool } from "@/components/tools/skill-wizard-tool";

export const metadata: Metadata = {
  title: "Which Skill Should I Build?",
  description:
    "A short guided wizard that recommends whether your idea is a Claude Code Skill, Workflow, Agent, or MCP Server, and why, with a starter scaffold.",
};

export default function WizardPage() {
  return (
    <Section>
      <SectionHeading
        level={1}
        eyebrow="AI Lab: live tool"
        title="Which Skill Should I Build?"
        description="Three questions about what you're actually trying to automate, mapped to the same real distinctions this site's own AI Lab tools are categorized by, ending in a recommendation and a real starter scaffold you can copy."
      />
      <div className="mt-10 max-w-2xl">
        <SkillWizardTool />
      </div>
      <p className="text-muted mt-10 max-w-2xl text-sm">
        The decision tree and every scaffold are real logic in this site&rsquo;s own
        codebase (<code className="text-xs">src/lib/skill-wizard.ts</code>), covered by
        unit tests, not hardcoded copy per answer combination.
      </p>
    </Section>
  );
}
