# Implement an approved task

```text
Use $portfolio-change to implement the approved task in
.codex/workflow/tasks/<task-name>.md.

Follow AGENTS.md. Read the task and inspect staged and unstaged changes. Complete
only its authorized scope and preserve existing behavior and unrelated edits.
Run focused checks that match the acceptance criteria; use npm run check and/or
npm run build when appropriate. For a visible UI regression, use the read-only
browser-debugger role in .codex/agents/browser-debugger.toml when its MCP tools
are connected. Inspect the actual diff. Use the reviewer role in
.codex/agents/reviewer.toml for an independent read-only review when useful and
available for a substantial, higher-risk change. Do not run both the browser
debugger and reviewer by default; select the one that resolves the main remaining
uncertainty. If no agent runs, say so briefly. Address concrete findings and
re-check affected behavior.

Update the task record with actual results and remaining limits. Do not stage or
commit changes unless separately requested.
```
