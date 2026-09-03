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
- [x] AI Lab's second entry: a Jira-to-PR workflow
      (github.com/juan-rome/jira-to-pr-workflow) with a ticket quality
      gate, a real embedded screenshot, and a Jira @-mention comment —
      run end to end against a real Jira sandbox (see that repo's
      RUNS.md): one ticket passed the gate and shipped a real PR
      (juan-rome/jira-pr-demo-target#1), one was correctly blocked.
- [x] AI Lab cards tagged by audience ("For Devs & PMs", etc.) — most of
      these tools generalize past a pure-engineering audience and the
      card should say so.
- [x] AI Lab's third entry: a Secret Leak Scanner
      (github.com/juan-rome/secret-leak-scanner) — local/offline diff
      scanner for AWS/GitHub/Slack tokens, private keys, and high-entropy
      literals. Dogfooded clean against a real 1,300+ line diff and
      caught its own false-positive bug via a fixture regression test
      before shipping.

## Next

- [ ] Replace `src/app/favicon.ico` — it's still create-next-app's default.
- [ ] Three more AI Lab entries planned, each for a non-engineering
      audience (explicitly not wrapping Storyblok/Optimizely — those are
      work-owned IP, not personal sandboxes). See a11y-audit-skill /
      jira-to-pr-workflow / secret-leak-scanner for the pattern to follow
      (SKILL.md + real tool + dogfooded example, not a toy demo).
  - [ ] PM Ticket Readiness Checker — coaching-style repackaging of the
        jira-to-pr-workflow quality gate, explaining _why_ each section
        (description/AC/testing plan) matters.
  - [ ] Design-to-Code Fidelity Checker — screenshot diffing between a
        design mockup image and a live implementation (no real Figma
        account required — accepts two arbitrary images).
  - [ ] Cypress Test Generator — analyzes a git diff/branch to generate
        Cypress test skeletons for new/changed UI surface; planned to
        dogfood against jira-pr-demo-target's character counter feature.
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
