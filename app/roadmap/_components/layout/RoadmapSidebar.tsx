"use client";

import React from 'react';
import Link from 'next/link';
import { RoadmapData } from '../../_lib/mdx';
import { getIcon } from '../../_lib/icon-registry';
import { Layout, ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface RoadmapSidebarProps {
  roadmaps: RoadmapData[];
  activeTab: string;
  onTabChange?: (id: string) => void;
  activeCategory?: string;
  onCategoryClick?: (id: string) => void;
}

export function RoadmapSidebar({ 
  roadmaps, 
  activeTab, 
  activeCategory,
}: RoadmapSidebarProps) {
  return (
    <aside className="w-[260px] hidden lg:block sticky top-10 self-start h-[calc(100vh-80px)] overflow-y-auto pr-6 custom-scrollbar">
      {/* Sidebar Branding & Navigation */}
      <div className="mb-12 px-3">
        <Link 
          href="/" 
          className="group flex items-center gap-3 text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors mb-8"
        >
          <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:bg-teal-500/10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Home</span>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Layout className="w-5 h-5" />
            </div>
            <h1 className="text-base font-bold text-slate-800 dark:text-slate-300 uppercase tracking-tighter">
              Road<span className="text-teal-600 dark:text-teal-400">map</span>
            </h1>
          </div>
          <ThemeToggle />
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
              className={`w-full flex items-center justify-between group px-3 py-2.5 rounded-lg transition-all duration-200 border ${
                activeTab === tab.id
                  ? 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/[0.02] hover:border-slate-100 dark:hover:border-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                    : 'bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10'
                }`}>
                  <div className="w-4 h-4 flex items-center justify-center">
                    {getIcon(tab.icon)}
                  </div>
                </div>
                <div className="text-left">
                  <p className={`text-[12px] font-semibold uppercase tracking-wider ${
                    activeTab === tab.id ? 'text-teal-600 dark:text-slate-300' : 'text-slate-600 dark:text-slate-400'
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
              <div className="mt-1 mb-4 space-y-0.5 ml-[19px] border-l border-slate-200 dark:border-white/10">
                {tab.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/roadmap/${tab.id}/${cat.slug}`}
                    className={`block py-2 pl-6 pr-4 text-[11px] font-medium transition-all relative ${
                      activeCategory === cat.slug
                        ? 'text-teal-600 dark:text-teal-400 font-bold bg-teal-500/5'
                        : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                    }`}
                  >
                    {activeCategory === cat.slug && (
                      <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-teal-600 dark:bg-teal-400" />
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
