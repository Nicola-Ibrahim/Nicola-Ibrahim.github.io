import type { Metadata } from 'next';
import Link from 'next/link';
import SpaceExplorer from '../_portfolio/_components/SpaceExplorer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Explore in Space',
  description: 'Explore Nicola Ibrahim’s portfolio through an interactive map of projects, skills, services, and more.',
};

export default function ExplorePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Nicola Ibrahim, home">NI<span>.</span></Link>
        <Link href="/" className={styles.back}><span aria-hidden="true">←</span> Back to portfolio</Link>
      </header>
      <SpaceExplorer />
    </main>
  );
}
