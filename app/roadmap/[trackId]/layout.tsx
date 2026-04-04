import React from 'react';
import { getFullRoadmapsData } from '../_lib/mdx';
import { RoadmapSidebar } from '../_components/layout/RoadmapSidebar';

export default async function TrackLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { trackId: string; categorySlug?: string };
}) {
  const { trackId, categorySlug } = await params;
  const roadmapsData = await getFullRoadmapsData();
  const roadmaps = Object.values(roadmapsData);
  const activeTab = trackId || 'ai_agents';

  return (
    <div className="flex gap-8 xl:gap-12">
      {/* 1. LEFT SIDEBAR (Track Selector) */}
      <RoadmapSidebar 
        roadmaps={roadmaps as any}
        activeTab={activeTab}
        activeCategory={categorySlug}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 pb-32">
        {children}
      </div>
    </div>
  );
}
