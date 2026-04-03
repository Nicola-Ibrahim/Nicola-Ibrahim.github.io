"use client";

import React, { useState, useEffect } from 'react';

export default function EventLoopStepper() {
  const [cur, setCur] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stepsData = [
    {
      title: "Step 1 — two requests arrive, two coroutines created",
      note: "When FastAPI receives two HTTP requests simultaneously, it creates two coroutine objects — Coro A (req A) and Coro B (req B). Neither has started yet. Both sit in the event loop's ready queue.",
      els: [
        { x: 260, y: 10, w: 160, h: 50, bg: "#EEEDFE", border: "#534AB7", text: "Event loop", sub: "single OS thread", tc: "#3C3489", sc: "#534AB7" },
        { x: 260, y: 80, w: 160, h: 50, bg: "#f1f5f9", border: "#cbd5e1", text: "Ready queue", sub: "", tc: "#0f172a", sc: "" },
        { x: 100, y: 80, w: 130, h: 44, bg: "#B5D4F4", border: "#185FA5", text: "Coro A", sub: "req A · not started", tc: "#0C447C", sc: "#185FA5" },
        { x: 450, y: 80, w: 130, h: 44, bg: "#9FE1CB", border: "#0F6E56", text: "Coro B", sub: "req B · not started", tc: "#085041", sc: "#0F6E56" },
      ],
      arrows: [
        { x1: 230, y1: 102, x2: 262, y2: 102, c: "#185FA5" },
        { x1: 450, y1: 102, x2: 420, y2: 102, c: "#0F6E56" },
      ]
    },
    {
      title: "Step 2 — event loop picks Coro A, runs it until first await",
      note: "The loop dequeues Coro A and starts executing it synchronously. Code runs normally — validate input, call the application layer — until it hits 'await repo.get_by_user()'. That's the yield point.",
      els: [
        { x: 260, y: 10, w: 160, h: 50, bg: "#EEEDFE", border: "#534AB7", text: "Event loop", sub: "running Coro A", tc: "#3C3489", sc: "#534AB7" },
        { x: 260, y: 80, w: 160, h: 60, bg: "#B5D4F4", border: "#185FA5", text: "Coro A — RUNNING", sub: "validate → app layer →", tc: "#0C447C", sc: "#185FA5" },
        { x: 260, y: 148, w: 160, h: 36, bg: "#EEEDFE", border: "#534AB7", text: "hits await repo.get()", sub: "", tc: "#3C3489", sc: "#534AB7" },
        { x: 500, y: 80, w: 130, h: 44, bg: "#9FE1CB", border: "#0F6E56", text: "Coro B", sub: "still queued", tc: "#085041", sc: "#0F6E56" },
      ],
      arrows: [
        { x1: 420, y1: 110, x2: 496, y2: 102, c: "#888780" },
      ]
    },
    {
      title: "Step 3 — Coro A suspends, kernel takes over the I/O",
      note: "At 'await', Coro A registers its DB socket with the OS kernel via epoll/kqueue (Python's selector). Coro A is now SUSPENDED — stored as a Python object in a 'waiting' dict. The event loop moves on immediately. No thread is blocked.",
      els: [
        { x: 255, y: 10, w: 170, h: 50, bg: "#EEEDFE", border: "#534AB7", text: "Event loop", sub: "Coro A suspended", tc: "#3C3489", sc: "#534AB7" },
        { x: 60, y: 80, w: 150, h: 50, bg: "#D3D1C7", border: "#888780", text: "Coro A — PAUSED", sub: "waiting for DB socket", tc: "#444441", sc: "#888780" },
        { x: 60, y: 148, w: 150, h: 44, bg: "#FAEEDA", border: "#854F0B", text: "OS kernel / epoll", sub: "watching DB socket", tc: "#633806", sc: "#854F0B" },
        { x: 60, y: 206, w: 150, h: 40, bg: "#f1f5f9", border: "#cbd5e1", text: "PostgreSQL", sub: "query running", tc: "#0f172a", sc: "#64748b" },
        { x: 460, y: 80, w: 150, h: 50, bg: "#9FE1CB", border: "#0F6E56", text: "Coro B — READY", sub: "loop picks it next", tc: "#085041", sc: "#0F6E56" },
      ],
      arrows: [
        { x1: 210, y1: 105, x2: 257, y2: 40, c: "#888780" },
        { x1: 135, y1: 130, x2: 135, y2: 146, c: "#854F0B" },
        { x1: 135, y1: 192, x2: 135, y2: 204, c: "#888780" },
        { x1: 425, y1: 100, x2: 457, y2: 100, c: "#0F6E56" },
      ]
    },
    {
      title: "Step 4 — event loop runs Coro B while Coro A waits",
      note: "The event loop picks Coro B from the ready queue and runs it. Coro A is asleep — consuming no CPU. This is the concurrency: one thread, two coroutines making progress interleaved in time.",
      els: [
        { x: 255, y: 10, w: 170, h: 50, bg: "#EEEDFE", border: "#534AB7", text: "Event loop", sub: "now running Coro B", tc: "#3C3489", sc: "#534AB7" },
        { x: 60, y: 80, w: 150, h: 44, bg: "#D3D1C7", border: "#888780", text: "Coro A — asleep", sub: "zero CPU used", tc: "#444441", sc: "#888780" },
        { x: 460, y: 80, w: 150, h: 60, bg: "#9FE1CB", border: "#0F6E56", text: "Coro B — RUNNING", sub: "validate → use case →", tc: "#085041", sc: "#0F6E56" },
        { x: 460, y: 148, w: 150, h: 36, bg: "#EEEDFE", border: "#534AB7", text: "hits await http.get()", sub: "", tc: "#3C3489", sc: "#534AB7" },
        { x: 60, y: 140, w: 150, h: 36, bg: "#FAEEDA", border: "#854F0B", text: "OS: DB query still running", sub: "", tc: "#633806", sc: "#854F0B" },
      ],
      arrows: [
        { x1: 210, y1: 102, x2: 257, y2: 40, c: "#888780" },
        { x1: 410, y1: 102, x2: 257, y2: 40, c: "#0F6E56" },
      ]
    },
    {
      title: "Step 5 — OS signals: DB socket is ready (Coro A's data arrived)",
      note: "The kernel signals the event loop: the DB socket has data. The loop pulls Coro A out of its 'waiting' dict and puts it back in the ready queue. Coro A doesn't resume yet — the loop finishes its current tick first.",
      els: [
        { x: 255, y: 10, w: 170, h: 50, bg: "#EEEDFE", border: "#534AB7", text: "Event loop", sub: "got kernel signal", tc: "#3C3489", sc: "#534AB7" },
        { x: 60, y: 80, w: 150, h: 50, bg: "#FAC775", border: "#854F0B", text: "Coro A — READY", sub: "DB data arrived", tc: "#633806", sc: "#854F0B" },
        { x: 60, y: 148, w: 150, h: 36, bg: "#FAEEDA", border: "#854F0B", text: "epoll: socket readable", sub: "", tc: "#633806", sc: "#854F0B" },
        { x: 460, y: 80, w: 150, h: 44, bg: "#D3D1C7", border: "#888780", text: "Coro B — asleep", sub: "waiting HTTP", tc: "#444441", sc: "#888780" },
      ],
      arrows: [
        { x1: 135, y1: 130, x2: 260, y2: 38, c: "#854F0B" },
        { x1: 135, y1: 148, x2: 135, y2: 130, c: "#854F0B" },
      ]
    },
    {
      title: "Step 6 — Coro A resumes exactly where it paused",
      note: "The loop picks Coro A again. Execution resumes at the line after 'await' — the DB rows are now in the local variable. Coro A continues: build domain object, call pricing port, hits another await if needed.",
      els: [
        { x: 255, y: 10, w: 170, h: 50, bg: "#EEEDFE", border: "#534AB7", text: "Event loop", sub: "resuming Coro A", tc: "#3C3489", sc: "#534AB7" },
        { x: 60, y: 80, w: 150, h: 80, bg: "#B5D4F4", border: "#185FA5", text: "Coro A — RUNNING", sub: "rows = [...]  ← resumed here", tc: "#0C447C", sc: "#185FA5" },
        { x: 60, y: 170, w: 150, h: 36, bg: "#B5D4F4", border: "#185FA5", text: "domain logic (sync)", sub: "", tc: "#0C447C", sc: "#185FA5" },
        { x: 460, y: 80, w: 150, h: 44, bg: "#D3D1C7", border: "#888780", text: "Coro B — still asleep", sub: "waiting HTTP", tc: "#444441", sc: "#888780" },
      ],
      arrows: [
        { x1: 210, y1: 120, x2: 257, y2: 40, c: "#185FA5" },
      ]
    },
    {
      title: "Step 7 — both coroutines finish, responses sent",
      note: "Eventually both coroutines run to completion. Each returns a response object to FastAPI which sends the HTTP response. Total time ≈ max(slowest I/O call) — not the sum of all I/O calls. One OS thread served two requests concurrently.",
      els: [
        { x: 255, y: 10, w: 170, h: 50, bg: "#EEEDFE", border: "#534AB7", text: "Event loop", sub: "idle — waiting for next req", tc: "#3C3489", sc: "#534AB7" },
        { x: 60, y: 90, w: 150, h: 44, bg: "#f0fdf4", border: "#16a34a", text: "Coro A — DONE", sub: "response sent", tc: "#16a34a", sc: "#15803d" },
        { x: 460, y: 90, w: 150, h: 44, bg: "#f0fdf4", border: "#16a34a", text: "Coro B — DONE", sub: "response sent", tc: "#16a34a", sc: "#15803d" },
        { x: 175, y: 160, w: 330, h: 60, bg: "#f8fafc", border: "#cbd5e1", text: "One thread. Two requests handled.", sub: "Total time ≈ slowest I/O, not sum of all I/O", tc: "#0f172a", sc: "#475569" },
      ],
      arrows: []
    }
  ];

  const s = stepsData[cur];
  const uniqueColors = Array.from(new Set(s.arrows.map(a => a.c)));

  if (!mounted) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8 font-sans">
      <div className="font-bold text-slate-800 mb-1 text-[15px]">{s.title}</div>
      <div className="text-[13px] text-slate-600 mb-6 leading-relaxed min-h-[40px]">{s.note}</div>
      
      <div className="relative w-full overflow-x-auto bg-slate-50/50 rounded-xl border border-slate-100 p-2">
        <svg width="680" height="260" viewBox="0 0 680 260" className="mx-auto block" style={{ maxWidth: '100%', height: 'auto' }}>
          <defs>
            {uniqueColors.map(color => (
              <marker 
                key={color} 
                id={`arr-${color.replace('#', '')}`} 
                viewBox="0 0 10 10" 
                refX="8" 
                refY="5" 
                markerWidth="6" 
                markerHeight="6" 
                orient="auto-start-reverse"
              >
                <path d="M2 1L8 5L2 9" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            ))}
          </defs>
          
          {s.arrows.map((a, i) => (
            <line 
              key={i} 
              x1={a.x1} y1={a.y1} 
              x2={a.x2} y2={a.y2} 
              stroke={a.c} 
              strokeWidth="1.5" 
              markerEnd={`url(#arr-${a.c.replace('#', '')})`} 
            />
          ))}
          
          {s.els.map((e, i) => {
            const cx = e.x + e.w / 2;
            const cy = e.y + e.h / 2;
            return (
              <g key={i}>
                <rect x={e.x} y={e.y} width={e.w} height={e.h} rx="8" fill={e.bg} stroke={e.border} strokeWidth="1" />
                <text x={cx} y={e.sub ? cy - 8 : cy} textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="600" fill={e.tc} fontFamily="inherit">
                  {e.text}
                </text>
                {e.sub && (
                  <text x={cx} y={cy + 12} textAnchor="middle" dominantBaseline="central" fontSize="11" fill={e.sc} fontFamily="inherit">
                    {e.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex gap-3 items-center justify-between mt-6">
        <button 
          onClick={() => setCur(c => (c - 1 + stepsData.length) % stepsData.length)} 
          className="px-5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-lg transition-colors shadow-sm"
        >
          Previous
        </button>
        <span className="text-sm font-bold text-slate-400 tracking-widest bg-slate-100 px-3 py-1 rounded-full">
          {cur + 1} / {stepsData.length}
        </span>
        <button 
          onClick={() => setCur(c => (c + 1) % stepsData.length)} 
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
