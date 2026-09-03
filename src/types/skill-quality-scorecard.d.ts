// skill-quality-scorecard is a deliberately plain, dependency-free JS
// package (Node + browser, no build step) — consistent with every other
// AI Lab tool's repo. This ambient declaration covers only the shape this
// site actually consumes, rather than forcing a TypeScript build step
// onto a package that's meant to stay simple for any consumer.
declare module "skill-quality-scorecard/scripts/score-repo.mjs" {
  export type ScoreBreakdownLine = {
    signal: string;
    points: number;
    why: string;
    met: boolean;
  };

  export type RateLimitInfo = {
    remaining: number | null;
    resetAt: Date | null;
  };

  export type ScoreResult = {
    owner: string;
    repo: string;
    htmlUrl: string;
    description: string | null;
    stars: number;
    rateLimit: RateLimitInfo | null;
    score: number;
    totalPossible: number;
    percent: number;
    grade: string;
    breakdown: ScoreBreakdownLine[];
  };

  export function scoreRepo(
    input: string,
    opts?: { fetchImpl?: typeof fetch }
  ): Promise<ScoreResult>;

  export class GitHubApiError extends Error {
    status?: number;
    rateLimited: boolean;
    resetAt: Date | null;
  }
}
