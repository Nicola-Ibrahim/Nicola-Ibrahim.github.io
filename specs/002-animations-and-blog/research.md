# Research & Decisions: Animations and Blog

## Unknowns Resolved

1.  **Three.js Integration in Next.js App Router**:
    *   **Decision**: Run vanilla Three.js or standard WebGL setup inside a `"use client"` component `useEffect` block.
    *   **Rationale**: The original animations were likely vanilla JavaScript canvas manipulations. Wrapping them in a React component and referencing a canvas via `useRef` directly mirrors the original execution model without requiring a rewrite into `@react-three/fiber` declarative syntax.
    *   **Alternatives considered**: Rewriting everything into React Three Fiber (R3F) was rejected because it violates the immediate goal of a rapid 1:1 port and introduces an unnecessary heavy abstraction curve for existing logic.

2.  **Blog.html Source Location**:
    *   **Decision**: Copy the TSX code embedded in `blog.html` directly into `app/roadmap/page.tsx` or update the existing `app/blog/page.tsx` to handle the interactive TSX components alongside Markdown blogs.
    *   **Rationale**: Since `blog.html` is actually full of `lucide-react` icons, React Interfaces, and TSX component structures, it is natively compatible with Next.js rendering once correctly imported.
    *   **Alternatives considered**: Using an HTML to Markdown parser was rejected because the source contains highly interactive rich React components.

## Best Practices

*   Ensure any canvas initialization scripts run *after* the DOM paints (i.e., inside `useEffect` or dynamically loaded via `next/dynamic` with `ssr: false`).
*   Extract the static JSON configurations/roadmaps out into the `content` folder so they aren't hardcoded in the page layout.
