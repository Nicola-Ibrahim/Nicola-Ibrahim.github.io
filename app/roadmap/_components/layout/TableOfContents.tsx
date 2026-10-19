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
        <h4 className="text-xs font-semibold text-[#b7c6cc] uppercase tracking-[0.12em]">
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
                    ? 'text-[#e0e9e9] border-[#9dbdb9] bg-white/[0.04]'
                    : 'text-[#aebfc6] hover:text-[#e0e9e9] border-transparent'
                  }`}
              >
                <span className={`text-[12px] leading-tight transition-all ${depth === 0 ? 'font-bold text-[13px]' : 'font-medium'
                  } ${activeId === item.id ? 'text-[#e0e9e9]' : ''
                  }`}>
                  {item.title.includes(':') ? item.title.split(':')[1]?.trim() : item.title}
                </span>
              </button>
            </div>
          );
        })}
      </nav>


      {/* Quick Actions / Tips */}
      <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.025] p-5">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#bdd2d0]">
          <Sparkles className="w-3 h-3" /> Pro Tip
        </p>
        <p className="text-[13px] leading-relaxed text-[#b9c7cd]">
          Use the <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 dark:text-white font-mono text-[10px]">⌘ K</span> shortcut to search all modules.
        </p>
      </div>
    </aside>
  );
}
