"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Key, Lock, Activity, RefreshCw } from 'lucide-react';

export default function IAMServiceDiagram() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-12">
      {/* Auth Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center">
        
        {/* User Auth */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 group"
        >
          <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-all">
            <UserCheck className="w-7 h-7" />
          </div>
          <div className="text-center">
            <h5 className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-2">Credentials Auth</h5>
            <p className="text-[9px] text-slate-500 uppercase font-black">DRF Authentication</p>
          </div>
        </motion.div>

        {/* Central Gatekeeper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative px-8 py-10 rounded-3xl bg-dark-lighter border-2 border-emerald-500/20 shadow-2xl flex flex-col items-center gap-6"
        >
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl opacity-50" />
          <div className="relative z-10 p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-500">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div className="relative z-10 text-center">
            <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-1">Central Identity Hub</h4>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Stateless Gatekeeper</p>
          </div>
          
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              />
            ))}
          </div>
        </motion.div>

        {/* JWT Issuance */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 group"
        >
          <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-all">
            <Key className="w-7 h-7" />
          </div>
          <div className="text-center">
            <h5 className="text-[11px] font-black text-white uppercase tracking-widest leading-none mb-2">Signed JWT</h5>
            <p className="text-[9px] text-slate-500 uppercase font-black">Stateless Claims</p>
          </div>
        </motion.div>
      </div>

      {/* Security Operations */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-12">
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center gap-6 p-6 rounded-2xl bg-dark border border-white/5 group"
        >
          <div className="p-4 rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Revocation Blocklist</h5>
            <p className="text-[10px] text-slate-500 leading-relaxed">Redis-backed JTI tracking for absolute session control</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ x: -5 }}
          className="flex items-center gap-6 p-6 rounded-2xl bg-dark border border-white/5 group"
        >
          <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500 group-hover:rotate-180 transition-transform duration-700">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Token Verification</h5>
            <p className="text-[10px] text-slate-500 leading-relaxed">Centralized secret distribution across external services</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
