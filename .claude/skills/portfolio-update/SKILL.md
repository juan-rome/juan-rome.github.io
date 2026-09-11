---
name: portfolio-update
description: Interactive workflow for making a visual/content change to this portfolio site — asks what to update, edits the real components, previews it locally, gathers feedback and iterates, then verifies and deploys. Use whenever the user wants to tweak, add, or fix something on the live site (copy, layout, a card, a section, spacing, colors, etc).
---

# Portfolio update

This site is a Next.js 15 static export (dark-mode-only, Tailwind). This
skill is the loop for taking a change from "here's what I want" to live on
GitHub Pages, with a real local look before anything ships.

## 0. Check memory first

Before proposing an approach, skim this project's saved memory
(`/Users/koios/.claude/projects/-Users-koios-code-juan-rome-github-io/memory/MEMORY.md`
and the files it points to) for relevant feedback — conventions, past
corrections, and prior design decisions on this exact site. Apply anything
relevant without being asked again (e.g. no em dashes anywhere in copy or
commits; some prior visual explorations were mocked up standalone before
touching real components — see step 2 for when that still applies).

## 1. Ask what to update

If the request isn't already a fully specific, unambiguous change, ask.
Get concrete about: which section/component, and what "done" looks like.
Don't guess at scope for anything non-trivial.

## 2. Decide: direct edit, or mockup first?

- **Small, well-defined visual/content tweaks** (spacing, copy, a color, a
  size, reordering, a bug fix): edit the real component directly. This is
  the default and covers most requests.
- **Bigger from-scratch visual exploration** (a new design direction for a
  section, several competing concepts to compare): build it first as a
  standalone HTML mockup via the Artifact tool, iterate there, and get the
  user to pick a direction _before_ touching real components. Don't skip
  this for genuinely open-ended design work — it's cheaper to iterate on a
  mockup than on the live component tree.

## 3. Make the change

Edit the actual files under `src/`. Common landmarks:

- `src/components/sections/` — page sections (hero, experience, projects, etc.)
- `src/content/` — copy and structured data (experience.ts, projects.ts, site.ts, gadgets.ts, expertise.ts, ai-lab.ts)
- `src/components/ui/` — shared components (cards, buttons, fade-in, etc.)

Watch for two bug classes that have bitten this codebase before:

- **Circular percentage-width resolution**: an element with `w-full`
  nested inside an ancestor whose own width is shrink-to-fit (e.g. a
  `FadeIn` wrapper, or a flex item with no explicit width) can silently
  fail to resolve, especially when the sized element's children are
  `position: absolute`. Fix by giving the immediate ancestor an explicit
  `max-w-[…]` rather than relying on a deeper `w-full`.
- **Competing `transform`**: a plain CSS rule setting `transform: scale(…)`
  overrides any Tailwind translate-utility transform on the same element
  (they don't compose). Keep competing transforms in one Tailwind-driven
  conditional-class system, or build the one transform string by hand.

Never use an em dash ("—") in any copy, comment, or commit message —
grep for it before finishing.

## 4. Preview locally and get sign-off

Start the dev server (`preview_start` with `name: "dev"`), then show the
change:

- For a quick look: navigate to the relevant page/anchor in the Browser
  pane and screenshot it directly.
- For something you want to hand the user a static image of: a disposable
  Playwright script (`node check-*.mjs` in the scratchpad, then delete it)
  that screenshots the relevant element, sent via `SendUserFile`.

For any layout/sizing claim, measure — `getBoundingClientRect()` /
`getComputedStyle()` — rather than eyeballing a screenshot. This codebase
has had real bugs (a change silently not applying, a collapsed wrapper)
that looked fine at a glance.

Iterate on feedback in this same loop: edit, re-preview, re-measure, ask
again — don't move to verification until the user explicitly approves
what they see.

## 5. Verify

Once approved, run the full check before touching git:

```bash
npx tsc --noEmit
npm run lint
npm run format:check
```

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; rm -rf .next
npx playwright test tests/e2e/homepage.spec.ts
```

```bash
npm run build
```

Fix anything that fails and re-run before proceeding.

## 6. Ship it

Confirm with the user that they want to deploy now (don't assume approval
of the preview also means "push it"). Then:

```bash
git add <files>
git commit -m "$(cat <<'EOF'
<type>: <concise description>

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

Watch CI in the background (`gh run list` then `gh run watch <id>
--exit-status`) and report back once it's live.

## 7. Save what you learned

If the user gave feedback worth remembering for next time — a preference,
a correction, a confirmed approach — save it to the memory system
(`feedback` type) so future runs of this skill don't need to be told
twice.
