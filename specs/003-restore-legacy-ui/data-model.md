# Data Model: Restore Legacy UI

*This feature focuses entirely on UI and aesthetic restoration. No structural modifications to databases, core domain models, or API boundaries are introduced.*

The data configuration is purely client-state for the components:

## UI States

- **TypingAnimation Component**: 
  - `currentText`: string (The characters currently rendered)
  - `isTyping`: boolean (Whether the animation is active)
  - `isComplete`: boolean (Activates the blinking cursor state)

- **VanillaTilt Wrapper**:
  - `tiltOptions`: object containing the legacy configuration.
    ```typescript
    {
      max: number,
      speed: number,
      glare: boolean,
      "max-glare": number,
      scale: number
    }
    ```
