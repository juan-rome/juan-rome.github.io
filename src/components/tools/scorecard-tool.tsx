"use client";

import { useState } from "react";
import {
  scoreRepo,
  GitHubApiError,
} from "skill-quality-scorecard/scripts/score-repo.mjs";
import { cn } from "@/lib/utils";

type ScoreResult = Awaited<ReturnType<typeof scoreRepo>>;

const EXAMPLES = [
  { label: "juan-rome/pr-readiness-agent", value: "juan-rome/pr-readiness-agent" },
  { label: "octocat/Hello-World", value: "octocat/Hello-World" },
];

const GRADE_STYLES: Record<string, string> = {
  "Production-ready": "border-green-500/30 bg-green-500/15 text-green-400",
  "Solid foundation": "border-indigo-500/30 bg-indigo-500/15 text-indigo-400",
  "Early stage": "border-amber-500/30 bg-amber-500/15 text-amber-400",
  "Just getting started": "border-rose-500/30 bg-rose-500/15 text-rose-400",
};

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; result: ScoreResult }
  | { state: "error"; message: string };

export function ScorecardTool() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function runScore(repoInput: string) {
    if (!repoInput.trim()) return;
    setStatus({ state: "loading" });
    try {
      const result = await scoreRepo(repoInput);
      setStatus({ state: "success", result });
    } catch (error) {
      if (error instanceof GitHubApiError && error.rateLimited) {
        const resetTime = error.resetAt?.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        });
        setStatus({
          state: "error",
          message: `GitHub's public API rate limit (60 requests/hour, shared by every visitor's browser) is exhausted for now. It resets at ${resetTime ?? "the top of the hour"}.`,
        });
      } else {
        setStatus({
          state: "error",
          message:
            error instanceof Error
              ? error.message
              : "Something went wrong scoring that repo.",
        });
      }
    }
  }

  function handleExampleClick(value: string) {
    setInput(value);
    void runScore(value);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void runScore(input);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="owner/repo or a GitHub URL"
          className="border-border-strong bg-background-elevated text-foreground placeholder:text-muted-foreground flex-1 rounded-full border px-5 py-2.5 text-sm"
        />
        <button
          type="submit"
          disabled={status.state === "loading" || !input.trim()}
          className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status.state === "loading" ? "Scoring..." : "Score it"}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted">Try:</span>
        {EXAMPLES.map((example) => (
          <button
            key={example.value}
            type="button"
            onClick={() => handleExampleClick(example.value)}
            disabled={status.state === "loading"}
            className="border-border text-muted hover:border-foreground/40 hover:text-foreground cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {example.label}
          </button>
        ))}
      </div>

      <div className="mt-8" aria-live="polite">
        {status.state === "error" && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-300">
            {status.message}
          </div>
        )}

        {status.state === "success" && <ScoreCard result={status.result} />}
      </div>
    </div>
  );
}

function ScoreCard({ result }: { result: ScoreResult }) {
  return (
    <div className="border-border rounded-2xl border p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <a
            href={result.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent-text font-semibold hover:underline"
          >
            {result.owner}/{result.repo}
          </a>
          {result.description ? (
            <p className="text-muted mt-1 text-sm">{result.description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold">{result.percent}/100</span>
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium",
              GRADE_STYLES[result.grade]
            )}
          >
            {result.grade}
          </span>
        </div>
      </div>

      <ul className="border-border mt-6 divide-y rounded-xl border">
        {result.breakdown.map((line) => (
          <li key={line.signal} className="flex gap-3 p-4">
            <span aria-hidden="true">{line.met ? "✅" : "🔴"}</span>
            <div className="text-sm">
              <p className="font-medium">
                {line.signal}
                <span className="text-muted font-normal"> (+{line.points})</span>
              </p>
              <p className="text-muted mt-0.5">{line.why}</p>
            </div>
          </li>
        ))}
      </ul>

      {result.rateLimit?.remaining !== null &&
        result.rateLimit?.remaining !== undefined && (
          <p className="text-muted-foreground mt-4 text-xs">
            {result.rateLimit.remaining} GitHub API request
            {result.rateLimit.remaining === 1 ? "" : "s"} left this hour for your browser
            (unauthenticated, shared across every visitor from your IP).
          </p>
        )}
    </div>
  );
}
