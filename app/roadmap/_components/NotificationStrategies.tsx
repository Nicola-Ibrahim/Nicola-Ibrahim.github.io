"use client";

import React from 'react';

export default function NotificationStrategies() {
  return (
    <div className="mt-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Polling */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-slate-800 text-lg">Polling</span>
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">simplest</span>
          </div>
          <p className="text-xs text-slate-500 mb-4 font-mono bg-slate-50 p-1.5 rounded">Frontend calls GET /jobs/{'{id}'} every 2s</p>
          <div className="space-y-1.5 mb-4 flex-grow text-[13px] font-medium">
            <p className="text-emerald-600">+ Zero infrastructure</p>
            <p className="text-emerald-600">+ Works everywhere</p>
            <p className="text-emerald-600">+ Easy to debug</p>
            <p className="text-rose-500">- Wastes requests</p>
            <p className="text-rose-500">- Latency = poll interval</p>
            <p className="text-rose-500">- Doesn't scale to 1000s of users</p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-[12px] text-slate-500 font-medium">
            Good for: internal tools, low traffic, prototypes. Kills you at scale.
          </div>
        </div>
        
        {/* SSE */}
        <div className="bg-white border-2 border-indigo-400 rounded-xl p-5 shadow-md flex flex-col relative ring-4 ring-indigo-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-slate-800 text-lg">SSE</span>
            <span className="text-[11px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">recommended</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Server-Sent Events — one persistent HTTP stream, server pushes</p>
          <div className="space-y-1.5 mb-4 flex-grow text-[13px] font-medium">
            <p className="text-emerald-600">+ Native browser support</p>
            <p className="text-emerald-600">+ Auto-reconnect built in</p>
            <p className="text-emerald-600">+ Trivial in FastAPI</p>
            <p className="text-emerald-600">+ One-way = analytics fits</p>
            <p className="text-rose-500">- No client→server messaging</p>
            <p className="text-rose-500">- HTTP/1.1 cap: 6 tabs per domain</p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-[12px] text-slate-600 font-medium">
            Perfect fit here. Analytics done = server pushes one event. No bidirectional needed.
          </div>
        </div>

        {/* WebSocket */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-slate-800 text-lg">WebSocket</span>
            <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">overkill here</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Full duplex persistent connection</p>
          <div className="space-y-1.5 mb-4 flex-grow text-[13px] font-medium">
            <p className="text-emerald-600">+ Bidirectional messaging</p>
            <p className="text-emerald-600">+ Low latency both ways</p>
            <p className="text-emerald-600">+ Scales with Redis pub/sub</p>
            <p className="text-rose-500">- More complex infra</p>
            <p className="text-rose-500">- Connection management needed</p>
            <p className="text-rose-500">- State across worker restart</p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-[12px] text-slate-500 font-medium">
            Right answer when frontend also sends real-time data (chat, live collab). Analytics is one-way only.
          </div>
        </div>
      </div>

      {/* Webhook Alert */}
      <div className="mt-4 p-4 bg-slate-900/80 rounded-xl text-[13px] border border-slate-800 text-center shadow-inner text-slate-300">
        <span className="font-semibold text-white">Webhook</span> = backend calling another backend URL. Never reaches a browser directly — don't use it for this.
      </div>
    </div>
  );
}
