"use client";

import { motion } from 'framer-motion';
import { Target, Search, Settings } from 'lucide-react';

export default function TraceEngineDiagram() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4 w-full max-w-4xl mx-auto">
      {/* Input Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-500 shadow-lg shadow-teal-500/5">
          <Target className="w-8 h-8" />
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-500/60 mb-1">Input</p>
          <h4 className="text-sm font-bold text-white tracking-tight">Target Objective</h4>
        </div>
      </motion.div>

      {/* Connection 1 */}
      <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-teal-500/20 via-primary/40 to-primary/20 relative">
        <motion.div 
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] bg-primary shadow-[0_0_10px_#14b8a6]"
        />
      </div>

      {/* Core Logic Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative px-8 py-10 rounded-3xl bg-dark-lighter border border-white/10 shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="p-6 rounded-full bg-primary/20 border border-primary/30 text-primary animate-pulse">
            <Search className="w-10 h-10" />
          </div>
          <div className="text-center">
            <h4 className="text-base font-black uppercase tracking-widest text-white mb-2">Geometric Search Layer</h4>
            <div className="flex gap-2 justify-center">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold text-slate-400">NUMPY</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-bold text-slate-400">SCIPY</span>
            </div>
            <p className="mt-4 text-[10px] text-slate-500 max-w-[180px] leading-relaxed">Dynamic mapping of non-linear parameter feasibility spaces</p>
          </div>
        </div>
      </motion.div>

      {/* Connection 2 */}
      <div className="hidden md:block flex-1 h-[2px] bg-gradient-to-r from-primary/20 via-primary/40 to-teal-500/20 relative">
        <motion.div 
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-[2px] bg-teal-500 shadow-[0_0_10px_#14b8a6]"
        />
      </div>

      {/* Output Section */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white shadow-lg">
          <Settings className="w-8 h-8" />
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Output</p>
          <h4 className="text-sm font-bold text-white tracking-tight">Converged Parameters</h4>
        </div>
      </motion.div>
    </div>
  );
}
