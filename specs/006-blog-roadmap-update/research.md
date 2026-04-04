# Research & Technical Decisions: Blog Roadmap Update

## Architecture Context
Next.js App Router (14) with statically exported static pages (`output: 'export'`). Pure Tailwind for styling without external libraries (besides DevIcons and FontAwesome from CDN if currently used). Content is heavily data-driven (`roadmapsData`). React Components inside data structures need to be treated properly.

## Decision 1: Handling React Elements within Static Data
- **Problem**: `blog.html` defines `roadmapsData` containing raw JSX/React components embedded directly into objects (e.g., `AsyncDecisionFlowchart`, `ThreadsVsCoroutines`, `EventLoopStepper`). You cannot safely serialize React Nodes during Next.js SSG using `getStaticProps` in App Router if it passes between Server and Client boundaries incorrectly.
- **Decision**: Define `roadmapsData` directly inside a client-side module, or keep it in `content/roadmaps.tsx` exposing the data. Since the components are interactive (`EventLoopStepper` uses `useState`), the `RoadmapView` must be a `'use client'` component.
- **Rationale**: Next.js App Router handles `'use client'` natively for interactivity. Importing static objects containing JSX directly into a Client Component is perfectly valid and standard in Next.js without needing dangerous serialization parsing.

## Decision 2: Premium Design Aesthetic
- **Problem**: The user requires an "amazing" documentation style layout, prioritizing deep studying.
- **Decision**: 
  - Typography: Proxima Nova / Inter style with higher line-height (`leading-relaxed`) and optimal reading width (`max-w-3xl`).
  - Dark Mode Default / Mixed contrast: Ensure code areas use darker contrast blocks (`bg-slate-900` or `bg-[#1e1e1e]`), while content uses clean legible backgrounds.
  - Interactive: Accordion-style layout for topic breakdown inside syllabuses to keep the view clean unless the user is specifically studying a module.
- **Rationale**: Aligns with modern docs (Tailwind UI / Stripe / Vercel docs), utilizing accordions and high-contrast demarcations to minimize cognitive overload.
