import type { Metadata } from 'next';
import PortfolioSubpage from '../_shared/PortfolioSubpage';
import common from '../_shared/SpaceContent.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Find Nicola Ibrahim on GitHub and LinkedIn, or get in touch by email.',
};

export default function ContactPage() {
  const links = [
    { label: 'GitHub', detail: 'Projects and source code', href: 'https://github.com/Nicola-Ibrahim' },
    { label: 'LinkedIn', detail: 'Professional background and experience', href: 'https://linkedin.com/in/nicola-ibrahim/' },
    { label: 'Email', detail: 'Direct contact', href: 'mailto:nicolaibrahim969@gmail.com' },
  ];
  return <PortfolioSubpage planetId="contact">
    <section className={common.hero} aria-labelledby="contact-title">
      <p className={common.eyebrow}>PROFESSIONAL LINKS</p>
      <h1 id="contact-title" className={common.title}>Find me online.</h1>
      <p className={common.intro}>Explore my repositories, connect on LinkedIn, or reach me by email.</p>
      <div className={styles.links}>{links.map((link, index) => <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={styles.link}>
        <span className={styles.number}>0{index + 1}</span><strong>{link.label}</strong><span className={styles.detail}>{link.detail}</span><span className={styles.arrow} aria-hidden="true">↗</span>
      </a>)}</div>
    </section>
  </PortfolioSubpage>;
}
