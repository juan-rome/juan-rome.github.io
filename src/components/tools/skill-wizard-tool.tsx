"use client";

import { useState } from "react";
import { getRecommendation, type WizardAnswers } from "@/lib/skill-wizard";

type Question = {
  key: keyof WizardAnswers;
  text: string;
  helper: string;
};

const QUESTIONS: Question[] = [
  {
    key: "externalProtocol",
    text: "Does it need to be usable by other AI tools or IDEs, not just Claude Code?",
    helper:
      "Think: would a teammate using a different assistant entirely need to call this too?",
  },
  {
    key: "weighsSignals",
    text: "Does it need to weigh several different, sometimes-conflicting signals into one overall verdict?",
    helper:
      "Not just checking a fixed list and reporting everything found, but deciding one answer from several inputs.",
  },
  {
    key: "chainedSystems",
    text: "Does it fetch from one system, decide something, then act on a different system in sequence?",
    helper: "Example: pull a ticket from Jira, then open a PR on GitHub.",
  },
];

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function SkillWizardTool() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<WizardAnswers>>({});

  function answer(value: boolean) {
    const key = QUESTIONS[step].key;
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  const isDone = step >= QUESTIONS.length;
  const recommendation = isDone ? getRecommendation(answers as WizardAnswers) : null;

  return (
    <div className="border-border rounded-2xl border p-6">
      <div className="text-muted mb-5 flex gap-1.5 text-xs">
        {QUESTIONS.map((q, i) => (
          <span
            key={q.key}
            className={`h-1.5 flex-1 rounded-full ${i < step || isDone ? "bg-accent" : i === step ? "bg-accent/40" : "bg-border-strong"}`}
          />
        ))}
      </div>

      {!isDone ? (
        <div>
          <p className="text-lg font-medium">{QUESTIONS[step].text}</p>
          <p className="text-muted mt-2 text-sm">{QUESTIONS[step].helper}</p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => answer(true)}
              className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="border-border-strong text-foreground hover:border-foreground/40 cursor-pointer rounded-full border px-5 py-2.5 text-sm transition-colors"
            >
              No
            </button>
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-muted hover:text-foreground mt-4 cursor-pointer text-xs"
            >
              &larr; Back
            </button>
          )}
        </div>
      ) : recommendation ? (
        <div>
          <p className="text-muted text-xs font-medium tracking-wide uppercase">
            Recommendation
          </p>
          <p className="mt-1 text-2xl font-bold">{recommendation.category}</p>
          <p className="text-muted mt-3 text-sm">{recommendation.reasoning}</p>

          <p className="mt-4 text-sm">
            Closest real example on this site:{" "}
            <a
              href={recommendation.exampleUrl}
              target="_blank"
              rel="noreferrer"
              className="text-accent-text underline underline-offset-2"
            >
              {recommendation.exampleName}
            </a>
          </p>

          <p className="text-muted mt-5 text-xs font-medium tracking-wide uppercase">
            Starter scaffold
          </p>
          <pre
            tabIndex={0}
            aria-label="Starter scaffold"
            className="text-muted border-border bg-background mt-2 max-h-64 overflow-auto rounded-lg border p-3 text-xs whitespace-pre-wrap"
          >
            {recommendation.scaffold}
          </pre>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => downloadText("scaffold.txt", recommendation.scaffold)}
              className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              Download scaffold
            </button>
            <button
              type="button"
              onClick={restart}
              className="border-border-strong text-foreground hover:border-foreground/40 cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors"
            >
              Start over
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
