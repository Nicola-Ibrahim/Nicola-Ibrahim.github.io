"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RoadmapPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/roadmap/ai_agents');
  }, [router]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
