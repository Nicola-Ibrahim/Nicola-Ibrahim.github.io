"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ChevronRight, Hash, Folder, Layout, Command } from 'lucide-react';
import Link from 'next/link';
import { RoadmapData } from '../../_lib/mdx';

interface SearchResult {
  type: 'track' | 'category' | 'topic';
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  trackId: string;
}

interface SearchProps {
  roadmaps: RoadmapData[];
}

export function Search({ roadmaps }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    roadmaps.forEach(track => {
      if (track.title.toLowerCase().includes(q)) {
        matches.push({
          type: 'track',
          title: track.title,
          description: track.description,
          url: `/roadmap/${track.id}`,
          trackId: track.id
        });
      }

      track.categories.forEach(cat => {
        const catTitle = cat.title.split(':')[1]?.trim() || cat.title;
        if (catTitle.toLowerCase().includes(q)) {
          matches.push({
            type: 'category',
            title: catTitle,
            subtitle: track.title,
            url: `/roadmap/${track.id}/${cat.slug}`,
            trackId: track.id
          });
        }

        cat.content?.forEach(topic => {
          if (topic.title.toLowerCase().includes(q) || topic.shortDesc?.toLowerCase().includes(q)) {
            matches.push({
              type: 'topic',
              title: topic.title,
              subtitle: `${catTitle} • ${track.title}`,
              description: topic.shortDesc,
              url: `/roadmap/${track.id}/${cat.slug}#${topic.id}`,
              trackId: track.id
            });
          }
        });
      });
    });

    setResults(matches.slice(0, 10));
  }, [query, roadmaps]);

  return (
    <>
      {/* Search Trigger (Top Bar Input Style) */}
      <div 
        onClick={() => setIsOpen(true)}
        className="flex-1 max-w-2xl mx-auto w-full group/trigger"
      >
        <div className="relative cursor-text">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-slate-400 group-hover/trigger:text-teal-600 transition-colors" />
          </div>
          <div className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-medium text-slate-400 dark:text-slate-500 transition-all group-hover/trigger:border-teal-500/50 flex items-center justify-between">
            <span>Search topics, categories...</span>
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-black uppercase tracking-tighter opacity-60 group-hover/trigger:opacity-100 transition-opacity">
              <Command className="w-3 h-3" /> K
            </div>
          </div>
        </div>
      </div>

      {/* Full Modal Search (Command Palette) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 sm:p-6 md:p-20">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div 
            ref={searchRef}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200"
          >
            {/* Search Input */}
            <div className="flex items-center px-6 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
              <SearchIcon className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-4" />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-lg font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                placeholder="What exactly are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result, idx) => (
                    <Link
                      key={`${result.type}-${idx}`}
                      href={result.url}
                      onClick={() => setIsOpen(false)}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-slate-100 dark:hover:border-white/5"
                    >
                      {/* Icon */}
                      <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        result.type === 'topic' ? 'bg-teal-500/10 text-teal-600 shadow-sm' :
                        result.type === 'category' ? 'bg-indigo-500/10 text-indigo-600 shadow-sm' :
                        'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                      }`}>
                        {result.type === 'topic' ? <Hash className="w-4 h-4" /> :
                         result.type === 'category' ? <Folder className="w-4 h-4" /> :
                         <Layout className="w-4 h-4" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-black text-slate-900 dark:text-slate-200 uppercase tracking-tight group-hover:text-teal-600 transition-colors">
                            {result.title}
                          </p>
                          {result.subtitle && (
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded-full">
                              {result.subtitle}
                            </span>
                          )}
                        </div>
                        {result.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-relaxed italic">
                            {result.description}
                          </p>
                        )}
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 mt-3 transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="py-20 text-center">
                  <div className="inline-flex p-4 rounded-full bg-slate-50 dark:bg-white/5 mb-4">
                    <SearchIcon className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-200 uppercase tracking-tight">No results found</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Try searching for concepts like "Async", "Docker", or "Auth"</p>
                </div>
              ) : (
                <div className="py-20 text-center">
                  <h3 className="text-sm font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">Start typing to explore...</h3>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded">Enter</kbd> to select</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded">↑↓</kbd> to navigate</span>
              </div>
              <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
