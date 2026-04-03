"use client";

import React from 'react';

export default function ThreadsVsCoroutines() {
  return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 font-sans">
    <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-slate-700 shadow-lg text-slate-200">
      <h4 className="text-center font-bold mb-2 text-slate-100">Threads (sync workers)</h4>
      <p className="text-center text-sm mb-6 text-slate-400">OS manages switching (preemptive)</p>
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">Thread 1 — req A</div>
          <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">CPU executing</div>
          <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">WAITING for DB</div>
          <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">stack kept alive</div>
          <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">memory held</div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
           <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">Thread 2 — req B</div>
           <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">WAITING for HTTP</div>
           <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">CPU executing</div>
           <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">CPU executing</div>
           <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">WAITING stack held</div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400 border-t border-slate-700 pt-4 px-4 leading-relaxed">
        OS switches between threads at any point — unpredictably. Each sleeping thread still holds memory + OS resources.
      </p>
    </div>

    <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-slate-700 shadow-lg text-slate-200">
      <h4 className="text-center font-bold mb-2 text-slate-100">Coroutines (async/await)</h4>
      <p className="text-center text-sm mb-6 text-slate-400">One thread. You control switching (cooperative)</p>
      <div className="bg-[#eeedfe] text-[#3c3489] py-2 px-4 rounded-lg text-center text-xs font-bold mb-4 shadow-inner">Event loop — single thread, picks next ready coroutine</div>
      <div className="flex justify-between gap-4 mb-6">
         <div className="flex-1 flex flex-col gap-3">
            <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">Coro A: running</div>
            <div className="bg-[#eeedfe] text-[#3c3489] py-2.5 px-2 text-center rounded-lg font-medium text-xs">await DB → PAUSE</div>
            <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">suspended cheaply</div>
            <div className="text-center text-xs font-bold text-sky-400 py-1">DB returns → RESUME</div>
            <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">Coro A: running</div>
         </div>
         <div className="flex-1 flex flex-col gap-3">
            <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">Coro B: queued</div>
            <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-medium text-xs shadow-inner">Coro B: running</div>
            <div className="bg-[#eeedfe] text-[#3c3489] py-2.5 px-2 text-center rounded-lg font-medium text-xs">await HTTP → PAUSE</div>
            <div className="bg-[#d3d1c7] text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-xs">suspended cheaply</div>
            <div className="text-center text-xs font-bold text-emerald-400 py-1">HTTP returns → RESUME</div>
         </div>
      </div>
      <p className="text-center text-xs text-slate-400 border-t border-slate-700 pt-4 px-4 leading-relaxed">
        One thread. Switching only at await. Suspended coroutine costs almost nothing — just a Python object.
      </p>
      </div>
    </div>
  );
}
