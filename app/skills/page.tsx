import type { Metadata } from 'next';
import PortfolioSubpage from '../_shared/PortfolioSubpage';
import { skillGroups } from './_content/data';
import common from '../_shared/SpaceContent.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Tools I have used across backend, data, frontend, and deployment projects.',
};

export default function SkillsPage() {
  return <PortfolioSubpage planetId="skills">
    <section className={common.hero} aria-labelledby="skills-title">
      <p className={common.eyebrow}>TECHNICAL FOCUS</p>
      <h1 id="skills-title" className={common.title}>An evolving<br /> engineering toolkit.</h1>
      <p className={common.intro}>Tools selected to build and run useful software.</p>
      <div className={styles.domains}>{skillGroups.map(domain => <div key={domain.title} className={styles.domain}>
        <span className={styles.accent} aria-hidden="true" />
        <h2>{domain.title}</h2>
        <div className={styles.chips}>{domain.skills.map(skill => <span key={skill.name}><i className={skill.icon} style={{ color: skill.color }} aria-hidden="true" />{skill.name}</span>)}</div>
      </div>)}</div>
    </section>
  </PortfolioSubpage>;
}
