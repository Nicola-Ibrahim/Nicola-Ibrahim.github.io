import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { ServicesSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Backend systems, ML and AI integration, cloud delivery, and automation by Nicola Ibrahim.',
};

export default function ServicesPage() {
  return <PortfolioSubpage><ServicesSection /></PortfolioSubpage>;
}
