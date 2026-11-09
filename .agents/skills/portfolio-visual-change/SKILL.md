---
name: portfolio-visual-change
description: Design or revise this portfolio's space scenes, animations and responsive visual composition while preserving navigation and accessible fallbacks.
---

# Change portfolio visuals

Read `AGENTS.md` and the relevant home, explore or route-local visual code.
Use [portfolio-change](../portfolio-change/SKILL.md) for substantial task phases
and records; this skill supplies visual-specific criteria.

Inspect the current rendered view when browser access is available. Preserve the
dark palette, typography and space language unless the request changes them.
Define what the user should see at desktop and narrow widths, including text
overlap, controls and focus states. For a navigation animation, trace both entry
and return, browser back and saved planet state.

Use motion to clarify travel or hierarchy. Respect `prefers-reduced-motion`,
keyboard and touch input. Keep text readable over scenes; provide a graceful
non-WebGL fallback. Bound pixel ratio and animation work where applicable;
cancel frames and release listeners, textures, geometries and materials on
unmount.

Verify the visible result at relevant widths and interaction states when tools
are available. Pair with [portfolio-verification](../portfolio-verification/SKILL.md)
for checks; do not describe browser testing that did not happen.
