# Quickstart for Testing Refined Legacy UI Fidelity

## Overview
This feature forces the HeroSection Three.js canvas to identically match the 15,000 particle visual presentation and 3D angle from the legacy implementation.

## Evaluation Steps

### 1. Canvas Depth & Density Test
- Reload the site and view the top Hero text.
- **Observe**: The animated particle mass behind the text string should appear significantly denser and volumous compared to the previous 4,000 count.
- **Observe**: The color interpolation should seamlessly shift from white at the center, to blue, out to purple, making it a "galaxy" look rather than a monochromatic tone.

### 2. Interaction Alignment
- **Observe**: The black hole group must be physically tilted toward the camera viewport.
- Inspect the DOM wrapper `div` element holding the `.canvas`. You should see `pointer-events-auto` injected rather than `pointer-events-none`.
