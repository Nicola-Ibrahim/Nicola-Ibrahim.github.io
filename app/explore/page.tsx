import type { Metadata } from 'next';
import Link from 'next/link';
import SpaceExplorer from '../_portfolio/_components/SpaceExplorer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Take a look around my work, background, and skills.',
};

export default function ExplorePage() {
  return (
    <main className={styles.page}>
      <Link href="/" className="return-link"><span aria-hidden="true">←</span> Back to home</Link>
      <SpaceExplorer />
    </main>
  );
}
