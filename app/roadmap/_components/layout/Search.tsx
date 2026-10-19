"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, ChevronRight, Hash, Folder, Layout, Command, Loader2, AlertCircle } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type Fuse from 'fuse.js';
import { createFuzzyIndex, searchDocs, type SearchItem, type SearchResult } from '../../_lib/search';

export function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchIndex, setSearchIndex] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const fuseRef = useRef<Fuse<SearchItem>>(null);
  const loadedOnceRef = useRef(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  // Load once in production; refetch on each opening during development.
  useEffect(() => {
    if (isOpen && (!loadedOnceRef.current || process.env.NODE_ENV === 'development')) {
      setIsLoading(true);
      setIsError(false);
      fetch('/search-index.json', { cache: 'no-store' })
        .then(res => {
          if (!res.ok) throw new Error('Failed to load search index');
          return res.json();
        })
        .then(data => {
          if (!Array.isArray(data)) throw new Error('Invalid index format');
          setSearchIndex(data);
          fuseRef.current = createFuzzyIndex(data);
          loadedOnceRef.current = true;

          setIsLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch search index:", err);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [isOpen]);


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
      setActiveIndex(0);
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

  // Search the local section index. Exact matches lead; fuzzy matches fill gaps.
  useEffect(() => {
    if (!query.trim() || !fuseRef.current) {
      setResults([]);
      setActiveIndex(0);
      return;
    }
    setResults(searchDocs(searchIndex, fuseRef.current, query));
    setActiveIndex(0); // Reset selection to top on new query
  }, [query, searchIndex]);


  // Navigate using keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = results[activeIndex];
      if (selected) {
        setIsOpen(false);
        router.push(selected.url);
      }
    }
  };

  return (
    <>
      {/* Search Trigger (Top Bar Input Style) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Search the roadmaps"
        className="flex-1 max-w-2xl mx-auto w-full group/trigger text-left"
      >
        <div className="relative cursor-text">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-slate-400 group-hover/trigger:text-teal-600 transition-colors" />
          </div>
          <div className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-medium text-slate-400 dark:text-slate-500 transition-all group-hover/trigger:border-teal-500/50 flex items-center justify-between">
            <span className="sm:hidden">Search</span>
            <span className="hidden sm:inline">Search the roadmaps...</span>
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-black uppercase tracking-tighter opacity-60 group-hover/trigger:opacity-100 transition-opacity">
              <Command className="w-3 h-3" /> K
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 sm:p-6 md:p-20">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Container */}
            <motion.div 
              ref={searchRef}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center px-6 py-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-4 animate-spin" />
                ) : (
                  <SearchIcon className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-4" />
                )}
                <input

                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-lg font-bold placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
                  placeholder="Search topics, chapters, or concepts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-xl transition-colors text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results Area */}
              <div className="max-h-[50vh] overflow-y-auto p-4 custom-scrollbar">
                {isLoading ? (
                  <div className="space-y-3 p-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 p-4 animate-pulse">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-xl" />
                        <div className="flex-1 space-y-2 py-1">
                          <div className="h-4 bg-slate-100 dark:bg-white/5 rounded w-1/4" />
                          <div className="h-3 bg-slate-100 dark:bg-white/5 rounded w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isError ? (
                  <div className="py-20 text-center">
                    <div className="inline-flex p-4 rounded-full bg-red-50 dark:bg-red-500/10 mb-4">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-base font-black text-slate-900 dark:text-slate-200 uppercase tracking-tight">Search Unavailable</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Failed to load roadmap index. Please check your connection and reload.</p>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="mt-6 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((result, idx) => (
                      <Link
                        key={result.url}
                        href={result.url}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`flex items-start gap-4 p-4 rounded-2xl transition-all group border ${
                          activeIndex === idx 
                          ? 'bg-teal-50/50 dark:bg-teal-500/5 border-teal-500/20 shadow-sm' 
                          : 'bg-transparent border-transparent grayscale-[0.6] opacity-60 hover:opacity-100 hover:grayscale-0'
                        }`}
                      >
                        {/* Icon */}
                        <div className={`mt-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          result.type === 'section' ? 'bg-teal-500/10 text-teal-600 shadow-sm' :
                          result.type === 'chapter' ? 'bg-slate-500/10 text-slate-500 shadow-sm' :
                          'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                        }`}>
                          {result.type === 'section' ? <Hash className="w-4 h-4" /> :
                           result.type === 'chapter' ? <Folder className="w-4 h-4" /> :
                           <Layout className="w-4 h-4" />}
                        </div>
 
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`text-sm font-black uppercase tracking-tight transition-colors ${
                              activeIndex === idx ? 'text-teal-600 dark:text-teal-400' : 'text-slate-900 dark:text-slate-200'
                            }`}>
                              {result.title}
                            </p>
                            {result.approximate && <span className="text-[10px] font-semibold text-amber-400">Close match</span>}
                          </div>
                          <p className="mb-1 text-[11px] text-slate-500 dark:text-slate-400">
                            {result.trackTitle}{result.type === 'section' && result.chapterTitle ? ` / ${result.chapterTitle}` : ''}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {result.snippet}
                          </p>
                        </div>
 
                        <ChevronRight className={`w-4 h-4 mt-3 transition-all ${
                          activeIndex === idx ? 'text-teal-600 translate-x-0' : 'text-slate-300 -translate-x-2 opacity-0'
                        }`} />
                      </Link>
                    ))}
                  </div>
                ) : query.trim() ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center"
                  >
                    <div className="inline-flex p-4 rounded-full bg-slate-50 dark:bg-white/5 mb-4">
                      <SearchIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-base font-black text-slate-900 dark:text-slate-200 uppercase tracking-tight">No results found</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Try searching for concepts like "Async", "Docker", or "Auth"</p>
                  </motion.div>
                ) : (
                  <div className="py-20 text-center">
                    <h3 className="text-sm font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] animate-pulse">Start typing to explore...</h3>
                  </div>
                )}
              </div>


              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-slate-900 dark:text-slate-200">Enter</kbd> to select</span>
                  <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-slate-900 dark:text-slate-200">↑↓</kbd> to navigate</span>
                </div>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-slate-900 dark:text-slate-200">Esc</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
