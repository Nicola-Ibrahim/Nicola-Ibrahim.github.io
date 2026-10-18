import type { Metadata } from 'next';
import SpaceExplorer from './_components/SpaceExplorer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Take a look around my work, background, and skills.',
};

export default function ExplorePage() {
  return (
    <main className={styles.page}>
      <SpaceExplorer />
    </main>
  );
}
