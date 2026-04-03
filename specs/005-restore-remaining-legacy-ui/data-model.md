# Data Model: Restore Remaining Legacy UI

*There is no database or server persistence required for this mapping.*

## Static Array Overrides

- **Skills List (`content/data.ts`)**:
  - Requires updating the `icon` string property from `fab fa-X` to `devicon-X-plain`.
  - Requires updating the `color` string property from generic Tailwind classes (e.g. `text-blue-500`) to strictly `text-[#HEX]`.
