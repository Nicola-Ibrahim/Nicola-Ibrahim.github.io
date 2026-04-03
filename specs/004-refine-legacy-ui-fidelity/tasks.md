# Tasks: Refine Legacy UI Fidelity

**Input**: Design documents from `/specs/004-refine-legacy-ui-fidelity/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup & Foundational

**Purpose**: Preparing core infrastructure files for edits.

- [x] T001 Open and inspect `app/components/HeroCanvas.tsx` for layout understanding.

---

## Phase 2: User Story 1 - Exact Geometry and Coloring of the Canvas (Priority: P1)

**Goal**: Reproduce the visual layout of `js/modules/hero-visualization.js` strictly.

**Independent Test**: Load the site and visually inspect the Hero canvas to ensure the density of the particles is very high and the camera is positioned tightly.

### Implementation for User Story 1

- [x] T002 [US1] Update `app/components/HeroCanvas.tsx` to set sphere geometry radius to `1.5` with `64x64` segments.
- [x] T003 [US1] Update `app/components/HeroCanvas.tsx` accretion disk particle count to `15000` and adapt the differential radius calculation (`2 + Math.random() * 4.5`).
- [x] T004 [US1] Update `app/components/HeroCanvas.tsx` accretion disk colors using `colorPrimary` (`#ffffff`), `colorSecondary` (`#6366f1`), and `colorTertiary` (`#a855f7`) with the lerp algorithms matching legacy code.
- [x] T005 [US1] Update `app/components/HeroCanvas.tsx` animation differential speed algorithm inside the animation loop to match `particleData.speed`.
- [x] T006 [US1] Update `app/components/HeroCanvas.tsx` camera settings: `z` to `10`, `y` to `1`.
- [x] T007 [US1] Update `app/components/HeroCanvas.tsx` blackhole group init rotation: `rotation.x = Math.PI / 5`.
- [x] T008 [US1] Update `app/components/HeroCanvas.tsx` photon ring geometry radius to `1.65` and einstein ring geometry radius to `2.1` with `0.3` opacity.

**Checkpoint**: The 3D canvas represents the legacy mathematical layout perfectly.

---

## Phase 3: User Story 2 - Container Opacity and Interaction Parity (Priority: P2)

**Goal**: Ensure visual and physical events are handled by the `<canvas>` exactly as HTML deployed version.

**Independent Test**: Verify DOM class output on the `.canvas` container.

### Implementation for User Story 2

- [x] T009 [US2] Modify `app/components/HeroCanvas.tsx` base container wrapper `div` to replace `pointer-events-none` with `pointer-events-auto`.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, performance validations, and cross-cutting checks.

- [x] T010 Perform a manual review of localhost testing against `https://nicola-ibrahim.github.io/`.
- [x] T011 Run `npm run build` to verify the codebase compiles.
