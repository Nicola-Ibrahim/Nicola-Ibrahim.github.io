"use client";

import React from 'react';
import { Sparkles, Copy, Check, Terminal, Code2 } from 'lucide-react';
import { Task } from '@/content/roadmaps';
import { FormattedText } from './FormattedText';

interface TaskContentProps {
  task: Task;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

export const TaskContent = ({ 
  task, 
  onCopy, 
  copiedId 
}: TaskContentProps) => {
  return (
    <article 
      id={task.id}
      className="relative pb-24 mb-24 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0 last:mb-0 group/task scroll-mt-24"
    >
      {/* Task Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-slate-200 dark:border-white/10 shadow-sm transition-all group-hover/task:border-teal-500/30 group-hover/task:shadow-teal-500/2">
             <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight group-hover/task:text-teal-600 dark:group-hover/task:text-teal-400 transition-colors">
            {task.title}
          </h3>
        </div>
        <p className="text-lg font-bold text-slate-900 dark:text-slate-200 leading-relaxed max-w-3xl border-l-4 border-teal-500/20 pl-6 py-1">
          {task.shortDesc}
        </p>
      </div>

      {/* Task Body */}
      <div className="flex flex-col gap-10 max-w-4xl">
        
        {/* Main Content Area */}
        <div className="prose prose-lg dark:prose-invert prose-headings:uppercase prose-headings:tracking-widest prose-headings:font-black prose-p:text-slate-800 dark:prose-p:text-slate-200 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 transition-all">
          <FormattedText text={task.details} />
        </div>

        {/* Custom Injected Visuals (Always Visible) */}
        {task.customUI && (
          <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/20 dark:shadow-black/10 my-4 transform transition-all hover:scale-[1.01] duration-500">
            {task.customUI}
          </div>
        )}

        {/* --- AI AGENT PROMPT BLOCK --- */}
        {task.prompt && (
          <div className="bg-slate-50 dark:bg-[#1a1c22] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-inner group/prompt">
            <div className="flex items-center justify-between px-8 py-5 bg-slate-100 dark:bg-black/20 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/10">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-800 dark:text-slate-100 uppercase">
                  Production Prompt
                </span>
              </div>
              <button 
                onClick={() => onCopy(task.prompt!, task.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  copiedId === task.id 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                    : 'bg-teal-600 text-white hover:bg-teal-700 border-teal-600 shadow-md shadow-teal-600/10'
                }`}
              >
                {copiedId === task.id ? (
                  <><Check className="w-3.5 h-3.5" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy Skill</>
                )}
              </button>
            </div>
            <div className="p-10 text-slate-800 dark:text-slate-300 font-mono text-sm whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-teal-500/40 custom-scrollbar">
              {task.prompt}
            </div>
          </div>
        )}

        {/* Optional Practice Highlights */}
        {task.links && task.links.length > 0 && (
          <div className="mt-4 p-8 bg-teal-500/5 dark:bg-teal-500/5 rounded-3xl border border-teal-500/10">
            <h4 className="text-[10px] font-black text-teal-600 dark:text-teal-400 mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Recommended Practice
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {task.links.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-teal-500 hover:shadow-md hover:shadow-teal-500/5 rounded-2xl transition-all group/link"
                >
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{link.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/link:bg-teal-500 group-hover/link:text-white transition-all">
                    <Check className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
