# Portfolio project guidance

This repository is a Next.js App Router portfolio exported as a static site for
GitHub Pages. Use npm and keep the current design, routes, content and navigation
behavior intact unless the request explicitly changes them.

## Start here

- Read this file and the relevant page, content and shared component before editing.
- Inspect `git status` and the staged and unstaged diff. Preserve unrelated work.
- Make only the requested change. Avoid broad cleanup, dependency changes,
  generated-file edits, commits or branch operations unless asked.
- Keep route-specific components and styles close to their route. Put genuinely
  shared behavior in `app/_shared/`; keep home and explore scene code with those
  pages.

## Project structure and runtime

- `app/_home/` owns the homepage and its black hole visual.
- `app/_shared/` owns shared page shell, return links and hero/space transitions.
- `app/explore/` owns planet navigation and the space scene.
- `app/about/`, `app/contact/`, and `app/skills/` own their page content.
- `app/projects/` owns project data, case studies and MDX rendering.
- `app/roadmap/` owns the roadmap UI, search and MDX content.
- `public/` contains static assets; `scripts/build-search-index.mjs` generates
  the roadmap search index.
- `next.config.mjs` uses `output: 'export'`. Do not introduce runtime server
  requirements, server actions, or image optimization that breaks static export.
- `package-lock.json` is the dependency lockfile. Use npm, not pnpm, Yarn or Bun.

## Preserve the experience

- Keep existing routes, links, browser back behavior and transition state working.
- Keep portfolio copy direct and factual. Do not invent project results, users,
  metrics, capabilities or promises. Avoid repetitive first-person phrasing.
- Follow the existing dark palette, typography and space-inspired visual language
  when extending the interface; do not add a theme switch without a request.
- Make layouts work on narrow screens. Keep text readable and controls reachable.
- Respect `prefers-reduced-motion`. WebGL scenes need a graceful fallback,
  bounded rendering cost, and cleanup of listeners, animation frames and GPU
  resources on unmount.
- Preserve project and roadmap content unless the requested edit concerns it.

## Verification

Use focused checks that fit the change. Available project checks are:

```sh
npm run check
npm run build
```

The build regenerates `public/search-index.json` and exports to `out/`. Report
commands actually run and any limits; do not imply visual or browser testing if
it was not performed.

## Browser debugging

- `.codex/config.toml` provides the Chrome DevTools MCP server for trusted Codex
  sessions. It launches an isolated Chrome profile; it does not attach to the
  user's everyday Chrome session.
- For UI regressions, start `npm run dev` and use the URL printed by Next.js.
  The port can change when another dev server is already running.
- Use `.codex/agents/browser-debugger.toml` for read-only reproduction and
  screenshots, console messages, or network evidence. Browser access does not
  authorize changes to external accounts or submissions.

## Subagents

- Handle small, clear tasks directly. Delegation is optional, not a workflow step.
- Use at most one subagent by default. Choose investigator for unclear code paths,
  browser debugger for a reproducible UI issue, or reviewer for a substantial,
  higher-risk diff. Do not run these roles in sequence by default.
- Add another agent only when the first result reveals a separate unresolved
  question. Give it a narrow scope and request concise evidence, not a full report.
