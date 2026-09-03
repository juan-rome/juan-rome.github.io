# Roadmap

## Now (this milestone)

- [x] Foundation: Next.js 15 + TypeScript + Tailwind v4, full tooling
      (ESLint, Prettier, Husky, lint-staged, Vitest, Playwright)
- [x] Dark-mode-first design system and UI primitives
- [x] Navigation, Hero, layout, skip-to-content
- [x] Experience, Technical Expertise, Featured Projects (case studies),
      Engineering Philosophy, Resume, Contact sections
- [x] AI Lab section scaffolded (empty state, ready for real entries)
- [x] CI: typecheck/lint/format/unit/e2e/build on every push and PR
- [x] Deploy: GitHub Actions → GitHub Pages on every push to `main`
- [x] Baseline SEO: metadata, OpenGraph, Twitter cards, sitemap, robots.txt
- [x] Real `public/resume.pdf`, generated from the 09/2026 resume via
      `scripts/generate-resume.py`
- [x] Experience/achievements/expertise content reconciled against the
      09/2026 resume (corrected Capital One title and all employment
      dates, added the two separate H-E-B roles, added new stats)
- [x] AI Lab's first real entry: a Claude Code accessibility-audit skill
      (github.com/juan-rome/a11y-audit-skill) — dogfooded against this
      site, which is also how the two accessibility bugs below were found

## Next

- [ ] Replace `src/app/favicon.ico` — it's still create-next-app's default.
- [ ] Two more AI Lab entries planned: an MCP server (leaning toward
      wrapping Optimizely's API — ties directly to the Experimentation
      Infrastructure story) and a design/screenshot-to-component skill.
      See the a11y-audit-skill repo for the pattern each should follow
      (SKILL.md + real scanner/tool + dogfooded example, not a toy demo).
- [ ] Lighthouse pass: run against the deployed site and close any gap to
      100 on Performance/Accessibility/Best Practices/SEO.
- [ ] Structured data (JSON-LD `Person` schema) for the homepage.
- [ ] OpenGraph image (currently falls back to no image).
- [ ] Build an actual light/dark theme toggle — the light token set exists
      (`:root[data-theme="light"]`) but nothing sets that attribute yet, so
      light mode is currently unreachable by design (dark is the fixed
      default, deliberately ignoring OS `prefers-color-scheme` — see
      `design-decisions.md`). Once a toggle exists, QA light mode
      side-by-side with dark.
- [ ] Expand Playwright coverage: mobile viewport nav menu, keyboard
      traversal through the full nav, reduced-motion behavior.

## Future

- [ ] Engineering blog (would introduce MDX — see ADR-002 in
      `design-decisions.md` for why that's scoped separately from the
      structured content here)
- [ ] Architecture deep-dive articles
- [ ] Interactive demos embedded directly in project case studies
- [ ] System design write-ups
- [ ] Performance case studies with real before/after metrics
- [ ] Open source contributions section
