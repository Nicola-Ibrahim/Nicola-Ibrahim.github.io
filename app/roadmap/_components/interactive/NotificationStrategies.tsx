"use client";

import React from 'react';

export default function NotificationStrategies() {
  return (
    <div className="mt-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Polling */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm flex flex-col transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-lg uppercase tracking-tight">Polling</span>
            <span className="text-[10px] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md font-black uppercase">simplest</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-500 mb-4 font-mono bg-slate-50 dark:bg-black/20 p-2 rounded border border-slate-100 dark:border-transparent">Frontend calls GET /jobs/{'{id}'} every 2s</p>
          <div className="space-y-1.5 mb-4 flex-grow text-xs font-bold">
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Zero infrastructure</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Works everywhere</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Easy to debug</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- Wastes requests</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- Latency = poll interval</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- Doesn't scale to 1000s</p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-500 font-medium italic">
            Good for: internal tools, prototypes. Kills you at scale.
          </div>
        </div>
        
        {/* SSE */}
        <div className="bg-white dark:bg-slate-900/60 border-2 border-teal-400 dark:border-teal-500/50 rounded-xl p-5 shadow-md flex flex-col relative ring-4 ring-teal-50 dark:ring-teal-500/5 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-lg uppercase tracking-tight">SSE</span>
            <span className="text-[10px] bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-md font-black uppercase tracking-wider">recommended</span>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">Server-Sent Events — one persistent HTTP stream, server pushes</p>
          <div className="space-y-1.5 mb-4 flex-grow text-xs font-bold">
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Native browser support</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Auto-reconnect built in</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Trivial in FastAPI</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ One-way = analytics fits</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- No client→server messaging</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- HTTP/1.1 cap: 6 tabs</p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-teal-900 dark:text-teal-300 font-black">
            Perfect fit here. Analytics done = server pushes one event. No bidirectional needed.
          </div>
        </div>

        {/* WebSocket */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm flex flex-col transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-lg uppercase tracking-tight">WebSocket</span>
            <span className="text-[10px] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md font-black uppercase">overkill here</span>
          </div>
          <p className="text-[11px] text-slate-700 dark:text-slate-400 mb-4 leading-relaxed">Full duplex persistent connection</p>
          <div className="space-y-1.5 mb-4 flex-grow text-xs font-bold">
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Bidirectional messaging</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Low latency both ways</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-black">+ Scales with Pub/Sub</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- Complex infrastructure</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- Connection management</p>
            <p className="text-rose-600 dark:text-rose-400 font-black">- State overhead</p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-500 font-medium italic">
            Right answer for chat/collab. Analytics is one-way only.
          </div>
        </div>
      </div>

      {/* Webhook Alert */}
      <div className="mt-6 p-5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl text-xs border border-slate-200 dark:border-slate-800 text-center shadow-inner text-slate-700 dark:text-slate-300 transition-colors">
        <span className="font-black text-slate-900 dark:text-teal-400 uppercase tracking-widest mr-2">Webhook</span> = backend calling another backend URL. Never reaches a browser directly — don't use it for this.
      </div>
    </div>
  );
}
