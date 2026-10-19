import Link from 'next/link';
import { ArrowUpRight, Compass, Layers3 } from 'lucide-react';
import { getFullRoadmapsData } from './_lib/mdx';
import { getIcon } from './_lib/icon-registry';
import styles from './overview.module.css';

export default async function RoadmapPage() {
  const roadmaps = Object.values(await getFullRoadmapsData());
  const chapterCount = roadmaps.reduce((total, track) => total + track.categories.length, 0);

  return (
    <section className={styles.overview}>
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><Compass size={15} aria-hidden="true" /> Engineering notes / field guide</p>
          <h1>Find your way <span>through the stack.</span></h1>
          <p className={styles.intro}>A map of technical notes across software engineering. Pick a track, then open a chapter to follow the ideas in more detail.</p>
          <div className={styles.heroStats} aria-label="Roadmap contents">
            <span><strong>{String(roadmaps.length).padStart(2, '0')}</strong> tracks</span>
            <span><strong>{String(chapterCount).padStart(2, '0')}</strong> chapters</span>
            <span><Layers3 size={16} aria-hidden="true" /> Topics connected across disciplines</span>
          </div>
        </div>
        <div className={styles.orbit} aria-hidden="true">
          <div className={styles.orbitRing} />
          <div className={styles.orbitRingInner} />
          <div className={styles.orbitCore}><span>THE</span><strong>MAP</strong></div>
          {roadmaps.slice(0, 6).map((track, index) => (
            <span key={track.id} className={`${styles.orbitNode} ${styles[`orbitNode${index}`]}`}>
              {getIcon(track.icon, 'w-5 h-5')}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.sectionHeading}>
        <div>
          <p className={styles.eyebrow}>Explore by discipline</p>
          <h2>Choose a track</h2>
        </div>
        <p>Each track is a short collection of chapters.</p>
      </div>

      <div className={styles.trackGrid}>
        {roadmaps.map((track, index) => (
          <Link key={track.id} href={`/roadmap/${track.id}`} className={styles.trackCard}>
            <span className={styles.trackTop}>
              <span className={styles.trackIcon}>{getIcon(track.icon, 'w-6 h-6')}</span>
              <span className={styles.trackNumber}>{String(index + 1).padStart(2, '0')} / {String(roadmaps.length).padStart(2, '0')}</span>
            </span>
            <span className={styles.trackBody}>
              <strong>{track.title}</strong>
              <span className={styles.trackPreview}>{track.categories.slice(0, 3).map(category => category.title).join(' · ')}</span>
            </span>
            <span className={styles.trackBottom}>
              <span>{track.categories.length} chapters</span>
              <span className={styles.trackArrow}><ArrowUpRight size={18} aria-hidden="true" /></span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
