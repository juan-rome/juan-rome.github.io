// skill-workflow-builder is a deliberately plain, dependency-free,
// framework-agnostic JS package — see skill-quality-scorecard.d.ts for
// why this site declares ambient types locally instead of forcing a
// build step onto packages meant to stay simple for any consumer.
declare module "skill-workflow-builder/scripts/graph-to-skill-md.mjs" {
  export type GraphNode = {
    id: string;
    label: string;
    description?: string;
  };

  export type GraphEdge = {
    source: string;
    target: string;
    label?: string;
  };

  export type GraphMeta = {
    name: string;
    description: string;
  };

  export function graphToSkillMd(
    nodes: GraphNode[],
    edges: GraphEdge[],
    meta: GraphMeta
  ): string;

  export class CycleError extends Error {
    nodesInCycle: string[];
  }
}

declare module "skill-workflow-builder/scripts/graph-to-mermaid.mjs" {
  import type {
    GraphNode,
    GraphEdge,
  } from "skill-workflow-builder/scripts/graph-to-skill-md.mjs";
  export function graphToMermaid(nodes: GraphNode[], edges: GraphEdge[]): string;
}
