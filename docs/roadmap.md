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
      (github.com/juan-rome/a11y-audit-skill) — run against this very
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
      literals. Scanned clean against a real 1,300+ line diff, and its
      own fixture regression test caught a false-positive bug before
      shipping.
- [x] AI Lab's fourth entry: a PM Ticket Readiness Checker
      (github.com/juan-rome/pm-ticket-readiness-checker) — coaching-style
      repackaging of the jira-to-pr-workflow quality gate for PMs, for
      any ticket source (Jira, Linear, Asana, a doc) pasted as markdown,
      no API required. Checked against the exact two real tickets from
      the Jira sandbox run; independently reproduces the same
      ready/blocked verdict.
- [x] AI Lab cards now show a colored tool-category badge
      (Skill/Workflow/Agent/MCP Server) instead of a "Live" status
      badge, with the category word dropped from card titles now that
      the badge conveys it.
- [x] AI Lab's fifth entry: a Design-to-Code Fidelity Checker
      (github.com/juan-rome/design-fidelity-checker) — pixel-level
      diffing between a design mockup and a live implementation, no
      Figma account required. Verified with real rendered fixtures: 0%
      mismatch on a pixel-identical page, 1.94% on a deliberately
      drifted button — a real failing exit code under the tool's own
      default gate, not a number that needs an extra flag to matter.
- [x] AI Lab's sixth entry: a Cypress Test Generator
      (github.com/juan-rome/cypress-test-generator) — analyzes a diff's
      added UI surface (ids, attributes, event listeners, class toggles)
      and drafts a Cypress test skeleton, with explicit TODOs instead of
      fabricated assertions wherever business logic can't be inferred.
      Run against the exact real diff that added
      jira-pr-demo-target's character counter: correctly resolves an
      addEventListener and a classList.toggle to their selectors across
      separate lines, zero unresolved TODOs.
- [x] Cross-tool cleanup pass: moved live Jira label-trigger logic out of
      pm-ticket-readiness-checker and into jira-to-pr-workflow (which
      already owned the Jira client/ADF layer/quality gate) as a second
      label (`claude-ticket-checker` for check-only, `claude-implement`
      for the full pipeline) rather than two repos each carrying their
      own copy of the same plumbing. pm-ticket-readiness-checker goes
      back to its real differentiator — any ticket source, no API
      required. Also lowered design-fidelity-checker's default
      `--fail-at` from 2% to 1% so its own flagship example (1.94%
      mismatch) actually demonstrates a failing gate without an extra
      flag. jira-to-pr-workflow's two label triggers are also now gated
      on a required board status (`claude-ticket-checker` only fires on
      `To Do`, `claude-implement` only on `In Development`), so a
      leftover label on a ticket that already moved on can't silently
      fire the wrong thing.
- [x] AI Lab's seventh entry: a PR Readiness Agent
      (github.com/juan-rome/pr-readiness-agent) — the first real "Agent"
      entry. Installs and imports the four sibling tools above as actual
      git dependencies (not reimplementations) and makes one holistic
      block/advisory/approve call: a hard-blocker carve-out for
      high-confidence secrets, a weighted/capped/compounding score for
      everything else, and honest "not evaluated" handling so an approval
      never overclaims. Required refactoring a11y-audit-skill's
      `scan.mjs` to be importable (it previously ran `main()`
      unconditionally). Verified against real diffs from this project's
      own repos — including a real bug the verification caught (a
      test-file detector that missed `.mjs`) and fixed before shipping.
- [x] AI Lab cards regrouped into per-category carousels (Agent, Workflow,
      Skill, MCP Server, in that order) instead of one flat grid — each
      row's scroll arrows only render when its content actually overflows
      (Skill's 5 cards do on any realistic viewport; Agent/Workflow's
      single card doesn't). Verified end-to-end with real Playwright e2e
      tests rather than the interactive browser pane, after a long false
      trail: the pane's own rendering state was intermittently reporting
      a zero-width viewport, which looked like a scroll bug but wasn't —
      the actual Playwright suite (a real, deterministic browser session)
      confirmed the arrow-click scroll behavior works correctly on both
      desktop and mobile viewports. Also caught and fixed a real
      contrast violation this change introduced (`text-muted-foreground`
      on the per-category "N tools" label, 3.74:1 against a 4.5:1
      requirement) via the a11y-audit-skill scan.
- [x] AI Lab's eighth entry, and the first visitor-usable **Tool**
      (a new category, distinct from the dev-facing Skill/Workflow/
      Agent/MCP Server ones): the Skill Quality Scorecard
      (github.com/juan-rome/skill-quality-scorecard) scores any public
      GitHub repo against a real rubric (SKILL.md, README, CI, tests,
      license, dogfood evidence) via GitHub's public API, entirely
      client-side. It has a real live page on this site
      (`/tools/scorecard`) — installed as an actual dependency, not
      reimplemented for the page — where any visitor can paste a repo
      and get a real, live-scored result with reasoning. Dogfooded
      against pr-readiness-agent (scored 75/100, found two real gaps —
      no LICENSE, no dogfood-evidence file — both fixed on the spot, now
      100/100) and against octocat/Hello-World (GitHub's own example
      repo, scored 5/100, correctly identified as barebones). Caught a
      real bug during development (a URL-trimming order bug that left a
      trailing `.git` in place) before shipping.
- [x] AI Lab's ninth entry: the Skill Workflow Builder
      (github.com/juan-rome/skill-workflow-builder), a real node-based
      canvas (React Flow) for drawing a workflow as connected steps and
      exporting a real SKILL.md with a matching mermaid diagram. The
      actual engineering is the graph algorithm, not the drag-and-drop:
      a real topological sort (Kahn's algorithm) orders the exported
      steps by dependency, not draw order, with cycle detection that
      names exactly which nodes are involved. Dogfooded by recreating
      jira-to-pr-workflow's real pipeline as a graph, reproducing the
      exact same step order as that repo's hand-written SKILL.md. Live
      at `/tools/workflow-builder`. Building this also caught three real
      accessibility issues before shipping (unlabeled form inputs, a
      contrast failure in both a Tailwind class and Mermaid's own dark
      theme against this site's actual background, and a non-focusable
      scrollable region), all fixed via a11y-audit-skill.
- [x] Built, then removed, a tenth AI Lab entry: a "Which Skill Should I
      Build?" wizard at `/tools/wizard` (three yes/no questions
      recommending a Skill/Workflow/Agent/MCP Server category). Cut it
      after honest review found it didn't earn its place: with only 3
      binary questions there are exactly 4 possible outcomes, so it's a
      lookup table dressed as an interactive tool, not something that
      demonstrates real-time reasoning the way the other two live tools
      do. It also assumed an audience (someone actively scoping their
      own Claude Code tool against this project's own, non-standard
      Skill/Workflow/Agent taxonomy) that's much narrower than "anyone
      with a GitHub repo" (the Scorecard) or "anyone who wants a
      workflow diagram" (the Workflow Builder). Recognizing a shipped
      feature isn't earning its place and cutting it is itself worth
      recording, not just quietly deleting the evidence it existed.

## Next

- [ ] Replace `src/app/favicon.ico` — it's still create-next-app's default.
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
