# Tasks: Restore Animations and Integrate Interactive Blog

**Input**: Design documents from `/specs/002-animations-and-blog/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Initialize necessary Three.js packages (`npm install three @types/three`)
- [ ] T002 Ensure `lucide-react` is installed for the blog components (`npm install lucide-react`)
- [ ] T003 [P] Create `types/index.ts` to hold the data models extracted from `blog.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T004 Copy the data interfaces (RoadmapsData, Task, Category, etc.) into `types/index.ts`
- [ ] T005 [P] Setup `/app/components/` directory for organizing the new Client Components

---

## Phase 3: User Story 1 - Portfolio Animations (Priority: P1) 🎯 MVP

**Goal**: Restore the Three.js blackhole animations to the Next.js homepage so the site regains its original impressive visual identity.

**Independent Test**: Load the homepage and verify the canvas background initializes and renders smoothly via React's `useEffect`.

### Implementation for User Story 1

- [ ] T006 [US1] Create the `CanvasAnimation.tsx` component wrapper in `app/components/CanvasAnimation.tsx` with a `useRef` attachment pattern
- [ ] T007 [US1] Migrate the core `three.js` rendering logic from the original `script.js` into the `useEffect` block of `CanvasAnimation.tsx`
- [ ] T008 [US1] Inject `<CanvasAnimation />` into the Hero container inside `app/page.tsx`
- [ ] T009 [US1] Ensure the canvas resizes responsively and cleans up its animation frame on component unmount
- [ ] T010 [US1] Verify Lighthouse performance to ensure DOM injection doesn't significantly drop TTI below 90

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Interactive Blog Integration (Priority: P1)

**Goal**: Access the technical roadmaps and interactive diagrams originally written in `blog.html` directly within the Next.js architecture.

**Independent Test**: Navigate to `/roadmap` (or the integrated blog route) and verify all diagrams function interactively.

### Implementation for User Story 2

- [ ] T011 [P] [US2] Create `/app/roadmap/page.tsx` and its parent folder context
- [ ] T012 [P] [US2] Create reusable components for `AsyncDecisionFlowchart` in `app/components/AsyncDecisionFlowchart.tsx`
- [ ] T013 [P] [US2] Create reusable components for `ThreadsVsCoroutines` in `app/components/ThreadsVsCoroutines.tsx`
- [ ] T014 [P] [US2] Create reusable components for `EventLoopStepper` in `app/components/EventLoopStepper.tsx`
- [ ] T015 [US2] Extract the massive `roadmapsData` object into a data module `content/roadmaps.ts`
- [ ] T016 [US2] Combine the components and data inside `/app/roadmap/page.tsx` to render the fully interactive blog
- [ ] T017 [US2] Adjust Tailwind utility classes if there are any visual regressions from `blog.html`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T018 Code cleanup and removal of unused placeholder imports if any exist
- [ ] T019 Update `task.md` system artifact and `quickstart.md`
- [ ] T020 Run full statically exported Next.js build validation (`npm run build`) to ensure exportability is preserved

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 and US2 can proceed in parallel

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Parallel Opportunities

- The creation of the isolated visual components (T012, T013, T014) can be done entirely in parallel.
- US1 and US2 have completely separate file domains (`page.tsx` vs `roadmap/page.tsx`).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (Canvas Animation)
4. **STOP and VALIDATE**: Test User Story 1 independently on `localhost:3000`.
