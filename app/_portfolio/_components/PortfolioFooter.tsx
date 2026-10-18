import Link from 'next/link';

export default function PortfolioFooter() {
  return (
    <footer className="py-8 border-t border-white/10 bg-dark-lighter">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-gradient text-2xl font-semibold">Nicola Ibrahim</p>
          <p className="text-gray-500 text-sm">Software engineer building reliable systems.</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/explore" className="text-gray-400 hover:text-white">Explore</Link>
          <Link href="/roadmap" className="text-gray-400 hover:text-white">Roadmap</Link>
          <a href="https://github.com/Nicola-Ibrahim" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-white"><i className="fab fa-github text-xl" aria-hidden="true" /></a>
          <a href="https://linkedin.com/in/nicola-ibrahim/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin text-xl" aria-hidden="true" /></a>
        </div>
      </div>
      <p className="max-w-7xl mx-auto px-6 lg:px-8 text-center mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nicola Ibrahim. All rights reserved.</p>
    </footer>
  );
}
