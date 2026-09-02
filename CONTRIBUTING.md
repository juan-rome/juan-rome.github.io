# Contributing

This is a personal site, but it's built like a maintained project — these
are the conventions for working in it (including future-me).

## Local setup

```bash
nvm use        # picks up Node 22 from .nvmrc
npm install
npm run dev
```

Husky installs a pre-commit hook (`npm run prepare`, wired to `npm install`)
that runs `lint-staged` — ESLint + Prettier on staged files. It will block a
commit that doesn't pass.

## Before opening a PR / pushing to main

```bash
npm run verify   # typecheck, lint, format:check, unit tests
npm run test:e2e # Playwright — needs a dev server, which the script starts itself
npm run build    # confirm the static export still succeeds
```

CI (`.github/workflows/ci.yml`) runs the same checks on every push and PR,
plus a deploy step to GitHub Pages on pushes to `main`.

## Commit style

Small, atomic commits with conventional-commit-style prefixes:

```
feat: add design system
fix: correct nginx routing example in project case study
refactor: simplify FadeIn reduced-motion handling
test: add accessibility coverage for skip link
docs: update architecture overview
content: add AI Lab demo entries
```

`content:` is used here specifically for changes to `src/content/*.ts` —
copy/data changes, as distinct from `feat`/`fix` which touch behavior.

## Adding content

- A new project → add an entry to `src/content/projects.ts` (see the type
  at the top of that file for the required fields — problem, architecture,
  tradeoffs, challenges, lessons, impact).
- A new role → `src/content/experience.ts`.
- A new AI Lab demo → `src/content/ai-lab.ts`. Only add entries for things
  that actually exist and work; the empty-state message is intentional,
  not a bug.

Don't add content directly in JSX. If a section component needs new
presentation logic to support a content shape, that's a real code change —
open it as its own commit.
