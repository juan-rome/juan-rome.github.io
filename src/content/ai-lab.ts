export type AiLabItem = {
  slug: string;
  title: string;
  status: "live" | "in-progress" | "planned";
  summary: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
};

/**
 * AI Engineering demos section — deliberately sparse for now. Populate this
 * as real AI workflows/plugins/CRM demos ship, rather than filling it with
 * placeholder cards. See docs/roadmap.md.
 */
export const aiLabItems: AiLabItem[] = [];
