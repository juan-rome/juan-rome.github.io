"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  graphToSkillMd,
  CycleError,
} from "skill-workflow-builder/scripts/graph-to-skill-md.mjs";
import mermaid from "mermaid";

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `step-${idCounter}`;
}

const EXAMPLE_GRAPH: { nodes: Node[]; edges: Edge[] } = {
  nodes: [
    {
      id: "fetch",
      position: { x: 0, y: 0 },
      data: { label: "fetch-ticket.mjs", description: "Pull the ticket from Jira." },
    },
    {
      id: "gate",
      position: { x: 220, y: 0 },
      data: { label: "Quality gate", description: "Stop if underspecified." },
    },
    {
      id: "implement",
      position: { x: 440, y: 0 },
      data: { label: "Implement", description: "Make the change." },
    },
    {
      id: "verify",
      position: { x: 660, y: 0 },
      data: { label: "Verify", description: "Run the repo's own checks." },
    },
    {
      id: "pr",
      position: { x: 880, y: 0 },
      data: { label: "Open PR", description: "Real PR, real screenshot." },
    },
  ],
  edges: [
    { id: "e1", source: "fetch", target: "gate" },
    { id: "e2", source: "gate", target: "implement", label: "sufficient" },
    { id: "e3", source: "implement", target: "verify" },
    { id: "e4", source: "verify", target: "pr" },
  ],
};

// Mermaid's built-in "dark" theme assumes a mid-dark gray background;
// against this site's near-black background it leaves some text (edge
// labels especially) under WCAG's 4.5:1 contrast minimum. Pinning the
// actual colors this site uses keeps it a verified pass instead of a
// theme default we haven't checked.
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "strict",
  themeVariables: {
    textColor: "#f2f2f5",
    primaryTextColor: "#f2f2f5",
    lineColor: "#9a9ba3",
    edgeLabelBackground: "#101014",
  },
});

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function MermaidPreview({ chart }: { chart: string }) {
  const [svg, setSvg] = useState("");
  const renderId = useRef(0);

  useEffect(() => {
    renderId.current += 1;
    const currentRender = renderId.current;
    mermaid
      .render(`workflow-preview-${currentRender}`, chart)
      .then(({ svg: rendered }) => {
        if (renderId.current === currentRender) setSvg(rendered);
      })
      .catch(() => {
        if (renderId.current === currentRender) setSvg("");
      });
  }, [chart]);

  if (!svg) return null;
  // mermaid.render() output is self-generated SVG, not user-supplied HTML.
  return <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export function WorkflowBuilderTool() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(EXAMPLE_GRAPH.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(EXAMPLE_GRAPH.edges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    name: "Jira to PR",
    description: "Fetch a ticket, gate it, implement it, open a PR.",
  });

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      onNodesChange(changes);
      const selectChange = changes.find((c) => c.type === "select");
      if (selectChange && "selected" in selectChange) {
        setSelectedNodeId(selectChange.selected ? selectChange.id : null);
      }
    },
    [onNodesChange]
  );

  function addStep() {
    const id = nextId();
    setNodes((nds) => [
      ...nds,
      {
        id,
        position: {
          x: 80 + ((nds.length * 60) % 400),
          y: 120 + ((nds.length * 80) % 200),
        },
        data: { label: "New step", description: "" },
      },
    ]);
  }

  function loadExample() {
    idCounter = 0;
    setNodes(EXAMPLE_GRAPH.nodes);
    setEdges(EXAMPLE_GRAPH.edges);
    setMeta({
      name: "Jira to PR",
      description: "Fetch a ticket, gate it, implement it, open a PR.",
    });
    setSelectedNodeId(null);
  }

  function clearCanvas() {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
  }

  function updateSelectedNode(field: "label" | "description", value: string) {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId ? { ...n, data: { ...n.data, [field]: value } } : n
      )
    );
  }

  function deleteSelectedNode() {
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId)
    );
    setSelectedNodeId(null);
  }

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const graphNodes = useMemo(
    () =>
      nodes.map((n) => ({
        id: n.id,
        label: String(n.data.label ?? ""),
        description: n.data.description ? String(n.data.description) : undefined,
      })),
    [nodes]
  );
  const graphEdges = useMemo(
    () =>
      edges.map((e) => ({
        source: e.source,
        target: e.target,
        label: e.label ? String(e.label) : undefined,
      })),
    [edges]
  );

  const { skillMd, mermaidChart, cycleError } = useMemo(() => {
    try {
      const md = graphToSkillMd(graphNodes, graphEdges, meta);
      const mermaidMatch = md.match(/```mermaid\n([\s\S]*?)\n```/);
      return {
        skillMd: md,
        mermaidChart: mermaidMatch?.[1] ?? "",
        cycleError: null as string | null,
      };
    } catch (error) {
      if (error instanceof CycleError) {
        return { skillMd: "", mermaidChart: "", cycleError: error.message };
      }
      throw error;
    }
  }, [graphNodes, graphEdges, meta]);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addStep}
          className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors"
        >
          + Add step
        </button>
        <button
          type="button"
          onClick={loadExample}
          className="border-border-strong text-foreground hover:border-foreground/40 cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors"
        >
          Load example
        </button>
        <button
          type="button"
          onClick={clearCanvas}
          className="text-muted hover:text-foreground cursor-pointer px-3 py-2 text-sm transition-colors"
        >
          Clear
        </button>
      </div>

      <div className="border-border bg-background-elevated mt-4 h-[420px] overflow-hidden rounded-2xl border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode="dark"
        >
          <Background gap={16} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="border-border rounded-2xl border p-5">
            <label
              htmlFor="skill-name"
              className="text-muted block text-xs font-medium tracking-wide uppercase"
            >
              Skill name
            </label>
            <input
              id="skill-name"
              type="text"
              value={meta.name}
              onChange={(e) => setMeta((m) => ({ ...m, name: e.target.value }))}
              className="border-border-strong bg-background text-foreground mt-1.5 w-full rounded-lg border px-3 py-2 text-sm"
            />
            <label
              htmlFor="skill-description"
              className="text-muted mt-4 block text-xs font-medium tracking-wide uppercase"
            >
              Description
            </label>
            <textarea
              id="skill-description"
              value={meta.description}
              onChange={(e) => setMeta((m) => ({ ...m, description: e.target.value }))}
              rows={2}
              className="border-border-strong bg-background text-foreground mt-1.5 w-full rounded-lg border px-3 py-2 text-sm"
            />

            {selectedNode ? (
              <div className="border-border mt-5 border-t pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Editing step</p>
                  <button
                    type="button"
                    onClick={deleteSelectedNode}
                    className="cursor-pointer text-xs text-rose-400 hover:underline"
                  >
                    Delete step
                  </button>
                </div>
                <label
                  htmlFor="step-label"
                  className="text-muted mt-3 block text-xs font-medium tracking-wide uppercase"
                >
                  Label
                </label>
                <input
                  id="step-label"
                  type="text"
                  value={String(selectedNode.data.label ?? "")}
                  onChange={(e) => updateSelectedNode("label", e.target.value)}
                  className="border-border-strong bg-background text-foreground mt-1.5 w-full rounded-lg border px-3 py-2 text-sm"
                />
                <label
                  htmlFor="step-description"
                  className="text-muted mt-3 block text-xs font-medium tracking-wide uppercase"
                >
                  Step description
                </label>
                <textarea
                  id="step-description"
                  value={String(selectedNode.data.description ?? "")}
                  onChange={(e) => updateSelectedNode("description", e.target.value)}
                  rows={2}
                  className="border-border-strong bg-background text-foreground mt-1.5 w-full rounded-lg border px-3 py-2 text-sm"
                />
              </div>
            ) : (
              <p className="text-muted mt-5 text-sm">
                Click a step on the canvas to edit its label and description. Drag from a
                step&rsquo;s edge to another step to connect them.
              </p>
            )}
          </div>
        </div>

        <div>
          {cycleError ? (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-300">
              {cycleError}
            </div>
          ) : (
            <div className="border-border rounded-2xl border p-5">
              <p className="text-muted text-xs font-medium tracking-wide uppercase">
                Live preview
              </p>
              {mermaidChart ? <MermaidPreview chart={mermaidChart} /> : null}
              <pre
                tabIndex={0}
                aria-label="Generated SKILL.md preview"
                className="text-muted border-border bg-background mt-4 max-h-56 overflow-auto rounded-lg border p-3 text-xs whitespace-pre-wrap"
              >
                {skillMd || "Add at least one step to generate a SKILL.md."}
              </pre>
              <button
                type="button"
                onClick={() => downloadFile("SKILL.md", skillMd)}
                disabled={!skillMd}
                className="bg-foreground text-background hover:bg-foreground/90 mt-4 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                Download SKILL.md
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
