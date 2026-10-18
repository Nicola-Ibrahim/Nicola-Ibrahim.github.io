import type { Metadata } from 'next';
import Link from 'next/link';
import { getTrackMeta, getFullRoadmapsData } from '../_lib/mdx';
import { notFound } from 'next/navigation';

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
    <section className="max-w-4xl py-4 sm:py-8">
      <Link href="/roadmap" className="text-sm font-medium text-teal-700 dark:text-teal-400 hover:underline">← All tracks</Link>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mt-6 mb-3">{track.title}</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8">{track.categories.length} chapters in this track.</p>
      <div className="grid gap-3">
        {track.categories.map((category, index) => (
          <Link key={category.slug} href={`/roadmap/${trackId}/${category.slug}`} className="group flex items-center gap-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-5 py-4 hover:border-teal-500/50 focus-visible:outline-2 focus-visible:outline-teal-500">
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span className="flex-1 font-medium text-slate-900 dark:text-white">{category.title}</span>
            <span className="text-slate-400 group-hover:text-teal-600" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
