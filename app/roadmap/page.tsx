"use client";

import React, { useState } from 'react';
import { roadmapsData } from '@/content/roadmaps';
import { RoadmapHero } from './_components/RoadmapHero';
import { TaskAccordion } from './_components/TaskAccordion';

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<string>('ai_agents');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (taskId: string) => {
    setExpandedTaskId(prev => prev === taskId ? null : taskId);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const currentRoadmap = roadmapsData[activeTab];
  const totalChapters = currentRoadmap?.categories.length || 0;
  const totalTopics = currentRoadmap?.categories.reduce((acc, cat) => acc + cat.tasks.length, 0) || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 transition-colors duration-500">
      
      {/* Tab Navigation (Desktop & Mobile Sync) */}
      <nav className="flex items-center justify-center mb-12">
        <div className="flex flex-wrap items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-1.5 rounded-3xl md:rounded-full gap-1 transition-colors">
          {Object.values(roadmapsData).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedTaskId(null);
              }}
              className={`flex items-center gap-2 px-6 py-2.5 text-xs font-black rounded-full transition-all duration-300 uppercase tracking-widest ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5'
              }`}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span>{tab.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Roadmap Hero Section */}
      {currentRoadmap && (
        <RoadmapHero 
          currentRoadmap={currentRoadmap} 
          totalChapters={totalChapters} 
          totalTopics={totalTopics} 
          isAiAgent={activeTab === 'ai_agents'}
        />
      )}

      {/* Syllabus / Categories List */}
      <div className="space-y-16 mt-12">
        {currentRoadmap?.categories.map((category) => (
          <section key={category.id} className="relative">
            
            {/* Category Header */}
            <div className="flex items-center gap-5 mb-8 px-2">
              <div className="p-4 bg-indigo-600/5 dark:bg-indigo-600/10 border border-indigo-500/10 dark:border-indigo-500/20 rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-sm dark:shadow-inner transition-colors">
                {category.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-wider">
                {category.title}
              </h3>
            </div>

            {/* Tasks Accordion List */}
            <div className="space-y-4">
              {category.tasks.map((task) => (
                <TaskAccordion 
                  key={task.id}
                  task={task}
                  isExpanded={expandedTaskId === task.id}
                  onToggle={() => toggleExpand(task.id)}
                  onCopy={copyToClipboard}
                  copiedId={copiedId}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
