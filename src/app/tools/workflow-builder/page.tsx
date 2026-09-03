import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkflowBuilderTool } from "@/components/tools/workflow-builder-tool";

export const metadata: Metadata = {
  title: "Skill Workflow Builder",
  description:
    "Draw a workflow as connected steps and export a real SKILL.md with a matching mermaid diagram, generated in real dependency order.",
};

export default function WorkflowBuilderPage() {
  return (
    <Section>
      <SectionHeading
        level={1}
        eyebrow="AI Lab: live tool"
        title="Skill Workflow Builder"
        description="Draw steps, connect them, and export a real SKILL.md with a matching mermaid diagram, generated in actual dependency order (not draw order) using a real topological sort. Nothing is sent to a server; everything below runs in your browser."
      />
      <div className="mt-10">
        <WorkflowBuilderTool />
      </div>
      <p className="text-muted mt-10 max-w-3xl text-sm">
        This runs the real{" "}
        <a
          href="https://github.com/juan-rome/skill-workflow-builder"
          target="_blank"
          rel="noreferrer"
          className="text-accent-text underline underline-offset-2"
        >
          skill-workflow-builder
        </a>{" "}
        package for the graph-to-markdown logic, installed as an actual dependency of this
        site. The canvas itself is built on{" "}
        <a
          href="https://reactflow.dev/"
          target="_blank"
          rel="noreferrer"
          className="text-accent-text underline underline-offset-2"
        >
          React Flow
        </a>
        , and diagrams are rendered with{" "}
        <a
          href="https://mermaid.js.org/"
          target="_blank"
          rel="noreferrer"
          className="text-accent-text underline underline-offset-2"
        >
          Mermaid
        </a>
        .
      </p>
    </Section>
  );
}
