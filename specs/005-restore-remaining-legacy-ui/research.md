# Research Document: Restore Remaining Legacy UI

## 1. Technical Implementation Details

**Goal**: Restore Devicons, the About visualization, and Services formatting perfectly.

- **Decision**: Include the CDN links for devicon via Next.js `layout.tsx` or raw CSS to provide the class-based SVG icon capability.
- **Decision**: Build an `AboutCanvas.tsx` component bridging the gap between `about-visualization.js` and React `useEffect`, exactly how `HeroCanvas.tsx` was restored. The torus knot shapes and colors (`0x2563eb`, `0x8b5cf6`) will be copied over.
- **Decision**: Update `content/data.ts` to swap generic FontAwesome references out for proper full-color `devicon-*` references.

## Conclusion

All technical pathing maps identically to the previous Three.js WebGL component integrations. No major foundational structural decisions need to be blocked.
