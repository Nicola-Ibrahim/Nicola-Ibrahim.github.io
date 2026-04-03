# Tasks: Restore Remaining Legacy UI

**Input**: Design documents from `/specs/005-restore-remaining-legacy-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup & Foundational

**Purpose**: Preparing core infrastructure files for edits.

- [x] T001 Inject the Devicon CDN stylesheet within `<head>` inside `app/layout.tsx`.

---

## Phase 2: User Story 1 - Restoration of the About Canvas Animation (Priority: P1)

**Goal**: Restore the 3D WebGL Torus Knots visualization beneath the portrait location in the "About Me" section.

**Independent Test**: Scroll to verify the rendering of the `AboutCanvas` client-side container dynamically spinning.

### Implementation for User Story 1

- [x] T002 [P] [US1] Create the `app/components/AboutCanvas.tsx` boilerplate mimicking `HeroCanvas.tsx`.
- [x] T003 [P] [US1] Port the two interlaced `TorusKnotGeometry` meshes (blue and purple) and camera variables from `js/modules/about-visualization.js` into `AboutCanvas.tsx`.
- [x] T004 [US1] Inject `<AboutCanvas />` into `app/page.tsx` under the `.aspect-square.rounded-3xl` container layout.

---

## Phase 3: User Story 2 - Specialized Services Exact Styling (Priority: P1)

**Goal**: Map the card UI logic mathematically perfectly back to `.glass-card`.

**Independent Test**: Compare local padding and hover-states to the legacy deployment.

### Implementation for User Story 2

- [x] T005 [US2] Update the `services` mapping inside `app/page.tsx` to restore legacy `mb-8`, `border-white/10`, and matching flex definitions originally dropped.

---

## Phase 4: User Story 3 - Technical Toolbox DevIcons (Priority: P2)

**Goal**: Restore the distinct company brand coloring and correct SVG references across the skills array.

**Independent Test**: Confirm Python looks yellow/blue, PostgreSQL elephant appears, etc.

### Implementation for User Story 3

- [x] T006 [P] [US3] Update the array of skills mapped inside `content/data.ts` replacing `fab fa-X` with `devicon-X-plain` and injecting exact original `text-[var]` mappings from the original HTML.
- [x] T007 [US3] Modify the mapping in `app/page.tsx` `#skills-grid` to properly intercept the newly imported `devicon` class outputs instead of FontAwesome defaults.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, performance validations, and cross-cutting checks.

- [x] T008 Run `npm run build` to verify the codebase compiles successfully across the edge.
- [x] T009 Observe Hot-Module Reloading directly on `http://localhost:3000` executing the visual checklists inside `quickstart.md`.
