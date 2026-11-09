# Portfolio design, readability, and accessibility review

## Current state

Updated: 2026-10-31

- **Phase and authorized scope:** authorized implementation complete, verified within the limits below. Confirmed accessibility fixes and browser-supported readability corrections are implemented; existing content, navigation, and staged work are preserved.
- **Next action:** hand off the completed implementation. Background/project facts remain decisions for a later copy pass; real assistive-technology/device checks remain optional follow-up verification.
- **Open decisions:** intended audience and professional emphasis; factual background and project contribution details; whether any navigation adjustment is wanted after browser evaluation.
- **Baseline:** branch `dev`, commit `c392e91`. At the start, six paths already had staged changes: `app/_shared/spaceDestinations.ts`, `app/projects/_components/WorkSections.tsx`, `app/projects/_content/aad-llm.mdx`, `app/projects/_content/data.ts`, `app/projects/_content/tracing-objectives-backwards.mdx`, and `app/projects/page.tsx`. No unstaged application changes were present. Preserve this index and working tree.
- **Latest checks and limits:** `npm run check`, `npm run build` (51 static pages), and diff checks passed. Chrome DevTools MCP is not connected, so the root agent used installed, isolated headless Chrome through CDP. Browser checks and screenshot inspection covered desktop/mobile layouts, keyboard/modal behavior, native accessibility-tree names, enlarged-text reflow, pointer input/history, dynamic reduced motion, and WebGL failures. One read-only reviewer reported no actionable regressions. No real screen-reader, physical-device, or cross-browser checks were performed.

## Goal and evidence

Assess whether the site clearly presents a real software engineer's portfolio,
with readable content and accessible access to existing projects and contact
information. Recommend the smallest improvements supported by evidence.

### Portfolio assessment

The content structure supports a portfolio: the homepage identifies Nicola and
his engineering focus; Work contains project summaries, repository links, a live
demo, and short detail pages; About contains background, education, and a
testimonial; Skills and Contact have separate routes. The space concept provides
a consistent visual identity. The current Areas of work section describes
engineering activity rather than offering a service package.

The strongest opportunities are accessible presentation and clearer evidence of
personal contribution. A broad redesign or additional features are not justified
by this source review. Whether the result feels polished in use remains a visual
and interaction-testing question, not a confirmed finding from source alone.

### Confirmed facts at the planning baseline

1. **P1 — Several text color combinations need attention.**
   - `tailwind.config.ts:12` defines primary `#009688`, secondary `#00bcd4`, dark `#23272f`, and dark-lighter `#2d333b`.
   - `app/globals.css:34` places white button labels on the primary-to-secondary gradient. Source endpoint contrast is 3.67:1 and 2.30:1 respectively, below the 4.5:1 target for ordinary text.
   - Primary text on dark is 4.08:1 and on dark-lighter is 3.47:1. Small category labels use this combination in `app/projects/_components/WorkSections.tsx:60`; the home role label uses primary in `app/_home/HomePage.tsx:23`.
   - Tailwind gray-500 (`#6b7280`) on dark is 3.10:1 and on dark-lighter is 2.64:1. Small About labels and footer text use gray-500 (`app/about/_components/AboutSections.tsx:14`, `:35`, `:41`; `app/_shared/PortfolioFooter.tsx:9`, `:18`). Gray-400 on dark is 5.90:1, so the site does not need every paragraph recolored.
   - These are source-color calculations, not sampled rendered pixels. Gradients, opacity, font size, and underlying backgrounds must be checked in the browser before declaring complete compliance.

2. **P1 — Roadmap search is visually modal but lacks accessible modal behavior.**
   - `app/roadmap/_components/layout/Search.tsx:158` uses a motion div with no dialog role, accessible dialog name, or modal semantics.
   - The component initially focuses its input (`:69`) and supports Escape (`:61`), but contains no Tab containment, background inertness, or trigger-focus restoration.
   - The input at `:173` has placeholder text but no explicit accessible label. The icon-only close button at `:183` has no accessible name.
   - Arrow keys update `activeIndex` (`:103`) without an announced active result; nonactive results are dimmed with `opacity-60` (`:230`). Exact contrast and assistive-technology behavior need rendered verification.

3. **P1/P2 — Decorative About WebGL is less resilient than the other scenes.**
   - `app/about/_components/ParticleSphereCanvas.tsx:17` constructs WebGLRenderer without a guard. Its cleanup (`:164`) disposes geometry/materials but not the renderer.
   - Home and Explore catch renderer-construction failure. Explore also retains an HTML/CSS planet fallback and native buttons (`app/explore/_components/SpaceExplorer.tsx:149`).
   - No crash was reproduced. The confirmed defect is the missing guard and renderer disposal; a page failure on unsupported WebGL remains a runtime risk to verify.

4. **P2 — Planet navigation has useful alternatives, with small direct selectors.**
   - `app/explore/_components/SpaceExplorer.tsx:131` supports arrow-key scene navigation. Previous/next buttons are named and the selected planet has a named native button (`:152`, `:160`, `:164`).
   - `app/explore/_components/SpaceExplorer.module.css:129` makes arrow controls 44px square. Dot controls are 8px square with 9px gaps (`:141`). Their hit areas are small even though the equivalent arrow controls may satisfy the WCAG target-size exception; do not report the dots as an unconditional WCAG failure.
   - The scene is a labeled generic div rather than a navigation landmark, and changing destinations have no explicit live announcement. Actual screen-reader discovery and announcements are untested.

5. **P2 — Reduced-motion support exists but is inconsistent.**
   - `app/_shared/HeroSpaceTransition.tsx:40` bypasses view transitions when reduced motion is requested. Subpage arrival CSS also respects the preference.
   - Home and About read the preference on mounting, without listening for changes during the visit (`app/_home/BlackholeCanvas.tsx:294`; `app/about/_components/ParticleSphereCanvas.tsx`).
   - Roadmap search uses spring transforms regardless of the preference (`Search.tsx:160`), and `app/roadmap/_components/layout/TableOfContents.tsx:78` always requests smooth scrolling.

6. **P2 — Some structural choices warrant a focused readability pass.**
   - Skills jumps from h1 to h3 for group titles (`app/skills/_components/SkillsSection.tsx:7`, `:12`).
   - Project detail content has a `max-w-5xl` shell and `max-w-none` article/content wrappers (`app/projects/[slug]/layout.tsx:13`; `app/projects/[slug]/page.tsx:69`, `:82`). There is no dedicated paragraph reading measure; whether lines feel too long is a visual hypothesis.
   - The project rows share a responsive two-column layout and stack below the desktop breakpoint (`WorkSections.tsx:47`). Two visual panels repeat the project title and icon rather than showing project-specific evidence (`:52`). This is a confirmed presentation choice, not a broken layout.
   - The root has `lang="en"`; reviewed active page shells have main landmarks. There is no shared skip-to-content link in `app/layout.tsx`. Default browser focus behavior is not evidence of a missing focus indicator; verify it before changing it.

7. **Content facts to preserve and clarify, not silently rewrite.**
   - The hero says Software Engineer and mentions backend, data, and ML (`HomePage.tsx:23`, `:28`). About says backend is the main focus (`AboutSections.tsx:11`). Work shows AI/optimization categories. These can coexist, but the intended emphasis is Nicola's decision.
   - About displays 4+ years, an M.Sc., dates 2023–2026, and a named testimonial (`AboutSections.tsx:14`, `:32`, `:40`). Their accuracy and degree status have not been independently verified.
   - Tracing Objectives Backwards is labeled AI / Optimization, while its current description explains FastAPI and numerical search without identifying the AI component (`app/projects/_content/data.ts:17`; `app/projects/_content/tracing-objectives-backwards.mdx:18`). Preserve the approved classification; ask what the AI component does before adding explanatory claims.
   - LLM-Driven Algorithm Design has a short explanation and repository link. Its personal contribution and research context are not described explicitly. Do not invent them or reintroduce the framework branding Nicola asked to remove.
   - RAG is still described as planned, with no code, demo, or detail link (`data.ts:43`). Nicola explicitly removed the Research project and Planned project labels; do not restore those badges or imply the RAG system is implemented.
   - Bot System and IAM entries remain commented out. Their detail files still export; do not delete or re-feature them during this work.

### Hypotheses requiring browser or user evidence

- Visitors may take too long to find Work through the planet experience. Home currently links to Explore and Contact. This is not proof that a navbar or another hero button is needed; Nicola previously requested their removal.
- Short-screen and landscape layouts may crowd planet descriptions and controls: the CSS combines viewport-height scenes, fixed minimum heights at some breakpoints, and absolutely positioned captions. No overlap has been reproduced.
- Long project titles, repeated visual-panel titles, large section padding, and unrestricted article measure may increase scrolling or reduce scanability, especially on mobile. Current rendering must be inspected first.
- Browser Back, return-planet focus, route restoration, slow loads, and view-transition flashes need live testing. The source encodes `?planet=` in return links and saves the planet before travel, but does not prove correct runtime behavior.
- Generic background copy and a broad skills list may leave personal experience unclear. Improve specificity only using facts Nicola supplies, without inflating the projects' maturity or results.

## Scope and preserved behavior

- **Authorized scope:** correct affected contrast, search accessibility, WebGL resilience, heading structure, and demonstrable readability/input issues; update this record with actual results.
- **Conditional copy scope:** refine portfolio sentences only after factual decisions are answered. No such answers were supplied, so all existing factual copy remains unchanged.
- **Out of scope:** new features, a new visual theme, dependency/package changes, RAG implementation, project deletion, employment claims, broad refactors, deployment, staging, commits, and branch changes.
- **Existing behavior/content to preserve:** npm; static GitHub Pages export; current routes and MDX; dark teal/cyan space identity; home black hole and interactive About sphere; circular planet navigation, dragging/touchpad/touch input, hover glow, zoom and slide transitions; selected-planet return state; matching project-row design; current project names, links, hidden entries, removed badges, and factual claims. Do not add a navbar or restore View my work without a specific decision.

## Smallest justified change

Start with the confirmed accessibility gaps: separate readable text and button
colors from decorative scene colors; make the existing search UI an accessible
dialog; guard and dispose the About renderer; correct the Skills heading level.
Keep layout, routes, copy, scene artwork, and search ranking intact during that
pass. Then make narrowly scoped spacing, touch-target, motion, or reading-width
adjustments supported by browser evidence. Do not redesign or add a new component
library solely for this pass.

Potential copy changes should explain the project's problem, Nicola's actual
contribution, and the implementation in short sentences. Existing Areas of work
copy is already factual and does not require replacement with marketing text.

## Affected files if implementation is authorized

| Area | Candidate files | Intended change |
| --- | --- | --- |
| Contrast and focus | `app/globals.css`, affected text classes in `app/_home/HomePage.tsx`, `app/about/_components/AboutSections.tsx`, `app/projects/_components/WorkSections.tsx`, `app/_shared/PortfolioFooter.tsx`; `tailwind.config.ts` only if a separate semantic color is justified | Improve specific text/button combinations; preserve scene palette and verify focus visibility |
| Search dialog | `app/roadmap/_components/layout/Search.tsx` | Dialog semantics, names, focus containment/restoration, background behavior, usable results announcements, reduced motion; preserve ranking and keyboard shortcuts |
| Decorative sphere | `app/about/_components/ParticleSphereCanvas.tsx` | Guard initialization and dispose renderer; verify reduced-motion changes |
| Skills structure | `app/skills/_components/SkillsSection.tsx` | Group h2 headings with existing typography |
| Planet input, if verified | `app/explore/_components/SpaceExplorer.module.css`, `app/explore/_components/SpaceExplorer.tsx` | Larger invisible dot hit areas, suitable semantics/announcements, demonstrated mobile spacing fixes |
| Reading measure, if verified | `app/projects/[slug]/page.tsx` and a route-local style if needed | Narrow paragraphs without narrowing diagrams unnecessarily |
| Motion, if verified | `app/roadmap/_components/layout/TableOfContents.tsx`, `app/_home/BlackholeCanvas.tsx`, relevant scene/transition files | Respect reduced motion consistently while preserving normal navigation |
| Copy, after factual decisions | Home, About, `app/projects/_content/data.ts`, project MDX, and associated metadata | Align wording and explain verified contribution; preserve approved claims |

Browser evidence also justified editing `app/roadmap/_components/layout/Header.tsx`
for enlarged-text reflow. `app/roadmap/layout.tsx` received footer color corrections
using the same readable text palette; wording remains unchanged.

## Decisions that need Nicola's input

1. Is the primary audience hiring teams for backend/AI roles, research collaborators, or prospective clients? Proposed default: an engineering portfolio for backend and applied AI opportunities.
2. Are 4+ years, the degree dates/status, and the quoted testimonial current and accurate? What concise role/context can be stated for each project, and what is the AI component in Tracing Objectives Backwards?
3. If browser review confirms Work is difficult to discover, should the site retain the current exploration-only path or add a minimal optional text shortcut? Preserve the current path unless explicitly approved. No navbar change is currently justified.

The accessibility investigation can be specified without these answers. Copy
changes that depend on them and any navigation redesign must wait for decisions.

## Acceptance criteria

Planning deliverable:

- [x] Record the current tree, constraints, confirmed facts, hypotheses, smallest change, affected files, verification plan, and user decisions.
- [x] Leave application code and the existing index untouched.

Implementation acceptance criteria and evidence:

- [x] Corrected ordinary button/label/footer colors. Computed button gradient endpoints are white on `#0f766e` (5.47:1) and `#0e7490` (5.36:1); `#5eead4` labels on dark-lighter are 8.61:1. Testimonial attribution uses gray-300 to retain contrast over the hover background. Browser-computed CSS confirmed the gradient and label values. This is focused verification, not a site-wide contrast certification.
- [x] Search uses a named native modal dialog, labeled combobox and close control, active-result semantics, status messages, explicit Tab/Shift+Tab wrapping, Escape, backdrop closing, inert background, and focus restoration. Browser interaction and native accessibility-tree checks passed; human screen-reader evaluation remains unperformed.
- [x] WebGL-disabled Home, About, and Explore retained readable HTML and usable links/buttons without uncaught exceptions. About catches renderer creation failure and disposes its renderer; SPA departure produced GPU-buffer deletion. Cleanup paths were also reviewed.
- [x] Browser checks passed for keyboard planet navigation, search result selection, focus containment/return, same-planet return, browser Back/Forward, touch swipe, horizontal wheel input, and normal-motion hero/Explore round trip. Existing modified-click guards and hrefs remain intact; modified clicks were source-reviewed rather than exhaustively browser-tested.
- [ ] Full physical-device, real browser-zoom, and text-spacing coverage remains outstanding. Completed: ten routes at 1440×900, 390×844, 320×568, and 844×390 without horizontal control/document overflow; nine routes at a simulated 200% root font size; roadmap header controls at 200% font size across four widths; search at 320×300 to simulate reduced keyboard space. Narrow 320px layouts provide reflow evidence but do not replace actual 400% browser zoom or a real mobile keyboard.
- [x] Planet dots retain their small visible shape with 24×32px minimum hit areas and a 44×32px selected target. Screenshot and bounding-box checks passed.
- [x] Home/About rendered normally, stopped drawing after switching to reduced motion, and resumed after switching back. Search respects the preference; contents scrolling chooses instant behavior when reduced motion is requested. Default hero/Explore navigation passed with normal motion enabled.
- [x] Matching project-row layouts remain; project prose is approximately 738px wide at the tested desktop size while the diagram retains 976px. Project status, descriptions, and links remain unchanged.
- [x] Production build exported 51 static pages, including all project detail routes and roadmap routes. Application lint/TypeScript and browser route checks passed. External code/demo/contact destinations were preserved, not exhaustively revalidated against live third-party services.

## Plan and progress

- [x] Read AGENTS.md, the invoked skill, and the task template; inspect staged/unstaged state.
- [x] Trace main routes, content, shared shells, styles, and metadata.
- [x] Obtain one read-only investigator path map across navigation, motion, and accessibility (five bullets; no further agents).
- [x] Calculate source color contrasts and check the applicable W3C guidance.
- [x] Record findings and the smallest proposed work. Planning does not authorize implementation.
- [x] Inspect current rendered routes. Reproduced the clipped search close control, native-dialog Tab boundary, overlong desktop prose, and enlarged-text clipping before the corresponding corrections.
- [x] Implement confirmed accessibility fixes and browser-supported reflow corrections.
- [ ] Factual copy decisions deferred; no factual claims or navigation choices changed without answers.
- [x] Focused checks, static export, browser regressions, independent review, and final diff/index verification completed.

### Implemented changes and review findings

- Added a separate readable text color and darkened only primary button fills; scene shader/decorative colors remain unchanged. Raised low-contrast small text in About and portfolio/project/roadmap footers.
- Converted the existing search overlay to a native modal with a labeled combobox/listbox, live result/loading/error status, named 44px close control, focus restoration, explicit wrapping, and reduced-motion opening. Search ranking, routes, shortcuts, and result links are preserved. Initial browser testing found native Tab behavior could leave the dialog after the final control; the explicit wrapper fixed it and the affected interaction was retested successfully.
- Guarded About WebGL initialization and disposed its renderer. Home/About now respond to live motion-preference changes and remove those listeners on cleanup. Contents links avoid smooth scrolling in reduced-motion mode.
- Added a named scene region, separate keyboard instructions, and a live current-planet status. Dot hit areas grew without changing their visible 8px/28px indicator shapes.
- Corrected Skills group heading levels. Limited project paragraphs/lists/quotes to 65ch without narrowing figures.
- Browser enlarged-text tests exposed clipping hidden by global overflow-x suppression. Added safe word wrapping, bounded button padding/width, and constrained home name spans; then corrected the gradient text wrapper so wrapped names remain painted. A mobile roadmap header now wraps search onto its own row so controls remain reachable. All nine enlarged-text route checks passed after these corrections.
- No project names, descriptions, removed badges, factual claims, navigation routes, package/dependency files, or scene artwork were changed in this pass.
- Follow-up: Nicola reported Contact breaking before its last letter. The new inherited wrapping rule affected the constrained planet caption. Added `white-space: nowrap` only to planet titles, retaining wrapping for descriptions. Headless Chrome verified a single Contact text line within the viewport at 1440px, 851px, 390px, and 320px widths, including 320px with 200% root text size. Diff checks passed; the full build was not repeated for this single CSS declaration.

## Verification and review

| Command or review | Actual result | Limits |
| --- | --- | --- |
| Git status, staged/unstaged diffs | Six existing staged application paths; no unstaged application edits at baseline | No staging, resetting, or commits performed |
| Source route/component review | Completed for home, Explore, About, Work/details, Skills, Contact, shared shell, and roadmap navigation/search | No current visual judgment or runtime behavior claimed |
| One investigator path map | Completed; key findings incorporated above | Read-only code evidence, five bullets |
| Inline Node contrast calculation | Ratios recorded above from explicit palette values | Not browser-sampled; does not certify site-wide compliance |
| W3C guidance | Consulted contrast, target-size exceptions, and modal pattern | Standards reference, not a rendered accessibility audit |
| Application lint/typecheck/build | Not run in this planning phase | Avoid generated-file changes; prior task results are not verification of this plan |
| `npm run check` during implementation | Passed after the final application edits | ESLint and TypeScript, not visual certification |
| Root CDP route/layout checks | Ten routes × four viewport sizes passed; nine enlarged-text route checks passed after fixes | Headless Chrome desktop emulation; full physical-device/zoom matrix not covered |
| Search browser checks | Open/focus, Tab and Shift+Tab wrapping, background inertness, Escape/focus return, empty/error states, ArrowDown/Enter selection, backdrop closing, and native accessibility names passed | Screen-reader speech and touch keyboard not tested |
| Navigation browser checks | Arrow keys, emulated touch swipe, horizontal wheel, direct planet query, same-planet return, Back/Forward, and normal-motion hero/Explore round trip passed | No cross-browser testing; visual flash assessment limited to inspected screenshots/state checks |
| WebGL/motion browser checks | Normal animation, live reduce/resume, About buffer cleanup, and WebGL-disabled HTML/control fallback passed | Simulated WebGL unavailability and media preferences |
| Read-only reviewer | No actionable regressions found in initial or focused follow-up review | Source-only; no separate browser-debugger agent because MCP was not connected |
| `npm run build` | Passed; 51 static pages exported | Build-only next-env.d.ts route-import change restored to the starting version |
| Final diff/index review | Passed; index SHA-256 remained `31e9c0b011474d545a01237c65d6c65497dbe141a32159aef17108f4372814bf` | Six original staged paths preserved; no staging or commits |

Implementation verification plan:

1. Use the existing browser integration if available; otherwise record the tool limitation and arrange visual verification before declaring layout work complete. Do not install a second browser tool automatically.
2. Inspect `/`, `/explore`, all four planet routes, both featured detail routes, `/roadmap`, and a representative roadmap chapter at 1440×900, 390×844, 320×568, and 844×390. Also check text zoom/reflow and open search with a mobile keyboard.
3. Exercise keyboard-only navigation, visible focus, Enter/Space activation, arrow controls, drag/swipe, Escape, modal Tab cycling, and return focus. Use a screen reader for search/result announcements when available; screenshots alone cannot verify them.
4. Open `/explore?planet=projects` directly; travel to Work; return; test browser Back/Forward and detail-to-Work navigation. Check slow loads for flashes without changing the approved transition design preemptively.
5. Test reduced motion before loading and after changing the OS/browser preference. Exercise WebGL-disabled About/Explore and confirm readable HTML and usable links.
6. Measure affected computed foreground/background colors and hit areas in normal/focus/hover states. Combine automated accessibility checks, where already available, with manual keyboard checks; neither is a complete certification.
7. Run `npm run check` and `npm run build` after implementation. Inspect the generated export and changed routes; review any regenerated search index/Next type files rather than committing incidental output.
8. Review the final diff against the baseline and preserve all pre-existing staged work.

Reference guidance:

- [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C target size minimum and exceptions](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C accessible modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

Review: implementation diff self-review and one independent read-only reviewer,
including a focused follow-up after browser-discovered fixes. The planning phase
used one investigator. Implementation used no browser-debugger agent because its
MCP tools were unavailable; root used installed headless Chrome directly. No
accessibility-compliance certification is implied.

## Handoff

- **Completed:** authorized accessibility/readability implementation, focused lint/TypeScript and browser checks, and independent review.
- **Remaining:** real screen-reader/device/cross-browser and full browser-zoom checks; user-dependent facts and any later copy/navigation decisions. No further authorized code work remains in this pass.
- **Next action:** review the implemented changes. No changes have been staged or committed by this implementation pass; the six pre-existing staged paths are preserved. The temporary development server and isolated Chrome started for verification were stopped.
