import { Metadata } from 'next';
import { trackIds, roadmapsData } from '@/content/roadmaps';
import { ModulePageView } from '../../_components/ModulePageView';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const params: { trackId: string; categorySlug: string }[] = [];

  trackIds.forEach((trackId) => {
    const roadmap = roadmapsData[trackId];
    if (roadmap) {
      roadmap.categories.forEach((category) => {
        params.push({
          trackId: trackId,
          categorySlug: category.slug,
        });
      });
    }
  });

  return params;
}

export async function generateMetadata({ params }: { params: { trackId: string; categorySlug: string } }): Promise<Metadata> {
  const { trackId, categorySlug } = await params;
  const roadmap = roadmapsData[trackId];
  if (!roadmap) return { title: 'Track Not Found' };
  
  const category = roadmap.categories.find(c => c.slug === categorySlug);
  if (!category) return { title: 'Module Not Found' };

  return {
    title: `${category.title.split(':')[1]?.trim() || category.title} - ${roadmap.title.split(' ')[0]} Track | Nicola Ibrahim Academy`,
    description: `Deep dive into ${category.title} within the ${roadmap.title}.`,
  };
}

export default async function ModulePage({ params }: { params: { trackId: string; categorySlug: string } }) {
  const { trackId, categorySlug } = await params;
  const currentRoadmap = roadmapsData[trackId];

  if (!currentRoadmap) {
    notFound();
  }

  const category = currentRoadmap.categories.find(c => c.slug === categorySlug);
  if (!category) {
    notFound();
  }

  return <ModulePageView trackId={trackId} category={category} currentRoadmap={currentRoadmap} />;
}
