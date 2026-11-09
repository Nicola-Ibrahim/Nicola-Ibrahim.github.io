import type { Metadata } from 'next';
import PortfolioSubpage from '../_shared/PortfolioSubpage';
import { ProjectsSection } from './_components/WorkSections';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Projects across backend development, optimization, data, AI integration, and deployment.',
};

export default function ProjectsPage() {
  return <PortfolioSubpage planetId="projects"><ProjectsSection /></PortfolioSubpage>;
}
