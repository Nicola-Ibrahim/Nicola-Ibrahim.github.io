"use client";

import React from 'react';
import { ChevronDown, Terminal, Sparkles, Copy, Check, Code2, ExternalLink } from 'lucide-react';
import { Task } from '@/content/roadmaps';
import { FormattedText } from './FormattedText';

interface TaskAccordionProps {
  task: Task;
  isExpanded: boolean;
  onToggle: () => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

export const TaskAccordion = ({ 
  task, 
  isExpanded, 
  onToggle, 
  onCopy, 
  copiedId 
}: TaskAccordionProps) => {
  return (
    <div 
      className={`bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-sm border rounded-2xl transition-all duration-500 ease-in-out overflow-hidden hover:bg-slate-100/50 dark:hover:bg-slate-900/60 ${
        isExpanded ? 'border-indigo-500/50 shadow-2xl shadow-indigo-500/5 dark:shadow-indigo-500/5 ring-1 ring-indigo-500/10' : 'border-slate-200 dark:border-white/5'
      }`}
    >
      {/* Accordion Trigger */}
      <button 
        onClick={onToggle}
        className="w-full text-left px-8 py-6 flex items-center justify-between gap-6 focus:outline-none group"
      >
        <div className="flex-1">
          <h4 className={`text-xl font-bold transition-colors ${isExpanded ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-300'}`}>
            {task.title}
          </h4>
          <p className="text-slate-600 dark:text-slate-500 mt-2 line-clamp-1 font-medium transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-400">
            {task.shortDesc}
          </p>
        </div>
        <div className={`p-3 rounded-full border transition-all duration-500 ${isExpanded ? 'rotate-180 bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/30' : 'bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 group-hover:border-slate-300 dark:group-hover:border-white/10'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      {/* Accordion Expanded Content */}
      <div 
        className={`transition-all duration-700 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-8 pb-10 pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col lg:flex-row gap-12">
          
          {/* Text Information & Links */}
          <div className="flex-1 min-w-0">
            <h5 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-indigo-600/30 dark:bg-indigo-400/30"></span>
              Content & Theory
            </h5>
            
            <FormattedText text={task.details} />

            {/* --- Custom Injected Visuals --- */}
            {task.customUI && (
              <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm transition-colors">
                {task.customUI}
              </div>
            )}

            {/* --- AI AGENT PROMPT BLOCK --- */}
            {task.prompt && (
              <div className="mt-8 mb-4 bg-slate-100 dark:bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-inner transition-colors">
                <div className="flex items-center justify-between px-6 py-4 bg-slate-200/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
                  <span className="text-[10px] font-black tracking-[0.2em] text-indigo-600 dark:text-indigo-400 flex items-center gap-2 uppercase">
                    <Sparkles className="w-4 h-4"/> System Prompt
                  </span>
                  <button 
                    onClick={() => onCopy(task.prompt!, task.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-indigo-500/10"
                  >
                    {copiedId === task.id ? (
                      <><Check className="w-3.5 h-3.5" /> Copied!</>
                    ) : (
                      <><Copy className="w-3.5 h-3.5" /> Copy Prompt</>
                    )}
                  </button>
                </div>
                <div className="p-8 text-slate-800 dark:text-slate-400 font-mono text-sm whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-indigo-500/40">
                  {task.prompt}
                </div>
              </div>
            )}

            {/* Optional External Links */}
            {task.links && task.links.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/5">
                <h6 className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-[0.2em]">Practice Challenges</h6>
                <div className="flex flex-wrap gap-3">
                  {task.links.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-400 transition-all shadow-sm"
                    >
                      {link.label}
                      <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image Reference */}
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
};
