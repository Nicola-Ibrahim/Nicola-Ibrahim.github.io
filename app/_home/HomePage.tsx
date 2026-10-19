'use client';

import { type MouseEvent } from 'react';
import Link from 'next/link';
import BlackholeCanvas from './BlackholeCanvas';
import { useHeroSpaceTransition } from '../_shared/HeroSpaceTransition';

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
          <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-6 text-center lg:px-8">
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.24em] text-primary mb-6">Software Engineer</p>
            <h1 className="mb-6 text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[1.08] tracking-tight">
              Hi, I&apos;m <br /><span className="text-gradient"><span className="inline-block">Nicola</span>{' '}<span className="inline-block">Ibrahim</span></span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg md:text-2xl">
              Backend engineering, data, and ML brought together in software people can use.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/explore" onClick={enterSpace} className="btn-primary inline-flex w-full max-w-64 items-center justify-center gap-3 sm:w-auto">Explore in space <span aria-hidden="true">→</span></Link>
              <Link href="/contact" className="btn-outline inline-flex w-full max-w-64 items-center justify-center sm:w-auto">Get in touch</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
