"use client";

import { motion } from 'framer-motion';
import { Target, RefreshCw, Settings, Info, Square, CheckSquare, Zap, Target as TargetIcon } from 'lucide-react';

export default function TraceEngineDiagram() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 w-full max-w-5xl mx-auto font-sans bg-slate-950 rounded-3xl border border-slate-700/50 shadow-2xl">

      {/* 1. Input Section: Target Objective */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4 w-52"
      >
        <div className="relative p-5 rounded-2xl bg-teal-900/40 border border-teal-500/30 text-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.15)]">
          <Target className="w-9 h-9" />
          {/* Subtle ping animation */}
          <span className="absolute top-0 right-0 flex h-3 w-3 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>
        </div>
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-500/80 mb-1">Vector Input</p>
          <h4 className="text-base font-bold text-slate-100">Target Objective</h4>
          <p className="text-[12px] font-mono text-slate-400 mt-1.5 p-1 bg-slate-800 rounded">y_target = [y₁, y₂, ... yₙ]</p>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-500">
            <Info className="w-3 h-3" />
            <span>Target Space (y_target ∈ Y)</span>
          </div>
        </div>
      </motion.div>

      {/* Connection 1: Ingestion Stream */}
      <div className="hidden md:flex flex-1 items-center justify-center relative h-10">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-teal-500/20 via-primary/40 to-primary/20" />
        <motion.div
          animate={{ x: ["-100%", "300%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-14 h-[2px] bg-teal-400 shadow-[0_0_8px_#2dd4bf]"
        />
      </div>

      {/* 2. Core Engine: Detailed Iterative Solver */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative px-8 py-10 rounded-3xl bg-slate-900 border border-slate-700/50 shadow-2xl overflow-hidden group min-w-[340px]"
      >
        <div className="absolute inset-0 bg-blue-500/5 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="text-center">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-100 mb-2">Geometric Solver (Core Engine)</h4>
            <div className="flex gap-2 justify-center mb-3">
              <span className="px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-[9px] font-bold text-slate-300 font-mono">SciPy.Optimize</span>
              <span className="px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-[9px] font-bold text-slate-300 font-mono">NumPy.Linalg</span>
            </div>
          </div>

          {/* Detailed Solver Process Loop */}
          <div className="flex flex-col gap-3.5 w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2.5 text-[11px] text-slate-300">
              <Zap className="w-4 h-4 text-slate-500" />
              <span>Input Normalization (SciPy)</span>
            </div>

            <div className="w-full h-px bg-slate-800" />

            <div className="relative flex items-center justify-center gap-3 w-full h-24 bg-slate-900 rounded-lg border border-slate-800 p-2">
              <div className="flex flex-col gap-2.5 items-center justify-center text-[10px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Square className="w-3 h-3" />
                  <span>Optimize (f(x) minimization)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckSquare className="w-3 h-3 text-blue-400" />
                  <span>Feasibility Check (Rank)</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-2 border-dashed border-blue-600/50 rounded-full"
              />
              <div className="flex flex-col gap-1 items-center justify-center text-[9px] text-blue-300 bg-blue-900/50 px-3 py-1.5 rounded-md border border-blue-800">
                <RefreshCw className="w-6 h-6 animate-pulse" />
                <span>Iteration</span>
              </div>
            </div>

            <div className="w-full h-px bg-slate-800" />

            <div className="flex items-center gap-2.5 text-[11px] text-slate-300">
              <TargetIcon className="w-4 h-4 text-blue-400" />
              <span>Constraint Tightening & Stability Check</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Connection 2: Output Stream */}
      <div className="hidden md:flex flex-1 items-center justify-center relative h-10">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-primary/20 via-primary/40 to-indigo-500/20" />
        <motion.div
          animate={{ x: ["-100%", "300%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.8 }}
          className="absolute left-0 w-14 h-[2px] bg-indigo-400 shadow-[0_0_8px_#818cf8]"
        />
      </div>

      {/* 3. Output Section: Converged Parameters */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col items-center gap-4 w-52"
      >
        <div className="p-5 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
          <Settings className="w-9 h-9" />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400/80 mb-1">Matrix Output</p>
          <h4 className="text-base font-bold text-slate-100">Feasible Parameters</h4>
          <p className="text-[11px] font-mono text-slate-400 mt-1.5 p-1 bg-slate-800 rounded">x* = argmin ||f(x) - y_target||² + λR(x)</p>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-500">
            <Info className="w-3 h-3" />
            <span>Feasibility Space (x* ∈ X)</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}