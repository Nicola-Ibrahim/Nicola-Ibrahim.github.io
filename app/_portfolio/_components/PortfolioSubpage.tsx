import Link from 'next/link';
import type { ReactNode } from 'react';
import PortfolioNavigation from './PortfolioNavigation';
import PortfolioFooter from './PortfolioFooter';
import styles from './PortfolioSubpage.module.css';

export default function PortfolioSubpage({ children }: { children: ReactNode }) {
  return (
    <div className="dark text-light min-h-screen flex flex-col">
      <PortfolioNavigation />
      <main className={`flex-1 pt-20 ${styles.arrival}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-10">
          <Link href="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors"><span aria-hidden="true">←</span> Back to space</Link>
        </div>
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}
