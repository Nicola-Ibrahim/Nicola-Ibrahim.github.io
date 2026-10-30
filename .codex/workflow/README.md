# Codex workflow

This folder helps the person directing Codex plan and track substantial portfolio
changes. It is documentation, not application configuration, and prompts do not
run automatically.

| Location | Purpose |
| --- | --- |
| [AGENTS.md](../../AGENTS.md) | Stable repository guidance |
| [Agent roles](../agents/) | Read-only investigator and reviewer instructions |
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

The investigator and reviewer role files provide instructions for future agents;
they do not launch agents or prove that a role was automatically loaded. When
delegation is useful and available, assign a bounded read-only task and confirm
the actual agent activity before describing it as independent work. Permissions
and tools still come from the parent session.
