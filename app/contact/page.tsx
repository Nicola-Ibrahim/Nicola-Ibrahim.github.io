import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { ContactSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Nicola Ibrahim about software engineering and ML integration work.',
};

export default function ContactPage() {
  return <PortfolioSubpage><ContactSection /></PortfolioSubpage>;
}
