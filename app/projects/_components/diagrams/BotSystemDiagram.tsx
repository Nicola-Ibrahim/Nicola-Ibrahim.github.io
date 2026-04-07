"use client";

import { motion } from 'framer-motion';
import { Server, Cpu, Layers, Database, MessageSquare } from 'lucide-react';

export default function BotSystemDiagram() {
  const providers = [
    { name: 'OpenAI', icon: 'GPT-4' },
    { name: 'Anthropic', icon: 'Claude' },
    { name: 'Google', icon: 'Gemini' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-12">
      {/* Top Level: Request */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl"
      >
        <MessageSquare className="w-5 h-5 text-indigo-400" />
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Incoming User Request</span>
      </motion.div>

      {/* Main Orchestrator */}
      <div className="relative w-full flex flex-col items-center">
        <motion.div 
          className="relative z-10 w-full max-w-md bg-dark-lighter border-2 border-indigo-500/20 rounded-[2rem] p-8 shadow-2xl"
          whileHover={{ borderColor: 'rgba(99, 102, 241, 0.4)' }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-tighter">Unified API Hub</h4>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">FastAPI Layer</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group">
              <Layers className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <div className="flex-1">
                <p className="text-[11px] font-bold text-white uppercase">Service Layer (DDD)</p>
                <p className="text-[9px] text-slate-500">Business Logic & Domain Models</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group">
              <Cpu className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
              <div className="flex-1">
                <p className="text-[11px] font-bold text-white uppercase">Asynchronous Worker</p>
                <p className="text-[9px] text-slate-500">Cellery / Task Orchestration</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Database Sidecar */}
        <motion.div 
          className="absolute -right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 p-4 rounded-2xl bg-dark border border-white/5 shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Database className="w-6 h-6 text-slate-600" />
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest vertical-text">PostgreSQL</p>
        </motion.div>
      </div>

      {/* Provider Layer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {providers.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all text-center"
          >
            <div className="p-2 w-fit mx-auto rounded-lg bg-indigo-500/5 text-slate-400 group-hover:text-indigo-400 transition-colors mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h5 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{p.name} Adapter</h5>
            <p className="text-[9px] font-bold text-slate-500">{p.icon} Interface</p>
            
            {/* Connection Line */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-indigo-500/20 to-indigo-500/0" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
