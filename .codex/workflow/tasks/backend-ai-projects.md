# Backend and AI portfolio projects

## Current state

Updated: 2026-10-31

- **Phase and authorized scope:** complete; add AAD_LLM and a planned RAG card, refine Work copy, and match every project's layout to the original featured project.
- **Next action:** hand off for visual review.
- **Open decisions:** RAG implementation and repository are not defined.
- **Baseline:** dev, 3c010bc. Existing staged workflow and Work copy changes preserved.
- **Latest checks and limits:** npm run check and npm run build passed; browser visual inspection unavailable.

## Goal and evidence

Show backend and AI work accurately. AAD_LLM's public README documents LLaMEA-based
optimizer generation, BBOB benchmarks, Python, and SQLite. RAG is a planned project.

## Scope and preserved behavior

- In scope: project cards, a short AAD_LLM description page, Work and planet wording.
- Out of scope: implementing RAG, changing dependencies, animations, or hidden projects.
- Preserve the featured solver, links, styling, and static export. Use the same responsive two-column layout for all three projects, stacking on narrow screens.

## Acceptance criteria

- [x] AAD_LLM has a factual summary and repository/detail links; detail route exports successfully.
- [x] RAG is explicitly planned, with no invented repository, demo, or implementation claims.
- [x] Copy describes engineering work; existing projects and routes remain available.
- [x] Checks and static export pass.

## Plan and progress

- [x] Read current content and verify AAD_LLM's public README.
- [x] Implement cards and copy, then apply the user's requested consistent project layout.
- [x] Verify and review the diff.

## Verification and review

| Command or review | Actual result | Limits |
| --- | --- | --- |
| npm run check | Passed | Lint and TypeScript |
| npm run build | Passed, 51 static pages | Includes /projects/aad-llm |
| git diff --check | Passed | No browser visual inspection |

Review: self-review. Existing staged changes preserved. Build-only next-env.d.ts change restored.

## Handoff

- Completed: factual project entries, AAD_LLM detail page, Work wording, and consistent project layouts.
- Remaining: visual browser review when available; RAG implementation is outside this task.
- Next action: hand off.
