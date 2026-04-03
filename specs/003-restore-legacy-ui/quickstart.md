# Quickstart for Testing Restored Legacy UI

## Overview
This feature restores the exact visual styling and interactive flair of the original portfolio, specifically integrating Animate On Scroll (AOS), VanillaTilt 3D effects, and precise canvas wrapper styling.

## Testing Prerequisites

1. Ensure packages are installed:
   ```bash
   npm install vanilla-tilt aos
   npm install --save-dev @types/aos
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Evaluation Steps

### 1. Verification of Hero Typing Animation
- Open `http://localhost:3000/`
- **Observe**: The subtitle text "Backend & AI Engineer" under "Nicola Ibrahim" should dynamically type out character-by-character on page load.
- **Verify**: A blinking cursor `|` should remain at the end of the text.

### 2. Verification of Animate On Scroll (AOS)
- Refresh the page and scroll down steadily.
- **Observe**: As the "About Me", "What I Do", and "Featured Projects" sections enter the viewport, the elements must gracefully fade and slide up automatically according to their `data-aos` properties.

### 3. Verification of 3D Card Tilts
- Scroll to the **Services** or **Tools** grids.
- **Observe**: Hover over any of the `.glass-card` elements (e.g. "Backend Engineering" service card or the "Python" skill card).
- **Verify**: The card must exhibit a 3D perspective tilt in the direction of your mouse pointer, along with a subtle light glare sweeping across its face.

### 4. Verification of the Space Canvas Theme integration
- Focus on the background space effect behind the Hero text.
- **Observe**: The opacity of the visualization must appear slightly dimmer / blended. It should perfectly mimic the legacy presentation.
