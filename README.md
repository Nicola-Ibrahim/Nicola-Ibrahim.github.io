# Nicola Ibrahim portfolio

A single Next.js app exported as a static site for GitHub Pages. Use npm; `package-lock.json` is the only dependency lockfile.

## Project map

- `app/_home`: homepage and black hole visual
- `app/_shared`: navigation transitions and layout shared by portfolio pages
- `app/explore`: planet navigation and scene
- `app/about`, `app/contact`, `app/skills`: page content beside each route
- `app/projects`: work page, project data, case studies, and MDX content
- `app/roadmap`: roadmap pages, content, and search UI
- `public`: static assets; the roadmap search index is generated locally
- `scripts/build-search-index.mjs`: generates the search index for development and export

## Local development

```sh
npm ci
npm run dev
```

The `predev` script generates `public/search-index.json` from the roadmap MDX files. While the dev server runs, changes to those files refresh the index automatically.

## Validate and export

```sh
npm run check
npm run build
```

The build writes the static site to `out/`. It needs network access to fetch the Inter and JetBrains Mono fonts through `next/font/google` on a fresh machine. The `prebuild` script refreshes the search index before export.
