'use client';

import { type MouseEvent } from 'react';
import Link from 'next/link';
import BlackholeCanvas from './BlackholeCanvas';
import { useHeroSpaceTransition } from '../_shared/HeroSpaceTransition';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { start } = useHeroSpaceTransition();

  const enterSpace = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    start('/explore', 'forward');
  };

  return (
    <div className="dark text-light min-h-screen">
      <main>
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <BlackholeCanvas />
          <div className={`max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center hero-content ${styles.heroContent}`}>
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.24em] text-primary mb-6">Software Engineer</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I&apos;m <br /><span className="text-gradient">Nicola Ibrahim</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Backend engineering, data, and ML brought together in software people can use.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/explore" onClick={enterSpace} className="btn-primary inline-flex items-center gap-3">Explore in space <span aria-hidden="true">→</span></Link>
              <Link href="/contact" className="btn-outline inline-flex items-center">Get in touch</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
