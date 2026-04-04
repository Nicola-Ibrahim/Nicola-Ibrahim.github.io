"use client";

import React from 'react';
import { GitBranch } from 'lucide-react';

export default function AsyncDecisionFlowchart() {
  return (
  <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl font-sans overflow-x-auto shadow-sm">
    <h4 className="text-center font-bold mb-8 text-slate-800 text-lg flex items-center justify-center gap-2">
      <GitBranch className="w-5 h-5 text-indigo-500" /> The Execution Model Decision Tree
    </h4>
    <div className="flex flex-col items-center min-w-[700px] relative pb-4">
      
      {/* Node 1 */}
      <div className="bg-white border-2 border-slate-300 px-6 py-3 rounded-full font-bold text-slate-700 shadow-sm z-10 flex items-center justify-center min-w-[200px]">
        Write a function
      </div>

      <div className="w-0.5 h-6 bg-slate-300"></div>
      <div className="text-slate-400 text-xs mb-1">↓</div>

      {/* Level 1 Split */}
      <div className="flex items-start w-full justify-center relative">
        {/* Left branch - Plain def */}
        <div className="flex-1 flex flex-col items-end pt-4 pr-6 relative">
          <div className="absolute right-0 top-0 w-1/2 h-0.5 bg-slate-300"></div>
          <div className="text-xs font-bold text-slate-500 mb-2 mr-[140px] bg-slate-50 px-1 relative -top-3 z-10">No</div>
          
          <div className="bg-indigo-50 border-2 border-indigo-200 px-5 py-3 rounded-xl shadow-sm text-center w-[160px] relative z-10 mr-6">
            <div className="font-bold text-indigo-900 text-sm">Plain `def`</div>
            <div className="text-xs text-indigo-700 mt-1">Domain layer</div>
            <div className="text-[10px] text-indigo-500/80 mt-2 pt-2 border-t border-indigo-200/50">e.g. Order.calculate()</div>
          </div>
        </div>

        {/* Center Node 2 */}
        <div className="flex flex-col items-center relative z-10 mx-4">
          <div className="bg-slate-100 border border-slate-300 px-6 py-4 rounded-xl shadow-sm text-center w-[220px]">
            <div className="font-bold text-slate-800 text-sm">Does it touch I/O?</div>
            <div className="text-xs text-slate-500 mt-1">DB, HTTP, Redis, files</div>
          </div>
          
          <div className="w-0.5 h-8 bg-slate-300"></div>
          <div className="text-slate-400 text-xs mb-1">↓ Yes</div>
          
          {/* Node 3 */}
          <div className="bg-slate-100 border border-slate-300 px-6 py-4 rounded-xl shadow-sm text-center w-[220px]">
            <div className="font-bold text-slate-800 text-sm">Async lib available?</div>
            <div className="text-xs text-slate-500 mt-1">asyncpg, httpx, aioredis...</div>
          </div>
        </div>

        {/* Right spacing to balance flex */}
        <div className="flex-1"></div>
      </div>

      {/* Level 2 Split */}
      <div className="flex items-start w-full justify-center relative mt-1">
        {/* Left branch - Threadpool */}
        <div className="flex-1 flex flex-col items-end pt-4 pr-6 relative">
          <div className="absolute right-0 top-0 w-1/2 h-0.5 bg-slate-300"></div>
          <div className="text-xs font-bold text-slate-500 mb-2 mr-[140px] bg-slate-50 px-1 relative -top-3 z-10">No</div>
          
          <div className="bg-rose-50 border-2 border-rose-200 px-4 py-3 rounded-xl shadow-sm text-center w-[160px] relative z-10 mr-6">
            <div className="font-bold text-rose-900 text-sm">`def` + threadpool</div>
            <div className="text-xs text-rose-700 mt-1">or run_in_executor</div>
            <div className="text-[10px] text-rose-500/80 mt-2 pt-2 border-t border-rose-200/50">FastAPI runs in thread automatically</div>
          </div>
        </div>

        {/* Center Node 4 */}
        <div className="flex flex-col items-center relative z-10 mx-4">
          <div className="w-0.5 h-8 bg-slate-300"></div>
          <div className="text-slate-400 text-xs mb-1">↓ Yes</div>
          
          <div className="bg-amber-50 border-2 border-amber-200 px-6 py-4 rounded-xl shadow-sm text-center w-[220px]">
            <div className="font-bold text-amber-900 text-sm">`async def` + `await`</div>
            <div className="text-xs text-amber-700 mt-1">Infrastructure adapter</div>
            <div className="text-[10px] text-amber-600/80 mt-2 pt-2 border-t border-amber-200/50">rows = await conn.fetch()</div>
          </div>
          
          <div className="w-0.5 h-8 bg-slate-300"></div>
          <div className="text-slate-400 text-xs mb-1">↓</div>
          
          {/* Node 5 */}
          <div className="bg-slate-100 border border-slate-300 px-6 py-4 rounded-xl shadow-sm text-center w-[220px]">
            <div className="font-bold text-slate-800 text-sm">Heavy CPU or long job?</div>
            <div className="text-xs text-slate-500 mt-1">analytics, ML, PDF gen</div>
          </div>
        </div>

        {/* Right branch - Celery */}
        <div className="flex-1 flex flex-col items-start pt-[140px] pl-6 relative">
          <div className="absolute left-0 top-[125px] w-[50%] h-0.5 bg-slate-300"></div>
          <div className="text-xs font-bold text-slate-500 mb-2 ml-8 bg-slate-50 px-1 relative -top-3 z-10">Yes</div>
          
          <div className="bg-red-50 border-2 border-red-200 px-4 py-3 rounded-xl shadow-sm text-center w-[160px] relative z-10 ml-4">
            <div className="font-bold text-red-900 text-sm">Celery task</div>
            <div className="text-xs text-red-700 mt-1">separate process</div>
          </div>
        </div>
      </div>

      {/* Final Center Node */}
      <div className="w-0.5 h-8 bg-slate-300"></div>
      <div className="text-slate-400 text-xs mb-1">↓ No</div>
      
      <div className="bg-emerald-50 border-2 border-emerald-200 px-6 py-4 rounded-xl shadow-sm text-center z-10 min-w-[280px]">
        <div className="font-bold text-emerald-900 text-sm">`async def` — app / interface layer</div>
        <div className="text-xs text-emerald-700 mt-1">orchestrates awaits — no raw I/O itself</div>
      </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 font-sans">
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col border border-slate-700">
          <div className="bg-blue-600 py-3 px-4 text-center font-bold text-white text-sm">FastAPI async/await</div>
          <div className="p-5 flex flex-col gap-4 text-sm text-center text-slate-300 flex-grow">
            <p>I/O concurrency<br/>single process</p>
            <div className="h-px w-full bg-slate-700/50"></div>
            <p>While awaiting DB/HTTP,<br/>event loop handles<br/>other requests.</p>
            <div className="h-px w-full bg-slate-700/50"></div>
            <p className="text-slate-400">NOT parallelism.<br/>NOT multi-process.<br/>Just efficient waiting.</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col border border-slate-700">
          <div className="bg-amber-700 py-3 px-4 text-center font-bold text-white text-sm">Redis + Celery</div>
          <div className="p-5 flex flex-col gap-4 text-sm text-center text-slate-300 flex-grow">
            <p>System-level async<br/>true parallelism via workers</p>
            <div className="h-px w-full bg-slate-700/50"></div>
            <p>API enqueues a task.<br/>Celery worker picks it<br/>up in its own process.</p>
            <div className="h-px w-full bg-slate-700/50"></div>
            <p className="text-slate-400">Redis = the queue<br/>(broker + result store).<br/>CPU-heavy safe.</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col border border-slate-700">
          <div className="bg-emerald-700 py-3 px-4 text-center font-bold text-white text-sm">Push to frontend</div>
          <div className="p-5 flex flex-col gap-4 text-sm text-center text-slate-300 flex-grow">
            <p>Event notification<br/>server → browser</p>
            <div className="h-px w-full bg-slate-700/50"></div>
            <p>Webhook = backend<br/>to backend only.<br/>For browser: SSE<br/>or WebSocket.</p>
            <div className="h-px w-full bg-slate-700/50"></div>
            <p className="text-slate-400">These are three<br/>separate problems.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
