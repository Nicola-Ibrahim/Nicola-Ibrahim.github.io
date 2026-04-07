# Research: Fix Roadmap Search Engine (007)

**Date**: 2026-04-07  
**Branch**: `007-fix-search-indexer`

---

## Decision 1: Static File vs. API Route for Index Delivery

**Decision**: Use `public/search-index.json` (a static file written by a build script)  
**Rationale**: The project uses `output: 'export'` in `next.config.js`, which produces a fully static site for GitHub Pages. Next.js API routes (`/app/api/*`) are server-side constructs that do not exist in a static export — they are simply ignored/omitted from the `out/` directory. The existing `app/api/search/route.ts` with `force-static` technically produces a JSON file during `next build`, but this is fragile, undocumented behavior. The correct, constitution-compliant approach is a `prebuild` npm script that writes `public/search-index.json` directly.  
**Alternatives Considered**:
- `force-static` API route: Works in dev, unreliable in `output: 'export'` — rejected.
- Inline in `next.config.js`: Possible but couples build logic to config — rejected for separation of concerns.
- Inline in a Server Component: Not possible — `fs` in a Server Component works at build time, but exposing it as a static JSON requires a route anyway — rejected.

---

## Decision 2: MDX Stripping Strategy

**Decision**: Two-pass pipeline — (1) regex strips JSX tags while preserving inner text; (2) `remove-markdown` cleans the resulting markdown prose.  
**Rationale**: The current `stripMdx` regex does step 1 correctly in concept but has a critical regex bug with multi-line JSX props. After JSX stripping, the remaining text is valid markdown that `remove-markdown` handles perfectly (headings, bold, tables, code blocks). Using `remove-markdown` for the markdown layer is more reliable than homegrown regex.  
**The exact regex order that works**:
1. Strip frontmatter (`/^---[\s\S]*?---/`)
2. Strip JS/TS imports and exports
3. **Strip self-closing JSX tags** (uppercase, no children): `/\s*<[A-Z][a-zA-Z0-9]*[^>]*\/>/g` → `''`
4. **Strip opening JSX tags** while preserving children: `/\s*<[A-Z][a-zA-Z0-9]*[^>]*>/g` → `''`
5. **Strip closing JSX tags**: `/<\/[A-Z][a-zA-Z0-9]*>/g` → `''`
6. Pass remaining string through `removeMarkdown()` from `remove-markdown` package
7. Collapse whitespace

**Why self-closing must be stripped BEFORE opening tags**: If opening-tag regex runs first, it could partially match self-closing tags like `<Foo />` and leave a dangling `/>` in the output.

**Alternatives Considered**:
- `remark` + `remark-mdx` unified pipeline: Correct but heavy; requires AST traversal setup — overkill for this use case.
- Pure regex only: Current approach — has gaps with nested markdown, table syntax — rejected.

---

## Decision 3: Build Script Approach

**Decision**: TypeScript build script using `ts-node` OR compiled to JS and run with `node`, hooked via `package.json` `"prebuild"` script.  
**Rationale**: Since the tsconfig targets `es5` and the project is Next.js, the simplest zero-dependency approach is a JavaScript file (`.mjs`) using Node's built-in `fs/path` — no `ts-node` needed. This avoids adding another dev dependency.  
**The script flow**:
1. Import `gray-matter` (already installed as CommonJS)
2. Import `removeMarkdown` from `remove-markdown` (to be installed)
3. Crawl `app/roadmap/_content/` — same logic as current `search-indexer.ts`
4. Strip and index each file
5. Check `Buffer.byteLength(JSON.stringify(index))` — warn if > 500KB
6. Write to `public/search-index.json`

**Alternatives Considered**:
- Keep `search-indexer.ts` as the server function, call it from a Next.js plugin: Requires `next.config.js` modification — rejected.
- Use a Makefile target: Unnecessary complexity for a Node project.

---

## Decision 4: Zero-Result Fallback Retry in Fuse.js

**Decision**: Instantiate **two Fuse instances** — one at `threshold: 0.3` (strict), one at `threshold: 0.45` (fallback). Run strict first; if empty, run fallback and label results "Showing approximate matches".  
**Rationale**: Creating two instances from the same index data is cheap (just two config objects over the same array reference). This avoids re-instantiation on every search and makes the two-tier logic explicit.  
**Alternatives Considered**:
- Mutate the Fuse instance threshold on retry: Fuse doesn't support runtime threshold changes without re-initialization — rejected.
- Single instance at 0.4 compromise: Loses the precision benefit we already resolved — rejected.

---

## Decision 5: Skeleton Loading UI

**Decision**: Three animated `div` pulse elements (Tailwind `animate-pulse`) mimicking result card shapes, shown while `isLoading === true`. A spinning `Loader2` icon from `lucide-react` replaces the static `SearchIcon` during loading.  
**Rationale**: Tailwind's `animate-pulse` requires zero additional dependencies. `lucide-react` is already installed.  
**Alternatives Considered**:
- `framer-motion` skeleton: Already a dep, but overkill for a simple shimmer — rejected.
- Plain "Loading..." text: Too minimal per the clarification decision — rejected.
