import type { Metadata } from "next";
import Link from 'next/link';
import { Terminal, ArrowLeft, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const metadata: Metadata = {
  title: "Technical Roadmaps | Nicola Ibrahim",
  description: "Comprehensive, interactive technical roadmaps for Mastering AI Agents, Backend Architecture, DevOps, and Algorithms.",
};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-indigo-500/30 pb-20 transition-colors duration-500">
      
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/5 dark:bg-indigo-600/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/5 dark:bg-violet-600/5 blur-[120px]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full bg-slate-50/50 dark:bg-slate-900/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 sticky top-0 z-20 transition-colors duration-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title="Back to Portfolio"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/10">
                  <Terminal className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Nicola<span className="text-indigo-600 dark:text-indigo-400"> Academy</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
      
      {/* Footer Branding */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-white/5 text-center relative z-10">
        <p className="text-slate-500 text-sm font-medium">
          Study Reference Site • Built with Next.js & Framer Aesthetics
        </p>
        <p className="text-slate-600 text-xs mt-2 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Nicola Ibrahim
        </p>
      </footer>
    </div>
  );
}
