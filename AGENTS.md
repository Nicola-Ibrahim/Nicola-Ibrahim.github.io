# Portfolio project guidance

## Goal and context

This is a personal portfolio built with the Next.js App Router and exported as a
static site for GitHub Pages. It presents work, background, skills, contact
information and a roadmap. The homepage black hole and interactive planet
navigation are part of the current experience. Use npm. Preserve existing design,
routes, content and navigation unless the request explicitly changes them.

## Project structure and boundaries

| Location | Owns |
| --- | --- |
| `app/_home/` | Homepage and black hole scene |
| `app/explore/` | Planet navigation and space scene |
| `app/_shared/` | Page shell, return links and cross-route transitions |
| `app/about/`, `app/contact/`, `app/skills/` | Page-specific content and presentation |
| `app/projects/` | Work data, case studies and MDX rendering |
| `app/roadmap/` | Roadmap content, search, MDX and reading UI |
| `public/`, `scripts/build-search-index.mjs` | Static assets and generated roadmap search index |
| `.agents/skills/`, `.codex/` | Task procedures, agent roles, prompts and records |

Keep route-specific components and styles beside their route. Put only genuinely
shared behavior in `app/_shared/`. Trace callers before moving code. The site
uses `output: 'export'` in `next.config.mjs`; do not introduce runtime server
requirements, server actions or image optimization that breaks static export.
`package-lock.json` is the lockfile; do not use pnpm, Yarn or Bun.

## Setup and checks

Run commands from the repository root.

| Purpose | Command |
| --- | --- |
| Install locked dependencies | `npm ci` |
| Start local development | `npm run dev` |
| Check code | `npm run check` |
| Build and static export | `npm run build` |

The build regenerates `public/search-index.json` and exports to `out/`.
Choose checks for the changed behavior. Do not edit generated files by hand.
For visible UI changes, inspect relevant viewport sizes when browser access is
available; report exactly what was and was not checked.

## When to use skills

Load the matching procedure only when its subject fits. Small fixes need no task
record or multi-agent sequence.

| Task | Skill |
| --- | --- |
| Plan, implement or resume a substantial change | [portfolio-change](.agents/skills/portfolio-change/SKILL.md) |
| Review route ownership, shared code or static export design | [portfolio-architecture-review](.agents/skills/portfolio-architecture-review/SKILL.md) |
| Change space scenes, motion or responsive visual composition | [portfolio-visual-change](.agents/skills/portfolio-visual-change/SKILL.md) |
| Revise portfolio or roadmap copy and case studies | [portfolio-content-change](.agents/skills/portfolio-content-change/SKILL.md) |
| Verify code, UI behavior and export after changes | [portfolio-verification](.agents/skills/portfolio-verification/SKILL.md) |
| Create or substantially revise a skill | Use `skill-creator` if available |

The [workflow guide](.codex/workflow/README.md) links prompts, roles and task
records. Skills describe procedures; role files describe delegated actors.

## Constraints that apply to every task

- Read relevant pages, content and shared components. Inspect `git status` and
  staged and unstaged diffs. Preserve unrelated work. Do not stage, commit,
  reset, switch branches or rewrite history unless requested.
- Follow the authorized phase. A plan-only task permits the plan, not code edits.
  Avoid broad cleanup, dependency changes or generated-file edits unless asked.
- Keep routes, links, browser back behavior and transition state working.
- Keep copy direct and factual. Do not invent results, users, metrics, capabilities
  or promises; avoid repetitive first-person phrasing.
- Preserve the dark palette and space visual language. Do not add a theme switch
  without a request.
- Support narrow screens, readable text, reachable controls and keyboard use.
  Respect `prefers-reduced-motion`. WebGL needs a fallback, bounded rendering
  cost and cleanup of listeners, animation frames and GPU resources.
- Preserve project and roadmap content unless the edit concerns it.
- Never expose credentials or private account data. Report actual checks and
  limits; claim independent review only when another agent performed it.

## Browser debugging and subagents

`.codex/config.toml` configures Chrome DevTools MCP for trusted sessions in an
isolated browser profile. For UI regressions, start `npm run dev` and use the URL
Next.js prints; its port can change. The browser debugger role is read-only and
does not authorize external account actions or form submissions.

Handle small tasks directly. Use at most one subagent by default: investigator
for unclear code paths, browser debugger for reproduced UI issues, coder for a
bounded implementation, or reviewer for a substantial risky diff. Another agent
is justified only by a separate unresolved question or useful independent review.
Give narrow scope and ask for concise evidence. Role configuration does not
prove that an agent ran.
