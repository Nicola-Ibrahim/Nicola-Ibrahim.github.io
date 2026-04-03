# Implementation Plan: Blog Roadmap Update

**Branch**: `006-blog-roadmap-update` | **Date**: 2026-04-03 | **Spec**: [Link to Spec](./spec.md)
**Input**: Feature specification from `/specs/006-blog-roadmap-update/spec.md`

## Summary

This update focuses on migrating the extensive legacy `blog.html` roadmap functionality directly into the Next.js `app/roadmap` route. The primary objective is a 100% data integrity port of the `roadmapsData` state, combined with a "Premium Documentation" visual aesthetic featuring highly legible typography, interactive learning components, and dark/light contrasting blocks.

## Technical Context

**Language/Version**: TypeScript / Next.js 14 App Router  
**Primary Dependencies**: React (`use client`), Tailwind CSS, Lucide React (for iconography)  
**Storage**: Static JSON mapping within `content/roadmaps.tsx` (or direct integration into page if required)  
**Testing**: Hot Reload Visual Testing via `npm run dev`  
**Target Platform**: Next.js Static Export (`output: 'export'`) onto GitHub Pages  
**Project Type**: Static Web Application / Documentation Reference  
**Performance Goals**: Zero hydration mismatches, smooth CSS accordion animations  
**Constraints**: Requires Client Component rendering for embedded UI (using `useState`)  
**Scale/Scope**: ~6 mapping modules, embedded SVG flowcharts, and technical textual data

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Static Export**: Ensure `roadmapsData` integrates natively without requiring server API routes. No database required.
- [x] **App Router**: Ensure interactivity explicitly triggers `'use client'`.
- [x] **Tailwind Only**: No styled-components allowed.
- [x] **Design Fidelity**: Strict mapping to the ground-truth design.

## Project Structure

### Documentation (this feature)

```text
specs/006-blog-roadmap-update/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
└── tasks.md             
```

### Source Code (repository root)

```text
content/
└── roadmaps.tsx     # Where roadmapsData and its interactive nested UIs will live safely.

app/
└── roadmap/
    └── page.tsx     # The primary route rendering the premium documentation UI.
```

**Structure Decision**: The feature isolates large interactive data (`roadmapsData`) into a strictly-typed module inside the `/content` directory (converting it to `.tsx` to support the nested React Nodes). `app/roadmap/page.tsx` retrieves this data to iterate and map it aesthetically onto the page, remaining fully compliant with static SSG standards.
