import Link from 'next/link';

export default function PortfolioNavigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center h-20">
        <Link href="/" className="text-2xl font-heading font-bold tracking-tighter text-white hover:text-primary transition-colors" aria-label="Nicola Ibrahim, home">
          NI<span className="text-primary">.</span>
        </Link>
      </div>
    </header>
  );
}
