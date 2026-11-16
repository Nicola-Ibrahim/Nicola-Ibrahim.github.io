import type { Metadata } from 'next';
import PortfolioSubpage from '../_shared/PortfolioSubpage';
import common from '../_shared/SpaceContent.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about a project or ask me about my work.',
};

export default function ContactPage() {
  const links = [
    { label: 'GitHub', detail: 'github.com/Nicola-Ibrahim', href: 'https://github.com/Nicola-Ibrahim' },
    { label: 'LinkedIn', detail: 'linkedin.com/in/nicola-ibrahim', href: 'https://linkedin.com/in/nicola-ibrahim/' },
    { label: 'Email', detail: 'nicolaibrahim969@gmail.com', href: 'mailto:nicolaibrahim969@gmail.com' },
  ];
  return <PortfolioSubpage planetId="contact">
    <section className={common.hero} aria-labelledby="contact-title">
      <p className={common.eyebrow}>LINKS</p>
      <h1 id="contact-title" className={common.title}>Connect through<br /> my work.</h1>
      <p className={common.intro}>Projects, repositories, and professional background.</p>
      <div className={styles.links}>{links.map((link, index) => <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={styles.link}>
        <span className={styles.number}>0{index + 1}</span><strong>{link.label}</strong><span className={styles.detail}>{link.detail}</span><span className={styles.arrow} aria-hidden="true">↗</span>
      </a>)}</div>
    </section>
  </PortfolioSubpage>;
}
