# Data Model

## Blog Post
Represents an MDX file located in `/content/blog/`.

**Fields (Frontmatter)**:
- `title` (string, required): Title of the post
- `date` (string/ISO, required): Publication date
- `excerpt` (string, required): Short summary for listings
- `tags` (string[], optional): Array of category tags
- `published` (boolean, required): Whether to include it in the build process
- `coverImage` (string, optional): Path to the cover image within the `public/` directory

**Derived Fields (Generated at Build Time)**:
- `slug` (string): Derived dynamically from the filename via `lib/blog.ts`
- `readingTime` (number): Calculated from the raw body text length
