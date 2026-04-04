import { Metadata } from 'next';
import { trackIds, roadmapsData } from '@/content/roadmaps';
import { TrackDashboardView } from '../_components/TrackDashboardView';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return trackIds.map((trackId) => ({
    trackId: trackId,
  }));
}

export async function generateMetadata({ params }: { params: { trackId: string } }): Promise<Metadata> {
  const { trackId } = await params;
  const roadmap = roadmapsData[trackId];
  if (!roadmap) return { title: 'Track Not Found' };
  
  return {
    title: `${roadmap.title.split(' ')[0]} Track | Nicola Ibrahim Academy`,
    description: roadmap.description,
  };
}

export default async function TrackDashboardPage({ params }: { params: { trackId: string } }) {
  const { trackId } = await params;
  const currentRoadmap = roadmapsData[trackId];

  if (!currentRoadmap) {
    notFound();
  }

  return <TrackDashboardView trackId={trackId} currentRoadmap={currentRoadmap} />;
}
