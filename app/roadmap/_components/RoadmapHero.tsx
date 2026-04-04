"use client";

import React from 'react';
import { BookOpen, Layers } from 'lucide-react';
import { Roadmap } from '@/content/roadmaps';

interface RoadmapHeroProps {
  currentRoadmap: Roadmap;
  totalChapters: number;
  totalTopics: number;
  isAiAgent: boolean;
}

export const RoadmapHero = ({ currentRoadmap, totalChapters, totalTopics, isAiAgent }: RoadmapHeroProps) => {
  return (
    <div className="relative group mb-12">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-10 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {currentRoadmap.title}
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
            {currentRoadmap.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold">
              <BookOpen className="w-4 h-4 text-indigo-400" /> {totalChapters} {isAiAgent ? 'Categories' : 'Modules'}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold">
              <Layers className="w-4 h-4 text-violet-400" /> {totalTopics} Core Skills
            </span>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="w-40 h-40 bg-indigo-500/10 rounded-full flex items-center justify-center border border-indigo-500/20 animate-pulse">
            <div className="text-indigo-400">
              {React.isValidElement(currentRoadmap.icon) ? 
                React.cloneElement(currentRoadmap.icon as React.ReactElement<any>, { size: 80 }) : 
                currentRoadmap.icon
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
