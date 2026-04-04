"use client";

import React, { useEffect, useState } from 'react';
import { RoadmapCategory } from '@/content/roadmaps';
import { List, ChevronRight, Sparkles } from 'lucide-react';

interface TableOfContentsProps {
  categories: RoadmapCategory[];
  activeCategory?: string;
  onCategoryClick: (id: string) => void;
}

export function TableOfContents({ 
  categories, 
  activeCategory: passedActiveCategory,
  onCategoryClick 
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (passedActiveCategory) {
      setActiveId(passedActiveCategory);
    }
  }, [passedActiveCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0% -80% 0%' }
    );

    categories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  return (
    <aside className="w-64 hidden xl:block sticky top-24 self-start h-[calc(100vh-120px)] overflow-y-auto pl-6 border-l border-slate-200 dark:border-white/5 custom-scrollbar">
      <div className="flex items-center gap-2 mb-6 px-1">
        <List className="w-4 h-4 text-teal-500" />
        <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
          On This Page
        </h4>
      </div>

      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`w-full text-left group flex items-start gap-2 py-2 px-1 transition-all duration-200 border-l-2 ${
              activeId === category.id
                ? 'text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400 bg-teal-500/5'
                : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 border-transparent'
            }`}
          >
            <span className={`text-[13px] leading-tight font-medium pl-2 ${
              activeId === category.id ? 'font-black' : ''
            }`}>
              {category.title.split(':')[1]?.trim() || category.title}
            </span>
          </button>
        ))}
      </nav>

      {/* Quick Actions / Tips */}
      <div className="mt-12 p-6 rounded-3xl bg-teal-500/[0.03] dark:bg-white/[0.02] border border-teal-500/10 dark:border-white/5 shadow-inner">
        <p className="text-[11px] font-black text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Pro Tip
        </p>
        <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
          Use the <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 dark:text-white font-mono text-[10px]">⌘ K</span> shortcut to search all modules.
        </p>
      </div>
    </aside>
  );
}
