# Tasks: Fix Roadmap Search Engine (007-fix-search-indexer)

**Branch**: `007-fix-search-indexer`  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Data Model**: [data-model.md](./data-model.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install missing dependency and wire the build script into the npm lifecycle.

- [ ] T001 Install `remove-markdown` as a production dependency: run `npm install remove-markdown` in `/Users/nicolaibrahim/Desktop/proj/Nicola-Ibrahim.github.io`
- [ ] T002 Create the `scripts/` directory at `scripts/build-search-index.mjs` (empty file, ES module)
- [ ] T003 [P] Add `"prebuild": "node scripts/build-search-index.mjs"` to the `scripts` block in `package.json`
- [ ] T004 [P] Delete the now-obsolete API route file `app/api/search/route.ts` (incompatible with `output: 'export'`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The build-time indexer is a hard prerequisite for all user stories — the search component cannot work without `public/search-index.json`.

**⚠️ CRITICAL**: No user story work can begin until T005–T009 are complete.

- [ ] T005 In `app/roadmap/_lib/search-indexer.ts`, rewrite the `stripMdx()` function using a two-pass pipeline: (1) regex strips self-closing JSX first (`/\s*<[A-Z][a-zA-Z0-9]*[^>]*\/>/g` → `''`), then opening JSX tags (`/<[A-Z][a-zA-Z0-9]*[^>]*>/g` → `''`), then closing JSX tags (`/<\/[A-Z][a-zA-Z0-9]*>/g` → `''`); (2) pass result through `removeMarkdown()` from `remove-markdown`; (3) collapse whitespace.
- [ ] T006 In `app/roadmap/_lib/search-indexer.ts`, fix the `excerpt` fallback in `generateSearchIndex()`: priority must be `data.shortDesc ?? data.description ?? strippedContent.slice(0, 140) + '...'` — never allow an empty string.
- [ ] T007 Write `scripts/build-search-index.mjs`: import `generateSearchIndex` (CommonJS-compatible), call it, JSON-stringify the result, check `Buffer.byteLength(json)` and emit `console.warn('⚠ Search index exceeds 500KB')` if over 512000 bytes, then write the output to `public/search-index.json` using `fs.writeFileSync`.
- [ ] T008 Run `node scripts/build-search-index.mjs` manually and verify `public/search-index.json` is created with ≥ 32 entries, all having non-empty `content` and `excerpt` fields.
- [ ] T009 [P] Add `public/search-index.json` to `.gitignore` is NOT needed — this file MUST be committed to `public/` so it is included in the static export. Verify it is NOT in `.gitignore`.

**Checkpoint**: `public/search-index.json` exists, has 32+ entries with non-empty `content` fields — user story work can now begin.

---

## Phase 3: User Story 1 — Accurate Keyword Search (Priority: P1) 🎯 MVP

**Goal**: Searching "Docker" returns only Docker-related pages; no irrelevant results.

**Independent Test**: Open the browser at `http://localhost:3000`, open the search modal, type "Docker" — verify every result is from a Docker/DevOps page. Then type "JWT" — verify only the API Design page appears.

### Implementation for User Story 1

- [ ] T010 [US1] In `app/roadmap/_components/layout/Search.tsx`, update the `fetch` call: change `fetch('/api/search')` to `fetch('/search-index.json')` and ensure the response is parsed as the `SearchItem[]` array.
- [ ] T011 [US1] In `app/roadmap/_components/layout/Search.tsx`, create TWO named Fuse instances after the index loads: `fuseStrict` with `{ threshold: 0.3, ignoreLocation: true, keys: [{ name: 'title', weight: 2.0 }, { name: 'excerpt', weight: 0.6 }, { name: 'content', weight: 0.4 }] }` and `fuseFallback` with the same config but `threshold: 0.45`. Store both in separate refs (`fuseStrictRef`, `fuseFallbackRef`).
- [ ] T012 [US1] In `app/roadmap/_components/layout/Search.tsx`, update the `search()` function: run `fuseStrictRef.current.search(query)` first; if results array is empty, run `fuseFallbackRef.current.search(query)` and set a new `isApproximate` state boolean to `true`; otherwise set it to `false`.
- [ ] T013 [US1] In `app/roadmap/_components/layout/Search.tsx`, when `isApproximate === true`, render a clearly visible label above the results list: a small amber-tinted badge reading `"Showing approximate matches"`.
- [ ] T014 [US1] Verify in the browser: Search "Docker" → only DevOps/Docker results. Search "event loop" → Async Messaging page appears. Search "JWT" → only API Design. Search "zzzzz" → "No results found" (no approximate badge since fallback also returns nothing).

**Checkpoint**: User Story 1 is fully functional. Search returns accurate results with a fallback label for zero-strict-match queries.

---

## Phase 4: User Story 2 — All Pages Discoverable (Priority: P1) 🎯 MVP

**Goal**: Prose trapped inside `<Topic>` JSX blocks is correctly indexed and discoverable.

**Independent Test**: Curl or open `http://localhost:3000/search-index.json` — verify the `content` field for `/roadmap/backend/async-messaging` contains the word "coroutine" or "blocking". Verify all 6 track Overview pages have non-empty `content`.

### Implementation for User Story 2

- [ ] T015 [P] [US2] In `app/roadmap/_lib/search-indexer.ts`, validate the fix from T005 produces correct output: write a one-off test script `/tmp/verify-index.mjs` that imports `generateSearchIndex`, runs it, and prints the `content` length and first 100 chars for each item — run it and confirm no item has 0-length content except pure-diagram pages.
- [ ] T016 [US2] For track `index.mdx` overviews that have only frontmatter and no prose body (like `backend/index.mdx` with just `title` + `description`), confirm the `excerpt` correctly falls back to `data.description` from the frontmatter. In `generateSearchIndex()` in `app/roadmap/_lib/search-indexer.ts`, ensure the overview case uses `data.description || ''` as the excerpt (not `data.shortDesc`).
- [ ] T017 [US2] Rebuild `public/search-index.json` by running `node scripts/build-search-index.mjs` and confirm in the file that `/roadmap/backend` (Overview) now has a non-empty `excerpt` from its frontmatter `description` field.

**Checkpoint**: Every indexed page has discoverable prose content. Track overviews show correct excerpts.

---

## Phase 5: User Story 3 — Meaningful Snippets in Results (Priority: P2)

**Goal**: Every search result card shows a human-readable excerpt, never a blank description.

**Independent Test**: Open the search modal, type any keyword (e.g., "async") — verify every result card in the list renders a non-empty description below the title.

### Implementation for User Story 3

- [ ] T018 [P] [US3] In `app/roadmap/_components/layout/Search.tsx`, locate the result card render block. Ensure the `description` displayed maps to `item.excerpt` from the `SearchItem`. If `item.excerpt` is empty (defensive), fall back to `item.content.slice(0, 140)`. Never render an empty `<p>` or `<span>` for description.
- [ ] T019 [US3] In `app/roadmap/_components/layout/Search.tsx`, ensure the description text is truncated to 140 characters with `...` if longer — use a utility: `excerpt.length > 140 ? excerpt.slice(0, 140) + '...' : excerpt`.

**Checkpoint**: All result cards display meaningful snippets. No blank descriptions.

---

## Phase 6: Loading & Error States (Priority: P2, from Clarifications)

**Goal**: The first-open loading experience shows a premium skeleton UI; fetch failures show a graceful error.

**Independent Test**: Throttle the browser network to "Slow 3G" in DevTools, open the search modal — verify a pulsing skeleton appears before results load. Then point the fetch URL to a broken path and verify the error message appears without crashing.

### Implementation for Phase 6

- [ ] T020 [US3] In `app/roadmap/_components/layout/Search.tsx`, add an `isLoading` state (already exists). When `isLoading === true`, render 3 skeleton placeholder divs in the results area: `<div className="animate-pulse h-14 rounded-lg bg-slate-700/50 w-full" />` repeated 3 times. Also replace the static search icon with `<Loader2 className="animate-spin" />` from `lucide-react` during loading.
- [ ] T021 [US3] In `app/roadmap/_components/layout/Search.tsx`, add an `isError` state boolean. In the `fetch('/search-index.json')` catch block, set `isError = true`. When `isError === true`, render an error state in the modal body: a centered message "Search unavailable. Try reloading." with a dismiss button that calls `setIsOpen(false)`.

**Checkpoint**: Loading skeleton and error state both work correctly at all network speeds.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Clean up the deleted API route's references, verify build compatibility, and production readiness.

- [ ] T022 Search the entire codebase for any remaining references to `/api/search` using `grep -r "api/search" app/` — remove or update any found references to use `/search-index.json` instead.
- [ ] T023 [P] Run `npm run build` and confirm it completes without errors. Verify `public/search-index.json` is present in the `out/` directory after build (it should be copied automatically since it lives in `public/`).
- [ ] T024 [P] Open `out/search-index.json` and spot-check: confirm the file has 32+ entries, no entry has an empty `content` field (except possibly pure-diagram pages), and file size is under 500KB.
- [ ] T025 Run the dev server (`npm run dev`), open the search modal, and run the full acceptance scenario from the spec: Docker → DevOps results only; "event loop" → Async Messaging; "JWT" → API Design; "zzzzz" → No results; "Doker" → Docker (approximate match label shown).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately. T003 and T004 can run in parallel.
- **Phase 2 (Foundational)**: Depends on Phase 1 completion. T009 can run in parallel with T005–T008. **All user story phases are BLOCKED until T008 is passing.**
- **Phase 3 (US1 — Accurate Search)**: Depends on Phase 2.
- **Phase 4 (US2 — All Pages Discoverable)**: Depends on Phase 2. Can run **in parallel with Phase 3** as they touch different parts (indexer vs. client).
- **Phase 5 (US3 — Snippets)**: Depends on Phases 3 and 4 being complete (needs the fetch URL change from T010).
- **Phase 6 (Loading/Error States)**: Depends on T010 (fetch URL change). Can run in parallel with Phase 5.
- **Phase 7 (Polish)**: Depends on all previous phases.

### Parallel Opportunities per Phase

```
Phase 1: T003 ∥ T004
Phase 2: T009 ∥ (T005 → T006 → T007 → T008 sequential)
Phase 3 ∥ Phase 4: Can be worked simultaneously
Phase 5 ∥ Phase 6: Can be worked simultaneously
Phase 7: T023 ∥ T024
```

---

## Implementation Strategy

### MVP First (Phases 1–3 Only)

1. Complete Phase 1: Setup (install `remove-markdown`, wire scripts)
2. Complete Phase 2: Foundational (fix indexer, generate static JSON)
3. Complete Phase 3: User Story 1 (accurate search)
4. **STOP and VALIDATE**: Type "Docker" in search — verify zero false positives
5. Ship if passing

### Incremental Delivery

1. **Phases 1–2** → Static JSON index generated correctly (foundation)
2. **Phase 3** → Search returns accurate results (core correctness)
3. **Phase 4** → All 32 pages discoverable (completeness)
4. **Phases 5–6** → Rich snippets + loading states (polish)
5. **Phase 7** → Build passes, production ready

---

## Notes

- `[P]` tasks = different files, no task dependency — can run in parallel
- `[US1]/[US2]/[US3]` labels map tasks to user stories from spec.md
- The single most critical task is **T005** (fixing `stripMdx`) — everything else flows from correct indexing
- Commit after T008 (index verified) and again after T014 (search verified) at minimum
- Do NOT commit `public/search-index.json` to `.gitignore` — it must ship in the static export
