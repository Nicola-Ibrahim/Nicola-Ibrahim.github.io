'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { useRouter } from 'next/navigation';
import SpaceSceneCanvas from './SpaceSceneCanvas';
import { destinations, type SpaceDestination } from './spaceDestinations';
import styles from './SpaceExplorer.module.css';

export default function SpaceExplorer() {
  const router = useRouter();
  const dragRef = useRef<{ pointerId: number; startX: number; moved: boolean; target: HTMLElement | null }>({ pointerId: -1, startX: 0, moved: false, target: null });
  const ignoreClickRef = useRef(false);
  const travelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [travellingTo, setTravellingTo] = useState<string | null>(null);
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

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const focused = destinations[focusedIndex];
  const previous = destinations[focusedIndex - 1];
  const next = destinations[focusedIndex + 1];

  const travel = (destination: SpaceDestination) => {
    if (travellingTo || ignoreClickRef.current) return;
    setTravellingTo(destination.id);
    travelTimerRef.current = setTimeout(() => router.push(destination.path), reducedMotion ? 0 : sceneReady ? 1100 : 300);
  };

  const moveTo = (index: number) => {
    if (travellingTo) return;
    setFocusedIndex(Math.max(0, Math.min(destinations.length - 1, index)));
    setDragOffset(0);
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
        className={styles.scene}
        tabIndex={0}
        onKeyDown={event => {
          if ((event.target as HTMLElement).closest('button')) return;
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
        aria-label="Planet navigation. Drag or swipe left and right, or use arrow keys, to choose a world. Press Enter or select the planet to explore it."
      >
        <div className={styles.spaceBackdrop} style={{ transform: `scale(1.08) translateX(${(2 - focusedIndex) * 1.4}%)` }} aria-hidden="true" />
        <div className={styles.sceneGlow} aria-hidden="true" />
        {!sceneReady && <div className={styles.fallbackPlanet} style={{ '--fallback-color': focused.color, '--fallback-dark': focused.dark } as CSSProperties} aria-hidden="true" />}
        <SpaceSceneCanvas focusedIndex={focusedIndex} dragOffset={dragOffset} travellingTo={travellingTo} reducedMotion={reducedMotion} onReady={handleSceneReady} />
        <div className={styles.mapTop}><span className={styles.signal} /> THE UNIVERSE OF NICOLA IBRAHIM <span className={styles.coordinates}>DRAG TO EXPLORE · 0{focusedIndex + 1} / 0{destinations.length}</span></div>
        <button type="button" className={styles.planetLink} onClick={() => travel(focused)} aria-label={`Explore ${focused.title}: ${focused.detail}`} disabled={Boolean(travellingTo)}>
          <span className={styles.worldCaption}>
            <span className={styles.worldIndex}>WORLD 0{focusedIndex + 1} / 0{destinations.length}</span>
            <strong>{focused.title}</strong>
            <span className={styles.worldDetail}>{focused.detail}</span>
            <span className={styles.enterHint}>EXPLORE THIS WORLD <span aria-hidden="true">↗</span></span>
          </span>
        </button>
        <div className={styles.sceneControls} data-scene-control>
          <button type="button" className={styles.arrowButton} onClick={() => moveTo(focusedIndex - 1)} disabled={!previous || Boolean(travellingTo)} aria-label="Previous planet">←</button>
          <div className={styles.progress} aria-label={`Planet ${focusedIndex + 1} of ${destinations.length}`}>
            {destinations.map((destination, index) => <button key={destination.id} type="button" className={index === focusedIndex ? styles.currentDot : styles.dot} onClick={() => moveTo(index)} aria-label={`Show ${destination.title}`} aria-current={index === focusedIndex ? 'step' : undefined} />)}
          </div>
          <button type="button" className={styles.arrowButton} onClick={() => moveTo(focusedIndex + 1)} disabled={!next || Boolean(travellingTo)} aria-label="Next planet">→</button>
        </div>
      </div>
    </div>
  );
}
