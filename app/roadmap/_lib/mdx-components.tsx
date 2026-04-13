"use client";

import React from 'react';
import { Terminal, Copy, Check, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractText, generateId } from './mdx-utils';




/**
 * Single master CodeBlock representing all code and prompt fences.
 * High-fidelity "Premium SaaS" aesthetic with a compact footprint.
 */
export const CodeBlock = ({ children, className }: { children: any, className?: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const codeText = extractText(children);
  const isPrompt = className?.includes('language-prompt') || className === 'prompt';
  const lang = className?.replace('language-', '') || 'code';
 
  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="not-prose my-10 group relative rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0E14] overflow-hidden">
      {/* Branded Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100/50 dark:bg-black/40 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-4">
          {/* Tab Element */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#161B22] border border-slate-200 dark:border-white/10 border-b-0 rounded-t-lg -mb-[13px] z-10 text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400">
            <Terminal className="w-3 h-3 text-teal-500" />
            {isPrompt ? 'Agent Skill' : lang}
          </div>
        </div>
        
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all bg-white dark:bg-black/30 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-teal-500/20 dark:hover:text-white border border-slate-200 dark:border-white/10 active:scale-95 group/copy"
        >
          {isCopied ? <Check className="w-3 h-3 text-teal-500" /> : <Copy className="w-3 h-3 group-hover/copy:text-teal-500 transition-colors" />}
          {isCopied ? 'Copied' : (isPrompt ? 'Copy Skill' : 'Copy Code')}
        </button>
      </div>
 
      {/* Seamless Content Area */}
      <div 
        suppressHydrationWarning
        className={`p-6 bg-transparent font-mono text-[14px] leading-relaxed overflow-x-auto selection:bg-teal-500/40 custom-scrollbar [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0 [&_code]:!bg-transparent [&_code]:!p-0 ${isPrompt ? "whitespace-pre-wrap text-black dark:text-white [&_*]:!text-inherit" : "whitespace-pre"}`}
      >
        {children}
      </div>
    </div>
  );
};


/**
 * Callout - MkDocs Admonition style for architectural notes, tips, and warnings.
 */
export const Callout = ({ type, title, children }: { type: 'info' | 'tip' | 'warning', title?: string, children: React.ReactNode }) => {
  const configs = {
    info: { icon: Info, borderClass: 'border-l-blue-500', bgClass: 'bg-blue-50 dark:bg-blue-900/10', titleColor: 'text-blue-700 dark:text-blue-400', label: 'INFO' },
    tip: { icon: Lightbulb, borderClass: 'border-l-teal-500', bgClass: 'bg-teal-50 dark:bg-teal-900/10', titleColor: 'text-teal-700 dark:text-teal-400', label: 'TIP' },
    warning: { icon: AlertTriangle, borderClass: 'border-l-amber-500', bgClass: 'bg-amber-50 dark:bg-amber-900/10', titleColor: 'text-amber-700 dark:text-amber-400', label: 'WARNING' }
  };
  const config = configs[type];
  const Icon = config.icon;
  const displayTitle = title || config.label;

  // Render children minus the markup [!type] wrapper natively
  const cleanChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const subChildren = React.Children.toArray((child.props as any).children);
      const newSubChildren = subChildren.map(c => typeof c === 'string' ? c.replace(/^\s*\[!(info|tip|warning)\]\s*/i, '') : c);
      return React.cloneElement(child, { ...(child.props as any) }, ...newSubChildren);
    }
    return child;
  });

  return (
    <div className={`my-5 rounded-[4px] rounded-l-[2px] border-l-4 ${config.borderClass} bg-white dark:bg-[#16181D] ring-1 ring-slate-200 dark:ring-white/5 overflow-hidden`}>
      <div className={`flex items-center gap-2 px-4 py-2 text-[13px] font-bold ${config.bgClass} ${config.titleColor}`}>
        <Icon className="w-4 h-4" />
        <span>{displayTitle}</span>
      </div>
      <div className="p-4 text-[14px] leading-[1.6] text-slate-700 dark:text-[#c7ccd7] prose-p:my-0">
        {cleanChildren}
      </div>
    </div>
  );
};


