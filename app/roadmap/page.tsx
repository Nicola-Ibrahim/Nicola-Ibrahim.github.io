"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  BookOpen, 
  Code2, 
  Terminal, 
  Layers, 
  ExternalLink,
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  Layout,
  Database,
  Search,
  Cpu
} from 'lucide-react';
import { roadmapsData } from '@/content/roadmaps';

// --- Helper Components ---
const FormattedText = ({ text }: { text: string }) => {
  const blocks = text.split('\n\n');
  return (
    <div className="text-slate-300 text-base leading-relaxed mb-6 space-y-4 font-sans">
      {blocks.map((block, idx) => {
        if (block.trim().startsWith('- ') || block.trim().startsWith('• ')) {
          const items = block.trim().split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('• '));
          return (
            <ul key={idx} className="list-disc pl-5 space-y-2 marker:text-indigo-400">
              {items.map((item, itemIdx) => {
                const cleanItem = item.replace(/^[-•]\s*/, '');
                return <li key={itemIdx}>{parseInlineStyles(cleanItem)}</li>;
              })}
            </ul>
          );
        }
        return <p key={idx} className="leading-relaxed">{parseInlineStyles(block)}</p>;
      })}
    </div>
  );
};

const parseInlineStyles = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="bg-white/10 text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono border border-white/5">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

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
    <div className="min-h-screen bg-[#13141f] text-slate-200 font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="bg-[#13141f]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white"
                title="Back to Portfolio"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                  <Terminal className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Nicola<span className="text-indigo-500"> Academy</span>
                </h1>
              </div>
            </div>

            {/* Navigation Tabs (Desktop) */}
            <nav className="hidden md:flex items-center bg-white/5 border border-white/10 p-1 rounded-full">
              {Object.values(roadmapsData).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setExpandedTaskId(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  <span className="uppercase tracking-widest">{tab.title.split(' ')[0]}</span>
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Mobile Navigation Tabs */}
        <nav className="md:hidden flex space-x-2 overflow-x-auto pb-6 mb-8 no-scrollbar -mx-4 px-4 border-b border-white/5">
          {Object.values(roadmapsData).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedTaskId(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-bold border rounded-full transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                  : 'border-white/10 text-slate-500'
              }`}
            >
              {tab.icon}
              <span className="uppercase tracking-widest">{tab.title.split(' ')[0]}</span>
            </button>
          ))}
        </nav>
        
        {/* Roadmap Hero Section */}
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
                  <BookOpen className="w-4 h-4 text-indigo-400" /> {totalChapters} {activeTab === 'ai_agents' ? 'Categories' : 'Modules'}
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

        {/* Syllabus / Categories List */}
        <div className="space-y-12">
          {currentRoadmap.categories.map((category) => (
            <section key={category.id} className="relative">
              
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8 px-2">
                <div className="p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                  {category.title}
                </h3>
              </div>

              {/* Tasks Accordion List */}
              <div className="space-y-4">
                {category.tasks.map((task) => {
                  const isExpanded = expandedTaskId === task.id;

                  return (
                    <div 
                      key={task.id} 
                      className={`bg-slate-800/40 backdrop-blur-sm border rounded-2xl transition-all duration-500 ease-in-out overflow-hidden hover:bg-slate-800/60 ${
                        isExpanded ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/20' : 'border-white/5'
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button 
                        onClick={() => toggleExpand(task.id)}
                        className="w-full text-left px-8 py-6 flex items-center justify-between gap-6 focus:outline-none group"
                      >
                        <div className="flex-1">
                          <h4 className={`text-xl font-bold transition-colors ${isExpanded ? 'text-indigo-400' : 'text-white group-hover:text-indigo-300'}`}>
                            {task.title}
                          </h4>
                          <p className="text-slate-500 mt-2 line-clamp-1 font-medium transition-colors group-hover:text-slate-400">
                            {task.shortDesc}
                          </p>
                        </div>
                        <div className={`p-3 rounded-full border transition-all duration-500 ${isExpanded ? 'rotate-180 bg-indigo-500 text-white border-indigo-400 shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-slate-400 border-white/5 group-hover:border-white/10'}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>

                      {/* Accordion Expanded Content */}
                      <div 
                        className={`transition-all duration-700 ease-in-out ${
                          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                        }`}
                      >
                        <div className="px-8 pb-10 pt-4 border-t border-white/5 flex flex-col lg:flex-row gap-12">
                          
                          {/* Text Information & Links */}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-[10px] font-black text-indigo-400 tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                              <span className="w-6 h-px bg-indigo-400/30"></span>
                              Content & Theory
                            </h5>
                            
                            <FormattedText text={task.details} />

                            {/* --- Custom Injected Visuals --- */}
                            {task.customUI && (
                              <div className="my-8 rounded-2xl overflow-hidden border border-white/10">
                                {task.customUI}
                              </div>
                            )}

                            {/* --- AI AGENT PROMPT BLOCK --- */}
                            {task.prompt && (
                              <div className="mt-8 mb-4 bg-black rounded-2xl overflow-hidden border border-white/5 shadow-inner">
                                <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                                  <span className="text-[10px] font-black tracking-[0.2em] text-indigo-400 flex items-center gap-2 uppercase">
                                    <Sparkles className="w-4 h-4"/> System Prompt
                                  </span>
                                  <button 
                                    onClick={() => copyToClipboard(task.prompt!, task.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
                                  >
                                    {copiedId === task.id ? (
                                      <><Check className="w-3.5 h-3.5" /> Copied!</>
                                    ) : (
                                      <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>
                                    )}
                                  </button>
                                </div>
                                <div className="p-8 text-slate-400 font-mono text-sm whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-indigo-500/40">
                                  {task.prompt}
                                </div>
                              </div>
                            )}

                            {/* Optional External Links */}
                            {task.links && task.links.length > 0 && (
                              <div className="mt-10 pt-8 border-t border-white/5">
                                <h6 className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Practice Challenges</h6>
                                <div className="flex flex-wrap gap-3">
                                  {task.links.map((link, idx) => (
                                    <a 
                                      key={idx} 
                                      href={link.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-400 rounded-xl text-sm font-bold text-slate-400 transition-all shadow-sm"
                                    >
                                      {link.label}
                                      <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Beautiful Image Reference */}
                          {task.image && (
                            <div className="w-full lg:w-5/12 shrink-0">
                              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative group/img">
                                <div className="absolute inset-0 bg-indigo-600/20 group-hover/img:bg-transparent transition-colors duration-700 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
                                <img 
                                  src={task.image} 
                                  alt={task.title} 
                                  className="w-full h-full object-cover transform group-hover/img:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                  <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">{task.title} Visual Ref</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

      </main>
      
      {/* Footer Branding */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Study Reference Site • Built with Next.js & Framer Aesthetics
        </p>
        <p className="text-slate-600 text-xs mt-2 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Nicola Ibrahim
        </p>
      </footer>
    </div>
  );
}
