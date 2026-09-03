import { describe, expect, it } from "vitest";
import { recommendCategory, getRecommendation } from "@/lib/skill-wizard";

describe("recommendCategory", () => {
  it("recommends MCP Server whenever external protocol access is needed, regardless of other answers", () => {
    expect(
      recommendCategory({
        externalProtocol: true,
        weighsSignals: true,
        chainedSystems: true,
      })
    ).toBe("MCP Server");
    expect(
      recommendCategory({
        externalProtocol: true,
        weighsSignals: false,
        chainedSystems: false,
      })
    ).toBe("MCP Server");
  });

  it("recommends Agent when signals must be weighed, even if the task also chains systems", () => {
    expect(
      recommendCategory({
        externalProtocol: false,
        weighsSignals: true,
        chainedSystems: true,
      })
    ).toBe("Agent");
    expect(
      recommendCategory({
        externalProtocol: false,
        weighsSignals: true,
        chainedSystems: false,
      })
    ).toBe("Agent");
  });

  it("recommends Workflow for chained systems with no judgment-weighing or protocol need", () => {
    expect(
      recommendCategory({
        externalProtocol: false,
        weighsSignals: false,
        chainedSystems: true,
      })
    ).toBe("Workflow");
  });

  it("defaults to Skill when none of the distinguishing traits apply", () => {
    expect(
      recommendCategory({
        externalProtocol: false,
        weighsSignals: false,
        chainedSystems: false,
      })
    ).toBe("Skill");
  });
});

describe("getRecommendation", () => {
  it("pairs each category with a real, working example URL", () => {
    const categories = [
      { externalProtocol: true, weighsSignals: false, chainedSystems: false },
      { externalProtocol: false, weighsSignals: true, chainedSystems: false },
      { externalProtocol: false, weighsSignals: false, chainedSystems: true },
      { externalProtocol: false, weighsSignals: false, chainedSystems: false },
    ];
    for (const answers of categories) {
      const rec = getRecommendation(answers);
      expect(rec.exampleUrl).toMatch(/^https:\/\//);
      expect(rec.reasoning.length).toBeGreaterThan(20);
      expect(rec.scaffold.length).toBeGreaterThan(20);
    }
  });

  it("the Agent scaffold mirrors pr-readiness-agent's real gather/score/judge split", () => {
    const rec = getRecommendation({
      externalProtocol: false,
      weighsSignals: true,
      chainedSystems: false,
    });
    expect(rec.scaffold).toContain("gather-signals.mjs");
    expect(rec.scaffold).toContain("score-risk.mjs");
    expect(rec.scaffold).toContain("judge.mjs");
  });

  it("the Workflow scaffold includes a real SKILL.md frontmatter shape", () => {
    const rec = getRecommendation({
      externalProtocol: false,
      weighsSignals: false,
      chainedSystems: true,
    });
    expect(rec.scaffold).toContain("name: my-workflow");
    expect(rec.scaffold).toContain("description:");
  });

  it("contains no em-dashes in any generated reasoning or scaffold text", () => {
    const allAnswers = [
      { externalProtocol: true, weighsSignals: false, chainedSystems: false },
      { externalProtocol: false, weighsSignals: true, chainedSystems: false },
      { externalProtocol: false, weighsSignals: false, chainedSystems: true },
      { externalProtocol: false, weighsSignals: false, chainedSystems: false },
    ];
    for (const answers of allAnswers) {
      const rec = getRecommendation(answers);
      expect(rec.reasoning).not.toContain("—");
      expect(rec.scaffold).not.toContain("—");
    }
  });
});
