# Research: Migrate Portfolio to Next.js

## Decision 1: MDX parsing
- **Decision**: Use `next-mdx-remote` combined with `gray-matter`.
- **Rationale**: `next-mdx-remote` allows parsing MDX files dynamically via async Server Components using standard Node `fs.readFile` and `gray-matter` for frontmatter extraction, without directly coupling the Next.js app router to `.mdx` pages. This fulfills the Constitution requirement "Content is Data, Not Code" perfectly.
- **Alternatives considered**: `@next/mdx` (requires files to be in the App tree routing directly), `contentlayer` (powerful but excessively heavy tool and is largely unmaintained).

## Decision 2: Image handling on GitHub Pages
- **Decision**: Use standard React `<img />` tags or `<Image unoptimized={true} />` from `next/image`.
- **Rationale**: Next.js' default image optimization relies on its own Node.js server to run. Since the project uses `output: 'export'` for GitHub Pages standard hosting, standard image optimization will crash the compilation.
- **Alternatives considered**: Third-party image loaders (Cloudinary, Akamai). Overkill and unnecessary complexity for a simple zero-runtime static site. 
