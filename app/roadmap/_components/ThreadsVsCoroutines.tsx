"use client";

import React from 'react';

export default function ThreadsVsCoroutines() {
  return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 font-sans transition-colors duration-500">
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-200 transition-colors">
      <h4 className="text-center font-bold mb-2 text-slate-900 dark:text-slate-100 uppercase tracking-wide">Threads (sync workers)</h4>
      <p className="text-center text-sm mb-6 text-slate-600 dark:text-slate-400">OS manages switching (preemptive)</p>
      <div className="flex justify-between gap-4 mb-6">
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] shadow-sm uppercase tracking-tight">Thread 1 — req A</div>
          <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-medium text-[10px] shadow-sm">CPU executing</div>
          <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] border border-slate-200 dark:border-transparent uppercase">WAITING for DB</div>
          <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-[10px]">stack kept alive</div>
          <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-[10px]">memory held</div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
           <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] shadow-sm uppercase tracking-tight">Thread 2 — req B</div>
           <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] border border-slate-200 dark:border-transparent uppercase">WAITING for HTTP</div>
           <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-medium text-[10px] shadow-sm">CPU executing</div>
           <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-medium text-[10px] shadow-sm">CPU executing</div>
           <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-[10px]">WAITING stack held</div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4 px-4 leading-relaxed italic">
        OS switches between threads at any point — unpredictably. Each sleeping thread still holds memory + OS resources.
      </p>
    </div>

    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg text-slate-800 dark:text-slate-200 transition-colors">
      <h4 className="text-center font-bold mb-2 text-slate-900 dark:text-slate-100 uppercase tracking-wide">Coroutines (async/await)</h4>
      <p className="text-center text-sm mb-6 text-slate-600 dark:text-slate-400">One thread. You control switching (cooperative)</p>
      <div className="bg-indigo-50 dark:bg-[#eeedfe] text-indigo-900 dark:text-[#3c3489] py-2 px-4 rounded-lg text-center text-[10px] font-black mb-4 border border-indigo-100 dark:border-transparent uppercase tracking-wider">Event loop — single thread, picks next ready coroutine</div>
      <div className="flex justify-between gap-4 mb-6">
         <div className="flex-1 flex flex-col gap-3">
            <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] shadow-sm uppercase">Coro A: running</div>
            <div className="bg-indigo-50 dark:bg-[#eeedfe] text-indigo-900 dark:text-[#3c3489] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] border border-indigo-100 dark:border-transparent uppercase">await DB → PAUSE</div>
            <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-[10px]">suspended cheaply</div>
            <div className="text-center text-[10px] font-black text-indigo-600 dark:text-sky-400 py-1 uppercase tracking-tighter">DB returns → RESUME</div>
            <div className="bg-[#a5d0f3] text-[#0C447C] py-2.5 px-2 text-center rounded-lg font-medium text-[10px] shadow-sm">Coro A: running</div>
         </div>
         <div className="flex-1 flex flex-col gap-3">
            <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-[10px]">Coro B: queued</div>
            <div className="bg-[#9fe1cb] text-[#085041] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] shadow-sm uppercase">Coro B: running</div>
            <div className="bg-indigo-50 dark:bg-[#eeedfe] text-indigo-900 dark:text-[#3c3489] py-2.5 px-2 text-center rounded-lg font-bold text-[10px] border border-indigo-100 dark:border-transparent uppercase">await HTTP → PAUSE</div>
            <div className="bg-slate-100 dark:bg-[#d3d1c7] text-slate-500 dark:text-[#444441] py-2.5 px-2 text-center rounded-lg font-medium text-[10px]">suspended cheaply</div>
            <div className="text-center text-[10px] font-black text-emerald-600 dark:text-emerald-400 py-1 uppercase tracking-tighter">HTTP returns → RESUME</div>
         </div>
      </div>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4 px-4 leading-relaxed italic">
        One thread. Switching only at await. Suspended coroutine costs almost nothing — just a Python object.
      </p>
      </div>
    </div>
  );
}
