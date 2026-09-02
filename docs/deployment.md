# Deployment

## How it works

1. Every push to `main` (and every PR) triggers `.github/workflows/ci.yml`.
2. The `verify` job runs typecheck, lint, format check, unit tests,
   installs Playwright's Chromium, runs the e2e suite, and finally runs
   the production build — in that order, failing fast.
3. On a push to `main` only, the `deploy` job runs after `verify` succeeds:
   rebuilds (`npm run build`, producing `out/`), adds a `.nojekyll` file
   so GitHub Pages doesn't run Jekyll processing over the `_next` output
   directory, uploads `out/` as a Pages artifact, and deploys it via
   `actions/deploy-pages`.
4. GitHub Pages is configured with `build_type: workflow` (Actions-driven
   deployment, not the legacy branch-based deploy) — set once via:

   ```bash
   gh api -X POST repos/juan-rome/juan-rome.github.io/pages -f build_type=workflow
   ```

## Live URL

https://juan-rome.github.io — a user-page repo (`<user>.github.io`), so it
serves from the domain root with no `basePath`.

## Rolling back

GitHub Pages via Actions keeps each deployment as a distinct environment
deployment under the repo's **Environments → github-pages** history. A bad
deploy can be rolled back by re-running a previous successful `deploy` job
from the Actions tab, or by reverting the offending commit on `main` and
letting CI redeploy.

## Local production build check

```bash
npm run build   # writes the static export to out/
npx serve out   # or any static file server, to sanity-check the export
```
