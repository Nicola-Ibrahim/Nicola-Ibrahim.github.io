"use client";

import React from 'react';
import { Terminal, Copy, Check, ExternalLink, Info, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import AsyncDecisionFlowchart from '@/app/roadmap/_content/backend/_components/AsyncDecisionFlowchart';
import ThreadsVsCoroutines from '@/app/roadmap/_content/backend/_components/ThreadsVsCoroutines';
import EventLoopStepper from '@/app/roadmap/_content/backend/_components/EventLoopStepper';
import NotificationStrategies from '@/app/roadmap/_content/backend/_components/NotificationStrategies';

/**
 * Utility to generate IDs from text for header anchoring.
 */
function generateId(text: any): string {
  if (typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/^\d+\.\s*/, '') // Remove "1. "
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

/**
 * Recursive text extractor for React children.
 * Crucial for MDXv2 where blockquotes wrap content in <p> tags.
 */
function extractText(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node.props?.children) return extractText(node.props.children);
  return '';
}

/**
 * UnifiedCodeBlock - A premium code block component with copy functionality.
 * Detects specialized "language-prompt" fields for Agent Skills.
 */
const UnifiedCodeBlock = ({ children }: { children: React.ReactNode }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  
  // Extract text and language from children
  const childrenArray = React.Children.toArray(children);
  const codeElement = childrenArray[0] as React.ReactElement;
  
  if (!codeElement || !codeElement.props) {
    return <pre className="my-10 p-8 bg-slate-900 rounded-3xl overflow-x-auto border border-white/10">{children}</pre>;
  }

  const rawCode = extractText(codeElement.props.children);
  const className = codeElement.props.className || '';
  const language = className.replace('language-', '') || 'code';
  const isPrompt = language === 'prompt';

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const containerBg = isPrompt 
    ? "bg-slate-900/50 dark:bg-[#111216]" 
    : "bg-slate-900 dark:bg-black/40";
  const headerBg = isPrompt 
    ? "bg-slate-100/50 dark:bg-black/40" 
    : "bg-slate-800/50 dark:bg-white/5";
  const accentColor = isPrompt ? "bg-teal-500" : "bg-slate-700";
  const textColor = isPrompt ? "text-slate-600 dark:text-slate-400" : "text-slate-300 dark:text-slate-200";

  return (
    <div className={`my-12 ${containerBg} rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl group/snippet`}>
      <div className={`flex items-center justify-between px-8 py-5 ${headerBg} border-b border-slate-200 dark:border-white/10`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${accentColor} flex items-center justify-center text-white shadow-lg transition-transform group-hover/snippet:scale-110`}>
            {isPrompt ? <Terminal className="w-5 h-5" /> : <div className="text-[10px] font-black uppercase text-white/50">{language.slice(0, 2)}</div>}
          </div>
          <div>
            <span className="block text-[10px] font-black tracking-[0.3em] text-slate-500 underline decoration-teal-500/30 underline-offset-4 uppercase">
              {isPrompt ? "Integrated Skill" : "Technical Snippet"}
            </span>
            <span className="block text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest mt-0.5">
              {isPrompt ? "Agent System Prompt" : `${language} source`}
            </span>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
            isCopied 
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-inner' 
              : 'bg-teal-500 text-white hover:bg-teal-600 border-teal-500 shadow-lg shadow-teal-500/20 active:scale-95'
          }`}
        >
          {isCopied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy Code</>}
        </button>
      </div>
      <div className={`p-10 ${textColor} font-mono text-sm md:text-base whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-teal-500/30 custom-scrollbar bg-grid-slate-100/[0.03]`}>
        {codeElement.props.children}
      </div>
    </div>
  );
};

/**
 * Shared MDX components mapping.
 */
export const mdxComponents = {
  // Logic for specialized blocks
  pre: (props: any) => <UnifiedCodeBlock {...props} />,

  blockquote: (props: any) => {
    // Extract full text to match [!type] markers
    const allText = extractText(props.children);
    
    const types = {
      '[!info]': { icon: Info, color: 'teal', label: 'Pro Tip' },
      '[!tip]': { icon: Lightbulb, color: 'amber', label: 'Implementation Tip' },
      '[!warning]': { icon: AlertTriangle, color: 'rose', label: 'Critical Warning' },
      '[!ai]': { icon: Sparkles, color: 'indigo', label: 'Agent Intelligence' },
      '[!next]': { icon: ExternalLink, color: 'emerald', label: 'Next Step' }
    };

    const foundType = Object.entries(types).find(([key]) => allText.toLowerCase().trim().startsWith(key));

    if (foundType) {
      const [key, { icon: Icon, color, label }] = foundType;
      
      // We render the original children but need to remove the [!type] marker from the display
      // This is tricky without modifying the React tree, so we use a CSS mask or just accept it's there
      // Better: we can try to find the first child that is a string or has string children and replace the marker
      
      const colorMap: Record<string, string> = {
        teal: 'bg-teal-500/5 border-teal-500/20 text-teal-700 dark:text-teal-400',
        amber: 'bg-amber-500/5 border-amber-500/20 text-amber-700 dark:text-amber-400',
        rose: 'bg-rose-500/5 border-rose-500/20 text-rose-700 dark:text-rose-400',
        indigo: 'bg-indigo-500/5 border-indigo-500/20 text-indigo-700 dark:text-indigo-400',
        emerald: 'bg-emerald-500/5 border-emerald-500/20 text-emerald-700 dark:text-emerald-400'
      };

      return (
        <div className={`my-14 p-10 rounded-[2.5rem] border-l-8 ${colorMap[color]} shadow-2xl transition-all hover:scale-[1.01] bg-white/40 dark:bg-black/10 backdrop-blur-sm group/callout`}>
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-3.5 rounded-2xl bg-white dark:bg-black/40 shadow-xl shadow-black/5 group-hover/callout:rotate-12 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.4em] opacity-80">{label}</span>
          </div>
          <div className="text-xl leading-loose font-medium opacity-95 [&>p]:mb-0 select-text">
            {props.children}
          </div>
        </div>
      );
    }

    return (
      <blockquote className="border-l-8 border-slate-200 dark:border-white/10 pl-12 italic text-slate-500 dark:text-slate-400 my-16 text-2xl font-light leading-relaxed tracking-wide" {...props} />
    );
  },

  // Premium Header Overrides (Matching Projects App)
  h1: (props: any) => (
    <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-14 tracking-tighter leading-tight" {...props} />
  ),
  h2: (props: any) => {
    const id = generateId(props.children);
    return (
      <h2 
        id={id}
        className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-28 mb-12 tracking-tight border-l-8 border-teal-500 dark:border-teal-500 pl-10 scroll-mt-24 group/h2" 
        {...props} 
      >
        <span className="group-hover/h2:text-teal-600 dark:group-hover/h2:text-teal-400 transition-colors duration-500">{props.children}</span>
      </h2>
    );
  },
  h3: (props: any) => (
    <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 mt-20 mb-10 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500" {...props} />
  ),
  
  // Clean Text Overrides
  p: (props: any) => (
    <p className="text-xl md:text-2xl leading-relaxed mb-10 text-slate-600 dark:text-slate-400 max-w-6xl font-medium opacity-90 selection:bg-teal-500/20" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-12 mb-12 space-y-8 text-slate-600 dark:text-slate-400 text-xl md:text-2xl" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed hover:text-slate-900 dark:hover:text-white transition-all hover:translate-x-2 duration-300" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-black text-slate-900 dark:text-white underline decoration-teal-500/20 underline-offset-4" {...props} />
  ),

  // Premium Table Integration
  table: (props: any) => (
    <div className="my-20 overflow-hidden rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] bg-white/70 dark:bg-black/30 backdrop-blur-2xl">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse" {...props} />
      </div>
    </div>
  ),
  thead: (props: any) => <thead className="bg-slate-100/50 dark:bg-white/5 border-b border-slate-200/50 dark:border-white/10" {...props} />,
  th: (props: any) => <th className="px-12 py-10 text-slate-900 dark:text-slate-200 font-black uppercase tracking-[0.4em] text-xs" {...props} />,
  td: (props: any) => <td className="px-12 py-10 text-xl text-slate-700 dark:text-slate-400 border-b border-slate-200/30 dark:border-white/5 last:border-0 font-medium" {...props} />,
  tr: (props: any) => <tr className="hover:bg-teal-500/[0.02] transition-colors duration-500" {...props} />,

  // Inline Code
  code: (props: any) => (
    <code className="px-2.5 py-1.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-[0.85em] font-black border border-teal-500/20 shadow-sm" {...props} />
  ),

  // Custom Roadmap Widgets
  AsyncDecisionFlowchart,
  ThreadsVsCoroutines,
  EventLoopStepper,
  NotificationStrategies,
};
