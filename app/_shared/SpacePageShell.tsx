import Image from 'next/image';
import type { ReactNode } from 'react';
import TransitionLink from './TransitionLink';
import styles from './SpacePageShell.module.css';

type World = 'projects' | 'about' | 'skills' | 'contact';

const scenes: Record<World, string> = {
  projects: '/images/space/work-blue.png',
  about: '/images/space/about-teal.png',
  skills: '/images/space/skills-purple.png',
  contact: '/images/space/contact-amber.png',
};

const links = [
  { href: '/about', label: 'About', id: 'about' },
  { href: '/projects', label: 'Work', id: 'projects' },
  { href: '/skills', label: 'Skills', id: 'skills' },
  { href: '/contact', label: 'Contact', id: 'contact' },
] as const;

const particlePositions = [
  [8, 16], [17, 48], [26, 27], [35, 69], [44, 13], [53, 39],
  [62, 75], [71, 22], [80, 54], [89, 12], [95, 72], [12, 82],
  [30, 92], [48, 57], [67, 8], [84, 88], [5, 61], [57, 91],
] as const;

export function SpaceNav({ active }: { active?: World }) {
  return <header className={styles.header}>
    <div className={styles.brand}><TransitionLink href="/" aria-label="Nicola Ibrahim home">N / I</TransitionLink><span>SOFTWARE ENGINEER</span></div>
    <nav aria-label="Main navigation" className={styles.nav}>
      {links.map(link => <TransitionLink key={link.id} href={link.href} aria-current={active === link.id ? 'page' : undefined} className={active === link.id ? styles.active : undefined}>{link.label}</TransitionLink>)}
    </nav>
  </header>;
}

export default function SpacePageShell({ world, children }: { world: World; children: ReactNode }) {
  return <div className={styles.page} data-world={world}>
    <div className={styles.scene} aria-hidden="true"><Image src={scenes[world]} alt="" fill priority sizes="100vw" className={styles.sceneImage} /></div>
    <div className={styles.fade} aria-hidden="true" />
    <div className={styles.particles} aria-hidden="true">
      {particlePositions.map(([left, top], index) => <span key={index} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * -0.7}s`, animationDuration: `${5 + index % 5}s` }} />)}
    </div>
    <div className={styles.content}>
      <SpaceNav active={world} />
      <main>{children}</main>
      {(world === 'about' || world === 'projects') && <footer className={styles.siteFooter}><TransitionLink href="/roadmap">Roadmap</TransitionLink></footer>}
    </div>
  </div>;
}
