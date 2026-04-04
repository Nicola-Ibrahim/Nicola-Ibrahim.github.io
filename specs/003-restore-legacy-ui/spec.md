# Feature Specification: Restore Legacy UI Elements and Styling

**Feature Branch**: `restore-legacy-ui`  
**Created**: 2026-04-03  
**Status**: Draft  

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Parallax 3D Card Hover Effects (Priority: P1)

As a visitor, I want to see the 3D tilt and glare effect when hovering over cards (Services, Tools, Testimonials) so that the website feels premium and interactive, matching the original design exactly.

**Why this priority**: The 3D tilt effect was a signature interactive element of the original portfolio that is currently missing in the Next.js migration.

**Independent Test**: Can be fully tested by hovering over any `.glass-card` and observing the 3D rotation and dynamic glare reflection.

**Acceptance Scenarios**:

1. **Given** a user is viewing the Services section, **When** they hover their mouse over a service card, **Then** the card tilts dynamically based on mouse position.
2. **Given** the 3D tilt is active, **When** moving the mouse closer to the edges, **Then** a subtle glare effect moves across the surface.

---

### User Story 2 - Animate On Scroll (AOS) Restoration (Priority: P1)

As a visitor scrolling down the page, I want elements to elegantly fade in and slide up synchronously as they enter the viewport, exactly as they did before.

**Why this priority**: The `data-aos` attributes are present in the HTML, but AOS is never initialized, resulting in static content without the intended sweeping entrances.

**Independent Test**: Can be fully tested by refreshing the page and scrolling down, observing elements animating smoothly into place.

**Acceptance Scenarios**:

1. **Given** the user scrolls to a new section, **When** the elements enter the viewport, **Then** they animate according to their `data-aos` configuration (e.g., `fade-up`, `fade-left`).

---

### User Story 3 - Hero Typing Animation (Priority: P2)

As a visitor arriving at the hero section, I want to see the subtitle perfectly mirror the retro typing animation effect ("Backend & AI Engineer") followed by a blinking cursor.

**Why this priority**: It is the first interactive element the user sees and sets the tone, restoring the legacy look.

**Independent Test**: Can be fully tested by visiting the homepage and watching the "Backend & AI Engineer" text character-by-character typing.

**Acceptance Scenarios**:

1. **Given** the page loads, **When** the hero section is visible, **Then** the subtitle span triggers a typing effect at 50ms per character.
2. **Given** the typing finishes, **When** waiting, **Then** a blinking cursor remains at the end of the text.

---

### User Story 4 - High-fidelity Hero Canvas Styling (Priority: P2)

As a visitor, I want the Hero Blackhole canvas container to exactly match the original opacity and z-index properties to blend perfectly with the background grid.

**Why this priority**: The current canvas injection lacks the precise wrapper styling (`absolute inset-0 w-full h-full z-[-1] opacity-80`), which changes the overall visual atmosphere.

**Independent Test**: Can be fully tested by verifying the CSS properties of the container and confirming the visual blend.

**Acceptance Scenarios**:

1. **Given** the hero section, **When** inspecting the `HeroCanvas` container, **Then** it has `opacity-80` and `z-[-1]` applied.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST integrate a React-compatible 3D tilt library (e.g., `react-parallax-tilt` or wrapper for `vanilla-tilt`) to apply the `max: 10, speed: 400, glare: true, max-glare: 0.2, scale: 1.02` configuration to all `.glass-card` elements.
- **FR-002**: System MUST install and initialize the `aos` package (Animate On Scroll) globally within the Next.js application lifecycle.
- **FR-003**: System MUST implement a custom typing animation hook or use a library (e.g., `react-type-animation`) for the Hero subtitle span.
- **FR-004**: System MUST wrap the `HeroCanvas` component in the exact HTML structure and Tailwind classes: `<div class="absolute inset-0 w-full h-full z-[-1] opacity-80">`.
- **FR-005**: System MUST preserve all existing functionality and links.

### Key Entities

- **Tilt Config**: `max: 10, speed: 400, glare: true, "max-glare": 0.2, scale: 1.02`
- **AOS Config**: `once: true`, or default initialization settings.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of `.glass-card` elements exhibit 3D tilt behavior matching the legacy site.
- **SC-002**: Missing scroll animations trigger reliably on all devices as users scroll down.
- **SC-003**: The typing animation completely runs on page load without visual glitches.
- **SC-004**: The project builds successfully (`npm run build`) without Next.js/React hydration errors related to AOS or Tilt components.

## Assumptions

- We will wrap `vanilla-tilt` or use `react-parallax-tilt` to safely implement the DOM manipulation in React.
- AOS will be initialized in a client-side `useEffect` at the root layout or root page level to track scroll globally.
