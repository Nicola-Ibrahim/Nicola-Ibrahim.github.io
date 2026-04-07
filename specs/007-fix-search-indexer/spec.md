# Feature Specification: Fix Roadmap Search Engine (Pointer System)

**Feature Branch**: `007-fix-search-indexer`  
**Created**: 2026-04-07  
**Status**: Draft  
**Input**: User description: "The searching is completely wrong and doesn't fetch the correct files or words that exist in these files. Implement a Pointer System architecture: a build-time indexer that strips MDX to clean prose, and a client-side Fuse.js search bar that only returns Links to /roadmap/[slug] results."

---

## Root Cause Analysis

Based on a live audit of the `/api/search` index output, THREE critical bugs were identified:

1. **Topic-level content is missing from most entries.** The `content` field for several pages (e.g., all track `Overview` pages, and some category pages like `network/protocols`) returns `[EMPTY]` or only 60–90 characters. This is because the indexer reads `gray-matter`'s `content` property (which only extracts the **body after frontmatter**), but the MDX body is **almost entirely wrapped inside JSX components** like `<Topic>`, `<Callout>`, etc. The `stripMdx` regex removes these component tags but the guard condition for when the entire body is wrapped in a single top-level `<Topic>` block fails — stripping it out entirely.

2. **The `excerpt` field is often empty.** Several files use a `description` field in frontmatter for overviews, and `shortDesc` for topic files. Neither is consistently mapped. The indexer uses `data.shortDesc || ''` for category pages, but the `async-messaging.mdx` and similar "unified category" files store their topic descriptions **inside the frontmatter `topics` array**, not a top-level `shortDesc`. This means search results for prose inside those files have no human-readable excerpt.

3. **Fuse.js `ignoreLocation: false` with `location: 0` breaks deep prose matching.** With `ignoreLocation` set to false and a `distance: 100` cap, Fuse.js will only find matches in approximately the first 100 characters of the `content` field. Any word that appears deeper in the text (e.g., "Docker" in the middle of a 2,000-character cleaned string) will score very poorly or not match at all — causing Fuse to fall back to approximate matches from different documents.

---

## Clarifications

### Session 2026-04-07

- Q: What should the indexer do with self-closing/childless JSX components mixed inside prose blocks? → A: Silently remove self-closing/interactive components (e.g., `<EventLoopStepper />`) — keep surrounding prose only.
- Q: Should the indexer use an npm library for markdown stripping, or keep the inline regex approach? → A: Use the `remove-markdown` npm package for markdown stripping.
- Q: What should the search UI show while the index is loading on first open? → A: Show a pulsing skeleton/shimmer placeholder in the results area with a small spinner near the search icon.
- Q: What is the acceptable maximum size for the search index JSON payload? → A: 500KB max — emit a build-time warning if the index exceeds this threshold.
- Q: When a search query returns zero results, what should the system do? → A: Silently retry once with a looser threshold (0.45) and display those results labelled "Showing approximate matches".

---

## User Scenarios & Testing

### User Story 1 - Accurate Keyword Search (Priority: P1)

A developer is learning about containerization and types "Docker" into the roadmap search bar. They expect to see only results from pages that actually contain the word "Docker" or closely related terms (container, image, registry). They should NOT see unrelated pages like "API Design & Security".

**Why this priority**: This is the fundamental correctness requirement. The search must return relevant results.

**Independent Test**: Open the search bar, type "Docker", and confirm every returned result is from a Docker/DevOps related page. Zero unrelated pages should appear.

**Acceptance Scenarios**:

1. **Given** the user types "Docker" in the search bar, **When** results appear, **Then** all results must be from pages whose title or content contain the word "Docker" or a synonym.
2. **Given** the user types "event loop", **When** results appear, **Then** the "Pub/Sub & Async Messaging" page should appear as the top result.
3. **Given** the user types "JWT", **When** results appear, **Then** only the "API Design & Security" page should appear.
4. **Given** the user types a completely unrelated word that exists in no page, **When** results appear, **Then** zero results should be shown.

---

### User Story 2 - All Pages Are Discoverable (Priority: P1)

A developer wants to navigate to the "Scaling & Observability" topic but can't remember where it is in the sidebar. They type "load balancer" or "observability" in the search bar and expect the correct page to surface — including pages that have content stored deep inside `<Topic>` JSX wrappers.

**Why this priority**: The indexer must correctly extract ALL prose text from MDX files, even when it's wrapped in custom JSX components.

**Independent Test**: Type a specific term that appears only inside a `<Topic>` block in an MDX file. Confirm the parent page appears in results.

**Acceptance Scenarios**:

1. **Given** the MDX file contains prose inside `<Topic>` blocks, **When** the index is built, **Then** that prose must be present in the `content` field of the search index entry.
2. **Given** the user types a word from deep inside an MDX file, **When** results render, **Then** the correct page link appears.
3. **Given** a track has an `index.mdx` overview file, **When** the index is built, **Then** the overview's prose is indexed correctly (currently returns `[EMPTY]`).

---

### User Story 3 - Meaningful Snippets in Results (Priority: P2)

A developer searches for "websocket" and sees a list of results. Each result should show a short human-readable excerpt that gives them context about why each result matched — not an empty description.

**Why this priority**: Without snippets, all results look identical (just a title + badge). Users can't distinguish which result to click.

**Independent Test**: Type any keyword. Confirm every result card shows a non-empty, meaningful excerpt pulled from the page's content or frontmatter.

**Acceptance Scenarios**:

1. **Given** a search result is returned, **When** the result card renders, **Then** a non-empty excerpt of at most 140 characters must be displayed.
2. **Given** a page has a `shortDesc` or `description` in its frontmatter, **When** indexed, **Then** that value must be used as the `excerpt`.
3. **Given** a page has no frontmatter description, **When** indexed, **Then** the first 140 characters of the stripped prose content must be used as the fallback `excerpt`.

---

### Edge Cases

- What happens when an MDX file has NO body content at all (only frontmatter)?
- What happens if the `/api/search` fetch fails or times out on first open? → The modal MUST show a non-blocking error message ("Search unavailable") and allow the user to dismiss or retry, without crashing the page.
- What happens when a `<Topic>` block contains only a JSX component like `<EventLoopStepper />` with no prose?
- What happens when a user queries a 1 or 2 character string (e.g., "AI")?
- What happens when the `/api/search` endpoint is called before the dev server has fully compiled?

---

## Requirements

### Functional Requirements

- **FR-001**: The build-time indexer MUST recursively read ALL `.mdx` files from the content directory, including `index.mdx` track-level overviews.
- **FR-002**: The indexer MUST strip ALL JSX/React component tags (both opening and closing) while **preserving the text nodes inside them**. Self-closing components that contain no text children (e.g., `<EventLoopStepper />`, `<AsyncDecisionFlowchart />`) MUST be silently removed without replacement.
- **FR-003**: The indexer MUST use the `remove-markdown` npm package to strip all markdown syntax (headings, bold, italic, code blocks, links, images, tables) from the prose body, leaving only clean plain text.
- **FR-004**: Each search index entry MUST have a non-empty `excerpt` — either from frontmatter (`shortDesc`, `description`) or derived from the first 140 characters of the stripped prose.
- **FR-005**: The client-side Fuse.js instance MUST be initialized with `ignoreLocation: true` so that matches deep inside long content strings are not penalized.
- **FR-006**: The Fuse.js threshold MUST be set to `0.3` or stricter, with title given significantly higher weight than content (`title` weight ≥ 2x `content` weight).
- **FR-007**: Search results MUST render as Next.js `<Link>` components pointing to the correct `/roadmap/[slug]` URL.
- **FR-008**: The search component MUST lazy-load the index only when the search modal is first opened (not on page load).
- **FR-009B**: While the index is loading, the search modal MUST display a pulsing skeleton/shimmer placeholder in the results area and a small spinner adjacent to the search icon. The input field MUST remain active and accept typing during this window.
- **FR-009**: The index MUST be served as a static JSON endpoint (`force-static`) so it is generated once at build time and cached.
- **FR-010**: The indexer MUST calculate the byte size of the generated JSON and emit a `console.warn` to the build log if it exceeds 500KB, prompting the developer to review content truncation strategies.
- **FR-011**: When a search query returns zero results at the primary threshold (0.3), the search component MUST silently retry using a relaxed threshold (0.45). If the retry yields results, they MUST be displayed with a clearly visible label: "Showing approximate matches". If the retry also yields zero results, the standard "No results found" state MUST be shown.

### Key Entities

- **SearchItem**: `{ slug: string, title: string, excerpt: string, content: string, trackId: string }` — one entry per indexable page.
- **SearchResult**: `{ type: 'track' | 'category' | 'topic', title: string, subtitle?: string, description: string, url: string, trackId: string }` — the shape rendered in the UI.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: Searching for "Docker" returns ONLY Docker/DevOps related pages, with zero unrelated results.
- **SC-002**: Every indexed page has a non-empty `content` field of at least 50 characters (except pages with genuinely empty bodies).
- **SC-003**: Every search result card displays a non-empty human-readable excerpt.
- **SC-004**: Searching for any term that genuinely exists in a page's prose must return that page within the top 5 results.
- **SC-005**: The initial page load does NOT fetch the search index — it is only fetched when the search modal is opened for the first time.
- **SC-006**: Fuzzy search tolerates single-character typos (e.g., "Doker" → "Docker") without returning false positives from unrelated pages.
- **SC-007**: The total search index JSON payload MUST NOT exceed 500KB. If this limit is exceeded during a build, a visible warning MUST be emitted to the build log.
- **SC-008**: When a precise search returns zero results but approximate results exist, the user MUST see those results labelled "Showing approximate matches" rather than a blank "No results" state.

---

## Assumptions

- MDX content is stored in `app/roadmap/_content/` with a known structure: track directories, each containing category `.mdx` files and/or subdirectory topic files.
- The `gray-matter` library is already installed and correctly parses frontmatter.
- `fuse.js` is already a project dependency.
- The `remove-markdown` npm package MUST be installed as a project dependency; inline regex is not sufficient for handling nested markdown and table syntax.
- Track-level `index.mdx` overview files exist but may have very little prose — this is acceptable as long as the `excerpt` falls back to the frontmatter `description`.
- Mobile support and pagination of search results are out of scope for this fix.
