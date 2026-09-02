# Design Decisions (ADR-style)

Short-form architecture decision records. Newest first.

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
