<!--
Sync Impact Report:
- Version change: Initial Draft -> 1.0.0
- Modified principles: Copied and adapted from docs/plan.md
- Added sections: Core Principles, Governance
- Removed sections: Blank templates
- Templates requiring updates:
  - ⚠ spec-template.md (missing)
  - ⚠ tasks-template.md (missing)
  - ⚠ plan-template.md (missing)
- Follow-up TODOs: Determine original ratification date.
-->
# Nicola Portfolio Constitution

## Core Principles

### 1. Static Export is Law
- `next.config.js` MUST have `output: 'export'` at all times.
- **No** `getServerSideProps`, **no** API routes under `/api/*`, **no** Next.js Middleware.
- All data fetching happens at **build time** (`generateStaticParams`, `getStaticProps` in Pages Router, or async RSC at build time in App Router).
- `next/image` must use `unoptimized: true` or a static loader — GitHub Pages has no image optimisation server.

### 2. App Router, Not Pages Router
- Use Next.js 14 **App Router** exclusively (`/app` directory).
- No mixing of Pages Router conventions.
- Every page is a **React Server Component** (RSC) by default; mark `'use client'` only when browser APIs or interactivity are strictly required.

### 3. Tailwind Only — No Extra CSS Frameworks
- Styling is done exclusively with **Tailwind utility classes**.
- No CSS Modules, no Styled Components, no Emotion, no SASS.
- One `globals.css` for CSS custom properties (design tokens) and Tailwind's `@layer` extensions — nothing else.
- Design tokens (colors, fonts, spacing scale) must be registered in `tailwind.config.ts` under `theme.extend` so they are available as first-class utilities.

### 4. Strict Design Fidelity (Migrate Only)
- The existing visual design from the current `index.html` and standard CSS files is the absolute source of truth.
- Do NOT alter any visuals, structure, styling, or positioning. The goal is a purely technical transfer to Next.js.
- Ensure all existing CSS and assets are seamlessly integrated without introducing generic or modified Tailwind variants unless absolutely necessary to match existing exactly.

### 5. Component Discipline
- Components live in `/components`. They are **pure, presentational, and reusable**.
- No component fetches its own data. Data flows down as props from page-level RSCs.
- Every component that needs interactivity must be in its own `*.client.tsx` file with `'use client'` at the top.
- No default exports from component files — use **named exports** everywhere.

### 6. TypeScript Strict Mode
- `tsconfig.json` must have `"strict": true`.
- No `any` types. No `@ts-ignore` comments.
- All props interfaces are explicitly typed with `interface`, not inlined.

### 7. Content is Data, Not Code
- Blog posts: `.mdx` files in `/content/blog/`. Frontmatter drives all metadata.
- Projects: a single `/content/projects.ts` typed data file. No hardcoded content inside JSX.
- Changing a blog post or adding a project must NEVER require touching a component file.

### 8. Performance Baseline
- Lighthouse Performance score ≥ 90 on production build.
- No third-party scripts loaded synchronously in `<head>`.
- Web fonts loaded via `next/font` — no `<link>` tags to Google Fonts or similar.
- Images: use `<Image>` from `next/image` with explicit `width` and `height` at all times.

### 9. Accessibility Baseline
- All interactive elements must be keyboard-navigable.
- All `<img>` and `<Image>` must have meaningful `alt` text.
- WCAG AA colour contrast minimum on all text.
- Semantic HTML first — divs are the last resort, not the first tool.

### 10. No Runtime Dependencies for Static Content
- The blog and projects section must work with **zero client-side JavaScript** for rendering.
- Interactivity (mobile nav, contact form, animations) is the only valid reason for `'use client'`.

## Governance

Changes to these principles MUST follow this procedure:
1. Propose amendment via PR to `docs/plan.md` and `.specify/memory/constitution.md`.
2. Review against existing codebase to assess migration impact.
3. All PRs/reviews must verify compliance.

**Version**: 1.0.0 | **Ratified**: 2026-04-03 | **Last Amended**: 2026-04-03
