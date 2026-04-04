# External Contract: Site Map

This details the exposed routes to standard web users.

## Routes

- `GET /` 
  - Description: The replicated static portfolio homepage.
  - Required params: None
- `GET /blog`
  - Description: Main landing page for all blog posts. Index list natively pre-rendered.
- `GET /blog/[slug]`
  - Description: Article deep link parsed dynamically via `generateStaticParams()` at build time.
- `GET /404.html`
  - Description: Pre-rendered customized not-found page served automatically by GitHub.
