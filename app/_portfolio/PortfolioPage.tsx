import Link from 'next/link';
import BlackholeCanvas from './_components/BlackholeCanvas';
import PortfolioNavigation from './_components/PortfolioNavigation';

export default function PortfolioPage() {
  return (
    <div className="dark text-light min-h-screen">
      <PortfolioNavigation />
      <main>
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <BlackholeCanvas />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.24em] text-primary mb-6">Software Engineer</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I&apos;m <br /><span className="text-gradient">Nicola Ibrahim</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              I build backend systems and integrate data and AI capabilities into practical software.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-outline inline-flex items-center">Get in touch</Link>
            </div>
            <div className="mt-8">
              <Link href="/explore" className="inline-flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-200 hover:text-white transition-colors group">
                <span className="w-8 h-8 rounded-full border border-primary/60 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors" aria-hidden="true">✦</span>
                Explore in space
                <span className="text-primary group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
