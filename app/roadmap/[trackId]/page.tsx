import type { Metadata } from 'next';
import Link from 'next/link';
import { getTrackMeta, getFullRoadmapsData } from '../_lib/mdx';
import { getIcon } from '../_lib/icon-registry';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BookOpenText } from 'lucide-react';
import styles from './track.module.css';

export async function generateStaticParams() {
  const roadmaps = await getFullRoadmapsData();
  return Object.keys(roadmaps).map((trackId) => ({
    trackId: trackId,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ trackId: string }> }): Promise<Metadata> {
  const { trackId } = await params;
  const roadmap = getTrackMeta(trackId);
  if (!roadmap) return { title: 'Track Not Found' };
  
  const title = roadmap.title;
  const description = roadmap.description || `Chapters and study notes on ${roadmap.title}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://nicolaibrahim.github.io/roadmap/${trackId}`,
      siteName: 'Nicola Ibrahim Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function TrackDashboardPage({ params }: { params: Promise<{ trackId: string }> }) {
  const { trackId } = await params;
  const allRoadmaps = await getFullRoadmapsData();
  const track = allRoadmaps[trackId];
  if (!track) notFound();

  return (
    <section className={styles.trackPage}>
      <Link href="/roadmap" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" /> All tracks</Link>
      <header className={styles.trackHero}>
        <div className={styles.trackHeroIcon}>{getIcon(track.icon, 'w-9 h-9')}</div>
        <div>
          <p className={styles.eyebrow}>Engineering notes / track {String(Object.keys(allRoadmaps).indexOf(trackId) + 1).padStart(2, '0')}</p>
          <h1>{track.title}</h1>
          <p className={styles.description}>{track.description || `A collection of chapters on ${track.title.toLowerCase()}.`}</p>
          <p className={styles.chapterCount}><BookOpenText size={16} aria-hidden="true" /> {track.categories.length} chapters</p>
        </div>
      </header>

      <div className={styles.pathHeading}>
        <div>
          <p className={styles.eyebrow}>The path</p>
          <h2>Chapters</h2>
        </div>
        <p>Open any chapter to read its notes.</p>
      </div>
      <div className={styles.chapterPath}>
        {track.categories.map((category, index) => (
          <div key={category.slug} className={styles.chapterStep}>
            <span className={styles.stepMarker} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <Link href={`/roadmap/${trackId}/${category.slug}`} className={styles.chapterCard}>
              <span className={styles.chapterIcon}>{getIcon(category.icon, 'w-5 h-5')}</span>
              <span className={styles.chapterCopy}>
                <strong>{category.title}</strong>
                <span>{category.content.slice(0, 3).map(topic => topic.title).join(' · ') || 'Open chapter notes'}</span>
              </span>
              <span className={styles.chapterMeta}>{category.content.length} topics</span>
              <ArrowUpRight className={styles.chapterArrow} size={20} aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
