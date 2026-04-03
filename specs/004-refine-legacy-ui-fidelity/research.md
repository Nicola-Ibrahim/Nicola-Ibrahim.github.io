# Research Document: Refine Legacy UI Fidelity

## 1. Technical Parameters for Three.js Canvas Match

**Goal**: Reproduce the visual layout of `js/modules/hero-visualization.js` strictly.

- **Decision**: Port over the exact geometries, math constants, random generators, and colors into `HeroCanvas.tsx`.
- **Rationale**: The user wants an exact visual match. The Next.js migration previously recreated the three.js implementation using some subjective tweaks (4000 disk particles instead of 15000, 70% opacity wrapper instead of 80% opacity, blue coloring instead of the white/blue/purple gradient map). 

## Conclusion

All technical clarifications are resolved by adapting the previous legacy code parameters directly. No new packages or architectural decisions are required.
