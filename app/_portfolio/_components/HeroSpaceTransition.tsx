'use client';

import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Direction = 'forward' | 'backward' | 'returnPlanet';
type TransitionContext = { start: (destination: string, direction: Direction) => void };
type PendingNavigation = { pathname: string; resolve: () => void; timeout: ReturnType<typeof setTimeout> };

const Context = createContext<TransitionContext | null>(null);

export function useHeroSpaceTransition() {
  const context = useContext(Context);
  if (!context) throw new Error('HeroSpaceTransitionProvider is missing');
  return context;
}

export default function HeroSpaceTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pendingRef = useRef<PendingNavigation | null>(null);
  const navigatingRef = useRef(false);

  useEffect(() => {
    const pending = pendingRef.current;
    if (pending && pathname === pending.pathname) {
      clearTimeout(pending.timeout);
      pendingRef.current = null;
      pending.resolve();
    }
  }, [pathname]);

  useEffect(() => () => {
    if (pendingRef.current) clearTimeout(pendingRef.current.timeout);
    delete document.documentElement.dataset.spaceSlide;
  }, []);

  const start = (destination: string, direction: Direction) => {
    if (navigatingRef.current) return;
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(destination);
      return;
    }

    navigatingRef.current = true;
    document.documentElement.dataset.spaceSlide = direction;
    const transition = document.startViewTransition(() => new Promise<void>(resolve => {
      const timeout = setTimeout(() => {
        pendingRef.current = null;
        resolve();
      }, 6000);
      pendingRef.current = {
        pathname: new URL(destination, window.location.origin).pathname,
        resolve,
        timeout,
      };
      router.push(destination);
    }));
    void transition.finished.finally(() => {
      navigatingRef.current = false;
      delete document.documentElement.dataset.spaceSlide;
    });
  };

  return <Context.Provider value={{ start }}>{children}</Context.Provider>;
}
