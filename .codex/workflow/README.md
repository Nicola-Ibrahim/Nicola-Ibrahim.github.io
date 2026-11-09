# Codex workflow

This folder helps the person directing Codex plan and track substantial portfolio
changes. It is documentation, not application configuration, and prompts do not
run automatically.

| Location | Purpose |
| --- | --- |
| [AGENTS.md](../../AGENTS.md) | Stable repository guidance |
| [Agent roles](../agents/) | Investigator, browser debugger, coder and reviewer instructions |
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
coordinator may implement directly or delegate a bounded change to the coder,
then integrates and reviews the result.

## Verification

The project uses npm. Common checks are `npm run check` and `npm run build`.
`npm run build` refreshes the roadmap search index and performs a static export.
Run only checks relevant to the task and report their actual results.

## Agent configuration

Delegation is optional. Handle small tasks directly and use at most one subagent
by default: investigator for uncertain code paths, browser debugger for a UI
reproduction, coder for a well-specified implementation, or reviewer for a
substantial, higher-risk diff. Add a second only for a separate unresolved
question or a useful independent review. Keep handoffs to five bullets or fewer.

The coder uses GPT-6 Luna for focused work; the reviewer uses GPT-6.1 Terra.
Use Sol for difficult planning when chosen as the main session model, and Terra
for visual or complex implementation when appropriate. For small tasks, the main
agent can work directly. Do not require a Sol-to-Luna-to-Terra chain on every
task: handoffs and retries also consume tokens. The coordinator defines the
scope, checks the result, and escalates difficult work when needed.

Codex discovers standalone role files in trusted projects when the client supports
custom agents. Role files do not launch agents or change the main session model.
Confirm the selected role and actual agent activity before describing a review as
independent. Model availability, permissions and tools depend on the session.

The project-scoped Chrome DevTools MCP server is configured in `../config.toml`.
Codex loads project configuration only for trusted projects. On first use, `npx`
may need network access to download the server. Restart or reload Codex after
trusting the repository, then check that `chrome-devtools` is connected. It starts
an isolated browser; the browser debugger should use the actual URL printed by
`npm run dev`.
