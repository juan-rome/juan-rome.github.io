# Architecture

## Static export, deliberately

This site is deployed to GitHub Pages, which serves static files only —
there's no Node runtime available. `next.config.ts` sets `output: "export"`,
which means:

- No `next/image` optimization API (images are served unoptimized —
  `images.unoptimized: true`). If image-heavy content is added later, it
  should be pre-optimized at build time or served from a CDN.
- No server components that depend on request-time data, no API routes,
  no middleware. Every page is fully prerendered at build time.
- `trailingSlash: true` so GitHub Pages' static file server resolves
  directory-style routes without extra redirect rules.

This is a real constraint, not a limitation to work around — the entire
site is content that doesn't change per-request, so static export is the
correct architecture, not a compromise.

## Why `juan-rome/juan-rome.github.io` has no basePath

A `<user>.github.io` repository is a user/org Pages site, served from the
domain root (`https://juan-rome.github.io/`), unlike a project Pages site
(`https://juan-rome.github.io/some-repo/`) which needs a `basePath`. This
repo intentionally has none.

## Folder layout

```
src/app/         Next.js App Router entrypoints only — layout, page,
                  sitemap.ts, robots.ts. Kept thin; real UI lives in
                  components/, real data lives in content/.
src/components/
  ui/            Small, composable primitives with no page-specific
                  knowledge (Button, Container, Section, SectionHeading,
                  FadeIn). Every one of these should be reusable in a
                  different project with the imports changed.
  layout/        Header and Footer — structural, appear on every page.
  sections/      One component per homepage section. These know about
                  content/ but not about each other.
src/content/     Typed data files. This is the site's actual content —
                  see the "Content model" section in the README.
src/lib/         cn() class-merging utility, nav link config.
tests/unit/      Vitest + Testing Library, colocated by target (not
                  mirrored 1:1 against src/ — only components with real
                  logic get unit tests).
tests/e2e/       Playwright, homepage-level smoke and accessibility
                  coverage.
```

## Design tokens

All color, spacing-adjacent, and typography tokens live in
`src/app/globals.css` as CSS custom properties consumed through Tailwind
v4's `@theme inline`. Dark mode is the unconditional default (`:root`) —
it deliberately does **not** follow the visitor's OS `prefers-color-scheme`,
since there's no theme toggle yet and the brief calls for dark mode as the
primary experience, not "whichever the OS happens to be in." Light mode's
tokens exist (`:root[data-theme="light"]`) as a straightforward inversion
ready for a future toggle, but are otherwise unreachable today.

## Motion

Framer Motion is used in exactly one place conceptually — `FadeIn`, a
single reusable wrapper for the mount/scroll-reveal effect used across
every section heading and card. There's no motion library sprinkled
ad hoc through components. `FadeIn` checks `useReducedMotion()` and
renders a plain `<div>` with no animation when the user has requested
reduced motion, rather than relying on CSS overrides alone.
