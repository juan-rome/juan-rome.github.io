# juan-rome.github.io

Juan Romero's personal engineering site — a production Next.js app, not a
portfolio template. It's built and maintained the same way any other
product would be: typed, tested, linted, and deployed on every push to
`main`.

**Live:** https://juan-rome.github.io

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (used sparingly — see [`docs/design-decisions.md`](docs/design-decisions.md))
- Vitest + Testing Library (unit)
- Playwright (end-to-end)
- ESLint + Prettier + Husky + lint-staged
- GitHub Actions → GitHub Pages

## Getting started

Requires Node 22 (see `.nvmrc`; run `nvm use` if you have nvm installed).

```bash
npm install
npm run dev
```

## Scripts

| Script              | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Local dev server                                       |
| `npm run build`     | Production build, static export to `out/`              |
| `npm run lint`      | ESLint                                                 |
| `npm run format`    | Prettier, write mode                                   |
| `npm run typecheck` | `tsc --noEmit`                                         |
| `npm run test`      | Vitest unit tests                                      |
| `npm run test:e2e`  | Playwright end-to-end tests                            |
| `npm run verify`    | typecheck + lint + format:check + unit tests, in order |

`npm run verify` is what CI runs (plus the e2e suite and the build itself) —
run it before pushing.

## Project structure

```
src/
  app/            # Next.js App Router: layout, page, sitemap, robots
  components/
    ui/           # Small, reusable primitives (Button, Section, FadeIn, ...)
    layout/       # Header, Footer
    sections/     # One component per homepage section
  content/        # Typed content — experience, projects, expertise, etc.
                  # Editing the site's copy means editing these files, not JSX.
  lib/            # cn() class utility, nav config
tests/
  unit/           # Vitest + Testing Library
  e2e/            # Playwright
docs/             # Architecture, deployment, design decisions, roadmap
```

## Content model

Every section pulls from a typed file in `src/content/`. This is deliberate:
adding a project, a role, or an expertise group means editing data, not
touching component code. See [`docs/components.md`](docs/components.md) for
the pattern each section follows.

Facts in `src/content/experience.ts` and `src/content/projects.ts` are
sourced directly from performance review documents (2024 year-end, 2025
year-end, 2026 mid-year) — not invented, not padded.

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — why static export, why this folder layout
- [`docs/design-decisions.md`](docs/design-decisions.md) — ADRs for notable choices
- [`docs/deployment.md`](docs/deployment.md) — how CI/CD works end to end
- [`docs/components.md`](docs/components.md) — component conventions
- [`docs/roadmap.md`](docs/roadmap.md) — what's next, including the AI Lab section
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — local workflow, commit conventions

## License

Personal site — content and copy are © Juan Romero. Feel free to read the
code for reference; please don't republish the content as your own.
