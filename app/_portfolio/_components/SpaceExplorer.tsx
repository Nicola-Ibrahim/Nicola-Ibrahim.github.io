'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent, type PointerEvent as ReactPointerEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FlightVeil from './FlightVeil';
import { useHeroSpaceTransition } from './HeroSpaceTransition';
import SpaceSceneCanvas from './SpaceSceneCanvas';
import { destinations, type SpaceDestination } from './spaceDestinations';
import styles from './SpaceExplorer.module.css';

const wrapIndex = (index: number) => (index + destinations.length) % destinations.length;

export default function SpaceExplorer() {
  const router = useRouter();
  const { start } = useHeroSpaceTransition();
  const sceneRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; moved: boolean; target: HTMLElement | null }>({ pointerId: -1, startX: 0, moved: false, target: null });
  const wheelRef = useRef({ lastTime: 0, distance: 0, consumed: false });
  const ignoreClickRef = useRef(false);
  const travelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [initialFocusReady, setInitialFocusReady] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [travellingTo, setTravellingTo] = useState<string | null>(null);
  const [planetHovered, setPlanetHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      if (travelTimerRef.current) clearTimeout(travelTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('planet');
    const index = destinations.findIndex(destination => destination.id === requested);
    if (index >= 0) setFocusedIndex(index);
    setInitialFocusReady(true);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) || Math.abs(event.deltaX) < 2) return;
      event.preventDefault();
      const gesture = wheelRef.current;
      const now = performance.now();
      if (now - gesture.lastTime > 300) {
        gesture.distance = 0;
        gesture.consumed = false;
      }
      gesture.lastTime = now;
      if (gesture.consumed || travellingTo) return;
      gesture.distance += event.deltaX * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : 1);
      if (Math.abs(gesture.distance) < 65) return;
      gesture.consumed = true;
      setFocusedIndex(current => wrapIndex(current + (gesture.distance > 0 ? 1 : -1)));
      setDragOffset(0);
    };
    scene.addEventListener('wheel', handleWheel, { passive: false });
    return () => scene.removeEventListener('wheel', handleWheel);
  }, [travellingTo]);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);
  const focused = destinations[focusedIndex];

  const travel = (destination: SpaceDestination) => {
    if (travellingTo || ignoreClickRef.current) return;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('planet', destination.id);
    window.history.replaceState(window.history.state, '', currentUrl.pathname + currentUrl.search + currentUrl.hash);
    setTravellingTo(destination.id);
    travelTimerRef.current = setTimeout(() => router.push(destination.path), reducedMotion ? 0 : sceneReady ? 1100 : 300);
  };

  const moveTo = (index: number) => {
    if (travellingTo) return;
    setFocusedIndex(wrapIndex(index));
    setDragOffset(0);
  };

  const returnHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (travellingTo) return;
    start('/', 'backward');
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (travellingTo || (event.target as HTMLElement).closest('[data-scene-control]')) return;
    const target = event.target as HTMLElement;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, moved: false, target };
    target.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 8) dragRef.current.moved = true;
    setDragOffset(Math.max(-300, Math.min(300, distance)));
  };
  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const distance = event.clientX - dragRef.current.startX;
    if (Math.abs(distance) > 55) moveTo(focusedIndex + (distance < 0 ? 1 : -1));
    else setDragOffset(0);
    if (dragRef.current.moved) {
      ignoreClickRef.current = true;
      window.setTimeout(() => { ignoreClickRef.current = false; }, 80);
    }
    dragRef.current.pointerId = -1;
    const target = dragRef.current.target;
    if (target?.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
    dragRef.current.target = null;
  };

  return (
    <div className={`${styles.explorer} ${travellingTo ? styles.travelling : ''}`}>
      <div
        ref={sceneRef}
        className={`${styles.scene} space-scene`}
        tabIndex={0}
        onKeyDown={event => {
          if ((event.target as HTMLElement).closest('button, a')) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            moveTo(focusedIndex + (event.key === 'ArrowRight' ? 1 : -1));
          }
          if (event.key === 'Enter') travel(focused);
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        aria-label="Planet navigation. Drag, swipe on a touchpad or screen, or use arrow keys to choose a world. Press Enter or select the planet to explore it."
      >
        <Link href="/" className="return-link" data-scene-control onClick={returnHome}><span aria-hidden="true">←</span> Back to home</Link>
        <div className={styles.spaceBackdrop} style={{ transform: `scale(1.08) translateX(${Math.sin(focusedIndex * Math.PI * 2 / destinations.length) * 2.8}%)` }} aria-hidden="true" />
        <div className={styles.sceneGlow} aria-hidden="true" />
        {initialFocusReady && !sceneReady && <div className={styles.fallbackPlanet} style={{ '--fallback-color': focused.color, '--fallback-dark': focused.dark } as CSSProperties} aria-hidden="true" />}
        {initialFocusReady && <SpaceSceneCanvas focusedIndex={focusedIndex} dragOffset={dragOffset} travellingTo={travellingTo} hovered={planetHovered} reducedMotion={reducedMotion} onReady={handleSceneReady} />}
        {initialFocusReady && <div className={styles.mapTop}><span className={styles.signal} /> THE UNIVERSE <span className={styles.coordinates}>DRAG OR SWIPE · 0{focusedIndex + 1} / 0{destinations.length}</span></div>}
        {initialFocusReady && <button type="button" className={styles.planetLink} onClick={() => travel(focused)} onPointerEnter={() => setPlanetHovered(true)} onPointerLeave={() => setPlanetHovered(false)} onFocus={() => setPlanetHovered(true)} onBlur={() => setPlanetHovered(false)} aria-label={`Explore ${focused.title}: ${focused.detail}`} disabled={Boolean(travellingTo)}>
          <span className={styles.worldCaption}>
            <span className={styles.worldIndex}>WORLD 0{focusedIndex + 1} / 0{destinations.length}</span>
            <strong>{focused.title}</strong>
            <span className={styles.worldDetail}>{focused.detail}</span>
          </span>
        </button>}
        {initialFocusReady && <div className={styles.sceneControls} data-scene-control>
          <button type="button" className={styles.arrowButton} onClick={() => moveTo(focusedIndex - 1)} disabled={Boolean(travellingTo)} aria-label="Previous planet">←</button>
          <div className={styles.progress} aria-label={`Planet ${focusedIndex + 1} of ${destinations.length}`}>
            {destinations.map((destination, index) => <button key={destination.id} type="button" className={index === focusedIndex ? styles.currentDot : styles.dot} onClick={() => moveTo(index)} aria-label={`Show ${destination.title}`} aria-current={index === focusedIndex ? 'step' : undefined} />)}
          </div>
          <button type="button" className={styles.arrowButton} onClick={() => moveTo(focusedIndex + 1)} disabled={Boolean(travellingTo)} aria-label="Next planet">→</button>
        </div>}
      </div>
      <FlightVeil active={Boolean(travellingTo)} />
    </div>
  );
}
