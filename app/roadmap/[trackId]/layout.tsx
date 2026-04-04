"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { roadmapsData } from '@/app/roadmap/_data/roadmaps';
import { RoadmapSidebar } from '../_components/layout/RoadmapSidebar';

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { trackId, categorySlug } = useParams();
  const roadmaps = Object.values(roadmapsData);
  const activeTab = trackId as string || 'ai_agents';

  return (
    <div className="flex gap-8 xl:gap-12">
      {/* 1. LEFT SIDEBAR (Track Selector) */}
      <RoadmapSidebar 
        roadmaps={roadmaps}
        activeTab={activeTab}
        activeCategory={categorySlug as string}
      />

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 min-w-0 pb-32">
        {children}
      </div>
    </div>
  );
}
