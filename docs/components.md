# Component Guidelines

## The three layers

- **`components/ui`** — dumb, reusable, content-agnostic. `Button`,
  `Container`, `Section`, `SectionHeading`, `FadeIn`. None of these import
  from `content/`. If you find yourself wanting to import site content
  into a `ui/` component, it belongs in `sections/` instead.
- **`components/layout`** — structural, appear once per page (`Header`,
  `Footer`). Allowed to know about site-wide config (`content/site.ts`,
  `lib/nav.ts`).
- **`components/sections`** — one per homepage section. These are the only
  components that import from `content/` directly. A section component's
  job is entirely presentation: map typed content to markup.

## Adding a new section

1. Add a content file (or extend an existing one) in `src/content/`.
2. Build the section component in `src/components/sections/`, composing
   `Section` + `SectionHeading` + `ui/` primitives.
3. Wrap headings/cards in `FadeIn` for the standard scroll-reveal — don't
   hand-roll a new Framer Motion animation for a section unless there's a
   real reason the standard fade-and-rise doesn't fit.
4. Add the section to `src/app/page.tsx` in the right position.
5. If the section should be directly linkable from the nav, add it to
   `src/lib/nav.ts` and give the section's root element a matching `id`.
6. Add it to the e2e smoke test's list of expected section IDs in
   `tests/e2e/homepage.spec.ts`.

## Styling conventions

- Tailwind utility classes directly in JSX — no separate CSS modules per
  component. Shared values (colors, the accent, muted text) come from the
  design tokens in `globals.css`, referenced as Tailwind classes
  (`text-muted`, `bg-background-elevated`, etc.), not hardcoded hex values.
- `cn()` (from `lib/utils.ts`) for any component that needs to merge an
  incoming `className` prop with its own defaults — always via `cn()`,
  never plain string concatenation, so conflicting utility classes resolve
  predictably.

## Accessibility baseline for any new component

- Real semantic elements (`<button>`, `<nav>`, `<article>`) over
  `<div onClick>`.
- Anything interactive must be reachable and operable by keyboard alone —
  test with Tab/Enter, not just a mouse.
- Respect `prefers-reduced-motion` for any new animation (see how
  `FadeIn` does it) — don't add a second, ungoverned animation path.
