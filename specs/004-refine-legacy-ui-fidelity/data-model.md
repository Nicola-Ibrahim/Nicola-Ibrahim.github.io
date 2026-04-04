# Data Model: Refine Legacy UI Fidelity

*This feature focuses entirely on visual parameter porting across React client components. No new structural persistence or data models are introduced.*

## Internal UI State Math

- **Blackhole Particles Array**:
  ```typescript
  type ParticleData = {
      radius: number; // 2 + Math.random() * 4.5
      angle: number; // Math.random() * Math.PI * 2
      speed: number; // 0.005 + (1 / radius) * 0.02
  }
  ```
