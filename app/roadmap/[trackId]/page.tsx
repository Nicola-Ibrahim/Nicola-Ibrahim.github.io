import { Metadata } from 'next';
import { getTrackMeta, getFullRoadmapsData } from '../_lib/mdx';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
  const roadmaps = await getFullRoadmapsData();
  return Object.keys(roadmaps).map((trackId) => ({
    trackId: trackId,
  }));
}

export async function generateMetadata({ params }: { params: { trackId: string } }): Promise<Metadata> {
  const { trackId } = await params;
  const roadmap = getTrackMeta(trackId);
  if (!roadmap) return { title: 'Track Not Found' };
  
  return {
    title: `${roadmap.title.split(' ')[0]} Track | Nicola Ibrahim Academy`,
    description: roadmap.description,
  };
}

export default async function TrackDashboardPage({ params }: { params: { trackId: string } }) {
  const { trackId } = await params;
  const currentRoadmap = await getTrackMeta(trackId);

  if (!currentRoadmap) {
    notFound();
  }

  const allRoadmaps = await getFullRoadmapsData();
  const track = allRoadmaps[trackId];
  const firstCategory = track?.categories[0];
  
  if (firstCategory) {
    redirect(`/roadmap/${trackId}/${firstCategory.slug}`);
  }

  return notFound();
}
