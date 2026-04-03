# Implementation Plan: Refine Legacy UI Fidelity

**Branch**: `004-refine-legacy-ui-fidelity` | **Date**: 2026-04-03 | **Spec**: [specs/004-refine-legacy-ui-fidelity/spec.md](specs/004-refine-legacy-ui-fidelity/spec.md)
**Input**: Feature specification from `/specs/004-refine-legacy-ui-fidelity/spec.md`

## Summary

This plan outlines porting the exact parametric logic from `js/modules/hero-visualization.js` into the existing `HeroCanvas.tsx` client component.

## Technical Context

**Language/Version**: TypeScript 5+, Next.js 14 App Router
**Primary Dependencies**: `three`
**Storage**: N/A
**Testing**: Hot reloading and static build verification
**Target Platform**: Web Browsers
**Project Type**: Portfolio Website
**Performance Goals**: 60fps maintenance despite geometry density increase.
**Constraints**: Must match legacy constants identically.
**Scale/Scope**: Impacts `HeroCanvas.tsx` isolated logic.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Design Fidelity**: The entire core of this feature reinforces Rule #4 — we are tweaking values back precisely to their `js/modules/hero-visualization.js` counterparts.
- [x] **Component Discipline**: Logic stays fully encapsulated within the client component. No prop drilling or external state pollution required.

## Project Structure

### Documentation (this feature)

```text
specs/004-refine-legacy-ui-fidelity/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
└── tasks.md             
```

### Source Code

```text
src/ (app mapping)
├── app/
│   └── components/
│       └── HeroCanvas.tsx (Only file to be modified)
```

**Structure Decision**: 
The modifications take place entirely within the internal `useEffect` block of a single React node. 

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
