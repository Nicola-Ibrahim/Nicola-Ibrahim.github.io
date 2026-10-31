import type { Metadata } from 'next';
import PortfolioSubpage from '../_shared/PortfolioSubpage';
import { AboutSection, EducationSection } from './_components/AboutSections';
import { AreasOfWorkSection } from './_components/AreasOfWorkSection';

export const metadata: Metadata = {
  title: 'About',
  description: 'A little about my background, education, and the kind of software I like building.',
};

export default function AboutPage() {
  return <PortfolioSubpage planetId="about"><AboutSection /><AreasOfWorkSection /><EducationSection /></PortfolioSubpage>;
}
