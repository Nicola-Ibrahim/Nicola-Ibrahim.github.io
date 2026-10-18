import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { ProjectsSection, ServicesSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected software engineering projects and specialized backend, data, and AI integration services by Nicola Ibrahim.',
};

export default function ProjectsPage() {
  return <PortfolioSubpage planetId="projects"><ProjectsSection /><ServicesSection /></PortfolioSubpage>;
}
