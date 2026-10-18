import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { ProjectsSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected software engineering, data, and AI integration projects by Nicola Ibrahim.',
};

export default function ProjectsPage() {
  return <PortfolioSubpage planetId="projects"><ProjectsSection /></PortfolioSubpage>;
}
