# Tasks: Restore Legacy UI Elements and Styling

**Input**: Design documents from `/specs/003-restore-legacy-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and retrieving dependencies needed for visual restorations.

- [x] T001 Initialize `vanilla-tilt`, `aos`, and `@types/aos` packages via npm in the project root.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Preparing core infrastructure.

- [x] T002 Verify Next.js App Router tree to ensure custom client components can be logically mounted in `app/components`.

**Checkpoint**: Ready to begin building client wrappers for third-party libraries.

---

## Phase 3: User Story 1 - Parallax 3D Card Hover Effects (Priority: P1)

**Goal**: Restore the 10-degree 3D tilt and glare effect on all `.glass-card` elements to match the original UX.

**Independent Test**: Hover over any service/tool card to observe interactive 3D tracking.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create the `TiltWrapper` client component in `app/components/TiltWrapper.tsx` utilizing `vanilla-tilt`.
- [x] T004 [US1] Wrap the individual `.glass-card` elements in `app/page.tsx` with `<TiltWrapper>` keeping the same React tree mapping.
- [x] T005 [US1] Verify that `TiltWrapper` gracefully cleans up `vanilla-tilt` instances on unmount.

**Checkpoint**: At this point, User Story 1 (Card Tilts) should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Animate On Scroll (AOS) Restoration (Priority: P1)

**Goal**: Have sections gracefully fade/slide into view as the user scrolls down, identically to the initial HTML launch.

**Independent Test**: Scroll down the homepage rapidly and verify staggered fade animations fire only once.

### Implementation for User Story 2

- [x] T006 [P] [US2] Create the `AOSInit` client component in `app/components/AOSInit.tsx` that triggers initialization inside `useEffect`.
- [x] T007 [US2] Import the global tracking component `<AOSInit />` and `aos/dist/aos.css` into `app/layout.tsx`.

**Checkpoint**: User Story 2 is functional, and data-aos nodes animate dynamically.

---

## Phase 5: User Story 3 - Hero Typing Animation (Priority: P2)

**Goal**: Reproduce the "Backend & AI Engineer" interactive typing and blinking cursor effect precisely.

**Independent Test**: The hero subtitle must organically type itself character by character upon initial page load.

### Implementation for User Story 3

- [x] T008 [P] [US3] Create the `TypingAnimation` client component in `app/components/TypingAnimation.tsx` controlling the interval state.
- [x] T009 [US3] Inject the `TypingAnimation` component into the Hero Section of `app/page.tsx` replacing the static span text.

**Checkpoint**: Hero typing works.

---

## Phase 6: User Story 4 - High-fidelity Hero Canvas Styling (Priority: P2)

**Goal**: Ensure the background Blackhole canvas perfectly mimics the specific layout of the legacy container.

**Independent Test**: Inspect the DOM elements of `HeroCanvas` ensuring class parity with `absolute inset-0 w-full h-full z-[-1] opacity-80 pointer-events-none`.

### Implementation for User Story 4

- [x] T010 [P] [US4] Update the wrapper `div` or internal layout in `app/page.tsx` around `<HeroCanvas />` to include the verified layout classes (`absolute inset-0 w-full h-full z-[-1] opacity-80 pointer-events-none`).

**Checkpoint**: Layout matches exactly.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, performance validations, and cross-cutting checks.

- [x] T011 Run `npm run build` to verify that Next.js static asset exporting correctly optimizes the client-side wrappers without hydration failures.
- [x] T012 Run the steps outlined in `quickstart.md` manually to guarantee complete legacy fidelity.
