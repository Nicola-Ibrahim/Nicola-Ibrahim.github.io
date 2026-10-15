# Nicola Ibrahim portfolio

A single Next.js app exported as a static site for GitHub Pages. Use npm; `package-lock.json` is the only dependency lockfile.

## Project map

- `app/_portfolio`: homepage and portfolio data
- `app/projects`: project pages and MDX content
- `app/roadmap`: roadmap pages, content, and search UI
- `components/ui`: shared theme controls
- `public`: static assets; the roadmap search index is generated locally
- `scripts/build-search-index.mjs`: generates the search index for development and export

## Local development

```sh
npm ci
npm run dev
```

The `predev` script regenerates `public/search-index.json` from the roadmap MDX files. Restart the dev server after changing roadmap content to refresh the index.

## Validate and export

```sh
npm run check
npm run build
```

The build writes the static site to `out/`. It needs network access to fetch the Inter and JetBrains Mono fonts through `next/font/google` on a fresh machine. The `prebuild` script refreshes the search index before export.
