"use client";

import React, { useEffect, useState } from 'react';
import { List, Sparkles } from 'lucide-react';

interface TableOfContentsProps {
  categories?: { id: string, title: string }[];
  content?: { id: string, title: string, level?: number }[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export function TableOfContents({
  categories,
  content,
  activeId: passedActiveId,
  onItemClick
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  const items = content || categories || [];

  useEffect(() => {
    if (passedActiveId) {
      setActiveId(passedActiveId);
    }
  }, [passedActiveId]);

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

    items.forEach((item: { id: string }) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="w-64 hidden xl:block sticky top-10 self-start h-[calc(100vh-80px)] overflow-y-auto pl-6 border-l border-slate-200 dark:border-white/5 custom-scrollbar">
      <div className="flex items-center gap-2 mb-6 px-1">
        <List className="w-4 h-4 text-teal-500" />
        <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
          On This Page
        </h4>
      </div>

      <nav className="relative space-y-0.5">
        {items.map((item: { id: string, title: string, level?: number }, index: number) => {
          const depth = item.level ? item.level - 2 : 0; // H2 is depth 0

          return (
            <div key={`${item.id}-${index}`} className="relative">
              {/* Tree Connector Line for nested items */}
              {depth > 0 && (
                <div
                  className="absolute left-[10px] top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-white/10"
                  style={{ left: `${depth * 12 - 12 + 10}px` }}
                />
              )}

              <button
                onClick={() => {
                  if (onItemClick) {
                    onItemClick(item.id);
                  } else {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                className={`w-full text-left group flex items-start py-2 px-1 transition-all duration-200 relative border-l-2 ${activeId === item.id
                    ? 'text-teal-600 dark:text-teal-400 border-teal-600 dark:border-teal-400 bg-teal-500/5'
                    : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 border-transparent'
                  }`}
              >
                <span className={`text-[12px] leading-tight transition-all ${depth === 0 ? 'font-bold text-[13px]' : 'font-medium'
                  } ${activeId === item.id ? 'text-slate-900 dark:text-slate-200 opacity-100' : 'opacity-80'
                  }`}>
                  {item.title.includes(':') ? item.title.split(':')[1]?.trim() : item.title}
                </span>
              </button>
            </div>
          );
        })}
      </nav>


      {/* Quick Actions / Tips */}
      <div className="mt-12 p-6 rounded-3xl bg-teal-500/[0.03] dark:bg-white/[0.02] border border-teal-500/10 dark:border-white/5 shadow-inner">
        <p className="text-[11px] font-bold text-teal-600 dark:text-teal-400 mb-2 uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-3 h-3" /> Pro Tip
        </p>
        <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
          Use the <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 dark:text-white font-mono text-[10px]">⌘ K</span> shortcut to search all modules.
        </p>
      </div>
    </aside>
  );
}
