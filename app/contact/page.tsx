import type { Metadata } from 'next';
import PortfolioSubpage from '../_shared/PortfolioSubpage';
import { ContactSection } from './_components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about a project or ask me about my work.',
};

export default function ContactPage() {
  return <PortfolioSubpage planetId="contact"><ContactSection /></PortfolioSubpage>;
}
