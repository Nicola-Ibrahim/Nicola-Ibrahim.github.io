# Implementation Plan: Restore Remaining Legacy UI

**Branch**: `005-restore-remaining-legacy-ui` | **Date**: 2026-04-03 | **Spec**: [specs/005-restore-remaining-legacy-ui/spec.md](specs/005-restore-remaining-legacy-ui/spec.md)
**Input**: Feature specification from `/specs/005-restore-remaining-legacy-ui/spec.md`

## Summary

This plan outlines porting the exact parametric logic from `js/modules/about-visualization.js` into an `AboutCanvas.tsx` client component, refining the styling for the Specialized Services glass cards, and mapping original DevIcon SVGs and hex codes within the Technical Toolbox `data.ts`.

## Technical Context

**Language/Version**: TypeScript 5+, Next.js 14 App Router
**Primary Dependencies**: `three`, `devicon` CSS library.
**Storage**: Static data only.
**Testing**: Hot reloading and static build verification.
**Target Platform**: GitHub Pages Web Browsers.
**Project Type**: Portfolio Website.
**Performance Goals**: Avoid Next.js hydration faults when fetching `window` variables.
**Constraints**: Visual styling must map to HTML output precisely.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Strict Design Fidelity**: Visuals are completely dictated by returning configurations to match index.html properties.
- [x] **Modularity**: React Three Fiber/Three.js initialization runs encapsulated within client wrappers, leaving server structures alone.

## Project Structure

### Documentation (this feature)

```text
specs/005-restore-remaining-legacy-ui/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
└── tasks.md             
```

### Source Code Mapping

```text
src/
├── app/
│   ├── layout.tsx (Update Head to inject devicon CDN)
│   ├── page.tsx (Update Services card grid and `<AboutCanvas />` injection)
│   └── components/
│       └── AboutCanvas.tsx (NEW)
└── content/
    └── data.ts (Update Icon payload logic)
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       | N/A        | N/A                                 |
