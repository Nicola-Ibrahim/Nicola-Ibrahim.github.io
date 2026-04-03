# Feature Specification: Refine Legacy UI Fidelity

**Feature Branch**: `004-refine-legacy-ui-fidelity`  
**Created**: 2026-04-03  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Exact Geometry and Coloring of the Canvas (Priority: P1)

As a visitor, I want the Blackhole visualizer to match the precise colors, density, and perspective of the original site so that the high-fidelity branding is maintained.

**Independent Test**: Load the site and visually inspect the Hero canvas to ensure the density of the particles is very high and the camera is positioned tightly.

**Acceptance Scenarios**:

1. **Given** the user views the Hero section, **When** the canvas renders, **Then** there should be 15,000 accretion disk particles.
2. **Given** the canvas is rendering, **When** looking at the colors, **Then** they should interpolate between `#ffffff` (white), `#6366f1` (primary), and `#a855f7` (tertiary), instead of simple blue.
3. **Given** the canvas is rendering, **When** examining the 3D perspective, **Then** the entire black hole group must be tilted at `Math.PI / 5` on the x-axis, and the camera must reside at `z=10, y=1`.

---

### User Story 2 - Container Opacity and Interaction Parity (Priority: P2)

As a visitor interacting with the Hero section, I want the canvas wrapper to have `pointer-events-auto` enabled so that if any future interactive hover listeners are added, the layer catches the events properly (matching the exact legacy `z-[-1] opacity-80 pointer-events-auto` property).

**Independent Test**: Inspect the wrapper container of the canvas to verify class assignment.

**Acceptance Scenarios**:

1. **Given** the user inspects the DOM, **When** they look at the `HeroCanvas` wrapper, **Then** it has `pointer-events-auto` instead of `pointer-events-none`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST update `HeroCanvas.tsx` sphere geometry radius to `1.5` with 64x64 segments.
- **FR-002**: System MUST update the accretion disk particle count to `15000` and adapt the differential radius algorithm `2 + Math.random() * 4.5`.
- **FR-003**: System MUST update colors to `#ffffff`, `#6366f1`, and `#a855f7`.
- **FR-004**: System MUST update the camera `z` to `10`, `y` to `1`.
- **FR-005**: System MUST tilt the entire blackhole group on `x` rotation by `Math.PI / 5`.
- **FR-006**: System MUST update the photon ring radius to `1.65` and einstein ring radius to `2.1` with a `0.3` opacity.
- **FR-007**: System MUST update the container wrapper to use `pointer-events-auto` instead of `pointer-events-none`.

### Key Entities

- **Three.js Options**: The exact numeric values extracted from `hero-visualization.js`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the numeric constants in `HeroCanvas.tsx` related to the Blackhole match `js/modules/hero-visualization.js`.
- **SC-002**: The Next.js website compiles without any TS errors associated with Three.js refactoring.
- **SC-003**: A visual comparison of the deployed GitHub Pages and localhost shows zero discrepancy in the scale or positioning of the space phenomena.

## Assumptions

- Moving logic closer to the exact `hero-visualization.js` will resolve the discrepancy without tanking React performance. 15,000 particles is manageable on modern browsers.
