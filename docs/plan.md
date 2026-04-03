# PLAN.md — Personal Portfolio Site
> Spec-Kit Spec-Driven Development · Phase: Plan (read & refine before proceeding)
> Next review step: split into `constitution.md` + `spec.md` once approved

---

## 0. Context Snapshot

| Field | Value |
|---|---|
| Owner | Nicola — solo developer / freelancer |
| Purpose | Personal brand: showcase skills, projects, and writing |
| Stack | Next.js 14 · Tailwind CSS |
| Deployment | **GitHub Pages → `output: 'export'` (static HTML only)** |
| Code gen: complex logic | Gemini Pro 3 |
| Code gen: UI components | Gemini Flash |
| Design | **Strictly keep current frontend design** (use `index.html` structure & CSS purely migrated to Next.js) |
| Auth | None — fully public site |
| CMS | None — file-based (MDX for blog, JS/TS data files for projects) |

---

## 1. Constitution (Non-Negotiable Principles)

These rules will be copy-pasted directly into `constitution.md`. They are immutable and Gemini must never violate them.

### 1.1 — Static Export is Law
- `next.config.js` MUST have `output: 'export'` at all times.
- **No** `getServerSideProps`, **no** API routes under `/api/*`, **no** Next.js Middleware.
- All data fetching happens at **build time** (`generateStaticParams`, `getStaticProps` in Pages Router, or async RSC at build time in App Router).
- `next/image` must use `unoptimized: true` or a static loader — GitHub Pages has no image optimisation server.

### 1.2 — App Router, Not Pages Router
- Use Next.js 14 **App Router** exclusively (`/app` directory).
- No mixing of Pages Router conventions.
- Every page is a **React Server Component** (RSC) by default; mark `'use client'` only when browser APIs or interactivity are strictly required.

### 1.3 — Tailwind Only — No Extra CSS Frameworks
- Styling is done exclusively with **Tailwind utility classes**.
- No CSS Modules, no Styled Components, no Emotion, no SASS.
- One `globals.css` for CSS custom properties (design tokens) and Tailwind's `@layer` extensions — nothing else.
- Design tokens (colors, fonts, spacing scale) must be registered in `tailwind.config.ts` under `theme.extend` so they are available as first-class utilities.

### 1.4 — Strict Design Fidelity (Migrate Only)
- The existing visual design from the current `index.html` and standard CSS files is the absolute source of truth.
- Do NOT alter any visuals, structure, styling, or positioning. The goal is a purely technical transfer to Next.js.
- Ensure all existing CSS and assets are seamlessly integrated without introducing generic or modified Tailwind variants unless absolutely necessary to match existing exactly.

### 1.5 — Component Discipline
- Components live in `/components`. They are **pure, presentational, and reusable**.
- No component fetches its own data. Data flows down as props from page-level RSCs.
- Every component that needs interactivity must be in its own `*.client.tsx` file with `'use client'` at the top.
- No default exports from component files — use **named exports** everywhere.

### 1.6 — TypeScript Strict Mode
- `tsconfig.json` must have `"strict": true`.
- No `any` types. No `@ts-ignore` comments.
- All props interfaces are explicitly typed with `interface`, not inlined.

### 1.7 — Content is Data, Not Code
- Blog posts: `.mdx` files in `/content/blog/`. Frontmatter drives all metadata.
- Projects: a single `/content/projects.ts` typed data file. No hardcoded content inside JSX.
- Changing a blog post or adding a project must NEVER require touching a component file.

### 1.8 — Performance Baseline
- Lighthouse Performance score ≥ 90 on production build.
- No third-party scripts loaded synchronously in `<head>`.
- Web fonts loaded via `next/font` — no `<link>` tags to Google Fonts or similar.
- Images: use `<Image>` from `next/image` with explicit `width` and `height` at all times.

### 1.9 — Accessibility Baseline
- All interactive elements must be keyboard-navigable.
- All `<img>` and `<Image>` must have meaningful `alt` text.
- WCAG AA colour contrast minimum on all text.
- Semantic HTML first — divs are the last resort, not the first tool.

### 1.10 — No Runtime Dependencies for Static Content
- The blog and projects section must work with **zero client-side JavaScript** for rendering.
- Interactivity (mobile nav, contact form, animations) is the only valid reason for `'use client'`.

---

## 2. Specification — What We're Building

### 2.1 — Site Map

```
/                   → Home (Ported exactly from current index.html)
/blog               → Blog listing
/blog/[slug]        → Blog post
404.html            → Custom 404 (required for GitHub Pages static export)
```

### 2.2 — Page Specifications

#### `/` — Home
- Exact replica of the existing `index.html` structure and layout.
- Uses existing styles migrated carefully. No design changes.

#### `/blog` — Blog Listing
- List of all published MDX posts (`published: true` in frontmatter).
- Consistent with the overall site theme.
- Sorted by `date` descending.

#### `/blog/[slug]` — Blog Post
- MDX rendered with syntax highlighting (Shiki or Highlight.js — build-time only, no client bundle).
- Frontmatter: `title`, `date`, `tags`, `excerpt`, `published`, `coverImage?`.
- Reading time shown at top.
- Prev / Next post navigation.

#### `404.html`
- GitHub Pages serves `404.html` for unmatched routes.
- Next.js `output: 'export'` generates this automatically from `/app/not-found.tsx`.
- Must be a friendly, on-brand page with a link back to `/`.

### 2.3 — Content Schema

**Blog post frontmatter (`/content/blog/*.mdx`):**
```ts
interface BlogFrontmatter {
  title: string;
  date: string;           // ISO 8601: "2025-01-15"
  excerpt: string;        // 1–2 sentence summary
  tags: string[];
  published: boolean;
  coverImage?: string;    // path relative to /public
  readingTime?: number;   // auto-computed, no need to set manually
}
```

### 2.4 — Navigation
- Responsive: hamburger menu on mobile, horizontal nav on desktop.
- Links: Home · Blog.

---

## 3. Implementation Plan — Phases

### Phase 0 — Project Bootstrap
- [ ] `npx create-next-app@14` with TypeScript + Tailwind + App Router + `src/` off
- [ ] Set `output: 'export'` and `images: { unoptimized: true }` in `next.config.js`
- [ ] Configure GitHub Pages deployment (add `.nojekyll` to `/public`)
- [ ] Install dependencies: `next-mdx-remote` or `@next/mdx`, `gray-matter`, `shiki`

### Phase 1 — Home Page Migration
- [ ] Establish `RootLayout` — `<html>`, `<body>`, font variables, metadata defaults
- [ ] Directly port existing `index.html` structure into `/app/page.tsx`
- [ ] Migrate all external CSS and images directly to Next.js public/styles without arbitrary changes

### Phase 2 — Blog System
- [ ] MDX pipeline: `getAllPosts()` and `getPostBySlug()` utility functions
- [ ] `/blog` listing page (RSC, server-rendered at build time)
- [ ] `/blog/[slug]` dynamic page with `generateStaticParams`
- [ ] Syntax highlighting with Shiki (build-time, zero client JS)

### Phase 3 — Polish & SEO
- [ ] `generateMetadata` on pages (title, description, OG tags)
- [ ] `robots.txt` and `sitemap.xml` (static files)
- [ ] `not-found.tsx` custom 404
- [ ] Verify static build succeeds and layout matches original perfectly.

---

## 4. Open Questions

| # | Question | Why it matters |
|---|---|---|
| 1 | **GitHub repo name** — is it `<username>.github.io` or a project repo? | Determines whether `basePath` is needed in `next.config.js` |
| 2 | **Blog Content** — do you have any existing markdown blog posts to test the parser with? | Helpful for validating the `/blog` build logic. |

---

## 5. File Structure (Target)

```
/
├── app/
│   ├── layout.tsx              ← RootLayout
│   ├── page.tsx                ← Home (Exact clone of index.html)
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── not-found.tsx
├── components/
│   └── blog/
│       ├── PostCard.tsx
│       └── PostBody.tsx
├── content/
│   └── blog/
│       └── *.mdx
├── lib/
│   ├── blog.ts                 ← getAllPosts, getPostBySlug
│   └── reading-time.ts
├── public/
│   ├── .nojekyll               ← Required for GitHub Pages
│   └── images/                 ← Migrated from current assets
├── styles/
│   └── globals.css             ← Appended with existing standard CSS
├── tailwind.config.ts
└── next.config.js              ← output: 'export' ALWAYS present
```

---

> **Next step:** Review this plan. Once approved, we will begin the Migration Phase.
