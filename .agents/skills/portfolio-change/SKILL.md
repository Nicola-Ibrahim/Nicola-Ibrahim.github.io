---
name: portfolio-change
description: Plan, implement or review substantial changes to this Next.js portfolio while preserving its routes, content, visual language and static GitHub Pages export.
---

# Portfolio changes

Use this skill for substantial frontend features, visual changes, route changes,
or refactors in this portfolio. For a small, isolated fix, follow `AGENTS.md`
directly without creating a task record.

Establish the requested phase first: investigation, plan-only, implementation or
resume. On resume, reconcile the task record with current files and checks, then
continue only unfinished work within the existing authorization.

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
Separate confirmed facts from assumptions and identify decisions needing input.
For a plan-only request, stop after the requested plan or read-only investigation.
Handle clear tasks directly; use at most one subagent by default, chosen for the
main uncertainty. Avoid a fixed sequence of agent roles.

## Verify and hand off

Run focused checks appropriate to the change. The project offers `npm run check`
and `npm run build`; the latter regenerates the roadmap search index and static
export. For visual changes, inspect the rendered page at relevant screen sizes
when browser inspection is available. Report actual commands/results and any
verification limits. Review the diff and preserve unrelated or staged changes.
Ask agents for only the needed evidence in five bullets or fewer. Update the task
record with actual results and next action when the task scope permits it; do not
claim an independent review unless another agent performed one.
