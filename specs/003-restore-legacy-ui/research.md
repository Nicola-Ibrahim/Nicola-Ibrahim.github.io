# Research Document: Restore Legacy UI

## 1. 3D Parallax Tilt Effect

**Goal**: Restore the `max: 10, speed: 400, glare: true, "max-glare": 0.2, scale: 1.02` VanillaTilt effect to `.glass-card` elements in Next.js.

- **Option A - `vanilla-tilt` via `useRef`**: 
  - Pros: Exact same library, 100% fidelity.
  - Cons: Requires manual cleanup of the tilt instance inside a `useEffect()`, manipulating DOM which React prefers doing declaratively.
- **Option B - `react-parallax-tilt`**:
  - Pros: React-native, declarative.
  - Cons: Adds a new dependency, might have slightly different easing or behavior from the legacy `vanilla-tilt` configuration.

**Decision**: **Option A (`vanilla-tilt`) via a small React Wrapper**.
**Rationale**: The user stated they want the *exact same* effect and visual style. `vanilla-tilt` is extremely lightweight. We can create a `<TiltWrapper>` generic client component that takes `children` and initializes the library via `useRef`.

## 2. Animate On Scroll (AOS) Next.js 14 Integration

**Goal**: Restore the scroll animations (fade-up, fade-right) orchestrated by `data-aos` attributes.

**Issue**: Next.js App Router separates Client and Server components. AOS relies on reading intersection observers directly in the DOM.
**Decision**: Install the `aos` package. Create a top-level client component `<AOSInit>` that invokes `AOS.init({ once: true })` inside a `useEffect`. Render this component inside `app/layout.tsx` (but ensure the init itself is purely client-side).
**Rationale**: AOS styles rely on `aos/dist/aos.css`. This CSS needs to be imported globally in `globals.css` or `layout.tsx`. The `AOSInit` component tracks scrolling without interfering with server rendering.

## 3. Typing Animation Effect

**Goal**: Restore the "typing" and blinking cursor effect on the Hero section subtitle.

**Issue**: The legacy implementation explicitly queried the DOM to replace `.textContent` character by character.
**Decision**: Reimplement using a custom React `useTypingEffect` hook or just a simple `useEffect` inside a dedicated `TypingAnimation.tsx` client component. We will use a React approach that updates a state variable containing the current substring rather than mutating DOM directly.
**Rationale**: React state-driven typing is performant enough for a single short sentence and follows Next.js best practices for hydration correctness over direct innerHTML injection.

## 4. Hero Section Canvas Wrapper

**Goal**: Exact visual matching of the Blackhole container.
**Decision**: We will directly adapt the `app/page.tsx` `<HeroCanvas />` to be enclosed within `<div className="absolute inset-0 w-full h-full z-[-1] opacity-80 pointer-events-none">`.
**Rationale**: The `pointer-events-none` guarantees it won't block interactions matching the original `z-[-1]` behaviour.

## Conclusion

All technical clarifications are resolved. We do not need heavy third-party React ports when the exact legacy libraries and logic can be cleanly encapsulated inside Next.js Client Components.
