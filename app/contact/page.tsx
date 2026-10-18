import type { Metadata } from 'next';
import PortfolioSubpage from '../_portfolio/_components/PortfolioSubpage';
import { ContactSection } from '../_portfolio/PortfolioSections';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about a project or ask me about my work.',
};

export default function ContactPage() {
  return <PortfolioSubpage planetId="contact"><ContactSection /></PortfolioSubpage>;
}
