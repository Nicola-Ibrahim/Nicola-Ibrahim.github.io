import type { Metadata } from 'next';
import PortfolioSubpage from '../_shared/PortfolioSubpage';
import { ProjectsSection } from './_components/WorkSections';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Projects across backend development, optimization, data, AI integration, and deployment.',
};

export default function ProjectsPage() {
  return <PortfolioSubpage planetId="projects"><div className={styles.work}><ProjectsSection /></div></PortfolioSubpage>;
}
