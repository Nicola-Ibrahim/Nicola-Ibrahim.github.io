"use client";

import React from 'react';
import Link from 'next/link';
import { Terminal, Home, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Search } from './Search';
import { RoadmapData } from '../../_lib/mdx';

interface HeaderProps {
  roadmaps: RoadmapData[];
}

export function Header({ roadmaps }: HeaderProps) {
  return (
    <header className="sticky top-0 z-[60] bg-white/70 dark:bg-[#0f1115]/70 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-4 h-16 sm:h-20 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between gap-4 sm:gap-10">
        
        {/* Left Side: Branding / Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link 
            href="/"
            className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                Nicola <span className="text-teal-600 dark:text-teal-400">Ibrahim</span>
              </p>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mt-1">
                Engineering Roadmaps
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-slate-300 dark:text-white/10">
            <ChevronRight className="w-4 h-4" />
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Home className="w-3 h-3" />
              <span>Resources</span>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger (Command Palette) */}
        <div className="flex-1 max-w-2xl px-2">
          <Search roadmaps={roadmaps} />
        </div>

        {/* Right Side: Theme / Links */}
        <div className="flex items-center gap-4 shrink-0">
          <Link 
            href="/roadmap"
            className="hidden sm:inline-flex text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest hover:text-teal-600 transition-colors"
          >
            All Tracks
          </Link>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 hidden sm:block" />
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}
