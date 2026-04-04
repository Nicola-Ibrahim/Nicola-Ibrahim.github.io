"use client";

import React from 'react';
import { GitBranch } from 'lucide-react';

export default function AsyncDecisionFlowchart() {
  return (
  <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-2xl font-sans overflow-x-auto shadow-sm transition-colors">
    <h4 className="text-center font-bold mb-8 text-slate-800 dark:text-slate-100 text-lg flex items-center justify-center gap-2 uppercase tracking-wide">
      <GitBranch className="w-5 h-5 text-indigo-500" /> The Execution Model Decision Tree
    </h4>
    <div className="flex flex-col items-center min-w-[700px] relative pb-4 text-center">
      
      {/* Node 1 */}
      <div className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 px-6 py-3 rounded-full font-black text-slate-700 dark:text-slate-200 shadow-sm z-10 flex items-center justify-center min-w-[200px] uppercase tracking-tight transition-colors">
        Write a function
      </div>

      <div className="w-0.5 h-6 bg-slate-300 dark:bg-slate-600"></div>
      <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black mb-1">↓</div>

      {/* Level 1 Split */}
      <div className="flex items-start w-full justify-center relative">
        {/* Left branch - Plain def */}
        <div className="flex-1 flex flex-col items-end pt-4 pr-6 relative">
          <div className="absolute right-0 top-0 w-1/2 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
          <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 mr-[140px] bg-slate-50 dark:bg-slate-900 px-2 relative -top-3 z-10">NO</div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/40 border-2 border-indigo-200 dark:border-indigo-500/30 px-5 py-3 rounded-xl shadow-sm text-center w-[160px] relative z-10 mr-6 transition-colors">
            <div className="font-black text-indigo-900 dark:text-indigo-200 text-xs uppercase tracking-tighter">Plain `def`</div>
            <div className="text-[10px] text-indigo-700 dark:text-indigo-400 mt-1 font-bold">Domain layer</div>
            <div className="text-[9px] text-indigo-500/80 dark:text-indigo-300/60 mt-2 pt-2 border-t border-indigo-200/50 dark:border-indigo-500/20">e.g. Order.calculate()</div>
          </div>
        </div>

        {/* Center Node 2 */}
        <div className="flex flex-col items-center relative z-10 mx-4">
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-6 py-4 rounded-xl shadow-sm text-center w-[220px] transition-colors">
            <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">Does it touch I/O?</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">DB, HTTP, Redis, files</div>
          </div>
          
          <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-600"></div>
          <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black mb-1">↓ YES</div>
          
          {/* Node 3 */}
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-6 py-4 rounded-xl shadow-sm text-center w-[220px] transition-colors">
            <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">Async lib available?</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">asyncpg, httpx...</div>
          </div>
        </div>

        {/* Right spacing to balance flex */}
        <div className="flex-1"></div>
      </div>

      {/* Level 2 Split */}
      <div className="flex items-start w-full justify-center relative mt-1">
        {/* Left branch - Threadpool */}
        <div className="flex-1 flex flex-col items-end pt-4 pr-6 relative">
          <div className="absolute right-0 top-0 w-1/2 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
          <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 mr-[140px] bg-slate-50 dark:bg-slate-900 px-2 relative -top-3 z-10">NO</div>
          
          <div className="bg-rose-50 dark:bg-rose-900/40 border-2 border-rose-200 dark:border-rose-500/30 px-4 py-3 rounded-xl shadow-sm text-center w-[160px] relative z-10 mr-6 transition-colors">
            <div className="font-black text-rose-900 dark:text-rose-200 text-xs uppercase tracking-tighter">`def` + Thread</div>
            <div className="text-[10px] text-rose-700 dark:text-rose-400 mt-1 font-bold">In worker pool</div>
            <div className="text-[9px] text-rose-500/80 dark:text-rose-300/60 mt-2 pt-2 border-t border-rose-200/50 dark:border-rose-500/20">FastAPI handles automatically</div>
          </div>
        </div>

        {/* Center Node 4 */}
        <div className="flex flex-col items-center relative z-10 mx-4">
          <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-600"></div>
          <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black mb-1">↓ YES</div>
          
          <div className="bg-amber-50 dark:bg-amber-900/40 border-2 border-amber-200 dark:border-amber-500/30 px-6 py-4 rounded-xl shadow-sm text-center w-[220px] transition-colors">
            <div className="font-black text-amber-900 dark:text-amber-200 text-sm uppercase">`async def` + `await`</div>
            <div className="text-xs text-amber-700 dark:text-amber-400 mt-1 font-bold">Infrastructure adapter</div>
            <div className="text-[9px] text-amber-600/80 dark:text-amber-300/60 mt-2 pt-2 border-t border-amber-200/50 dark:border-amber-500/20">await conn.fetch()</div>
          </div>
          
          <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-600"></div>
          <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black mb-1">↓</div>
          
          {/* Node 5 */}
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-6 py-4 rounded-xl shadow-sm text-center w-[220px] transition-colors">
            <div className="font-bold text-slate-800 dark:text-slate-100 text-sm">Heavy CPU job?</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">analytics, ML, PDFs</div>
          </div>
        </div>

        {/* Right branch - Celery */}
        <div className="flex-1 flex flex-col items-start pt-[140px] pl-6 relative">
          <div className="absolute left-0 top-[125px] w-[50%] h-0.5 bg-slate-300 dark:bg-slate-600"></div>
          <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-2 ml-8 bg-slate-50 dark:bg-slate-900 px-2 relative -top-3 z-10">YES</div>
          
          <div className="bg-red-50 dark:bg-red-900/40 border-2 border-red-200 dark:border-red-500/30 px-5 py-3 rounded-xl shadow-sm text-center w-[160px] relative z-10 ml-4 transition-colors">
            <div className="font-black text-red-900 dark:text-red-200 text-xs uppercase tracking-tighter">Celery Task</div>
            <div className="text-[10px] text-red-700 dark:text-red-400 mt-1 font-bold">Background process</div>
          </div>
        </div>
      </div>

      {/* Final Center Node */}
      <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-600"></div>
      <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black mb-2">↓ NO</div>
      
      <div className="bg-emerald-50 dark:bg-emerald-900/40 border-2 border-emerald-200 dark:border-emerald-500/30 px-6 py-4 rounded-xl shadow-sm text-center z-10 min-w-[280px] transition-colors">
        <div className="font-black text-emerald-900 dark:text-emerald-200 text-sm uppercase tracking-tight">`async def` — Application layer</div>
        <div className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 font-bold">Orchestrates awaits — no raw I/O</div>
      </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 font-sans transition-colors duration-500">
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col border border-slate-200 dark:border-slate-700 transition-colors">
          <div className="bg-indigo-600 py-3 px-4 text-center font-black text-white text-[10px] uppercase tracking-widest">FastAPI async/await</div>
          <div className="p-6 flex flex-col gap-4 text-xs text-center text-slate-700 dark:text-slate-300 flex-grow">
            <p className="font-bold">I/O concurrency<br/><span className="text-[10px] font-normal opacity-70">single process</span></p>
            <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>
            <p>While awaiting DB/HTTP,<br/>event loop handles<br/>other requests.</p>
            <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>
            <p className="text-slate-500 dark:text-slate-400 italic">NOT parallelism.<br/>NOT multi-process.<br/>Just efficient waiting.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col border border-slate-200 dark:border-slate-700 transition-colors">
          <div className="bg-amber-600 py-3 px-4 text-center font-black text-white text-[10px] uppercase tracking-widest">Redis + Celery</div>
          <div className="p-6 flex flex-col gap-4 text-xs text-center text-slate-700 dark:text-slate-300 flex-grow">
            <p className="font-bold">System-level async<br/><span className="text-[10px] font-normal opacity-70">true parallelism</span></p>
            <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>
            <p>API enqueues a task.<br/>Celery worker picks it<br/>up in its own process.</p>
            <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>
            <p className="text-slate-500 dark:text-slate-400 italic">Redis = the queue<br/>(broker + store).<br/>CPU-heavy safe.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col border border-slate-200 dark:border-slate-700 transition-colors">
          <div className="bg-emerald-600 py-3 px-4 text-center font-black text-white text-[10px] uppercase tracking-widest">Push to frontend</div>
          <div className="p-6 flex flex-col gap-4 text-xs text-center text-slate-700 dark:text-slate-300 flex-grow">
            <p className="font-bold">Event notification<br/><span className="text-[10px] font-normal opacity-70">server → browser</span></p>
            <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>
            <p>Webhook = backend<br/>to backend only.<br/>For browser: SSE<br/>or WebSocket.</p>
            <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>
            <p className="text-slate-500 dark:text-slate-400 italic">These are three<br/>separate problems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
