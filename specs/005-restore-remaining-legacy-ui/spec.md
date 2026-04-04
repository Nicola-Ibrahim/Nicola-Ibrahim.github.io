# Feature Specification: Restore Remaining Legacy UI

**Feature Branch**: `005-restore-remaining-legacy-ui`
**Created**: 2026-04-03
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Restoration of the About Canvas Animation (Priority: P1)

As a visitor, I want to see the dynamic visual component (3D interactive element) inside the "About Me" section exactly as it appeared on the legacy site, so the portfolio retains its sophisticated and continuous aesthetic. 

**Independent Test**: Scroll to the "About Me" section on the Next.js preview and verify that a 3D animated canvas correctly renders inside the designated container, mirroring the physics of `js/modules/about-visualization.js`.

**Acceptance Scenarios**:
1. **Given** the user navigates the About section, **When** they look at the profile photo placeholder, **Then** it must render the Three.js visualization (the torus knots/geometries) using a client-side wrapper.

### User Story 2 - Specialized Services Exact Styling (Priority: P1)

As a visitor, I want the "Specialized Services & Solutions" layout to visually perfectly map the legacy HTML.

**Independent Test**: Compare the spacing, borders, icon paddings, and flex behavior against the deployed legacy version.

**Acceptance Scenarios**:
1. **Given** the Services grid, **When** examining the cards, **Then** all internal spacing and hover transition colors map precisely to the previous Tailwind/CSS implementations from the original HTML.

### User Story 3 - Technical Toolbox DevIcons (Priority: P2)

As a visitor, I want to see the specific tool manufacturer branding colors and styling (e.g., Python's yellow/blue, Java's exact hue) instead of generic flat `text-blue-5` colors from FontAwesome.

**Independent Test**: Check the skills/toolbox section for `devicon` rendered sprites with exact hex code matching the legacy structure.

**Acceptance Scenarios**:
1. **Given** the toolbox array, **When** rendering skills, **Then** it utilizes the `devicon-*` class name library over FontAwesome where applicable, restoring the unique hex `#` values to the styles.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST feature an `<AboutCanvas />` component in `app/page.tsx` that replicates the WebGL behavior defined in `js/modules/about-visualization.js`.
- **FR-002**: System MUST inject the `<AboutCanvas />` matching the `id="about-canvas-container"` DOM location.
- **FR-003**: System MUST adjust DOM classes within the Services section in `app/page.tsx` so the cards physically look identical to the legacy `.glass-card` layout.
- **FR-004**: System MUST inject the `devicon` CSS dependency into the application `layout` or `page` head if not already present.
- **FR-005**: System MUST update `content/data.ts` to utilize the legacy `devicon` class identifiers and hex code strings.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the sections requested match their predecessor's exact HTML classes.
- **SC-002**: Visual comparison has 0 missing icons from the Technical Toolbox.
- **SC-003**: `AboutCanvas.tsx` runs smoothly without hydration mismatch.
