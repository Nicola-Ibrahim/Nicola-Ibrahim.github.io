# Data Model: Search Index (007)

**Date**: 2026-04-07

---

## SearchItem

The atomic unit written into `public/search-index.json` by the build script.

```typescript
interface SearchItem {
  slug: string;      // Absolute URL path: /roadmap/[trackId]/[category][#topicId]
  title: string;     // Human-readable page title from frontmatter
  excerpt: string;   // ≤140 chars: frontmatter shortDesc/description or first 140 chars of content
  content: string;   // Full stripped prose (JSX tags removed, markdown removed)
  trackId: string;   // Parent track directory name (e.g., "backend", "devops")
}
```

### Validation Rules

| Field | Rule |
|-------|------|
| `slug` | Must start with `/roadmap/`. Never null. |
| `title` | Falls back to the filename stem if frontmatter `title` is missing. Never empty. |
| `excerpt` | Priority: `data.shortDesc` → `data.description` → `content.slice(0, 140) + '...'`. Never empty (enforced at build time). |
| `content` | Result of the two-pass strip pipeline. May be empty string only for pages with no prose body (e.g., pure-diagram pages). |
| `trackId` | Directory name of the parent track. Never contains `/`. |

---

## SearchResult

The shape rendered by the `Search.tsx` component UI. Derived from `SearchItem` after Fuse matching.

```typescript
interface SearchResult {
  type: 'track' | 'category' | 'topic'; // Derived from slug structure
  title: string;
  subtitle?: string;    // trackId.toUpperCase() — shown as a badge
  description: string;  // excerpt from SearchItem
  url: string;          // Same as slug
  trackId: string;
  isApproximate?: boolean; // true if result came from the 0.45 fallback Fuse instance
}
```

---

## Slug Structure

| MDX File Location | Slug Pattern | `type` |
|---|---|---|
| `_content/{trackId}/index.mdx` | `/roadmap/{trackId}` | `track` |
| `_content/{trackId}/{category}.mdx` | `/roadmap/{trackId}/{category}` | `category` |
| `_content/{trackId}/{category}/{topic}.mdx` | `/roadmap/{trackId}/{category}#{topic}` | `topic` |

---

## State Model: Search Component

```
CLOSED
  │  onOpen (CMD+K or click)
  ▼
OPEN_LOADING  (isOpen=true, isLoading=true)
  │  fetch('/search-index.json') resolves
  ▼
OPEN_IDLE  (isOpen=true, isLoading=false, query='')
  │  user types
  ▼
OPEN_RESULTS  (results.length > 0)
  │  OR
OPEN_FALLBACK (results from 0.45 threshold, isApproximate=true)
  │  OR
OPEN_EMPTY  (zero results at both thresholds)
  │  Esc / click outside / Enter
  ▼
CLOSED
```

**Error State**: If `fetch('/search-index.json')` throws, transition to `OPEN_ERROR` — display "Search unavailable. Try reloading." with a dismiss button.
