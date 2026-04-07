import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark text-light overflow-x-hidden pt-20">
      <nav className="fixed w-full z-50 top-0 bg-dark/80 backdrop-blur-md border-b border-white/10 h-20 flex items-center">
        <div className="max-w-5xl mx-auto px-6 w-full flex items-center justify-between">
          <Link href="/#projects" className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>
          <div className="text-xl font-heading font-bold tracking-tighter text-white">
            NI<span className="text-primary">.</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        {children}
      </main>

      <footer className="py-12 border-t border-white/10 bg-dark-lighter text-center">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nicola Ibrahim. Engineering Case Study.</p>
      </footer>
    </div>
  );
}
