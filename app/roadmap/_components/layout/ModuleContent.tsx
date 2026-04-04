"use client";

import React from 'react';
import { Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote';
import { mdxComponents } from '../../_lib/mdx-components';
import { TopicMeta, ContentLink } from '../../_lib/mdx';

interface ModuleContentProps {
  content: TopicMeta;
  mdxSource: any;
}

/**
 * ModuleContent Component
 * Renders a single section of a roadmap module.
 * Fully MDX-driven: displays content, components, and structured metadata (prompts/links).
 */
export const ModuleContent = ({ 
  content,
  mdxSource
}: ModuleContentProps) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <article 
      id={content.id}
      className="relative pb-8 mb-8 border-b border-slate-100 dark:border-white/5 last:border-0 last:pb-0 last:mb-0 group/content scroll-mt-24"
    >
      {/* Content Header */}
      <div className="flex flex-col gap-2 mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-300 uppercase tracking-tight group-hover/content:text-teal-600 dark:group-hover/content:text-teal-400 transition-colors">
          {content.title}
        </h3>
        <p className="text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
          {content.shortDesc}
        </p>
      </div>

      {/* Main Content Body (MDX Rendering) */}
      <div className="flex flex-col gap-6 max-w-4xl">
        <div className="prose prose-lg dark:prose-invert prose-headings:uppercase prose-headings:tracking-widest prose-headings:font-black prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline prose-code:text-teal-600 dark:prose-code:text-teal-400 prose-code:bg-teal-500/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none border-b border-slate-200 dark:border-white/5 pb-10 mb-10">
          {mounted ? (
            <MDXRemote {...mdxSource} components={mdxComponents} />
          ) : (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-1/2"></div>
              <div className="h-4 bg-slate-200 dark:bg-white/5 rounded w-5/6"></div>
            </div>
          )}
        </div>

        {/* AI Agent Skill Block (Structured Metadata) */}
        {content.prompt && (
          <div className="bg-slate-50 dark:bg-[#1a1c22] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-inner group/prompt">
            <div className="flex items-center justify-between px-8 py-5 bg-slate-100 dark:bg-black/20 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/10">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black tracking-[0.3em] text-slate-800 dark:text-slate-400 uppercase">
                  Agent Skill Prompt
                </span>
              </div>
              <button 
                onClick={() => handleCopy(content.prompt!)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  isCopied 
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                    : 'bg-teal-600 text-white hover:bg-teal-700 border-teal-600 shadow-md shadow-teal-600/10'
                }`}
              >
                {isCopied ? (
                  <><Check className="w-3.5 h-3.5" /> Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy Skill</>
                )}
              </button>
            </div>
            <div className="p-10 text-slate-800 dark:text-slate-300 font-mono text-sm whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-teal-500/40 custom-scrollbar">
              {content.prompt}
            </div>
          </div>
        )}

        {/* Recommended Resources (Structured Metadata) */}
        {content.links && content.links.length > 0 && (
          <div className="p-8 bg-teal-500/5 dark:bg-teal-500/5 rounded-3xl border border-teal-500/10">
            <h4 className="text-[10px] font-black text-teal-600 dark:text-teal-400 mb-4 uppercase tracking-[0.3em] flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> Recommended Practice
            </h4>
            <div className="flex flex-col gap-3">
              {content.links.map((link: ContentLink, idx: number) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors py-1"
                >
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-semibold border-b border-transparent group-hover:border-teal-500/30">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
