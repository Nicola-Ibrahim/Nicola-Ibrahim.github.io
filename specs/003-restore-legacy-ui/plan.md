# Implementation Plan: Restore Legacy UI

**Branch**: `003-restore-legacy-ui` | **Date**: 2026-04-03 | **Spec**: [specs/003-restore-legacy-ui/spec.md](specs/003-restore-legacy-ui/spec.md)
**Input**: Feature specification from `/specs/003-restore-legacy-ui/spec.md`

## Summary

This plan outlines the integration of three high-impact visual effects from the original portfolio into the Next.js migration:
1. **VanillaTilt**: Adding 3D parallax hover effects.
2. **AOS (Animate On Scroll)**: Restoring staggered viewport entry animations.
3. **Hero Subtitle Typing**: Reintroducing the typing and blinking cursor effect.
4. **Canvas Adjustments**: Matching the legacy z-index, opacity, and interaction configurations.

## Technical Context

**Language/Version**: TypeScript 5+, Next.js 14 App Router  
**Primary Dependencies**: `vanilla-tilt`, `aos` (and `@types/aos`)
**Storage**: N/A  
**Testing**: Build validation (`npm run build`)  
**Target Platform**: Web Browsers (Desktop & Mobile)  
**Project Type**: Portfolio Website (Next.js Static Export)  
**Performance Goals**: 60fps animations, 0 visible layout shift during AOS load.  
**Constraints**: 
- AOS CSS must be loaded efficiently without blocking FCP.
- VanillaTilt must be safely destroyed on component unmount to prevent memory leaks.
**Scale/Scope**: Impacts all `*.glass-card` elements, `data-aos` elements globally, and the homepage Hero component.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Static Export is Law**: The integrations do not introduce SSR or API routes. AOS and generic React hooks are purely client-side runtime behavior and are fully compatible with Next.js static export.
- [x] **App Router Discipline**: Interactive components (like the typing effect or `TiltWrapper`) will correctly be strictly marked with `"use client"`.
- [x] **No Extra CSS Frameworks**: We will use inline Tailwind to handle our modifications except for the required `aos/dist/aos.css`.
- [x] **Performance Baseline**: We will dynamically or logically load non-critical animations to prevent tanking Lighthouse scores if necessary, though lightweight vanilla-tilt should be completely fine.

## Project Structure

### Documentation (this feature)

```text
specs/003-restore-legacy-ui/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
└── tasks.md             
```

### Source Code

```text
src/ (app directory mapping)
├── app/
│   ├── layout.tsx (Updated for AOS initialization)
│   ├── page.tsx (Updated for Canvas styling and Typing effect)
│   └── components/
│       ├── AOSInit.tsx (Client component for triggering AOS)
│       ├── TiltWrapper.tsx (Client wrapper for vanilla-tilt)
│       └── TypingAnimation.tsx (Client component for Hero typing effect)
```

**Structure Decision**: 
The implementations are small interactive boundaries. We will build generic wrappers in `app/components/` and inject them into the existing tree. `AOSInit` needs to sit near the root layout to initialize global scroll listeners, while `TiltWrapper` will wrap individual elements inside server or client trees.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Client Component Explosion | Required for DOM interaction (Tilt/AOS/Intervals) | Server components cannot run DOM intervals or mutation observers. |
