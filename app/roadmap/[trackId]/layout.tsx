import React from 'react';
import { getFullRoadmapsData } from '../_lib/mdx';
import { Sidebar } from '../_components/layout/Sidebar';

export default async function TrackLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ trackId: string }>;
}) {
  const { trackId } = await params;
  const roadmapsData = await getFullRoadmapsData();
  const roadmaps = Object.values(roadmapsData);
  const activeTab = trackId || 'ai_agents';

  return (
    <div className="flex gap-8 xl:gap-12">
      {/* 1. LEFT SIDEBAR (Track Selector) */}
      <Sidebar
        roadmaps={roadmaps as any}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 pb-32">
        {children}
      </div>
    </div>
  );
}
