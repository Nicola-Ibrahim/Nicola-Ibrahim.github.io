---
name: portfolio-change
description: Plan, implement or review substantial changes to this Next.js portfolio while preserving its routes, content, visual language and static GitHub Pages export.
---

# Portfolio changes

Use this skill for substantial frontend features, visual changes, route changes,
or refactors in this portfolio. For a small, isolated fix, follow `AGENTS.md`
directly without creating a task record.

## Work with the existing app

- Read `AGENTS.md`, inspect the working tree and trace the relevant App Router
  route, page-local components, shared behavior and content before editing.
- Preserve the existing visual system and user-approved behavior. Make a focused
  change instead of broad redesign or cleanup.
- Keep page-specific code beside its route; use `app/_shared/` only for behavior
  that is genuinely shared.
- Keep project and roadmap copy accurate and concise. Do not add unsupported
  claims or metrics.
- Maintain static export compatibility in `next.config.mjs`; avoid runtime server
  requirements and features that need a Next.js server at deployment.
- For animation or WebGL work, preserve responsive composition, reduced-motion
  support, a non-WebGL fallback, and cleanup of GPU resources and listeners.

## Plan substantial work

For work spanning multiple files, routes, or interactions, use
`.codex/workflow/templates/task.md` and keep the task record under
`.codex/workflow/tasks/`. Write observable acceptance criteria and identify
existing behavior to preserve. Planning alone does not authorize implementation.

## Verify and hand off

Run focused checks appropriate to the change. The project offers `npm run check`
and `npm run build`; the latter regenerates the roadmap search index and static
export. For visual changes, inspect the rendered page at relevant screen sizes
when browser inspection is available. Report actual commands/results and any
verification limits. Review the diff and preserve unrelated or staged changes.
