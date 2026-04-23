import type { Metadata } from "next";
import { Header } from './_components/layout/Header';

export const metadata: Metadata = {
  title: "Technical Roadmaps | Nicola Ibrahim",
  description: "Comprehensive, interactive technical roadmaps for Mastering AI Agents, Backend Architecture, DevOps, and Algorithms.",
};

export default async function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-dark text-slate-900 dark:text-slate-200 font-sans selection:bg-teal-500/30 pb-20 transition-colors duration-500">
      <Header />

      {/* Main Content Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <div className="flex gap-10">
          {/* Children (The Content) */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
      
      {/* Footer Branding */}
      <footer className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200 dark:border-white/5 text-center relative z-10 mt-20">
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
