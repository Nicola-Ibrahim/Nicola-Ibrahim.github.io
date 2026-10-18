import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { AboutSection, EducationSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Nicola Ibrahim’s software engineering background, education, and approach.',
};

export default function AboutPage() {
  return <PortfolioSubpage><AboutSection /><EducationSection /></PortfolioSubpage>;
}
