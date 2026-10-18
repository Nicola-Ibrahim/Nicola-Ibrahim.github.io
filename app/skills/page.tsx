import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { SkillsSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Tools I have used across backend, data, frontend, and deployment projects.',
};

export default function SkillsPage() {
  return <PortfolioSubpage planetId="skills"><SkillsSection /></PortfolioSubpage>;
}
