# Quickstart: Next.js Portfolio Migration

1. Ensure `Node.js` v18.17 or higher is installed.
2. Initialize and deploy setup: 
   ```bash
   npm install next@latest react@latest react-dom@latest next-mdx-remote gray-matter shiki tailwindcss postcss autoprefixer
   ```
3. Place markdown files logically inside `/content/blog/`. Make sure each MDX file has appropriate valid frontmatter.
4. Start the local server for rapid real-time feedback:
   ```bash
   npm run dev
   ```
5. Pre-render the application entirely statically via the command:
   ```bash
   npm run build
   ```
   *Note: Because `output: 'export'` is set, this command creates an `out/` folder containing pure HTML/CSS/JS components.*
