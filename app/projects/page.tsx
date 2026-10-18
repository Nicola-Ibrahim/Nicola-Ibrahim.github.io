import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { ProjectsSection, ServicesSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A project I built and the backend, data, and AI integration work I enjoy doing.',
};

export default function ProjectsPage() {
  return <PortfolioSubpage planetId="projects"><ProjectsSection /><ServicesSection /></PortfolioSubpage>;
}
