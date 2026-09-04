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
- [x] AI Lab's real tenth entry: jira-to-pr-workflow-mcp
      (github.com/juan-rome/jira-to-pr-workflow-mcp), the MCP-native
      sibling of jira-to-pr-workflow. Same imported quality gate; Jira and
      GitHub access go through the connected Atlassian and GitHub MCP
      servers instead of a personal API token and the gh CLI. Built as a
      separate repo rather than a v1 rewrite, specifically so v1's own
      real dogfood evidence wasn't put at risk for an approach that
      hadn't been proven yet. A real run against a live Jira sandbox
      ticket confirmed the full pipeline end to end, including the one
      thing genuinely unconfirmed at build time: the Atlassian MCP
      server's tool surface does support attaching a file and commenting
      back on a ticket (a real two-phase `uploadAttachmentToJiraIssue`
      tool). That same run found two real integration bugs before they
      could surprise anyone else running this: GitHub's MCP endpoint
      doesn't support OAuth's dynamic client registration and needs a
      scoped PAT instead, and a module-resolution failure when the
      ticket-normalizing script ran from outside its own repo directory
      (fixed with a proper CLI wrapper and a regression test that
      deliberately runs it from an unrelated working directory).
- [x] Repackaged jira-to-pr-workflow-mcp as a real installable Claude
      Code plugin instead of a clone-and-remember-a-file-path repo: the
      same repo doubles as its own self-hosted marketplace
      (`.claude-plugin/plugin.json` + `marketplace.json`), collapsing
      setup to `claude plugin marketplace add` + `claude plugin install`.
      Verified locally before shipping, not just written to a spec:
      `claude plugin validate --strict` passes with zero errors (now
      enforced in CI on every push), and a real local install correctly
      registered the skill and both declared MCP servers. The GitHub PAT
      is set via `--config`/`/plugin configure` against a declared
      `userConfig` schema rather than typed into a raw header string.
      Documented honestly what wasn't re-verified through this specific
      path: whether the plugin's own `.mcp.json` header substitution
      resolves a real GitHub connection end to end was left unconfirmed,
      since testing it would have meant disturbing the already-working
      manual MCP entries this repo's first real run was proven against.
- [x] Redesigned the AI Lab section: the two "Tool" entries (the ones a
      visitor can actually click and use) now get a distinct spotlight
      treatment with a live-status indicator, replacing the old per-
      category horizontal-scroll carousel entirely. Agent, Workflow, and
      the first Skill entry stay visible by default; the remaining four
      Skill entries sit behind a "+4 more skills" disclosure (a native
      `<details>`/`<summary>`, the same pattern the mobile nav menu
      already used) instead of requiring a scroll-and-click per row.
      Trimmed three descriptions (Jira → PR, Jira → PR MCP-native, PR
      Readiness Agent) that had grown longer than the rest across edits,
      for consistent card height. The now-unused `Carousel` component was
      deleted outright rather than left dead. Verified with a real a11y
      scan (0 violations) and rewritten e2e coverage for the new
      spotlight/disclosure/mobile-grid behavior, replacing the four tests
      that exercised the old carousel's scroll arrows.
- [x] Redesigned Experience and Projects, and added a shared
      `AnimatedCollapse` primitive (Framer Motion `height: "auto"`,
      respecting `prefers-reduced-motion`) used by every expand/collapse
      control on the site, including AI Lab's existing "+N more skills"
      toggle. Experience now opens the current role (Earnest) by default —
      first 5 highlights and the 9 most-used stack tags visible, the rest
      behind their own "+N more" disclosures — while past roles (Capital
      One, H-E-B) stay collapsed behind a "Show role details" toggle.
      Projects moved from always-expanded write-ups to an expandable
      case-study pattern: summary, impact, and stack visible by default,
      Problem/Architecture/Tradeoffs/Challenges/Lessons behind "Read the
      full case study". Merged H-E-B's two resume entries into one card
      with stacked titles (matching how Earnest's own promotion is shown)
      and restored a real highlight and the "Spring Batch" tag that had
      been dropped while drafting; added real stack tags confirmed against
      actual work history (GitHub Actions/PagerDuty/Cypress/Figma/Jira/
      GitHub/New Relic/Storybook/Storyblok CMS/Amplitude/FullStory across
      the three companies, PostgreSQL for H-E-B). Verified with new e2e
      coverage for both sections' disclosure behavior (default state,
      expand/collapse, focus return, collapse-control positioning) and a
      manual mobile pass that also fixed the role/period text
      right-aligning awkwardly once it wrapped under the card title on
      narrow viewports.

## Next

- [ ] Redo the hero corner-glow (reverted for now — see the "Revert" commit
      on top of `feat: add a one-time corner-tracing glow to the hero on
    load`): it was too large, and got clipped into a hard half-circle at
      each corner since the blob was centered exactly on the corner point
      with the section clipping via `overflow-hidden`. Fix: smaller blob,
      and/or corner waypoints inset from the actual edges so the full blob
      always stays within bounds — should read as one continuous glide,
      not four flat-edged pops.
- [ ] Header wordmark's purple pulsing dot should only show once the
      hero's "Juan Romero" `<h1>` has scrolled out of view, not always —
      it's currently unconditional. Likely an IntersectionObserver on that
      heading (same pattern as `useActiveSection`), toggling the dot's
      visibility in `Header`/`Nav`.
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
