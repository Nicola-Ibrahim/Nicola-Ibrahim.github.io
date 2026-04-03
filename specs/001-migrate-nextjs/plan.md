# Implementation Plan: Migrate Portfolio to Next.js

**Branch**: `001-migrate-nextjs` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-migrate-nextjs/spec.md`

## Summary

Migrate the existing static HTML portfolio to a Next.js 14 App Router application. The primary requirement is to maintain 100% visual fidelity to the original `index.html` while adding a markdown-backed blog system using MDX. The site must compile to a pure static export (`output: 'export'`) for deployment on GitHub Pages.

## Technical Context

**Language/Version**: TypeScript / Node.js
**Primary Dependencies**: Next.js 14, React, Tailwind CSS, `next-mdx-remote`, `gray-matter`, `shiki`
**Storage**: File system (MDX files)
**Testing**: Next.js build/export checks; visual testing
**Target Platform**: GitHub Pages (Static hosting)
**Project Type**: Static website
**Performance Goals**: Lighthouse > 90, instantaneous page loads for static assets
**Constraints**: NO server-side rendering, NO API routes, strictly static exports. GitHub pages requires custom `.nojekyll` and `unoptimized: true` on images.
**Scale/Scope**: Solo developer portfolio, minimal concurrent users expected, dozens of static MDX posts.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Static Export is Law (`output: 'export'`)
- [x] App Router instead of Pages Router
- [x] Tailwind CSS Only (No other frameworks)
- [x] Strict Design Fidelity to existing index.html
- [x] Component Discipline (Pure, presentational, `/components` directory)
- [x] TypeScript Strict Mode
- [x] Content is Data, Not Code (MDX for blogs, Projects in TS)
- [x] No Runtime Dependencies for Static Content

All gates pass without violation.

## Project Structure

### Documentation (this feature)

```text
specs/001-migrate-nextjs/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── not-found.tsx
├── components/
│   └── blog/
│       ├── PostCard.tsx
│       └── PostBody.tsx
├── content/
│   ├── blog/
│   │   └── *.mdx
│   └── projects.ts
├── lib/
│   ├── blog.ts
│   └── reading-time.ts
├── public/
│   ├── .nojekyll
│   └── images/
├── styles/
│   └── globals.css
├── tailwind.config.ts
└── next.config.js
```

**Structure Decision**: Selected standard Next.js App router structure overlaid on the root of the project to facilitate static generation and GitHub Pages deploy action.

## Complexity Tracking

N/A - No Constitution violations to optionally justify.
