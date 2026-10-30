# Implement an approved task

```text
Use $portfolio-change to implement the approved task in
.codex/workflow/tasks/<task-name>.md.

Follow AGENTS.md. Read the task and inspect staged and unstaged changes. Complete
only its authorized scope and preserve existing behavior and unrelated edits.
Run focused checks that match the acceptance criteria; use npm run check and/or
npm run build when appropriate. Inspect the actual diff. Use the reviewer role in
.codex/agents/reviewer.toml for an independent read-only review when useful and
available. If none runs, label the review self-review or state it was not
performed. Address concrete findings and re-check affected behavior.

Update the task record with actual results and remaining limits. Do not stage or
commit changes unless separately requested.
```
