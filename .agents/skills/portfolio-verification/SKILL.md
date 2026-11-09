---
name: portfolio-verification
description: Select focused npm, static export and browser checks for portfolio changes; use after executable changes or when verification is explicitly requested.
---

# Verify portfolio changes

Read `AGENTS.md`, the changed diff and acceptance criteria. Choose checks for
the affected behavior. For plan-only work, propose checks but do not run
implementation verification unless requested.

- Run `npm run check` for TypeScript, lint or component changes when relevant.
- Run `npm run build` when routes, MDX, search generation, metadata or static
  export behavior may be affected. The build regenerates
  `public/search-index.json`; inspect any resulting diff and preserve
  unrelated edits.
- For visible changes, inspect actual desktop and narrow layouts if browser
  tooling is available. Check the affected flow, keyboard/touch behavior,
  reduced motion and browser history as applicable. Use the actual dev URL.
- For WebGL changes, check fallback and cleanup paths where tools permit.

Report commands run, results, viewport/browser evidence and limits. Distinguish
pre-existing failures from regressions. Do not run broad suites merely to
repeat passing focused evidence, and do not claim independent review from a
configured role that did not run.
