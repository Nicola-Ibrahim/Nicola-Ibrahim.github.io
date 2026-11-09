---
name: portfolio-architecture-review
description: Trace this portfolio's Next.js route ownership and static export boundaries for structural reviews or plans; excludes ordinary local fixes.
---

# Review portfolio architecture

Read `AGENTS.md`, the relevant route entry point, its components, styles and
callers. For substantial task phases and records, use [portfolio-change](../portfolio-change/SKILL.md).
This skill supplies structural evidence and design evaluation, not a reason to
refactor on its own.

Trace actual imports and navigation before judging folder names. Identify what
belongs to a route, what is truly shared, and what is generated. Check whether
proposed moves affect static export, MDX generation, search indexing, browser
history, transition state, metadata or deep links. Keep server and client
boundaries intentional; client animation must not make static pages depend on a
runtime Next.js server.

Report concrete findings with file/symbol, trigger, impact and smallest
correction. Separate defects from style preferences and current behavior from
proposals. For a proposed move, list affected callers, routes and checks. A
read-only review ends with findings; a plan goes in the requested task record.
Implement only when separately authorized.
