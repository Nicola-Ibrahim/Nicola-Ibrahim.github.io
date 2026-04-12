"use client";

import React from 'react';
import { Terminal, Copy, Check, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractText, generateId } from './mdx-utils';




/**
 * AgentPrompt - A flat, high-contrast, single-shell container.
 * Features monochromatic amber typography and integrated controls.
 */
export const AgentPrompt = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const codeText = extractText(children);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="not-prose my-10 relative group border border-slate-200 dark:border-white/10 bg-[#f9fafb] dark:bg-[#121417] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={handleCopy}
        className={`absolute top-4 right-4 z-10 p-2 transition-all duration-300 rounded-lg ${
          isCopied 
            ? 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400' 
            : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-600 dark:hover:bg-white/5 dark:hover:text-zinc-400 opacity-0 group-hover:opacity-100'
        }`}
        title="Copy Prompt"
      >
        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      
      <div className="font-mono text-[13px] leading-[1.8] p-8 pr-14 selection:bg-amber-500/20 text-slate-700 dark:text-[#FBBF24] whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
};

/**
 * CodeBlock - A flat, single-shell carrier for source code.
 * Optimized for whitespace preservation and zero-depth integration.
 */
export const CodeBlock = ({ children, className }: { children: any, className?: string }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const codeText = extractText(children);
  const lang = className?.replace('language-', '') || 'code';
 
  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="not-prose my-10 relative group border border-slate-200 dark:border-white/10 bg-[#f9fafb] dark:bg-[#121417] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Integrated Label & Copy Layer */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-[10px] font-black font-sans uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-600 pr-3 border-r border-slate-100 dark:border-white/5 leading-none">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-all duration-300 ${
            isCopied 
              ? 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400' 
              : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-600 dark:hover:bg-white/5 dark:hover:text-zinc-400'
          }`}
          title="Copy Code"
        >
          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      
      <div className="font-mono text-[13px] leading-relaxed overflow-x-auto custom-scrollbar p-8">
        <div className="w-full whitespace-pre selection:bg-amber-500/10">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Callout - Premium UI for architectural notes, tips, and warnings.
 */
export const Callout = ({ type, title, children }: { type: 'info' | 'tip' | 'warning', title?: string, children: React.ReactNode }) => {
  const configs = {
    info: { icon: Info, colorClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-blue-500/5 dark:bg-blue-400/5', borderClass: 'border-blue-500/20 dark:border-blue-400/20', accentBorder: 'border-l-blue-500 dark:border-l-blue-400', label: 'Insight' },
    tip: { icon: Lightbulb, colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/5 dark:bg-amber-400/5', borderClass: 'border-amber-500/20 dark:border-amber-400/20', accentBorder: 'border-l-amber-500 dark:border-l-amber-400', label: 'Pro Tip' },
    warning: { icon: AlertTriangle, colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/5 dark:bg-rose-400/5', borderClass: 'border-rose-500/20 dark:border-rose-400/20', accentBorder: 'border-l-rose-500 dark:border-l-rose-400', label: 'Caution' }
  };
  const config = configs[type];
  const Icon = config.icon;

  // Strip the [!type] signature from the first child text nodes
  const cleanChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const subChildren = React.Children.toArray((child.props as any).children);
      const newSubChildren = subChildren.map(c => {
        if (typeof c === 'string') {
          return c.replace(/^\s*\[!(info|tip|warning)\]\s*/i, '');
        }
        return c;
      });
      return React.cloneElement(child, { ...(child.props as any) }, ...newSubChildren);
    }
    return child;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`my-10 p-7 rounded-[1.5rem] border ${config.borderClass} ${config.accentBorder} border-l-2 ${config.bgClass} backdrop-blur-[2px] relative overflow-hidden group/callout transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/10`}>
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 p-2.5 rounded-xl ${config.bgClass} border ${config.borderClass} ${config.colorClass} shadow-sm`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          {(title || config.label) && (
            <div className="flex items-center gap-3 mb-1.5 leading-none">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] opacity-80 ${config.colorClass}`}>{config.label}</span>
              {title && (
                <>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/10" />
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">{title}</span>
                </>
              )}
            </div>
          )}
          <div suppressHydrationWarning className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium prose-p:my-0 prose-strong:text-slate-900 dark:prose-strong:text-white">
            {cleanChildren}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

