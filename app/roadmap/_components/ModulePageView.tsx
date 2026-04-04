"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Roadmap, RoadmapCategory } from '@/content/roadmaps';
import { TableOfContents } from './TableOfContents';
import { TaskContent } from './TaskContent';
import { ChevronRight, Home } from 'lucide-react';

interface ModulePageViewProps {
  trackId: string;
  category: RoadmapCategory;
  currentRoadmap: Roadmap;
}

export function ModulePageView({ trackId, category, currentRoadmap }: ModulePageViewProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
          <Link href={`/roadmap/${trackId}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            {currentRoadmap.title.split(' ')[0]} Track
          </Link>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-teal-600 dark:text-teal-400">{category.title.split(':')[1]?.trim() || category.title}</span>
        </nav>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-teal-600 dark:text-teal-400">
              {category.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight leading-tight">
              {category.title}
            </h1>
          </div>
        </header>

        <div className="space-y-24">
          {category.tasks.map((task) => (
            <div key={task.id} id={task.id} className="scroll-mt-24">
              <TaskContent 
                task={task} 
                onCopy={handleCopy} 
                copiedId={copiedId} 
              />
            </div>
          ))}
        </div>
      </div>

      <TableOfContents 
        tasks={category.tasks}
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
