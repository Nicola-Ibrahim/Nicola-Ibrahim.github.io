import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { SkillsSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Explore Nicola Ibrahim’s software engineering, data, ML, and cloud skills.',
};

export default function SkillsPage() {
  return <PortfolioSubpage><SkillsSection /></PortfolioSubpage>;
}
