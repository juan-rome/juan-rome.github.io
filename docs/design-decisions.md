# Design Decisions (ADR-style)

Short-form architecture decision records. Newest first.

---

## Note: smooth-scroll animations don't render in the dev browser-automation tool

Not an ADR — a debugging note, so this doesn't get rediscovered the hard
way. While verifying nav clicks, `window.scrollY` appeared stuck at 0 after
clicking a same-page `#hash` link, with only `window.location.hash`
updating. That looked like native anchor-scroll was broken, and briefly led
to building an unnecessary `HashLink` client component to force scrolling
via explicit JS — which didn't fix anything, because the actual cause is
narrower: `behavior: "smooth"` (both the CSS `scroll-behavior: smooth` on
`<html>` and `Element.scrollIntoView({ behavior: "smooth" })`) does not
visibly animate in the automated browser pane used for local verification.
Confirmed directly: `location.hash = "..."` with
`document.documentElement.style.scrollBehavior = "auto"` scrolls correctly
and immediately in that same pane; only the smooth variant silently no-ops.

Plain `<a href="#...">` tags plus `scroll-smooth` on `<html>` (see
`globals.css` and `Section`'s `scroll-mt-20`) are correct and sufficient —
this is standard, broadly-supported browser behavior. If a future
same-page-scroll bug report shows up, verify with `scroll-behavior: auto`
locally before assuming the native mechanism itself is broken; the smooth
animation specifically is unverifiable in this dev tool, not necessarily
broken for real visitors.

---

## ADR-005: Dark mode ignores `prefers-color-scheme` — it's the fixed default

**Status:** Accepted

**Context:** The initial implementation set dark tokens on `:root` but then
had a `@media (prefers-color-scheme: light)` block that overrode them back
to light whenever the visitor's OS was in light mode. Since there's no
theme toggle in the UI, that media query was the _only_ thing deciding
which theme rendered — meaning most visitors (anyone on a light-mode OS,
which is a lot of corporate/default setups) saw light mode, not the dark
design the brief calls "the primary experience." This surfaced during a
local browser check: the deployed-looking build rendered fully light with
no code signaling why.

**Decision:** Removed the `prefers-color-scheme` media query entirely.
Dark values on `:root` are now the unconditional default regardless of OS
setting. The light token set still exists at `:root[data-theme="light"]`,
dormant until a real toggle is built that sets that attribute.

**Consequence:** Every visitor sees dark mode today, full stop — which is
what "dark mode first" actually requires in the absence of a toggle. When
a light/dark toggle ships (see `roadmap.md`), it should set `data-theme`
explicitly rather than reintroducing a `prefers-color-scheme` fallback,
so the toggle — not the OS — is the source of truth.

---

## ADR-004: Node 22, not Node 18 or 20

**Status:** Accepted

**Context:** The development machine had Node 18.18.2 installed, which
meets Next.js 15's stated minimum (`>=18.18.0`). But `jsdom@30` (a Vitest
dependency) requires Node APIs (`webidl.util.markAsUncloneable`) that
aren't present until deeper into the Node 20/22 line, and several other
toolchain packages (Tailwind's native oxide engine, Vite's own tooling)
declare `engines` requirements of Node `>=20`.

**Decision:** Installed `nvm`, pinned the project to Node 22 LTS via
`.nvmrc`, and set `"engines": { "node": ">=20.9.0" }` in `package.json` as
a floor (22 is what's actually verified working; 20.9+ is the documented
minimum for the packages that need it).

**Consequence:** Anyone working in this repo should run `nvm use` first.
CI reads the same `.nvmrc` via `actions/setup-node`'s `node-version-file`,
so local and CI Node versions can't drift apart silently.

---

## ADR-003: Internal Earnest projects have no GitHub link or live demo

**Status:** Accepted

**Context:** The Featured Projects section describes real, proprietary
work at Earnest. There is no public repository or live demo to link to.

**Decision:** `Project.githubUrl` and `Project.demoUrl` are optional
fields, left `undefined` for every current entry, rather than pointing at
placeholder or unrelated URLs. The UI conditionally renders those links
only when present.

**Consequence:** The case-study write-up (problem/architecture/tradeoffs/
challenges/lessons/impact) has to carry the credibility on its own, since
there's no code to point to. This is the reason those write-ups are
detailed rather than one-line summaries.

---

## ADR-002: Content lives in typed TypeScript files, not MDX or a CMS

**Status:** Accepted

**Context:** The site's content (experience, projects, expertise,
philosophy, achievements) is small in volume, changes infrequently, and
benefits from type-checking against a shared shape (e.g., every project
needs a `problem`, `architecture`, etc.).

**Decision:** Content lives in `src/content/*.ts` as typed arrays/objects,
imported directly by section components. No MDX pipeline, no headless CMS.

**Consequence:** Adding content is a code change (a real PR, checked by
CI), which is the right amount of ceremony for a resume-adjacent site
where accuracy matters more than publishing velocity. If this ever grows
into a blog (see `docs/roadmap.md`), long-form posts should get MDX; the
structured, short-form content here should not.

---

## ADR-001: Static export for GitHub Pages

**Status:** Accepted

**Context:** GitHub Pages serves static files only. The site needs to
deploy there via `juan-rome/juan-rome.github.io`.

**Decision:** `output: "export"` in `next.config.ts`, with
`images.unoptimized: true` and `trailingSlash: true`.

**Consequence:** No server-rendered routes, no API routes, no
request-time personalization — which is fine, since none of that is
needed for this site. See `docs/architecture.md` for the full rationale.
