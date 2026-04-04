"use client";

import React from 'react';
import Link from 'next/link';
import { Roadmap, RoadmapCategory } from '@/content/roadmaps';
import { TableOfContents } from './TableOfContents';
import { ChevronRight, Home, ArrowRight } from 'lucide-react';

interface TrackDashboardViewProps {
  trackId: string;
  currentRoadmap: Roadmap;
}

export function TrackDashboardView({ trackId, currentRoadmap }: TrackDashboardViewProps) {
  return (
    <div className="flex gap-8 xl:gap-12">
      <div className="flex-1 min-w-0">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          <Link href="/" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Home className="w-3.5 h-3.5" /> Academy
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <Link href="/roadmap" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Documentation</Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-teal-600 dark:text-teal-400">{currentRoadmap.title.split(' ')[0]} Track</span>
        </nav>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-6 leading-tight">
            {currentRoadmap.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {currentRoadmap.description}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentRoadmap.categories.map((category: RoadmapCategory) => (
            <Link
              key={category.id}
              id={category.id}
              href={`/roadmap/${trackId}/${category.slug}`}
              className="group relative bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-8 rounded-[2.5rem] hover:border-teal-500/50 transition-all duration-300 scroll-mt-24"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-700 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-3">
                {category.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {category.tasks.length} specialized tasks & resources
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore Module <ChevronRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Table of Contents */}
      <TableOfContents 
        categories={currentRoadmap.categories}
        onItemClick={(id) => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </div>
  );
}
