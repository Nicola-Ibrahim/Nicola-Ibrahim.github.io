# Contract: search-index.json (Static File)

**Consumers**: `Search.tsx` (client-side Fuse.js)  
**Producer**: `scripts/build-search-index.mjs` (prebuild npm script)  
**Location**: `public/search-index.json` → served at `/search-index.json`

---

## Schema

```json
[
  {
    "slug": "/roadmap/backend/async-messaging",
    "title": "Pub/Sub & Async Messaging",
    "excerpt": "Understanding the difference between blocking, concurrent, and parallel execution...",
    "content": "Understanding the difference between blocking concurrent and parallel execution is crucial...",
    "trackId": "backend"
  }
]
```

**Type**: JSON Array of `SearchItem` objects  
**Encoding**: UTF-8  
**Max size**: 500KB (enforced by build script warning)

---

## Guarantees

| Guarantee | Value |
|-----------|-------|
| `slug` always starts with | `/roadmap/` |
| `title` | Never empty string |
| `excerpt` | Never empty string; ≤ 140 chars + `...` if truncated |
| `content` | May be empty string for pure-diagram pages |
| `trackId` | Never contains `/` |
| Array ordering | Tracks alphabetically, categories within track in filesystem order |

---

## Versioning

This contract has no versioning mechanism. If the schema changes, `Search.tsx` must be updated simultaneously. The file is regenerated on every `npm run build`.

---

## Error Behaviour (Consumer Side)

If `/search-index.json` returns a non-200 or non-array response, `Search.tsx` MUST:
1. Set `isError = true`
2. Display: "Search unavailable. Try reloading."
3. NOT crash or throw an unhandled exception
