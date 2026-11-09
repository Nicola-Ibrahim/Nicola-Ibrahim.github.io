import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';
import { Search } from './Search';


export function Header() {
  return (
    <header className="sticky top-0 z-[60] min-h-16 border-b border-white/10 bg-[#111b25]/90 px-4 py-3 backdrop-blur-xl sm:h-[72px] sm:py-0">
      <div className="mx-auto flex h-full max-w-[1600px] flex-wrap items-center justify-between gap-3 sm:flex-nowrap sm:gap-8">
        <div className="order-1 min-w-0 flex-1 sm:flex-none">
          <Link 
            href="/roadmap"
            className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-300/25 bg-teal-400/10 text-teal-300 sm:h-10 sm:w-10">
              <Compass className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold tracking-tight text-white sm:text-base">Roadmaps</p>
              <p className="hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">Engineering field guide</p>
            </div>
          </Link>
        </div>

        <div className="order-3 min-w-0 max-w-xl basis-full sm:order-2 sm:flex-1 sm:basis-0">
          <Search />
        </div>

        <div className="order-2 flex shrink-0 sm:order-3">
          <Link 
            href="/"
            aria-label="Back to portfolio"
            className="inline-flex items-center gap-2 rounded-full p-2 text-xs font-semibold text-slate-300 transition-colors hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-teal-300"
          >
            <ArrowLeft size={16} aria-hidden="true" /> <span className="hidden sm:inline">Portfolio</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
