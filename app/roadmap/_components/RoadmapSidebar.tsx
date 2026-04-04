"use client";

import React from 'react';
import Link from 'next/link';
import { Roadmap } from '@/content/roadmaps';
import { Layout, ChevronRight, Hash, Sparkles, Search } from 'lucide-react';

interface RoadmapSidebarProps {
  roadmaps: Roadmap[];
  activeTab: string;
  onTabChange?: (id: string) => void;
  activeCategory?: string;
  onCategoryClick?: (id: string) => void;
}

export function RoadmapSidebar({ 
  roadmaps, 
  activeTab, 
  onTabChange,
  activeCategory,
  onCategoryClick 
}: RoadmapSidebarProps) {
  const currentRoadmap = roadmaps.find(r => r.id === activeTab);

  return (
    <aside className="w-[260px] hidden lg:block sticky top-24 self-start h-[calc(100vh-120px)] overflow-y-auto pr-6 custom-scrollbar">
      {/* Academy Branding */}
      <div className="mb-10 px-3">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black text-sm">
            NA
          </div>
          <h1 className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest">
            Nicola <span className="text-teal-600">Academy</span>
          </h1>
        </div>

        {/* Visual Search Bar */}
        <div className="relative group/search">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-3.5 h-3.5 text-slate-400 group-focus-within/search:text-teal-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search documentation..." 
            className="w-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs font-medium text-slate-600 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all shadow-inner"
            disabled
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-[9px] font-bold text-slate-400 bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">
              ⌘ K
            </span>
          </div>
        </div>
      </div>

      {/* Roadmap Switcher */}
      <div className="space-y-1 mb-10">
        <div className="flex items-center gap-2 mb-4 px-3">
          <Sparkles className="w-4 h-4 text-teal-500" />
          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Select Track
          </h4>
        </div>
        
        {roadmaps.map((tab) => (
          <React.Fragment key={tab.id}>
            <Link
              href={`/roadmap/${tab.id}`}
              className={`w-full flex items-center justify-between group px-4 py-3 rounded-2xl transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-slate-100/50 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.03] hover:border-slate-200 dark:hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10'
                }`}>
                  {tab.icon}
                </div>
                <div className="text-left">
                  <p className={`text-sm font-bold ${
                    activeTab === tab.id ? 'text-teal-600 dark:text-slate-100' : ''
                  }`}>
                    {tab.title.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    {tab.categories.length} Modules
                  </p>
                </div>
              </div>
              {activeTab === tab.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:bg-teal-400" />
              )}
            </Link>

            {/* Render Category List if active */}
            {activeTab === tab.id && (
              <div className="mt-2 mb-4 space-y-1 ml-4 border-l border-slate-200 dark:border-white/5">
                {tab.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/roadmap/${tab.id}/${cat.slug}`}
                    className={`block py-2 pl-6 pr-4 text-xs font-medium transition-all relative ${
                      activeCategory === cat.slug
                        ? 'text-teal-600 dark:text-teal-400 font-black'
                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {activeCategory === cat.slug && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-teal-600 dark:bg-teal-400" />
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
  );
}
