# Tasks: Blog & Roadmap High-Fidelity Migration and Redesign

**Input**: Design documents from `/specs/006-blog-roadmap-update/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup & Foundational

**Purpose**: Preparing core infrastructure files for edits.

- [ ] T001 Inject font and layout classes (e.g. `bg-slate-50/50`) globally if required for the aesthetic redesign inside `app/layout.tsx`.
- [ ] T002 Generate the `content/roadmaps.tsx` file to hold the `roadmapsData` payload safely as a TypeScript module capable of exporting React nodes.

---

## Phase 2: User Story 1 - Full Data Integrity and Content Porting (Priority: P1)

**Goal**: Port all legacy roadmap data, code snippets, visual diagrams, and categories from `blog.html` perfectly transferred into the new Next.js structure.

**Independent Test**: Navigate to `/roadmap` and verify that AI Agents, DevOps, and Backend syllabuses are populated entirely from `roadmaps.tsx`, including nested interactive UIs (e.g. `AsyncDecisionFlowchart`).

### Implementation for User Story 1

- [ ] T003 [P] [US1] Extract `AsyncDecisionFlowchart`, `ThreadsVsCoroutines`, and `EventLoopStepper` components from `blog.html` into independent files like `app/components/AsyncDecisionFlowchart.tsx` (using `'use client'` as required).
- [ ] T004 [P] [US1] Formulate the massive `roadmapsData` dictionary (AI modules, Cloud, Networks) exactly as it was defined from `blog.html` into `content/roadmaps.tsx`.
- [ ] T005 [US1] Create the page routing component `app/roadmap/page.tsx` fetching and iterating over `roadmapsData`.

---

## Phase 3: User Story 2 - Premium Design Aesthetics for Documentation (Priority: P1)

**Goal**: Feature an exceptionally aesthetic, premium design suitable for deep studying and code reading, formatting headers, code-blocks, and accordions.

**Independent Test**: Read long-form text blocks; visually confirm WCAG contrast rules are met, code blocks have pink/blue aesthetic highlighting, and accordions transition smoothly.

### Implementation for User Story 2

- [ ] T006 [P] [US2] Implement the `FormattedText` helper component mapping `parseInlineStyles` for parsing `**markdown bold**` and `` `inline code` `` beautifully inside `app/components/FormattedText.tsx`.
- [ ] T007 [US2] Flesh out the primary `app/roadmap/page.tsx` structural layout: adding the sticky glassmorphism header, the gradient Hero Header block for the category title, and the Flexbox column layout for the Syllabus accordion.
- [ ] T008 [US2] Build the Accordion-style task expansion UI (`toggleExpand`) mapped efficiently avoiding massive state re-renders across the `map` loop.
- [ ] T009 [US2] Wire up the "Copy to Clipboard" utility correctly handling browser synthetic events within the client-side module.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, performance validations, and cross-cutting checks.

- [ ] T010 Verify compilation of the embedded SVG flows via `npm run build` determining that static export correctly ignores server-side serialization bugs.
- [ ] T011 Perform hot-module manual run against the checklist described inside `quickstart.md`.
