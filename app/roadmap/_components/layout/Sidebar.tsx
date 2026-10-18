"use client";

import React from 'react';
import Link from 'next/link';
import { RoadmapData } from '../../_lib/mdx';
import { getIcon } from '../../_lib/icon-registry';
import { ChevronRight, Sparkles, ArrowLeft, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  roadmaps: RoadmapData[];
}

export function Sidebar({
  roadmaps,
}: SidebarProps) {
  const pathname = usePathname();

  // Detect active track and category from the URL
  const segments = pathname.split('/').filter(Boolean);
  const activeTab = segments[1]; // /roadmap/[trackId]
  const activeCategory = segments[2]; // /roadmap/[trackId]/[categorySlug]

  return (
    <>
      <nav aria-label="Roadmap navigation" className="lg:hidden w-full mb-6">
        <details className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03]">
          <summary className="cursor-pointer px-4 py-3 font-semibold text-slate-900 dark:text-white">Browse tracks and chapters</summary>
          <div className="border-t border-slate-200 dark:border-white/10 px-4 py-3 max-h-[55vh] overflow-y-auto">
            <Link href="/roadmap" className="block py-2 text-sm text-teal-700 dark:text-teal-400">All tracks</Link>
            {roadmaps.map(track => (
              <div key={track.id} className="border-t border-slate-100 dark:border-white/10 py-2">
                <Link href={`/roadmap/${track.id}`} aria-current={activeTab === track.id && !activeCategory ? 'page' : undefined} className="block py-1 font-medium text-sm text-slate-900 dark:text-white">{track.title}</Link>
                {activeTab === track.id && track.categories.map(category => (
                  <Link key={category.slug} href={`/roadmap/${track.id}/${category.slug}`} aria-current={activeCategory === category.slug ? 'page' : undefined} className="block pl-4 py-1.5 text-sm text-slate-600 dark:text-slate-400 aria-[current=page]:text-teal-700 dark:aria-[current=page]:text-teal-400">
                    {category.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </details>
      </nav>
      <aside className="w-[280px] hidden lg:block sticky top-28 self-start h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
      {/* Sidebar Navigation Context */}
      <div className="mb-10 px-4">
        <Link
          href="/"
          className="group flex items-center gap-3 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-8"
        >
          <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:bg-teal-500/10 transition-colors border border-transparent group-hover:border-teal-500/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] opacity-80 group-hover:opacity-100 transition-opacity">Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
            <Menu className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">
            Module <span className="text-teal-600 dark:text-teal-400">Library</span>
          </h2>
        </div>
        <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-11">
          {roadmaps.length} Tracks Available
        </p>
      </div>


      {/* Roadmap Switcher */}
      <div className="space-y-1 px-3">
        <div className="flex items-center gap-2 mb-6 px-3">
          <Sparkles className="w-4 h-4 text-teal-500" />
          <h4 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em]">
            Select Engineering Track
          </h4>
        </div>

        {roadmaps.map((tab) => (
          <React.Fragment key={tab.id}>
            <Link
              href={`/roadmap/${tab.id}`}
              className={`w-full flex items-center justify-between group px-3 py-3 rounded-xl transition-all duration-300 border ${activeTab === tab.id
                ? 'bg-slate-50/80 dark:bg-white/5 border-slate-100 dark:border-white/10 shadow-sm'
                : 'bg-transparent border-transparent text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:border-slate-100 dark:hover:border-white/5'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 rotate-3'
                  : 'bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10'
                  }`}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    {getIcon(tab.icon)}
                  </div>
                </div>
                <div className="text-left">
                  <p className={`text-[11px] font-semibold tracking-wide ${activeTab === tab.id ? 'text-teal-700 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                    {tab.title.replace('Syllabus', '').replace('Technical', '').replace('Engineering', '').replace('Architecture', '').trim()}
                  </p>
                </div>
              </div>
              {activeTab === tab.id && (
                <ChevronRight className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              )}
            </Link>

            {/* Render Category List if active */}
            {activeTab === tab.id && (
              <div className="mt-1 mb-6 space-y-0.5 ml-[23px] border-l border-slate-200 dark:border-white/10 overflow-hidden">
                {tab.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/roadmap/${tab.id}/${cat.slug}`}
                    className={`block py-2.5 pl-6 pr-4 text-[11px] transition-all relative tracking-tight ${activeCategory === cat.slug
                      ? 'text-teal-600 dark:text-teal-400 font-bold bg-teal-500/5'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 font-medium'
                      }`}
                  >
                    {activeCategory === cat.slug && (
                      <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-teal-600 dark:bg-teal-400 animate-in fade-in slide-in-from-top-1 duration-300" />
                    )}
                    <span className="truncate block">
                      {cat.title.split(':')[1]?.trim() || cat.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      </aside>
    </>
  );
}
