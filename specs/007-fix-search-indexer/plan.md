# Implementation Plan: Fix Roadmap Search Engine (Pointer System)

**Branch**: `007-fix-search-indexer` | **Date**: 2026-04-07 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/007-fix-search-indexer/spec.md`

---

## Summary

The roadmap search engine is broken in two distinct ways: (1) the **indexer** produces empty or near-empty `content` fields for most pages because MDX body prose is trapped inside JSX component wrappers, and (2) the **API route** (`/api/search`) is architecturally incompatible with the project's `output: 'export'` static-site configuration — API routes simply do not exist in a GitHub Pages static export.

The fix replaces the dynamic API route with a **build-time JSON file** written to the `public/` directory, and rebuilds the MDX stripping pipeline using `remove-markdown` to correctly extract all prose from JSX-wrapped content.

---

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 20+  
**Primary Dependencies**: `gray-matter` (frontmatter), `remove-markdown` (NEW — to install), `fuse.js` (client-side search)  
**Storage**: `public/search-index.json` — static file generated at build time  
**Testing**: Manual in-browser verification + `curl` of the static file  
**Target Platform**: GitHub Pages (static export via `next build && next export`)  
**Project Type**: Static Next.js App Router site (`output: 'export'`)  
**Performance Goals**: Index JSON ≤ 500KB; search results appear within one keystroke cycle (< 16ms)  
**Constraints**: **NO API routes** — `output: 'export'` in `next.config.js` makes `/app/api/*` impossible at runtime. Index must be a static file in `public/`.  
**Scale/Scope**: ~32 indexed pages today; designed to scale to ~200 pages before hitting the 500KB cap.

---

## Constitution Check

*GATE: Must pass before Phase 0 research.*

| Principle | Status | Notes |
|-----------|--------|-------|
| 1. Static Export is Law | ⚠️ **VIOLATION (current code)** | The existing `app/api/search/route.ts` uses `force-static` but API routes are **not supported** in `output: 'export'` mode. This plan fixes the violation by deleting the API route and replacing it with a `public/search-index.json` build script. |
| 2. App Router, Not Pages Router | ✅ Pass | Search component is already `'use client'`. No Pages Router conventions introduced. |
| 3. Tailwind Only | ✅ Pass | Search UI uses Tailwind exclusively. |
| 5. Component Discipline | ✅ Pass | `Search.tsx` is a named export client component. Data flows from static file, not self-fetched server data. |
| 6. TypeScript Strict Mode | ✅ Pass | All interfaces are explicitly typed. No `any`. |
| 8. Performance Baseline | ✅ Pass | Index is fetched once on first open, not on page load. 500KB cap enforced by build script. |
| 9. Accessibility Baseline | ✅ Pass | Keyboard navigation (↑↓ Enter) is implemented. All interactive elements are keyboard-reachable. |
| 10. No Runtime Deps for Static Content | ✅ Pass | Search index is fully static. Fuse.js runs in-browser but only on user interaction. |

**Constitution Gate: PASS** (with one violation being resolved by this plan itself).

---

## Project Structure

### Documentation (this feature)

```text
specs/007-fix-search-indexer/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── contracts/           ← Phase 1 output
│   └── search-index-schema.md
└── tasks.md             ← Phase 2 output (/speckit-tasks)
```

### Source Code Changes

```text
app/roadmap/_lib/
└── search-indexer.ts          ← MODIFY: rebuild stripMdx using remove-markdown

app/api/search/
└── route.ts                   ← DELETE: incompatible with output: 'export'

scripts/
└── build-search-index.ts      ← NEW: Node build script, writes public/search-index.json

public/
└── search-index.json          ← NEW: generated at build time, fetched by client

app/roadmap/_components/layout/
└── Search.tsx                 ← MODIFY: fetch from /search-index.json, add skeleton UI + fallback retry

package.json                   ← MODIFY: add prebuild hook, install remove-markdown
```

**Structure Decision**: Single Next.js App Router project. The only structural change is: API route deleted, new `scripts/` directory added for the build-time indexer script.

---

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Deleting existing API route | Constitution requires static export; API routes fail silently in this mode | Cannot keep the route — it does not function at runtime in static export |
| New `scripts/` directory | Build-time Node script must live outside the Next.js `app/` tree to avoid being treated as a route | Could inline in `next.config.js` but that file should stay minimal |
