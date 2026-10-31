# Codex workflow

This folder helps the person directing Codex plan and track substantial portfolio
changes. It is documentation, not application configuration, and prompts do not
run automatically.

| Location | Purpose |
| --- | --- |
| [AGENTS.md](../../AGENTS.md) | Stable repository guidance |
| [Agent roles](../agents/) | Read-only investigator, browser debugger and reviewer instructions |
| [Portfolio change skill](../../.agents/skills/portfolio-change/SKILL.md) | Procedure for substantial frontend changes |
| [Prompts](prompts/README.md) | Copy-and-paste planning, implementation and resume prompts |
| [Task template](templates/task.md) | Record for one substantial task |

## Working sequence

1. Inspect the working tree and trace the current behavior.
2. For substantial work, record evidence, scope and acceptance criteria in a task
   file. Small fixes can use a direct request.
3. Implement only the authorized scope and preserve unrelated changes.
4. Run appropriate checks. Use a browser or screenshot when visual behavior is a
   material part of the change and the environment supports it.
5. Review the actual diff, address concrete findings and report what was checked.

A plan prompt permits edits to its task record only. It does not authorize code
implementation. A resume prompt preserves the existing authorization. The
coordinator performs implementation and integrates any read-only findings.

## Verification

The project uses npm. Common checks are `npm run check` and `npm run build`.
`npm run build` refreshes the roadmap search index and performs a static export.
Run only checks relevant to the task and report their actual results.

## Agent configuration

Delegation is optional. Handle small tasks directly and use at most one subagent
by default: investigator for uncertain code paths, browser debugger for a UI
reproduction, or reviewer for a substantial, higher-risk diff. Do not chain all
three roles. Add a second only for a separate question the first agent cannot
answer. Ask for only the evidence needed, with a five-bullet handoff limit.

Role files configure future agents; they do not launch agents or prove a role was
automatically loaded. Confirm actual agent activity before describing a result as
independent. Permissions and tools still come from the parent session.

The project-scoped Chrome DevTools MCP server is configured in `../config.toml`.
Codex loads project configuration only for trusted projects. On first use, `npx`
may need network access to download the server. Restart or reload Codex after
trusting the repository, then check that `chrome-devtools` is connected. It starts
an isolated browser; the browser debugger should use the actual URL printed by
`npm run dev`.
