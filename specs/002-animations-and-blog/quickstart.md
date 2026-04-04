# Quickstart: Testing Animations and Blog Integration

Once the Next.js migration is complete with the integrated `blog.html` contents and Three.js canvas components, use these steps to verify functionality.

## Bootstrapping locally

```bash
# Ensure dependencies are installed, including Lucide React if not present
npm install
npm install lucide-react

# Run the dev server
npm run dev
```

## Verification Steps

1. Navigate to `http://localhost:3000/`. The hero background should immediately render the blackhole animations correctly.
2. Navigate to `http://localhost:3000/blog` (or whichever route the TSX from blog.html is placed). 
3. Verify that the flowchart and "Next Step" buttons function interactively without hydration errors.
