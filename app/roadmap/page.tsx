"use client";

import React, { useState } from 'react';
import { roadmapsData } from '@/content/roadmaps';
import { RoadmapHero } from './_components/RoadmapHero';
import { TaskContent } from './_components/TaskContent';
import { RoadmapSidebar } from './_components/RoadmapSidebar';
import { TableOfContents } from './_components/TableOfContents';
import { ChevronRight, Home } from 'lucide-react';

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<string>('ai_agents');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      setActiveCategory(categoryId);
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect()?.top || 0;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const currentRoadmap = roadmapsData[activeTab];
  const totalChapters = currentRoadmap?.categories.length || 0;
  const totalTopics = currentRoadmap?.categories.reduce((acc, cat) => acc + cat.tasks.length, 0) || 0;

  return (
    <div className="flex gap-8 xl:gap-12">
      {/* 1. LEFT SIDEBAR (Track Selector Only) */}
      <RoadmapSidebar 
        roadmaps={Object.values(roadmapsData)}
        activeTab={activeTab}
        onTabChange={(id) => {
          setActiveTab(id);
          setActiveCategory(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeCategory={activeCategory || undefined}
      />

      {/* 2. CENTER CONTENT (The Document) */}
      <div className="flex-1 min-w-0 pb-32">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <a href="/" className="flex items-center gap-1.5 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            <Home className="w-3.5 h-3.5" /> Academy
          </a>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-slate-500 dark:text-slate-400">Documentation</span>
          <ChevronRight className="w-3 h-3 opacity-30" />
          <span className="text-teal-600 dark:text-teal-400">{currentRoadmap?.title.split(' ')[0]} Track</span>
        </nav>
        
        {/* Roadmap Hero Section */}
        {currentRoadmap && (
          <div className="mb-24">
            <RoadmapHero 
              currentRoadmap={currentRoadmap} 
              totalChapters={totalChapters} 
              totalTopics={totalTopics} 
              isAiAgent={activeTab === 'ai_agents'}
            />
          </div>
        )}

        {/* The Syllabus (Flattened Content) */}
        <div className="space-y-32">
          {currentRoadmap?.categories.map((category) => (
            <section 
              key={category.id} 
              id={category.id}
              className="relative scroll-mt-24 group/section"
            >
              
              {/* Category Header (Premium Section Design) */}
              <div className="flex flex-col gap-8 mb-16 px-2">
                <div className="flex items-center gap-6">
                  <div className={`p-6 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-white/5 rounded-[2rem] text-teal-600 dark:text-teal-400 shadow-lg shadow-teal-500/2 transition-all duration-500 group-hover/section:border-teal-500/20`}>
                    {category.icon}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[11px] font-black text-teal-500 dark:text-teal-400 uppercase tracking-[0.4em] mb-3 flex items-center gap-3">
                      <span className="w-12 h-0.5 bg-teal-500/20 dark:bg-teal-400/20 rounded-full"></span>
                      {category.id.startsWith('algo_') ? 'Algorithm Core' : 'Technical Module'}
                    </h4>
                    <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight leading-none">
                      {category.title}
                    </h3>
                  </div>
                </div>
                
                {/* Visual Line for Documentation Flow */}
                <div className="h-px w-full bg-gradient-to-r from-teal-500/20 via-slate-200 dark:via-white/5 to-transparent"></div>
              </div>

              {/* Linear Task List */}
              <div className="space-y-16 pl-4 md:pl-8 border-l-2 border-slate-100 dark:border-white/[0.03] ml-10 md:ml-12">
                {category.tasks.map((task) => (
                  <TaskContent 
                    key={task.id}
                    task={task}
                    onCopy={copyToClipboard}
                    copiedId={copiedId}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* 3. RIGHT TABLE OF CONTENTS */}
      {currentRoadmap && (
        <TableOfContents 
          categories={currentRoadmap.categories}
          activeCategory={activeCategory || undefined}
          onCategoryClick={scrollToCategory}
        />
      )}
    </div>
  );
}
