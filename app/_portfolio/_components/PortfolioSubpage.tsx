import Link from 'next/link';
import type { ReactNode } from 'react';
import PortfolioFooter from './PortfolioFooter';
import type { SpaceDestination } from './spaceDestinations';
import styles from './PortfolioSubpage.module.css';

export default function PortfolioSubpage({ children, planetId }: { children: ReactNode; planetId: SpaceDestination['id'] }) {
  return (
    <div className="dark text-light min-h-screen flex flex-col">
      <Link href={`/explore?planet=${planetId}`} className="return-link return-link--page"><span aria-hidden="true">←</span> Back to space</Link>
      <main className={`flex-1 pt-20 ${styles.arrival}`}>
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}
